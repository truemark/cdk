import {Construct} from "constructs";
import {
  CfnEIP,
  IMachineImage,
  InstanceArchitecture,
  InstanceClass,
  InstanceSize,
  InstanceType,
  ISubnet,
  IVpc,
  MachineImage,
  OperatingSystemType,
  Peer,
  Port,
  SecurityGroup,
  Subnet,
  SubnetSelection,
  UserData,
  Volume,
  Vpc
} from "aws-cdk-lib/aws-ec2";
import {Arn, Duration, RemovalPolicy, Size, Stack, Tags} from "aws-cdk-lib";
import {IKey} from "aws-cdk-lib/aws-kms";
import {AutoScalingGroup, BlockDeviceVolume, EbsDeviceVolumeType, UpdatePolicy} from "aws-cdk-lib/aws-autoscaling";
import {Effect, ManagedPolicy, PolicyStatement} from "aws-cdk-lib/aws-iam";
import * as fs from "fs";
import * as path from "path";
import {ARecord, IHostedZone, RecordTarget} from "aws-cdk-lib/aws-route53";
import {DomainName} from "../../aws-route53";
import {
  ApplicationListenerRule,
  ApplicationProtocol,
  ApplicationProtocolVersion,
  ApplicationTargetGroup, IApplicationListener, IApplicationLoadBalancer, ListenerCondition,
} from "aws-cdk-lib/aws-elasticloadbalancingv2";
import {IpTarget} from "aws-cdk-lib/aws-elasticloadbalancingv2-targets";

/**
 * Properties for WordPressInstance.
 */
export interface WordPressInstanceProps {

  /**
   * Vpc to place the instance in.
   * One of vpc, vpcId or vpcName is required.
   */
  readonly vpc?: IVpc;

  /**
   * Name of the vpc to place the instance in.
   * One of vpc, vpcId or vpcName is required.
   */
  readonly vpcName?: string;

  /**
   * ID of the vpc to place the instance in.
   * One of vpc, vpcId or vpcName is required.
   */
  readonly vpcId?: string;

  /**
   * Subnet to place the volume and instance in.
   * One of subnet or subnetId is required.
   */
  readonly subnet?: ISubnet;

  /**
   * ID of subnet to place the volume and instance in.
   * One of subnet or subnetId is required.
   */
  readonly subnetId?: string;

  /**
   * Availability zone to deploy the instance and volume in.
   */
  readonly availabilityZone: string;

  /**
   * Instance type to use of the instance. A t4g.small is used if not provided.
   */
  readonly instanceType?: InstanceType;

  /**
   * Instance class to use.
   *
   * @default - InstanceClass.BURSTABLE4_GRAVITON
   */
  readonly instanceClass?: InstanceClass;

  /**
   * Instance size to use.
   *
   * @default - InstanceSize.SMALL
   */
  readonly instanceSize?: InstanceSize;

  /**
   * Optional instance name.
   */
  readonly instanceName?: string;

  /**
   * Propagate the EC2 instance tags to the EBS volumes.
   *
   * @default - true
   */
  readonly propagateTagsToVolumeOnCreation?: boolean;

  /**
   * OS volume size in Gigabytes.
   *
   * @default - Size.gigabytes(10)
   */
  readonly osVolumeSize?: Size;

  /**
   * Data volume size in Gigabytes.
   *
   * @default - Size.gigabytes(10)
   */
  readonly dataVolumeSize?: Size;

  /**
   * Data volume removal policy.
   *
   * @default - RemovalPolicy.RETAIN
   */
  readonly dataVolumeRemovalPolicy?: RemovalPolicy;

  /**
   * Encryption key to use for volumes.
   */
  readonly encryptionKey?: IKey;

  /**
   * The domain names of the sites to be hosted by this instance.
   * Each provided site will be a separate WordPress installation.
   */
  readonly sites: string[];

  /**
   * Creates an elastic IP for this EC2 instance. Default is true.
   *
   * @default - true
   */
  readonly createEip?: boolean;

  /**
   * Prefix for the DNS record pointing to the elastic IP address for the EC2 instance.
   */
  readonly hostPrefix?: string;

  /**
   * Zone for the DNS record pointing to the elastic IP address for the EC2 instance.
   */
  readonly hostZone?: IHostedZone | string;

  /**
   * The TTL to use on the DNS record pointing to the elastic IP address for the EC2 instance.
   *
   * @default - Duration.seconds(300)
   */
  readonly hostRecordTtl?: Duration;

  /**
   * Creates a target group which can be attached to an application load balancer. Default is false.
   *
   * @default - false
   */
  readonly createTargetGroup?: boolean;
}

export const DEFAULT_ARM_IMAGE_SSM_PARAMETER = "/aws/service/canonical/ubuntu/server/jammy/stable/current/arm64/hvm/ebs-gp2/ami-id"
export const DEFAULT_AMD64_IMAGE_SSM_PARAMETER = "/aws/service/canonical/ubuntu/server/jammy/stable/current/amd64/hvm/ebs-gp2/ami-id"

/**
 * Creates a new WordPress instance.
 */
export class WordPressInstance extends Construct {

  readonly eip?: CfnEIP;
  readonly eipARecord?: ARecord;
  readonly targetGroup?: ApplicationTargetGroup;
  readonly volume: Volume;
  readonly securityGroup: SecurityGroup;
  readonly asg: AutoScalingGroup;

  resolveVpc(scope: Construct, props: WordPressInstanceProps): IVpc {
    if (props.vpc === undefined && props.vpcId === undefined && props.vpcName === undefined) {
      throw new Error("One of vpc, vpcId or vpcName is required");
    }
    if (props.vpc !== undefined) {
      return props.vpc;
    } else if (props.vpcId !== undefined) {
      return Vpc.fromLookup(this, "Vpc", {
        vpcId: props.vpcId
      });
    } else {
      return Vpc.fromLookup(this, "Vpc", {
        vpcName: props.vpcName
      });
    }
  }

  resolveInstanceType(scope: Construct, props: WordPressInstanceProps): InstanceType {
    return props.instanceType !== undefined
      ? props.instanceType
      : InstanceType.of(
        props.instanceClass ?? InstanceClass.BURSTABLE4_GRAVITON,
        props.instanceSize ?? InstanceSize.MICRO);
  }

  resolveSubnet(scope: Construct, props: WordPressInstanceProps): ISubnet {
    if (props.subnetId !== undefined) {
      return Subnet.fromSubnetId(scope, "Subnet", props.subnetId);
    }
    if (props.subnet !== undefined) {
      return props.subnet
    }
    throw new Error("One of subnet or subnetId is required");
  }

  resolveMachineImage(instanceType: InstanceType): IMachineImage {
    return MachineImage.fromSsmParameter(
      instanceType.architecture === InstanceArchitecture.ARM_64
        ? DEFAULT_ARM_IMAGE_SSM_PARAMETER
        : DEFAULT_AMD64_IMAGE_SSM_PARAMETER,
      {
        os: OperatingSystemType.LINUX
      }
    );
  }

  constructor(scope: Construct, id: string, props: WordPressInstanceProps) {
    super(scope, id);

    for (let site of props.sites) {
      if (site.toLowerCase().startsWith("www")) {
        throw new Error("Remove \"www.\" when specifying sites.");
      }
    }

    const stack = Stack.of(this);
    const subnet = this.resolveSubnet(this, props);
    const vpc = this.resolveVpc(this, props);
    const vpcSubnets: SubnetSelection = {
      subnets: [subnet]
    };

    if (props.createEip ?? true) {
      this.eip = new CfnEIP(this, "PublicIpAddress", {
        tags: [
          {
            key: "Name",
            value: this.node.path
          }
        ]
      });
      if (props.hostPrefix !== undefined && props.hostZone !== undefined) {
        const hostName = new DomainName({
          prefix: props.hostPrefix,
          zone: props.hostZone
        })
        this.eipARecord = hostName.createARecord(this, RecordTarget.fromIpAddresses(this.eip.ref),
          {ttl: props.hostRecordTtl ?? Duration.seconds(300)})
      }
    }

    this.volume = new Volume(this, "DataVolume", {
      size: props.dataVolumeSize ?? Size.gibibytes(10),
      volumeType: EbsDeviceVolumeType.GP3,
      encrypted: true,
      encryptionKey: props.encryptionKey,
      volumeName: `${this.node.path}/Data`,
      removalPolicy: props.dataVolumeRemovalPolicy ?? RemovalPolicy.RETAIN,
      availabilityZone: props.availabilityZone,
    });

    const instanceType = this.resolveInstanceType(this, props);
    const machineImage = this.resolveMachineImage(instanceType);
    const osVolumeSize = props.osVolumeSize === undefined ? 10 : props.osVolumeSize.toGibibytes();

    const userDataScript = fs.readFileSync(path.join(__dirname, "init.sh"), "utf-8");

    this.securityGroup = new SecurityGroup(this, "SecurityGroup", {
      description: "Default security group for WordPress",
      vpc,
      allowAllOutbound: true,
      allowAllIpv6Outbound: true,
    });
    this.securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(2020));
    this.securityGroup.addIngressRule(Peer.ipv4("10.0.0.0/8"), Port.tcp(22));
    this.securityGroup.addIngressRule(Peer.ipv4("172.16.0.0/12"), Port.tcp(22));
    this.securityGroup.addIngressRule(Peer.ipv4("192.168.0.0/16"), Port.tcp(22));
    this.securityGroup.addIngressRule(Peer.ipv6("fc00::/7"), Port.tcp(22));
    this.securityGroup.addIngressRule(Peer.ipv6("fd00::/8"), Port.tcp(22));
    this.securityGroup.addIngressRule(Peer.ipv6("fec0::/10"), Port.tcp(22));
    this.securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(80));
    // TODO Later on we want to whitelist cloudfront http://d7uri8nf7uskq.cloudfront.net/tools/list-cloudfront-ips

    this.asg = new AutoScalingGroup(this, "Scaling", {
      vpc,
      vpcSubnets,
      securityGroup: this.securityGroup,
      minCapacity: 0,
      maxCapacity: 1,
      desiredCapacity: 1,
      instanceType,
      machineImage,
      blockDevices: [
        {
          deviceName: "/dev/sda1",
          volume: BlockDeviceVolume.ebs(osVolumeSize, {
            encrypted: true,
            deleteOnTermination: true,
            volumeType: EbsDeviceVolumeType.GP3
          })
        }
      ],
      userData: UserData.custom(userDataScript),
      updatePolicy: UpdatePolicy.rollingUpdate(),
      requireImdsv2: true,
    });

    Tags.of(this.asg).add("wordpress:data-volume", this.volume.volumeId);
    Tags.of(this.asg).add("wordpress:sites", props.sites.join(" ").toLowerCase());

    this.asg.role.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName("AmazonSSMManagedInstanceCore"));
    this.asg.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["ec2:DescribeTags", "ec2:DescribeVolumes"],
      resources: ["*"]
    }));

    if (this.eip !== undefined) {
      Tags.of(this.asg).add("aws-patterns-wordpress:eip-allocation-id", this.eip.attrAllocationId);
      this.asg.addToRolePolicy(new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ["ec2:DisassociateAddress", "ec2:AssociateAddress"],
        resources: [
          Arn.format({
            service: "ec2",
            resource: "elastic-ip",
            resourceName: this.eip.attrAllocationId
          }, stack),
          Arn.format({
            service: "ec2",
            resource: "instance",
            resourceName: "*"
          }, stack)
        ]
      }));
    }

    this.volume.grantAttachVolume(this.asg);
    this.volume.grantDetachVolume(this.asg);

    if (props.createTargetGroup ?? false) {
      this.targetGroup = new ApplicationTargetGroup(this, "TargetGroup", {
        port: 80,
        protocol: ApplicationProtocol.HTTP,
        protocolVersion: ApplicationProtocolVersion.HTTP2,
        targets: [this.eip !== undefined ? new IpTarget(this.eip.ref) : this.asg]
      });
    }
  }

  addListenerRule(listener: IApplicationListener, priority: number, pathPatterns?: string[]): ApplicationListenerRule {
    if (!this.targetGroup) {
      throw new Error("No target group exists to attach");
    }
    return new ApplicationListenerRule(this, `ListenerRule${priority}`, {
      listener,
      priority,
      targetGroups: [this.targetGroup],
      conditions: pathPatterns ? [ListenerCondition.pathPatterns(pathPatterns)] : []
    });
  }
}
