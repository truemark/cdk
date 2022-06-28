# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### AlarmsBase <a name="AlarmsBase" id="truemark-cdk-lib.aws_monitoring.AlarmsBase"></a>

Base class for all Alarms constructs.

#### Initializers <a name="Initializers" id="truemark-cdk-lib.aws_monitoring.AlarmsBase.Initializer"></a>

```typescript
import { aws_monitoring } from 'truemark-cdk-lib'

new aws_monitoring.AlarmsBase(scope: Construct, id: string, props: AlarmsOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmsBase.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmsBase.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmsBase.Initializer.parameter.props">props</a></code> | <code>truemark-cdk-lib.aws_monitoring.AlarmsOptions</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="truemark-cdk-lib.aws_monitoring.AlarmsBase.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="truemark-cdk-lib.aws_monitoring.AlarmsBase.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="truemark-cdk-lib.aws_monitoring.AlarmsBase.Initializer.parameter.props"></a>

- *Type:* truemark-cdk-lib.aws_monitoring.AlarmsOptions

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmsBase.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmsBase.alarms">alarms</a></code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmsBase.criticalAlarms">criticalAlarms</a></code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmsBase.warningAlarms">warningAlarms</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="truemark-cdk-lib.aws_monitoring.AlarmsBase.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `alarms` <a name="alarms" id="truemark-cdk-lib.aws_monitoring.AlarmsBase.alarms"></a>

```typescript
public alarms(category: AlarmCategory): Alarm[]
```

###### `category`<sup>Required</sup> <a name="category" id="truemark-cdk-lib.aws_monitoring.AlarmsBase.alarms.parameter.category"></a>

- *Type:* truemark-cdk-lib.aws_monitoring.AlarmCategory

---

##### `criticalAlarms` <a name="criticalAlarms" id="truemark-cdk-lib.aws_monitoring.AlarmsBase.criticalAlarms"></a>

```typescript
public criticalAlarms(): Alarm[]
```

##### `warningAlarms` <a name="warningAlarms" id="truemark-cdk-lib.aws_monitoring.AlarmsBase.warningAlarms"></a>

```typescript
public warningAlarms(): Alarm[]
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmsBase.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="truemark-cdk-lib.aws_monitoring.AlarmsBase.isConstruct"></a>

```typescript
import { aws_monitoring } from 'truemark-cdk-lib'

aws_monitoring.AlarmsBase.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="truemark-cdk-lib.aws_monitoring.AlarmsBase.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmsBase.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmsBase.property.monitoringFacade">monitoringFacade</a></code> | <code>cdk-monitoring-constructs.MonitoringFacade</code> | The MonitoringFacade instance either passed in or generated. |

---

##### `node`<sup>Required</sup> <a name="node" id="truemark-cdk-lib.aws_monitoring.AlarmsBase.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `monitoringFacade`<sup>Required</sup> <a name="monitoringFacade" id="truemark-cdk-lib.aws_monitoring.AlarmsBase.property.monitoringFacade"></a>

```typescript
public readonly monitoringFacade: MonitoringFacade;
```

- *Type:* cdk-monitoring-constructs.MonitoringFacade

The MonitoringFacade instance either passed in or generated.

---


### ArtifactBucket <a name="ArtifactBucket" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket"></a>

An S3 bucket for storing artifacts in a pipeline.

The created bucket will
automatically be destroyed along with its contents when the CDK stack
containing it is destroyed. This is not presently the CDK default.

#### Initializers <a name="Initializers" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.Initializer"></a>

```typescript
import { aws_codepipeline } from 'truemark-cdk-lib'

new aws_codepipeline.ArtifactBucket(scope: Construct, id: string, props: ArtifactBucketProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.Initializer.parameter.props">props</a></code> | <code>truemark-cdk-lib.aws_codepipeline.ArtifactBucketProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.Initializer.parameter.props"></a>

- *Type:* truemark-cdk-lib.aws_codepipeline.ArtifactBucketProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.addEventNotification">addEventNotification</a></code> | Adds a bucket notification event destination. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.addObjectCreatedNotification">addObjectCreatedNotification</a></code> | Subscribes a destination to receive notifications when an object is created in the bucket. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.addObjectRemovedNotification">addObjectRemovedNotification</a></code> | Subscribes a destination to receive notifications when an object is removed from the bucket. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.addToResourcePolicy">addToResourcePolicy</a></code> | Adds a statement to the resource policy for a principal (i.e. account/role/service) to perform actions on this bucket and/or its contents. Use `bucketArn` and `arnForObjects(keys)` to obtain ARNs for this bucket or objects. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.arnForObjects">arnForObjects</a></code> | Returns an ARN that represents all objects within the bucket that match the key pattern specified. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.grantDelete">grantDelete</a></code> | Grants s3:DeleteObject* permission to an IAM principal for objects in this bucket. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.grantPublicAccess">grantPublicAccess</a></code> | Allows unrestricted access to objects from this bucket. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.grantPut">grantPut</a></code> | Grants s3:PutObject* and s3:Abort* permissions for this bucket to an IAM principal. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.grantPutAcl">grantPutAcl</a></code> | Grant the given IAM identity permissions to modify the ACLs of objects in the given Bucket. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.grantRead">grantRead</a></code> | Grant read permissions for this bucket and it's contents to an IAM principal (Role/Group/User). |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.grantReadWrite">grantReadWrite</a></code> | Grants read/write permissions for this bucket and it's contents to an IAM principal (Role/Group/User). |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.grantWrite">grantWrite</a></code> | Grant write permissions to this bucket to an IAM principal. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.onCloudTrailEvent">onCloudTrailEvent</a></code> | Define a CloudWatch event that triggers when something happens to this repository. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.onCloudTrailPutObject">onCloudTrailPutObject</a></code> | Defines an AWS CloudWatch event that triggers when an object is uploaded to the specified paths (keys) in this bucket using the PutObject API call. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.onCloudTrailWriteObject">onCloudTrailWriteObject</a></code> | Defines an AWS CloudWatch event that triggers when an object at the specified paths (keys) in this bucket are written to. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.s3UrlForObject">s3UrlForObject</a></code> | The S3 URL of an S3 object. For example:. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.transferAccelerationUrlForObject">transferAccelerationUrlForObject</a></code> | The https Transfer Acceleration URL of an S3 object. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.urlForObject">urlForObject</a></code> | The https URL of an S3 object. Specify `regional: false` at the options for non-regional URLs. For example:. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.virtualHostedUrlForObject">virtualHostedUrlForObject</a></code> | The virtual hosted-style URL of an S3 object. Specify `regional: false` at the options for non-regional URL. For example:. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.addCorsRule">addCorsRule</a></code> | Adds a cross-origin access configuration for objects in an Amazon S3 bucket. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.addInventory">addInventory</a></code> | Add an inventory configuration. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.addLifecycleRule">addLifecycleRule</a></code> | Add a lifecycle rule to the bucket. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.addMetric">addMetric</a></code> | Adds a metrics configuration for the CloudWatch request metrics from the bucket. |

---

##### `toString` <a name="toString" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `addEventNotification` <a name="addEventNotification" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.addEventNotification"></a>

```typescript
public addEventNotification(event: EventType, dest: IBucketNotificationDestination, filters: NotificationKeyFilter): void
```

Adds a bucket notification event destination.

> [https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html](https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html)

*Example*

```typescript
   declare const myLambda: lambda.Function;
   const bucket = new s3.Bucket(this, 'MyBucket');
   bucket.addEventNotification(s3.EventType.OBJECT_CREATED, new s3n.LambdaDestination(myLambda), {prefix: 'home/myusername/*'});
```


###### `event`<sup>Required</sup> <a name="event" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.addEventNotification.parameter.event"></a>

- *Type:* aws-cdk-lib.aws_s3.EventType

The event to trigger the notification.

---

###### `dest`<sup>Required</sup> <a name="dest" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.addEventNotification.parameter.dest"></a>

- *Type:* aws-cdk-lib.aws_s3.IBucketNotificationDestination

The notification destination (Lambda, SNS Topic or SQS Queue).

---

###### `filters`<sup>Required</sup> <a name="filters" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.addEventNotification.parameter.filters"></a>

- *Type:* aws-cdk-lib.aws_s3.NotificationKeyFilter

S3 object key filter rules to determine which objects trigger this event.

Each filter must include a `prefix` and/or `suffix`
that will be matched against the s3 object key. Refer to the S3 Developer Guide
for details about allowed filter rules.

---

##### `addObjectCreatedNotification` <a name="addObjectCreatedNotification" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.addObjectCreatedNotification"></a>

```typescript
public addObjectCreatedNotification(dest: IBucketNotificationDestination, filters: NotificationKeyFilter): void
```

Subscribes a destination to receive notifications when an object is created in the bucket.

This is identical to calling
`onEvent(EventType.OBJECT_CREATED)`.

###### `dest`<sup>Required</sup> <a name="dest" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.addObjectCreatedNotification.parameter.dest"></a>

- *Type:* aws-cdk-lib.aws_s3.IBucketNotificationDestination

The notification destination (see onEvent).

---

###### `filters`<sup>Required</sup> <a name="filters" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.addObjectCreatedNotification.parameter.filters"></a>

- *Type:* aws-cdk-lib.aws_s3.NotificationKeyFilter

Filters (see onEvent).

---

##### `addObjectRemovedNotification` <a name="addObjectRemovedNotification" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.addObjectRemovedNotification"></a>

```typescript
public addObjectRemovedNotification(dest: IBucketNotificationDestination, filters: NotificationKeyFilter): void
```

Subscribes a destination to receive notifications when an object is removed from the bucket.

This is identical to calling
`onEvent(EventType.OBJECT_REMOVED)`.

###### `dest`<sup>Required</sup> <a name="dest" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.addObjectRemovedNotification.parameter.dest"></a>

- *Type:* aws-cdk-lib.aws_s3.IBucketNotificationDestination

The notification destination (see onEvent).

---

###### `filters`<sup>Required</sup> <a name="filters" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.addObjectRemovedNotification.parameter.filters"></a>

- *Type:* aws-cdk-lib.aws_s3.NotificationKeyFilter

Filters (see onEvent).

---

##### `addToResourcePolicy` <a name="addToResourcePolicy" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.addToResourcePolicy"></a>

```typescript
public addToResourcePolicy(permission: PolicyStatement): AddToResourcePolicyResult
```

Adds a statement to the resource policy for a principal (i.e. account/role/service) to perform actions on this bucket and/or its contents. Use `bucketArn` and `arnForObjects(keys)` to obtain ARNs for this bucket or objects.

Note that the policy statement may or may not be added to the policy.
For example, when an `IBucket` is created from an existing bucket,
it's not possible to tell whether the bucket already has a policy
attached, let alone to re-use that policy to add more statements to it.
So it's safest to do nothing in these cases.

###### `permission`<sup>Required</sup> <a name="permission" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.addToResourcePolicy.parameter.permission"></a>

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement

the policy statement to be added to the bucket's policy.

---

##### `arnForObjects` <a name="arnForObjects" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.arnForObjects"></a>

```typescript
public arnForObjects(keyPattern: string): string
```

Returns an ARN that represents all objects within the bucket that match the key pattern specified.

To represent all keys, specify ``"*"``.

If you need to specify a keyPattern with multiple components, concatenate them into a single string, e.g.:

   arnForObjects(`home/${team}/${user}/*`)

###### `keyPattern`<sup>Required</sup> <a name="keyPattern" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.arnForObjects.parameter.keyPattern"></a>

- *Type:* string

---

##### `grantDelete` <a name="grantDelete" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.grantDelete"></a>

```typescript
public grantDelete(identity: IGrantable, objectsKeyPattern?: any): Grant
```

Grants s3:DeleteObject* permission to an IAM principal for objects in this bucket.

###### `identity`<sup>Required</sup> <a name="identity" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.grantDelete.parameter.identity"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

The principal.

---

###### `objectsKeyPattern`<sup>Optional</sup> <a name="objectsKeyPattern" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.grantDelete.parameter.objectsKeyPattern"></a>

- *Type:* any

Restrict the permission to a certain key pattern (default '*').

---

##### `grantPublicAccess` <a name="grantPublicAccess" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.grantPublicAccess"></a>

```typescript
public grantPublicAccess(allowedActions: string, keyPrefix?: string): Grant
```

Allows unrestricted access to objects from this bucket.

IMPORTANT: This permission allows anyone to perform actions on S3 objects
in this bucket, which is useful for when you configure your bucket as a
website and want everyone to be able to read objects in the bucket without
needing to authenticate.

Without arguments, this method will grant read ("s3:GetObject") access to
all objects ("*") in the bucket.

The method returns the `iam.Grant` object, which can then be modified
as needed. For example, you can add a condition that will restrict access only
to an IPv4 range like this:

     const grant = bucket.grantPublicAccess();
     grant.resourceStatement!.addCondition(‘IpAddress’, { “aws:SourceIp”: “54.240.143.0/24” });

Note that if this `IBucket` refers to an existing bucket, possibly not
managed by CloudFormation, this method will have no effect, since it's
impossible to modify the policy of an existing bucket.

###### `allowedActions`<sup>Required</sup> <a name="allowedActions" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.grantPublicAccess.parameter.allowedActions"></a>

- *Type:* string

the set of S3 actions to allow.

Default is "s3:GetObject".

---

###### `keyPrefix`<sup>Optional</sup> <a name="keyPrefix" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.grantPublicAccess.parameter.keyPrefix"></a>

- *Type:* string

the prefix of S3 object keys (e.g. `home/*`). Default is "*".

---

##### `grantPut` <a name="grantPut" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.grantPut"></a>

```typescript
public grantPut(identity: IGrantable, objectsKeyPattern?: any): Grant
```

Grants s3:PutObject* and s3:Abort* permissions for this bucket to an IAM principal.

If encryption is used, permission to use the key to encrypt the contents
of written files will also be granted to the same principal.

###### `identity`<sup>Required</sup> <a name="identity" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.grantPut.parameter.identity"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

The principal.

---

###### `objectsKeyPattern`<sup>Optional</sup> <a name="objectsKeyPattern" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.grantPut.parameter.objectsKeyPattern"></a>

- *Type:* any

Restrict the permission to a certain key pattern (default '*').

---

##### `grantPutAcl` <a name="grantPutAcl" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.grantPutAcl"></a>

```typescript
public grantPutAcl(identity: IGrantable, objectsKeyPattern?: string): Grant
```

Grant the given IAM identity permissions to modify the ACLs of objects in the given Bucket.

If your application has the '@aws-cdk/aws-s3:grantWriteWithoutAcl' feature flag set,
calling {@link grantWrite} or {@link grantReadWrite} no longer grants permissions to modify the ACLs of the objects;
in this case, if you need to modify object ACLs, call this method explicitly.

###### `identity`<sup>Required</sup> <a name="identity" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.grantPutAcl.parameter.identity"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

---

###### `objectsKeyPattern`<sup>Optional</sup> <a name="objectsKeyPattern" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.grantPutAcl.parameter.objectsKeyPattern"></a>

- *Type:* string

---

##### `grantRead` <a name="grantRead" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.grantRead"></a>

```typescript
public grantRead(identity: IGrantable, objectsKeyPattern?: any): Grant
```

Grant read permissions for this bucket and it's contents to an IAM principal (Role/Group/User).

If encryption is used, permission to use the key to decrypt the contents
of the bucket will also be granted to the same principal.

###### `identity`<sup>Required</sup> <a name="identity" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.grantRead.parameter.identity"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

The principal.

---

###### `objectsKeyPattern`<sup>Optional</sup> <a name="objectsKeyPattern" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.grantRead.parameter.objectsKeyPattern"></a>

- *Type:* any

Restrict the permission to a certain key pattern (default '*').

---

##### `grantReadWrite` <a name="grantReadWrite" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.grantReadWrite"></a>

```typescript
public grantReadWrite(identity: IGrantable, objectsKeyPattern?: any): Grant
```

Grants read/write permissions for this bucket and it's contents to an IAM principal (Role/Group/User).

If an encryption key is used, permission to use the key for
encrypt/decrypt will also be granted.

Before CDK version 1.85.0, this method granted the `s3:PutObject*` permission that included `s3:PutObjectAcl`,
which could be used to grant read/write object access to IAM principals in other accounts.
If you want to get rid of that behavior, update your CDK version to 1.85.0 or later,
and make sure the `@aws-cdk/aws-s3:grantWriteWithoutAcl` feature flag is set to `true`
in the `context` key of your cdk.json file.
If you've already updated, but still need the principal to have permissions to modify the ACLs,
use the {@link grantPutAcl} method.

###### `identity`<sup>Required</sup> <a name="identity" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.grantReadWrite.parameter.identity"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

---

###### `objectsKeyPattern`<sup>Optional</sup> <a name="objectsKeyPattern" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.grantReadWrite.parameter.objectsKeyPattern"></a>

- *Type:* any

---

##### `grantWrite` <a name="grantWrite" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.grantWrite"></a>

```typescript
public grantWrite(identity: IGrantable, objectsKeyPattern?: any): Grant
```

Grant write permissions to this bucket to an IAM principal.

If encryption is used, permission to use the key to encrypt the contents
of written files will also be granted to the same principal.

Before CDK version 1.85.0, this method granted the `s3:PutObject*` permission that included `s3:PutObjectAcl`,
which could be used to grant read/write object access to IAM principals in other accounts.
If you want to get rid of that behavior, update your CDK version to 1.85.0 or later,
and make sure the `@aws-cdk/aws-s3:grantWriteWithoutAcl` feature flag is set to `true`
in the `context` key of your cdk.json file.
If you've already updated, but still need the principal to have permissions to modify the ACLs,
use the {@link grantPutAcl} method.

###### `identity`<sup>Required</sup> <a name="identity" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.grantWrite.parameter.identity"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

---

###### `objectsKeyPattern`<sup>Optional</sup> <a name="objectsKeyPattern" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.grantWrite.parameter.objectsKeyPattern"></a>

- *Type:* any

---

##### `onCloudTrailEvent` <a name="onCloudTrailEvent" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.onCloudTrailEvent"></a>

```typescript
public onCloudTrailEvent(id: string, options?: OnCloudTrailBucketEventOptions): Rule
```

Define a CloudWatch event that triggers when something happens to this repository.

Requires that there exists at least one CloudTrail Trail in your account
that captures the event. This method will not create the Trail.

###### `id`<sup>Required</sup> <a name="id" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.onCloudTrailEvent.parameter.id"></a>

- *Type:* string

The id of the rule.

---

###### `options`<sup>Optional</sup> <a name="options" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.onCloudTrailEvent.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_s3.OnCloudTrailBucketEventOptions

Options for adding the rule.

---

##### `onCloudTrailPutObject` <a name="onCloudTrailPutObject" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.onCloudTrailPutObject"></a>

```typescript
public onCloudTrailPutObject(id: string, options?: OnCloudTrailBucketEventOptions): Rule
```

Defines an AWS CloudWatch event that triggers when an object is uploaded to the specified paths (keys) in this bucket using the PutObject API call.

Note that some tools like `aws s3 cp` will automatically use either
PutObject or the multipart upload API depending on the file size,
so using `onCloudTrailWriteObject` may be preferable.

Requires that there exists at least one CloudTrail Trail in your account
that captures the event. This method will not create the Trail.

###### `id`<sup>Required</sup> <a name="id" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.onCloudTrailPutObject.parameter.id"></a>

- *Type:* string

The id of the rule.

---

###### `options`<sup>Optional</sup> <a name="options" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.onCloudTrailPutObject.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_s3.OnCloudTrailBucketEventOptions

Options for adding the rule.

---

##### `onCloudTrailWriteObject` <a name="onCloudTrailWriteObject" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.onCloudTrailWriteObject"></a>

```typescript
public onCloudTrailWriteObject(id: string, options?: OnCloudTrailBucketEventOptions): Rule
```

Defines an AWS CloudWatch event that triggers when an object at the specified paths (keys) in this bucket are written to.

This includes
the events PutObject, CopyObject, and CompleteMultipartUpload.

Note that some tools like `aws s3 cp` will automatically use either
PutObject or the multipart upload API depending on the file size,
so using this method may be preferable to `onCloudTrailPutObject`.

Requires that there exists at least one CloudTrail Trail in your account
that captures the event. This method will not create the Trail.

###### `id`<sup>Required</sup> <a name="id" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.onCloudTrailWriteObject.parameter.id"></a>

- *Type:* string

The id of the rule.

---

###### `options`<sup>Optional</sup> <a name="options" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.onCloudTrailWriteObject.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_s3.OnCloudTrailBucketEventOptions

Options for adding the rule.

---

##### `s3UrlForObject` <a name="s3UrlForObject" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.s3UrlForObject"></a>

```typescript
public s3UrlForObject(key?: string): string
```

The S3 URL of an S3 object. For example:.

`s3://onlybucket`
- `s3://bucket/key`

###### `key`<sup>Optional</sup> <a name="key" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.s3UrlForObject.parameter.key"></a>

- *Type:* string

The S3 key of the object.

If not specified, the S3 URL of the
bucket is returned.

---

##### `transferAccelerationUrlForObject` <a name="transferAccelerationUrlForObject" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.transferAccelerationUrlForObject"></a>

```typescript
public transferAccelerationUrlForObject(key?: string, options?: TransferAccelerationUrlOptions): string
```

The https Transfer Acceleration URL of an S3 object.

Specify `dualStack: true` at the options
for dual-stack endpoint (connect to the bucket over IPv6). For example:

- `https://bucket.s3-accelerate.amazonaws.com`
- `https://bucket.s3-accelerate.amazonaws.com/key`

###### `key`<sup>Optional</sup> <a name="key" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.transferAccelerationUrlForObject.parameter.key"></a>

- *Type:* string

The S3 key of the object.

If not specified, the URL of the
bucket is returned.

---

###### `options`<sup>Optional</sup> <a name="options" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.transferAccelerationUrlForObject.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_s3.TransferAccelerationUrlOptions

Options for generating URL.

---

##### `urlForObject` <a name="urlForObject" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.urlForObject"></a>

```typescript
public urlForObject(key?: string): string
```

The https URL of an S3 object. Specify `regional: false` at the options for non-regional URLs. For example:.

`https://s3.us-west-1.amazonaws.com/onlybucket`
- `https://s3.us-west-1.amazonaws.com/bucket/key`
- `https://s3.cn-north-1.amazonaws.com.cn/china-bucket/mykey`

###### `key`<sup>Optional</sup> <a name="key" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.urlForObject.parameter.key"></a>

- *Type:* string

The S3 key of the object.

If not specified, the URL of the
bucket is returned.

---

##### `virtualHostedUrlForObject` <a name="virtualHostedUrlForObject" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.virtualHostedUrlForObject"></a>

```typescript
public virtualHostedUrlForObject(key?: string, options?: VirtualHostedStyleUrlOptions): string
```

The virtual hosted-style URL of an S3 object. Specify `regional: false` at the options for non-regional URL. For example:.

`https://only-bucket.s3.us-west-1.amazonaws.com`
- `https://bucket.s3.us-west-1.amazonaws.com/key`
- `https://bucket.s3.amazonaws.com/key`
- `https://china-bucket.s3.cn-north-1.amazonaws.com.cn/mykey`

###### `key`<sup>Optional</sup> <a name="key" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.virtualHostedUrlForObject.parameter.key"></a>

- *Type:* string

The S3 key of the object.

If not specified, the URL of the
bucket is returned.

---

###### `options`<sup>Optional</sup> <a name="options" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.virtualHostedUrlForObject.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_s3.VirtualHostedStyleUrlOptions

Options for generating URL.

---

##### `addCorsRule` <a name="addCorsRule" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.addCorsRule"></a>

```typescript
public addCorsRule(rule: CorsRule): void
```

Adds a cross-origin access configuration for objects in an Amazon S3 bucket.

###### `rule`<sup>Required</sup> <a name="rule" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.addCorsRule.parameter.rule"></a>

- *Type:* aws-cdk-lib.aws_s3.CorsRule

The CORS configuration rule to add.

---

##### `addInventory` <a name="addInventory" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.addInventory"></a>

```typescript
public addInventory(inventory: Inventory): void
```

Add an inventory configuration.

###### `inventory`<sup>Required</sup> <a name="inventory" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.addInventory.parameter.inventory"></a>

- *Type:* aws-cdk-lib.aws_s3.Inventory

configuration to add.

---

##### `addLifecycleRule` <a name="addLifecycleRule" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.addLifecycleRule"></a>

```typescript
public addLifecycleRule(rule: LifecycleRule): void
```

Add a lifecycle rule to the bucket.

###### `rule`<sup>Required</sup> <a name="rule" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.addLifecycleRule.parameter.rule"></a>

- *Type:* aws-cdk-lib.aws_s3.LifecycleRule

The rule to add.

---

##### `addMetric` <a name="addMetric" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.addMetric"></a>

```typescript
public addMetric(metric: BucketMetrics): void
```

Adds a metrics configuration for the CloudWatch request metrics from the bucket.

###### `metric`<sup>Required</sup> <a name="metric" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.addMetric.parameter.metric"></a>

- *Type:* aws-cdk-lib.aws_s3.BucketMetrics

The metric configuration to add.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.fromBucketArn">fromBucketArn</a></code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.fromBucketAttributes">fromBucketAttributes</a></code> | Creates a Bucket construct that represents an external bucket. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.fromBucketName">fromBucketName</a></code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.validateBucketName">validateBucketName</a></code> | Thrown an exception if the given bucket name is not valid. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.isConstruct"></a>

```typescript
import { aws_codepipeline } from 'truemark-cdk-lib'

aws_codepipeline.ArtifactBucket.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isResource` <a name="isResource" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.isResource"></a>

```typescript
import { aws_codepipeline } from 'truemark-cdk-lib'

aws_codepipeline.ArtifactBucket.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `fromBucketArn` <a name="fromBucketArn" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.fromBucketArn"></a>

```typescript
import { aws_codepipeline } from 'truemark-cdk-lib'

aws_codepipeline.ArtifactBucket.fromBucketArn(scope: Construct, id: string, bucketArn: string)
```

###### `scope`<sup>Required</sup> <a name="scope" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.fromBucketArn.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.fromBucketArn.parameter.id"></a>

- *Type:* string

---

###### `bucketArn`<sup>Required</sup> <a name="bucketArn" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.fromBucketArn.parameter.bucketArn"></a>

- *Type:* string

---

##### `fromBucketAttributes` <a name="fromBucketAttributes" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.fromBucketAttributes"></a>

```typescript
import { aws_codepipeline } from 'truemark-cdk-lib'

aws_codepipeline.ArtifactBucket.fromBucketAttributes(scope: Construct, id: string, attrs: BucketAttributes)
```

Creates a Bucket construct that represents an external bucket.

###### `scope`<sup>Required</sup> <a name="scope" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.fromBucketAttributes.parameter.scope"></a>

- *Type:* constructs.Construct

The parent creating construct (usually `this`).

---

###### `id`<sup>Required</sup> <a name="id" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.fromBucketAttributes.parameter.id"></a>

- *Type:* string

The construct's name.

---

###### `attrs`<sup>Required</sup> <a name="attrs" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.fromBucketAttributes.parameter.attrs"></a>

- *Type:* aws-cdk-lib.aws_s3.BucketAttributes

A `BucketAttributes` object.

Can be obtained from a call to
`bucket.export()` or manually created.

---

##### `fromBucketName` <a name="fromBucketName" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.fromBucketName"></a>

```typescript
import { aws_codepipeline } from 'truemark-cdk-lib'

aws_codepipeline.ArtifactBucket.fromBucketName(scope: Construct, id: string, bucketName: string)
```

###### `scope`<sup>Required</sup> <a name="scope" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.fromBucketName.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.fromBucketName.parameter.id"></a>

- *Type:* string

---

###### `bucketName`<sup>Required</sup> <a name="bucketName" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.fromBucketName.parameter.bucketName"></a>

- *Type:* string

---

##### `validateBucketName` <a name="validateBucketName" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.validateBucketName"></a>

```typescript
import { aws_codepipeline } from 'truemark-cdk-lib'

aws_codepipeline.ArtifactBucket.validateBucketName(physicalName: string)
```

Thrown an exception if the given bucket name is not valid.

###### `physicalName`<sup>Required</sup> <a name="physicalName" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.validateBucketName.parameter.physicalName"></a>

- *Type:* string

name of the bucket.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.property.bucketArn">bucketArn</a></code> | <code>string</code> | The ARN of the bucket. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.property.bucketDomainName">bucketDomainName</a></code> | <code>string</code> | The IPv4 DNS name of the specified bucket. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.property.bucketDualStackDomainName">bucketDualStackDomainName</a></code> | <code>string</code> | The IPv6 DNS name of the specified bucket. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.property.bucketName">bucketName</a></code> | <code>string</code> | The name of the bucket. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.property.bucketRegionalDomainName">bucketRegionalDomainName</a></code> | <code>string</code> | The regional domain name of the specified bucket. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.property.bucketWebsiteDomainName">bucketWebsiteDomainName</a></code> | <code>string</code> | The Domain name of the static website. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.property.bucketWebsiteUrl">bucketWebsiteUrl</a></code> | <code>string</code> | The URL of the static website. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.property.encryptionKey">encryptionKey</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | Optional KMS encryption key associated with this bucket. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.property.isWebsite">isWebsite</a></code> | <code>boolean</code> | If this bucket has been configured for static website hosting. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucket.property.policy">policy</a></code> | <code>aws-cdk-lib.aws_s3.BucketPolicy</code> | The resource policy associated with this bucket. |

---

##### `node`<sup>Required</sup> <a name="node" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `bucketArn`<sup>Required</sup> <a name="bucketArn" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.property.bucketArn"></a>

```typescript
public readonly bucketArn: string;
```

- *Type:* string

The ARN of the bucket.

---

##### `bucketDomainName`<sup>Required</sup> <a name="bucketDomainName" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.property.bucketDomainName"></a>

```typescript
public readonly bucketDomainName: string;
```

- *Type:* string

The IPv4 DNS name of the specified bucket.

---

##### `bucketDualStackDomainName`<sup>Required</sup> <a name="bucketDualStackDomainName" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.property.bucketDualStackDomainName"></a>

```typescript
public readonly bucketDualStackDomainName: string;
```

- *Type:* string

The IPv6 DNS name of the specified bucket.

---

##### `bucketName`<sup>Required</sup> <a name="bucketName" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.property.bucketName"></a>

```typescript
public readonly bucketName: string;
```

- *Type:* string

The name of the bucket.

---

##### `bucketRegionalDomainName`<sup>Required</sup> <a name="bucketRegionalDomainName" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.property.bucketRegionalDomainName"></a>

```typescript
public readonly bucketRegionalDomainName: string;
```

- *Type:* string

The regional domain name of the specified bucket.

---

##### `bucketWebsiteDomainName`<sup>Required</sup> <a name="bucketWebsiteDomainName" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.property.bucketWebsiteDomainName"></a>

```typescript
public readonly bucketWebsiteDomainName: string;
```

- *Type:* string

The Domain name of the static website.

---

##### `bucketWebsiteUrl`<sup>Required</sup> <a name="bucketWebsiteUrl" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.property.bucketWebsiteUrl"></a>

```typescript
public readonly bucketWebsiteUrl: string;
```

- *Type:* string

The URL of the static website.

---

##### `encryptionKey`<sup>Optional</sup> <a name="encryptionKey" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.property.encryptionKey"></a>

```typescript
public readonly encryptionKey: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

Optional KMS encryption key associated with this bucket.

---

##### `isWebsite`<sup>Optional</sup> <a name="isWebsite" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.property.isWebsite"></a>

```typescript
public readonly isWebsite: boolean;
```

- *Type:* boolean

If this bucket has been configured for static website hosting.

---

##### `policy`<sup>Optional</sup> <a name="policy" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucket.property.policy"></a>

```typescript
public readonly policy: BucketPolicy;
```

- *Type:* aws-cdk-lib.aws_s3.BucketPolicy

The resource policy associated with this bucket.

If `autoCreatePolicy` is true, a `BucketPolicy` will be created upon the
first call to addToResourcePolicy(s).

---


### CdkPipeline <a name="CdkPipeline" id="truemark-cdk-lib.aws_codepipeline.CdkPipeline"></a>

An abstraction to ease CDK pipeline creation and configuration.

#### Initializers <a name="Initializers" id="truemark-cdk-lib.aws_codepipeline.CdkPipeline.Initializer"></a>

```typescript
import { aws_codepipeline } from 'truemark-cdk-lib'

new aws_codepipeline.CdkPipeline(scope: Construct, id: string, props: CdkPipelineProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.CdkPipeline.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.CdkPipeline.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.CdkPipeline.Initializer.parameter.props">props</a></code> | <code>truemark-cdk-lib.aws_codepipeline.CdkPipelineProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="truemark-cdk-lib.aws_codepipeline.CdkPipeline.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="truemark-cdk-lib.aws_codepipeline.CdkPipeline.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="truemark-cdk-lib.aws_codepipeline.CdkPipeline.Initializer.parameter.props"></a>

- *Type:* truemark-cdk-lib.aws_codepipeline.CdkPipelineProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.CdkPipeline.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.CdkPipeline.addStage">addStage</a></code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.CdkPipeline.addWave">addWave</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="truemark-cdk-lib.aws_codepipeline.CdkPipeline.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addStage` <a name="addStage" id="truemark-cdk-lib.aws_codepipeline.CdkPipeline.addStage"></a>

```typescript
public addStage(stage: Stage, options?: AddStageOpts): StageDeployment
```

###### `stage`<sup>Required</sup> <a name="stage" id="truemark-cdk-lib.aws_codepipeline.CdkPipeline.addStage.parameter.stage"></a>

- *Type:* aws-cdk-lib.Stage

---

###### `options`<sup>Optional</sup> <a name="options" id="truemark-cdk-lib.aws_codepipeline.CdkPipeline.addStage.parameter.options"></a>

- *Type:* aws-cdk-lib.pipelines.AddStageOpts

---

##### `addWave` <a name="addWave" id="truemark-cdk-lib.aws_codepipeline.CdkPipeline.addWave"></a>

```typescript
public addWave(id: string, options?: WaveOptions): Wave
```

###### `id`<sup>Required</sup> <a name="id" id="truemark-cdk-lib.aws_codepipeline.CdkPipeline.addWave.parameter.id"></a>

- *Type:* string

---

###### `options`<sup>Optional</sup> <a name="options" id="truemark-cdk-lib.aws_codepipeline.CdkPipeline.addWave.parameter.options"></a>

- *Type:* aws-cdk-lib.pipelines.WaveOptions

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.CdkPipeline.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="truemark-cdk-lib.aws_codepipeline.CdkPipeline.isConstruct"></a>

```typescript
import { aws_codepipeline } from 'truemark-cdk-lib'

aws_codepipeline.CdkPipeline.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="truemark-cdk-lib.aws_codepipeline.CdkPipeline.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.CdkPipeline.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.CdkPipeline.property.pipeline">pipeline</a></code> | <code>aws-cdk-lib.pipelines.CodePipeline</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.CdkPipeline.property.pipelineNotificationRule">pipelineNotificationRule</a></code> | <code>truemark-cdk-lib.aws_codepipeline.PipelineNotificationRule</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="truemark-cdk-lib.aws_codepipeline.CdkPipeline.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `pipeline`<sup>Required</sup> <a name="pipeline" id="truemark-cdk-lib.aws_codepipeline.CdkPipeline.property.pipeline"></a>

```typescript
public readonly pipeline: CodePipeline;
```

- *Type:* aws-cdk-lib.pipelines.CodePipeline

---

##### `pipelineNotificationRule`<sup>Required</sup> <a name="pipelineNotificationRule" id="truemark-cdk-lib.aws_codepipeline.CdkPipeline.property.pipelineNotificationRule"></a>

```typescript
public readonly pipelineNotificationRule: PipelineNotificationRule;
```

- *Type:* truemark-cdk-lib.aws_codepipeline.PipelineNotificationRule

---


### EstimatedChargesAlarm <a name="EstimatedChargesAlarm" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm"></a>

Creates an alarm for estimated charges on an account.

#### Initializers <a name="Initializers" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.Initializer"></a>

```typescript
import { aws_cloudwatch } from 'truemark-cdk-lib'

new aws_cloudwatch.EstimatedChargesAlarm(scope: Construct, id: string, props: MetricAlarmBaseProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.Initializer.parameter.props">props</a></code> | <code>truemark-cdk-lib.aws_cloudwatch.MetricAlarmBaseProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.Initializer.parameter.props"></a>

- *Type:* truemark-cdk-lib.aws_cloudwatch.MetricAlarmBaseProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.addAlarmAction">addAlarmAction</a></code> | Trigger actions if the alarm fires. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.addAlarmTopic">addAlarmTopic</a></code> | Notify SNS topics if the alarm fires. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.addInsufficientDataAction">addInsufficientDataAction</a></code> | Trigger actions if there is insufficient data to evaluate the alarm. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.addInsufficientDataTopic">addInsufficientDataTopic</a></code> | Notify SNS topics if there is insufficient data to evaluate the alarm. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.addOkAction">addOkAction</a></code> | Trigger actions if the alarm returns from breaching a state into an ok state. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.addOkTopic">addOkTopic</a></code> | Notify SNS topics if the alarm returns from breaching a state into an ok state. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.renderAlarmRule">renderAlarmRule</a></code> | serialized representation of Alarm Rule to be used when building the Composite Alarm resource. |

---

##### `toString` <a name="toString" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addAlarmAction` <a name="addAlarmAction" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.addAlarmAction"></a>

```typescript
public addAlarmAction(actions: IAlarmAction): void
```

Trigger actions if the alarm fires.

###### `actions`<sup>Required</sup> <a name="actions" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.addAlarmAction.parameter.actions"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction

the actions to trigger.

---

##### `addAlarmTopic` <a name="addAlarmTopic" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.addAlarmTopic"></a>

```typescript
public addAlarmTopic(topics: ITopic): void
```

Notify SNS topics if the alarm fires.

###### `topics`<sup>Required</sup> <a name="topics" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.addAlarmTopic.parameter.topics"></a>

- *Type:* aws-cdk-lib.aws_sns.ITopic

the topics to notify.

---

##### `addInsufficientDataAction` <a name="addInsufficientDataAction" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.addInsufficientDataAction"></a>

```typescript
public addInsufficientDataAction(actions: IAlarmAction): void
```

Trigger actions if there is insufficient data to evaluate the alarm.

###### `actions`<sup>Required</sup> <a name="actions" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.addInsufficientDataAction.parameter.actions"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction

the actions to trigger.

---

##### `addInsufficientDataTopic` <a name="addInsufficientDataTopic" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.addInsufficientDataTopic"></a>

```typescript
public addInsufficientDataTopic(topics: ITopic): void
```

Notify SNS topics if there is insufficient data to evaluate the alarm.

###### `topics`<sup>Required</sup> <a name="topics" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.addInsufficientDataTopic.parameter.topics"></a>

- *Type:* aws-cdk-lib.aws_sns.ITopic

the topics to notify.

---

##### `addOkAction` <a name="addOkAction" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.addOkAction"></a>

```typescript
public addOkAction(actions: IAlarmAction): void
```

Trigger actions if the alarm returns from breaching a state into an ok state.

###### `actions`<sup>Required</sup> <a name="actions" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.addOkAction.parameter.actions"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction

the actions to trigger.

---

##### `addOkTopic` <a name="addOkTopic" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.addOkTopic"></a>

```typescript
public addOkTopic(topics: ITopic): void
```

Notify SNS topics if the alarm returns from breaching a state into an ok state.

###### `topics`<sup>Required</sup> <a name="topics" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.addOkTopic.parameter.topics"></a>

- *Type:* aws-cdk-lib.aws_sns.ITopic

the topics to notify.

---

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `renderAlarmRule` <a name="renderAlarmRule" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.renderAlarmRule"></a>

```typescript
public renderAlarmRule(): string
```

serialized representation of Alarm Rule to be used when building the Composite Alarm resource.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.isConstruct"></a>

```typescript
import { aws_cloudwatch } from 'truemark-cdk-lib'

aws_cloudwatch.EstimatedChargesAlarm.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.property.alarm">alarm</a></code> | <code>truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.property.alarmArn">alarmArn</a></code> | <code>string</code> | Alarm ARN (i.e. arn:aws:cloudwatch:<region>:<account-id>:alarm:Foo). |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.property.alarmName">alarmName</a></code> | <code>string</code> | Name of the alarm. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.property.metric">metric</a></code> | <code>aws-cdk-lib.aws_cloudwatch.Metric</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |

---

##### `node`<sup>Required</sup> <a name="node" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `alarm`<sup>Required</sup> <a name="alarm" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.property.alarm"></a>

```typescript
public readonly alarm: ExtendedAlarm;
```

- *Type:* truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm

---

##### `alarmArn`<sup>Required</sup> <a name="alarmArn" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.property.alarmArn"></a>

```typescript
public readonly alarmArn: string;
```

- *Type:* string

Alarm ARN (i.e. arn:aws:cloudwatch:<region>:<account-id>:alarm:Foo).

---

##### `alarmName`<sup>Required</sup> <a name="alarmName" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.property.alarmName"></a>

```typescript
public readonly alarmName: string;
```

- *Type:* string

Name of the alarm.

---

##### `env`<sup>Required</sup> <a name="env" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `metric`<sup>Required</sup> <a name="metric" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.property.metric"></a>

```typescript
public readonly metric: Metric;
```

- *Type:* aws-cdk-lib.aws_cloudwatch.Metric

---

##### `stack`<sup>Required</sup> <a name="stack" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarm.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---


### ExportedStack <a name="ExportedStack" id="truemark-cdk-lib.aws_codepipeline.ExportedStack"></a>

Provides functionality to export parameters to support cross region pipelines.

#### Initializers <a name="Initializers" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.Initializer"></a>

```typescript
import { aws_codepipeline } from 'truemark-cdk-lib'

new aws_codepipeline.ExportedStack(scope: Construct, id: string, props?: ExportedStackProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.Initializer.parameter.props">props</a></code> | <code>truemark-cdk-lib.aws_codepipeline.ExportedStackProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.Initializer.parameter.props"></a>

- *Type:* truemark-cdk-lib.aws_codepipeline.ExportedStackProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a value. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.exportParameter">exportParameter</a></code> | Exports a parameter as an SSM Parameter. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.outputParameter">outputParameter</a></code> | Outputs a parameter as a CfnOutput. |

---

##### `toString` <a name="toString" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addTransform` <a name="addTransform" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.addTransform"></a>

```typescript
public addTransform(transform: string): void
```

Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template.

Duplicate values are removed when stack is synthesized.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html)

*Example*

```typescript
declare const stack: Stack;

stack.addTransform('AWS::Serverless-2016-10-31')
```


###### `transform`<sup>Required</sup> <a name="transform" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportValue` <a name="exportValue" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.exportValue"></a>

```typescript
public exportValue(exportedValue: any, options?: ExportValueOptions): string
```

Create a CloudFormation Export for a value.

Returns a string representing the corresponding `Fn.importValue()`
expression for this Export. You can control the name for the export by
passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

## Example

Here is how the process works. Let's say there are two stacks,
`producerStack` and `consumerStack`, and `producerStack` has a bucket
called `bucket`, which is referenced by `consumerStack` (perhaps because
an AWS Lambda Function writes into it, or something like that).

It is not safe to remove `producerStack.bucket` because as the bucket is being
deleted, `consumerStack` might still be using it.

Instead, the process takes two deployments:

### Deployment 1: break the relationship

- Make sure `consumerStack` no longer references `bucket.bucketName` (maybe the consumer
   stack now uses its own bucket, or it writes to an AWS DynamoDB table, or maybe you just
   remove the Lambda Function altogether).
- In the `ProducerStack` class, call `this.exportValue(this.bucket.bucketName)`. This
   will make sure the CloudFormation Export continues to exist while the relationship
   between the two stacks is being broken.
- Deploy (this will effectively only change the `consumerStack`, but it's safe to deploy both).

### Deployment 2: remove the bucket resource

- You are now free to remove the `bucket` resource from `producerStack`.
- Don't forget to remove the `exportValue()` call as well.
- Deploy again (this time only the `producerStack` will be changed -- the bucket will be deleted).

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.formatArn"></a>

```typescript
public formatArn(components: ArnComponents): string
```

Creates an ARN from components.

If `partition`, `region` or `account` are not specified, the stack's
partition, region and account will be used.

If any component is the empty string, an empty string will be inserted
into the generated ARN at the location that component corresponds to.

The ARN will be formatted as follows:

   arn:{partition}:{service}:{region}:{account}:{resource}{sep}}{resource-name}

The required ARN pieces that are omitted will be taken from the stack that
the 'scope' is attached to. If all ARN pieces are supplied, the supplied scope
can be 'undefined'.

###### `components`<sup>Required</sup> <a name="components" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.getLogicalId"></a>

```typescript
public getLogicalId(element: CfnElement): string
```

Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource.

This method is called when a `CfnElement` is created and used to render the
initial logical identity of resources. Logical ID renames are applied at
this stage.

This method uses the protected method `allocateLogicalId` to render the
logical ID for an element. To modify the naming scheme, extend the `Stack`
class and override this method.

###### `element`<sup>Required</sup> <a name="element" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.regionalFact"></a>

```typescript
public regionalFact(factName: string, defaultValue?: string): string
```

Look up a fact value for the given fact for the region of this stack.

Will return a definite value only if the region of the current stack is resolved.
If not, a lookup map will be added to the stack and the lookup will be done at
CDK deployment time.

What regions will be included in the lookup map is controlled by the
`@aws-cdk/core:target-partitions` context value: it must be set to a list
of partitions, and only regions from the given partitions will be included.
If no such context key is set, all regions will be included.

This function is intended to be used by construct library authors. Application
builders can rely on the abstractions offered by construct libraries and do
not have to worry about regional facts.

If `defaultValue` is not given, it is an error if the fact is unknown for
the given region.

###### `factName`<sup>Required</sup> <a name="factName" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `exportParameter` <a name="exportParameter" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.exportParameter"></a>

```typescript
public exportParameter(name: string, value: string, includeOutput?: boolean): StringParameter
```

Exports a parameter as an SSM Parameter.

###### `name`<sup>Required</sup> <a name="name" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.exportParameter.parameter.name"></a>

- *Type:* string

the parameter name.

---

###### `value`<sup>Required</sup> <a name="value" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.exportParameter.parameter.value"></a>

- *Type:* string

the parameter value.

---

###### `includeOutput`<sup>Optional</sup> <a name="includeOutput" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.exportParameter.parameter.includeOutput"></a>

- *Type:* boolean

true to include as a CfnOutput instance.

---

##### `outputParameter` <a name="outputParameter" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.outputParameter"></a>

```typescript
public outputParameter(name: string, value: string): CfnOutput
```

Outputs a parameter as a CfnOutput.

###### `name`<sup>Required</sup> <a name="name" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.outputParameter.parameter.name"></a>

- *Type:* string

the parameter name.

---

###### `value`<sup>Required</sup> <a name="value" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.outputParameter.parameter.value"></a>

- *Type:* string

the parameter value.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.isConstruct"></a>

```typescript
import { aws_codepipeline } from 'truemark-cdk-lib'

aws_codepipeline.ExportedStack.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.isStack"></a>

```typescript
import { aws_codepipeline } from 'truemark-cdk-lib'

aws_codepipeline.ExportedStack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.of"></a>

```typescript
import { aws_codepipeline } from 'truemark-cdk-lib'

aws_codepipeline.ExportedStack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStack.property.parameterExportOptions">parameterExportOptions</a></code> | <code>truemark-cdk-lib.aws_ssm.ParameterStoreOptions</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.property.account"></a>

```typescript
public readonly account: string;
```

- *Type:* string

The AWS account into which this stack will be deployed.

This value is resolved according to the following rules:

1. The value provided to `env.account` when the stack is defined. This can
    either be a concerete account (e.g. `585695031111`) or the
    `Aws.accountId` token.
3. `Aws.accountId`, which represents the CloudFormation intrinsic reference
    `{ "Ref": "AWS::AccountId" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concerete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.account)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **account-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.property.availabilityZones"></a>

```typescript
public readonly availabilityZones: string[];
```

- *Type:* string[]

Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack.

If the stack is environment-agnostic (either account and/or region are
tokens), this property will return an array with 2 tokens that will resolve
at deploy-time to the first two availability zones returned from CloudFormation's
`Fn::GetAZs` intrinsic function.

If they are not available in the context, returns a set of dummy values and
reports them as missing, and let the CLI resolve them by calling EC2
`DescribeAvailabilityZones` on the target environment.

To specify a different strategy for selecting availability zones override this method.

---

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.property.environment"></a>

```typescript
public readonly environment: string;
```

- *Type:* string

The environment coordinates in which this stack is deployed.

In the form
`aws://account/region`. Use `stack.account` and `stack.region` to obtain
the specific values, no need to parse.

You can use this value to determine if two stacks are targeting the same
environment.

If either `stack.account` or `stack.region` are not concrete values (e.g.
`Aws.account` or `Aws.region`) the special strings `unknown-account` and/or
`unknown-region` will be used respectively to indicate this stack is
region/account-agnostic.

---

##### `nested`<sup>Required</sup> <a name="nested" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

The AWS region into which this stack will be deployed (e.g. `us-west-2`).

This value is resolved according to the following rules:

1. The value provided to `env.region` when the stack is defined. This can
    either be a concerete region (e.g. `us-west-2`) or the `Aws.region`
    token.
3. `Aws.region`, which is represents the CloudFormation intrinsic reference
    `{ "Ref": "AWS::Region" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concerete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.region)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **region-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `stackId`<sup>Required</sup> <a name="stackId" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.property.stackId"></a>

```typescript
public readonly stackId: string;
```

- *Type:* string

The ID of the stack.

---

*Example*

```typescript
// After resolving, looks like
'arn:aws:cloudformation:us-west-2:123456789012:stack/teststack/51af3dc0-da77-11e4-872e-1234567db123'
```


##### `stackName`<sup>Required</sup> <a name="stackName" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string

The concrete CloudFormation physical stack name.

This is either the name defined explicitly in the `stackName` prop or
allocated based on the stack's location in the construct tree. Stacks that
are directly defined under the app use their construct `id` as their stack
name. Stacks that are defined deeper within the tree will use a hashed naming
scheme based on the construct path to ensure uniqueness.

If you wish to obtain the deploy-time AWS::StackName intrinsic,
you can use `Aws.stackName` directly.

---

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Optional</sup> <a name="terminationProtection" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---

##### `parameterExportOptions`<sup>Required</sup> <a name="parameterExportOptions" id="truemark-cdk-lib.aws_codepipeline.ExportedStack.property.parameterExportOptions"></a>

```typescript
public readonly parameterExportOptions: ParameterStoreOptions;
```

- *Type:* truemark-cdk-lib.aws_ssm.ParameterStoreOptions

---


### ExtendedAlarm <a name="ExtendedAlarm" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm"></a>

Adds convenience properties and methods to Alarm.

#### Initializers <a name="Initializers" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.Initializer"></a>

```typescript
import { aws_cloudwatch } from 'truemark-cdk-lib'

new aws_cloudwatch.ExtendedAlarm(scope: Construct, id: string, props: ExtendedAlarmProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.Initializer.parameter.props">props</a></code> | <code>truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.Initializer.parameter.props"></a>

- *Type:* truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.addAlarmAction">addAlarmAction</a></code> | Trigger this action if the alarm fires. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.addInsufficientDataAction">addInsufficientDataAction</a></code> | Trigger this action if there is insufficient data to evaluate the alarm. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.addOkAction">addOkAction</a></code> | Trigger this action if the alarm returns from breaching state into ok state. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.renderAlarmRule">renderAlarmRule</a></code> | AlarmRule indicating ALARM state for Alarm. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.toAnnotation">toAnnotation</a></code> | Turn this alarm into a horizontal annotation. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.addAlarmTopic">addAlarmTopic</a></code> | Convenience method for adding SNS topics as alarm actions. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.addInsufficientDataTopic">addInsufficientDataTopic</a></code> | Convenience method for adding SNS topics as insufficient data actions. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.addOkTopic">addOkTopic</a></code> | Convenience method for adding SNS topics as ok actions. |

---

##### `toString` <a name="toString" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `addAlarmAction` <a name="addAlarmAction" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.addAlarmAction"></a>

```typescript
public addAlarmAction(actions: IAlarmAction): void
```

Trigger this action if the alarm fires.

Typically the ARN of an SNS topic or ARN of an AutoScaling policy.

###### `actions`<sup>Required</sup> <a name="actions" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.addAlarmAction.parameter.actions"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction

---

##### `addInsufficientDataAction` <a name="addInsufficientDataAction" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.addInsufficientDataAction"></a>

```typescript
public addInsufficientDataAction(actions: IAlarmAction): void
```

Trigger this action if there is insufficient data to evaluate the alarm.

Typically the ARN of an SNS topic or ARN of an AutoScaling policy.

###### `actions`<sup>Required</sup> <a name="actions" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.addInsufficientDataAction.parameter.actions"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction

---

##### `addOkAction` <a name="addOkAction" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.addOkAction"></a>

```typescript
public addOkAction(actions: IAlarmAction): void
```

Trigger this action if the alarm returns from breaching state into ok state.

Typically the ARN of an SNS topic or ARN of an AutoScaling policy.

###### `actions`<sup>Required</sup> <a name="actions" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.addOkAction.parameter.actions"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction

---

##### `renderAlarmRule` <a name="renderAlarmRule" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.renderAlarmRule"></a>

```typescript
public renderAlarmRule(): string
```

AlarmRule indicating ALARM state for Alarm.

##### `toAnnotation` <a name="toAnnotation" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.toAnnotation"></a>

```typescript
public toAnnotation(): HorizontalAnnotation
```

Turn this alarm into a horizontal annotation.

This is useful if you want to represent an Alarm in a non-AlarmWidget.
An `AlarmWidget` can directly show an alarm, but it can only show a
single alarm and no other metrics. Instead, you can convert the alarm to
a HorizontalAnnotation and add it as an annotation to another graph.

This might be useful if:

- You want to show multiple alarms inside a single graph, for example if
   you have both a "small margin/long period" alarm as well as a
   "large margin/short period" alarm.

- You want to show an Alarm line in a graph with multiple metrics in it.

##### `addAlarmTopic` <a name="addAlarmTopic" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.addAlarmTopic"></a>

```typescript
public addAlarmTopic(topics: ITopic): void
```

Convenience method for adding SNS topics as alarm actions.

###### `topics`<sup>Required</sup> <a name="topics" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.addAlarmTopic.parameter.topics"></a>

- *Type:* aws-cdk-lib.aws_sns.ITopic

the topics to notify.

---

##### `addInsufficientDataTopic` <a name="addInsufficientDataTopic" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.addInsufficientDataTopic"></a>

```typescript
public addInsufficientDataTopic(topics: ITopic): void
```

Convenience method for adding SNS topics as insufficient data actions.

###### `topics`<sup>Required</sup> <a name="topics" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.addInsufficientDataTopic.parameter.topics"></a>

- *Type:* aws-cdk-lib.aws_sns.ITopic

the topics to notify.

---

##### `addOkTopic` <a name="addOkTopic" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.addOkTopic"></a>

```typescript
public addOkTopic(topics: ITopic): void
```

Convenience method for adding SNS topics as ok actions.

###### `topics`<sup>Required</sup> <a name="topics" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.addOkTopic.parameter.topics"></a>

- *Type:* aws-cdk-lib.aws_sns.ITopic

the topics to notify.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.fromAlarmArn">fromAlarmArn</a></code> | Import an existing CloudWatch alarm provided an ARN. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.isConstruct"></a>

```typescript
import { aws_cloudwatch } from 'truemark-cdk-lib'

aws_cloudwatch.ExtendedAlarm.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isResource` <a name="isResource" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.isResource"></a>

```typescript
import { aws_cloudwatch } from 'truemark-cdk-lib'

aws_cloudwatch.ExtendedAlarm.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `fromAlarmArn` <a name="fromAlarmArn" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.fromAlarmArn"></a>

```typescript
import { aws_cloudwatch } from 'truemark-cdk-lib'

aws_cloudwatch.ExtendedAlarm.fromAlarmArn(scope: Construct, id: string, alarmArn: string)
```

Import an existing CloudWatch alarm provided an ARN.

###### `scope`<sup>Required</sup> <a name="scope" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.fromAlarmArn.parameter.scope"></a>

- *Type:* constructs.Construct

The parent creating construct (usually `this`).

---

###### `id`<sup>Required</sup> <a name="id" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.fromAlarmArn.parameter.id"></a>

- *Type:* string

The construct's name.

---

###### `alarmArn`<sup>Required</sup> <a name="alarmArn" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.fromAlarmArn.parameter.alarmArn"></a>

- *Type:* string

Alarm ARN (i.e. arn:aws:cloudwatch:<region>:<account-id>:alarm:Foo).

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.property.alarmArn">alarmArn</a></code> | <code>string</code> | ARN of this alarm. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.property.alarmName">alarmName</a></code> | <code>string</code> | Name of this alarm. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.property.metric">metric</a></code> | <code>aws-cdk-lib.aws_cloudwatch.IMetric</code> | The metric object this alarm was based on. |

---

##### `node`<sup>Required</sup> <a name="node" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `alarmArn`<sup>Required</sup> <a name="alarmArn" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.property.alarmArn"></a>

```typescript
public readonly alarmArn: string;
```

- *Type:* string

ARN of this alarm.

---

##### `alarmName`<sup>Required</sup> <a name="alarmName" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.property.alarmName"></a>

```typescript
public readonly alarmName: string;
```

- *Type:* string

Name of this alarm.

---

##### `metric`<sup>Required</sup> <a name="metric" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm.property.metric"></a>

```typescript
public readonly metric: IMetric;
```

- *Type:* aws-cdk-lib.aws_cloudwatch.IMetric

The metric object this alarm was based on.

---


### LatencyARecord <a name="LatencyARecord" id="truemark-cdk-lib.aws_route53.LatencyARecord"></a>

An extended ARecord that performs latency based routing.

#### Initializers <a name="Initializers" id="truemark-cdk-lib.aws_route53.LatencyARecord.Initializer"></a>

```typescript
import { aws_route53 } from 'truemark-cdk-lib'

new aws_route53.LatencyARecord(scope: Construct, id: string, props: LatencyARecordProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_route53.LatencyARecord.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_route53.LatencyARecord.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_route53.LatencyARecord.Initializer.parameter.props">props</a></code> | <code>truemark-cdk-lib.aws_route53.LatencyARecordProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="truemark-cdk-lib.aws_route53.LatencyARecord.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="truemark-cdk-lib.aws_route53.LatencyARecord.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="truemark-cdk-lib.aws_route53.LatencyARecord.Initializer.parameter.props"></a>

- *Type:* truemark-cdk-lib.aws_route53.LatencyARecordProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_route53.LatencyARecord.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#truemark-cdk-lib.aws_route53.LatencyARecord.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |

---

##### `toString` <a name="toString" id="truemark-cdk-lib.aws_route53.LatencyARecord.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="truemark-cdk-lib.aws_route53.LatencyARecord.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="truemark-cdk-lib.aws_route53.LatencyARecord.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_route53.LatencyARecord.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#truemark-cdk-lib.aws_route53.LatencyARecord.isResource">isResource</a></code> | Check whether the given construct is a Resource. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="truemark-cdk-lib.aws_route53.LatencyARecord.isConstruct"></a>

```typescript
import { aws_route53 } from 'truemark-cdk-lib'

aws_route53.LatencyARecord.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="truemark-cdk-lib.aws_route53.LatencyARecord.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isResource` <a name="isResource" id="truemark-cdk-lib.aws_route53.LatencyARecord.isResource"></a>

```typescript
import { aws_route53 } from 'truemark-cdk-lib'

aws_route53.LatencyARecord.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="truemark-cdk-lib.aws_route53.LatencyARecord.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_route53.LatencyARecord.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#truemark-cdk-lib.aws_route53.LatencyARecord.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#truemark-cdk-lib.aws_route53.LatencyARecord.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#truemark-cdk-lib.aws_route53.LatencyARecord.property.domainName">domainName</a></code> | <code>string</code> | The domain name of the record. |

---

##### `node`<sup>Required</sup> <a name="node" id="truemark-cdk-lib.aws_route53.LatencyARecord.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="truemark-cdk-lib.aws_route53.LatencyARecord.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="truemark-cdk-lib.aws_route53.LatencyARecord.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `domainName`<sup>Required</sup> <a name="domainName" id="truemark-cdk-lib.aws_route53.LatencyARecord.property.domainName"></a>

```typescript
public readonly domainName: string;
```

- *Type:* string

The domain name of the record.

---


### LogMetricAlarm <a name="LogMetricAlarm" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm"></a>

- *Implements:* aws-cdk-lib.aws_cloudwatch.IAlarm

CloudWatch alarm that matches patterns on a LogGroup.

This class is a higher-level
construct than LogMetricAlarm and will create the filter and metric.

#### Initializers <a name="Initializers" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.Initializer"></a>

```typescript
import { aws_cloudwatch } from 'truemark-cdk-lib'

new aws_cloudwatch.LogMetricAlarm(scope: Construct, id: string, props: LogMetricAlarmProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.Initializer.parameter.props">props</a></code> | <code>truemark-cdk-lib.aws_cloudwatch.LogMetricAlarmProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.Initializer.parameter.props"></a>

- *Type:* truemark-cdk-lib.aws_cloudwatch.LogMetricAlarmProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.addAlarmAction">addAlarmAction</a></code> | Trigger actions if the alarm fires. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.addAlarmTopic">addAlarmTopic</a></code> | Notify SNS topics if the alarm fires. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.addInsufficientDataAction">addInsufficientDataAction</a></code> | Trigger actions if there is insufficient data to evaluate the alarm. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.addInsufficientDataTopic">addInsufficientDataTopic</a></code> | Notify SNS topics if there is insufficient data to evaluate the alarm. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.addOkAction">addOkAction</a></code> | Trigger actions if the alarm returns from breaching a state into an ok state. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.addOkTopic">addOkTopic</a></code> | Notify SNS topics if the alarm returns from breaching a state into an ok state. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.renderAlarmRule">renderAlarmRule</a></code> | serialized representation of Alarm Rule to be used when building the Composite Alarm resource. |

---

##### `toString` <a name="toString" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addAlarmAction` <a name="addAlarmAction" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.addAlarmAction"></a>

```typescript
public addAlarmAction(actions: IAlarmAction): void
```

Trigger actions if the alarm fires.

###### `actions`<sup>Required</sup> <a name="actions" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.addAlarmAction.parameter.actions"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction

the actions to trigger.

---

##### `addAlarmTopic` <a name="addAlarmTopic" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.addAlarmTopic"></a>

```typescript
public addAlarmTopic(topics: ITopic): void
```

Notify SNS topics if the alarm fires.

###### `topics`<sup>Required</sup> <a name="topics" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.addAlarmTopic.parameter.topics"></a>

- *Type:* aws-cdk-lib.aws_sns.ITopic

the topics to notify.

---

##### `addInsufficientDataAction` <a name="addInsufficientDataAction" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.addInsufficientDataAction"></a>

```typescript
public addInsufficientDataAction(actions: IAlarmAction): void
```

Trigger actions if there is insufficient data to evaluate the alarm.

###### `actions`<sup>Required</sup> <a name="actions" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.addInsufficientDataAction.parameter.actions"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction

the actions to trigger.

---

##### `addInsufficientDataTopic` <a name="addInsufficientDataTopic" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.addInsufficientDataTopic"></a>

```typescript
public addInsufficientDataTopic(topics: ITopic): void
```

Notify SNS topics if there is insufficient data to evaluate the alarm.

###### `topics`<sup>Required</sup> <a name="topics" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.addInsufficientDataTopic.parameter.topics"></a>

- *Type:* aws-cdk-lib.aws_sns.ITopic

the topics to notify.

---

##### `addOkAction` <a name="addOkAction" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.addOkAction"></a>

```typescript
public addOkAction(actions: IAlarmAction): void
```

Trigger actions if the alarm returns from breaching a state into an ok state.

###### `actions`<sup>Required</sup> <a name="actions" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.addOkAction.parameter.actions"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction

the actions to trigger.

---

##### `addOkTopic` <a name="addOkTopic" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.addOkTopic"></a>

```typescript
public addOkTopic(topics: ITopic): void
```

Notify SNS topics if the alarm returns from breaching a state into an ok state.

###### `topics`<sup>Required</sup> <a name="topics" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.addOkTopic.parameter.topics"></a>

- *Type:* aws-cdk-lib.aws_sns.ITopic

the topics to notify.

---

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `renderAlarmRule` <a name="renderAlarmRule" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.renderAlarmRule"></a>

```typescript
public renderAlarmRule(): string
```

serialized representation of Alarm Rule to be used when building the Composite Alarm resource.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.isConstruct"></a>

```typescript
import { aws_cloudwatch } from 'truemark-cdk-lib'

aws_cloudwatch.LogMetricAlarm.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.property.alarm">alarm</a></code> | <code>aws-cdk-lib.aws_cloudwatch.Alarm</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.property.alarmArn">alarmArn</a></code> | <code>string</code> | Alarm ARN (i.e. arn:aws:cloudwatch:<region>:<account-id>:alarm:Foo). |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.property.alarmName">alarmName</a></code> | <code>string</code> | Name of the alarm. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.property.filter">filter</a></code> | <code>truemark-cdk-lib.aws_cloudwatch.LogMetricFilter</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.property.metric">metric</a></code> | <code>aws-cdk-lib.aws_cloudwatch.Metric</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |

---

##### `node`<sup>Required</sup> <a name="node" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `alarm`<sup>Required</sup> <a name="alarm" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.property.alarm"></a>

```typescript
public readonly alarm: Alarm;
```

- *Type:* aws-cdk-lib.aws_cloudwatch.Alarm

---

##### `alarmArn`<sup>Required</sup> <a name="alarmArn" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.property.alarmArn"></a>

```typescript
public readonly alarmArn: string;
```

- *Type:* string

Alarm ARN (i.e. arn:aws:cloudwatch:<region>:<account-id>:alarm:Foo).

---

##### `alarmName`<sup>Required</sup> <a name="alarmName" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.property.alarmName"></a>

```typescript
public readonly alarmName: string;
```

- *Type:* string

Name of the alarm.

---

##### `env`<sup>Required</sup> <a name="env" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `filter`<sup>Required</sup> <a name="filter" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.property.filter"></a>

```typescript
public readonly filter: LogMetricFilter;
```

- *Type:* truemark-cdk-lib.aws_cloudwatch.LogMetricFilter

---

##### `metric`<sup>Required</sup> <a name="metric" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.property.metric"></a>

```typescript
public readonly metric: Metric;
```

- *Type:* aws-cdk-lib.aws_cloudwatch.Metric

---

##### `stack`<sup>Required</sup> <a name="stack" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarm.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---


### LogMetricFilter <a name="LogMetricFilter" id="truemark-cdk-lib.aws_cloudwatch.LogMetricFilter"></a>

MetricFilter that counts the number of records matching the provided pattern.

#### Initializers <a name="Initializers" id="truemark-cdk-lib.aws_cloudwatch.LogMetricFilter.Initializer"></a>

```typescript
import { aws_cloudwatch } from 'truemark-cdk-lib'

new aws_cloudwatch.LogMetricFilter(scope: Construct, id: string, props: LogMetricFilterProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricFilter.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricFilter.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricFilter.Initializer.parameter.props">props</a></code> | <code>truemark-cdk-lib.aws_cloudwatch.LogMetricFilterProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="truemark-cdk-lib.aws_cloudwatch.LogMetricFilter.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="truemark-cdk-lib.aws_cloudwatch.LogMetricFilter.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="truemark-cdk-lib.aws_cloudwatch.LogMetricFilter.Initializer.parameter.props"></a>

- *Type:* truemark-cdk-lib.aws_cloudwatch.LogMetricFilterProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricFilter.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricFilter.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricFilter.metric">metric</a></code> | Return the given named metric for this Metric Filter. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricFilter.sumMetric">sumMetric</a></code> | Returns the sum metric for this filter. |

---

##### `toString` <a name="toString" id="truemark-cdk-lib.aws_cloudwatch.LogMetricFilter.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="truemark-cdk-lib.aws_cloudwatch.LogMetricFilter.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="truemark-cdk-lib.aws_cloudwatch.LogMetricFilter.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `metric` <a name="metric" id="truemark-cdk-lib.aws_cloudwatch.LogMetricFilter.metric"></a>

```typescript
public metric(props?: MetricOptions): Metric
```

Return the given named metric for this Metric Filter.

###### `props`<sup>Optional</sup> <a name="props" id="truemark-cdk-lib.aws_cloudwatch.LogMetricFilter.metric.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `sumMetric` <a name="sumMetric" id="truemark-cdk-lib.aws_cloudwatch.LogMetricFilter.sumMetric"></a>

```typescript
public sumMetric(period?: Duration): Metric
```

Returns the sum metric for this filter.

###### `period`<sup>Optional</sup> <a name="period" id="truemark-cdk-lib.aws_cloudwatch.LogMetricFilter.sumMetric.parameter.period"></a>

- *Type:* aws-cdk-lib.Duration

the period over which statistics are applied (default is 5 minutes).

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricFilter.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricFilter.isResource">isResource</a></code> | Check whether the given construct is a Resource. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="truemark-cdk-lib.aws_cloudwatch.LogMetricFilter.isConstruct"></a>

```typescript
import { aws_cloudwatch } from 'truemark-cdk-lib'

aws_cloudwatch.LogMetricFilter.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="truemark-cdk-lib.aws_cloudwatch.LogMetricFilter.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isResource` <a name="isResource" id="truemark-cdk-lib.aws_cloudwatch.LogMetricFilter.isResource"></a>

```typescript
import { aws_cloudwatch } from 'truemark-cdk-lib'

aws_cloudwatch.LogMetricFilter.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="truemark-cdk-lib.aws_cloudwatch.LogMetricFilter.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricFilter.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricFilter.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricFilter.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |

---

##### `node`<sup>Required</sup> <a name="node" id="truemark-cdk-lib.aws_cloudwatch.LogMetricFilter.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="truemark-cdk-lib.aws_cloudwatch.LogMetricFilter.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="truemark-cdk-lib.aws_cloudwatch.LogMetricFilter.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---


### MetricAlarmBase <a name="MetricAlarmBase" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase"></a>

- *Implements:* aws-cdk-lib.aws_cloudwatch.IAlarm

#### Initializers <a name="Initializers" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.Initializer"></a>

```typescript
import { aws_cloudwatch } from 'truemark-cdk-lib'

new aws_cloudwatch.MetricAlarmBase(scope: Construct, id: string, props: MetricAlarmBaseProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.Initializer.parameter.props">props</a></code> | <code>truemark-cdk-lib.aws_cloudwatch.MetricAlarmBaseProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.Initializer.parameter.props"></a>

- *Type:* truemark-cdk-lib.aws_cloudwatch.MetricAlarmBaseProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.addAlarmAction">addAlarmAction</a></code> | Trigger actions if the alarm fires. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.addAlarmTopic">addAlarmTopic</a></code> | Notify SNS topics if the alarm fires. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.addInsufficientDataAction">addInsufficientDataAction</a></code> | Trigger actions if there is insufficient data to evaluate the alarm. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.addInsufficientDataTopic">addInsufficientDataTopic</a></code> | Notify SNS topics if there is insufficient data to evaluate the alarm. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.addOkAction">addOkAction</a></code> | Trigger actions if the alarm returns from breaching a state into an ok state. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.addOkTopic">addOkTopic</a></code> | Notify SNS topics if the alarm returns from breaching a state into an ok state. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.renderAlarmRule">renderAlarmRule</a></code> | serialized representation of Alarm Rule to be used when building the Composite Alarm resource. |

---

##### `toString` <a name="toString" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addAlarmAction` <a name="addAlarmAction" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.addAlarmAction"></a>

```typescript
public addAlarmAction(actions: IAlarmAction): void
```

Trigger actions if the alarm fires.

###### `actions`<sup>Required</sup> <a name="actions" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.addAlarmAction.parameter.actions"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction

the actions to trigger.

---

##### `addAlarmTopic` <a name="addAlarmTopic" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.addAlarmTopic"></a>

```typescript
public addAlarmTopic(topics: ITopic): void
```

Notify SNS topics if the alarm fires.

###### `topics`<sup>Required</sup> <a name="topics" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.addAlarmTopic.parameter.topics"></a>

- *Type:* aws-cdk-lib.aws_sns.ITopic

the topics to notify.

---

##### `addInsufficientDataAction` <a name="addInsufficientDataAction" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.addInsufficientDataAction"></a>

```typescript
public addInsufficientDataAction(actions: IAlarmAction): void
```

Trigger actions if there is insufficient data to evaluate the alarm.

###### `actions`<sup>Required</sup> <a name="actions" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.addInsufficientDataAction.parameter.actions"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction

the actions to trigger.

---

##### `addInsufficientDataTopic` <a name="addInsufficientDataTopic" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.addInsufficientDataTopic"></a>

```typescript
public addInsufficientDataTopic(topics: ITopic): void
```

Notify SNS topics if there is insufficient data to evaluate the alarm.

###### `topics`<sup>Required</sup> <a name="topics" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.addInsufficientDataTopic.parameter.topics"></a>

- *Type:* aws-cdk-lib.aws_sns.ITopic

the topics to notify.

---

##### `addOkAction` <a name="addOkAction" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.addOkAction"></a>

```typescript
public addOkAction(actions: IAlarmAction): void
```

Trigger actions if the alarm returns from breaching a state into an ok state.

###### `actions`<sup>Required</sup> <a name="actions" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.addOkAction.parameter.actions"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction

the actions to trigger.

---

##### `addOkTopic` <a name="addOkTopic" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.addOkTopic"></a>

```typescript
public addOkTopic(topics: ITopic): void
```

Notify SNS topics if the alarm returns from breaching a state into an ok state.

###### `topics`<sup>Required</sup> <a name="topics" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.addOkTopic.parameter.topics"></a>

- *Type:* aws-cdk-lib.aws_sns.ITopic

the topics to notify.

---

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `renderAlarmRule` <a name="renderAlarmRule" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.renderAlarmRule"></a>

```typescript
public renderAlarmRule(): string
```

serialized representation of Alarm Rule to be used when building the Composite Alarm resource.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.isConstruct"></a>

```typescript
import { aws_cloudwatch } from 'truemark-cdk-lib'

aws_cloudwatch.MetricAlarmBase.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.property.alarm">alarm</a></code> | <code>truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.property.alarmArn">alarmArn</a></code> | <code>string</code> | Alarm ARN (i.e. arn:aws:cloudwatch:<region>:<account-id>:alarm:Foo). |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.property.alarmName">alarmName</a></code> | <code>string</code> | Name of the alarm. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.property.metric">metric</a></code> | <code>aws-cdk-lib.aws_cloudwatch.Metric</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |

---

##### `node`<sup>Required</sup> <a name="node" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `alarm`<sup>Required</sup> <a name="alarm" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.property.alarm"></a>

```typescript
public readonly alarm: ExtendedAlarm;
```

- *Type:* truemark-cdk-lib.aws_cloudwatch.ExtendedAlarm

---

##### `alarmArn`<sup>Required</sup> <a name="alarmArn" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.property.alarmArn"></a>

```typescript
public readonly alarmArn: string;
```

- *Type:* string

Alarm ARN (i.e. arn:aws:cloudwatch:<region>:<account-id>:alarm:Foo).

---

##### `alarmName`<sup>Required</sup> <a name="alarmName" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.property.alarmName"></a>

```typescript
public readonly alarmName: string;
```

- *Type:* string

Name of the alarm.

---

##### `env`<sup>Required</sup> <a name="env" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `metric`<sup>Required</sup> <a name="metric" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.property.metric"></a>

```typescript
public readonly metric: Metric;
```

- *Type:* aws-cdk-lib.aws_cloudwatch.Metric

---

##### `stack`<sup>Required</sup> <a name="stack" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBase.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---


### ObservedTable <a name="ObservedTable" id="truemark-cdk-lib.aws_dynamodb.ObservedTable"></a>

DynamoDB Table with CloudWatch Alarms.

#### Initializers <a name="Initializers" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.Initializer"></a>

```typescript
import { aws_dynamodb } from 'truemark-cdk-lib'

new aws_dynamodb.ObservedTable(scope: Construct, id: string, props: ObservedTableProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.Initializer.parameter.props">props</a></code> | <code>truemark-cdk-lib.aws_dynamodb.ObservedTableProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.Initializer.parameter.props"></a>

- *Type:* truemark-cdk-lib.aws_dynamodb.ObservedTableProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.addGlobalSecondaryIndex">addGlobalSecondaryIndex</a></code> | Add a global secondary index of table. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.addLocalSecondaryIndex">addLocalSecondaryIndex</a></code> | Add a local secondary index of table. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.autoScaleGlobalSecondaryIndexReadCapacity">autoScaleGlobalSecondaryIndexReadCapacity</a></code> | Enable read capacity scaling for the given GSI. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.autoScaleGlobalSecondaryIndexWriteCapacity">autoScaleGlobalSecondaryIndexWriteCapacity</a></code> | Enable write capacity scaling for the given GSI. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.autoScaleReadCapacity">autoScaleReadCapacity</a></code> | Enable read capacity scaling for this table. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.autoScaleWriteCapacity">autoScaleWriteCapacity</a></code> | Enable write capacity scaling for this table. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.grant">grant</a></code> | Adds an IAM policy statement associated with this table to an IAM principal's policy. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.grantFullAccess">grantFullAccess</a></code> | Permits all DynamoDB operations ("dynamodb:*") to an IAM principal. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.grantReadData">grantReadData</a></code> | Permits an IAM principal all data read operations from this table: BatchGetItem, GetRecords, GetShardIterator, Query, GetItem, Scan, DescribeTable. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.grantReadWriteData">grantReadWriteData</a></code> | Permits an IAM principal to all data read/write operations to this table. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.grantStream">grantStream</a></code> | Adds an IAM policy statement associated with this table's stream to an IAM principal's policy. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.grantStreamRead">grantStreamRead</a></code> | Permits an IAM principal all stream data read operations for this table's stream: DescribeStream, GetRecords, GetShardIterator, ListStreams. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.grantTableListStreams">grantTableListStreams</a></code> | Permits an IAM Principal to list streams attached to current dynamodb table. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.grantWriteData">grantWriteData</a></code> | Permits an IAM principal all data write operations to this table: BatchWriteItem, PutItem, UpdateItem, DeleteItem, DescribeTable. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.metric">metric</a></code> | Return the given named metric for this Table. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.metricConditionalCheckFailedRequests">metricConditionalCheckFailedRequests</a></code> | Metric for the conditional check failed requests this table. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.metricConsumedReadCapacityUnits">metricConsumedReadCapacityUnits</a></code> | Metric for the consumed read capacity units this table. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.metricConsumedWriteCapacityUnits">metricConsumedWriteCapacityUnits</a></code> | Metric for the consumed write capacity units this table. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.metricSuccessfulRequestLatency">metricSuccessfulRequestLatency</a></code> | Metric for the successful request latency this table. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.metricSystemErrorsForOperations">metricSystemErrorsForOperations</a></code> | Metric for the system errors this table. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.metricThrottledRequests">metricThrottledRequests</a></code> | How many requests are throttled on this table. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.metricThrottledRequestsForOperation">metricThrottledRequestsForOperation</a></code> | How many requests are throttled on this table, for the given operation. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.metricUserErrors">metricUserErrors</a></code> | Metric for the user errors. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.schema">schema</a></code> | Get schema attributes of table or index. |

---

##### `toString` <a name="toString" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `addGlobalSecondaryIndex` <a name="addGlobalSecondaryIndex" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.addGlobalSecondaryIndex"></a>

```typescript
public addGlobalSecondaryIndex(props: GlobalSecondaryIndexProps): void
```

Add a global secondary index of table.

###### `props`<sup>Required</sup> <a name="props" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.addGlobalSecondaryIndex.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_dynamodb.GlobalSecondaryIndexProps

the property of global secondary index.

---

##### `addLocalSecondaryIndex` <a name="addLocalSecondaryIndex" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.addLocalSecondaryIndex"></a>

```typescript
public addLocalSecondaryIndex(props: LocalSecondaryIndexProps): void
```

Add a local secondary index of table.

###### `props`<sup>Required</sup> <a name="props" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.addLocalSecondaryIndex.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_dynamodb.LocalSecondaryIndexProps

the property of local secondary index.

---

##### `autoScaleGlobalSecondaryIndexReadCapacity` <a name="autoScaleGlobalSecondaryIndexReadCapacity" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.autoScaleGlobalSecondaryIndexReadCapacity"></a>

```typescript
public autoScaleGlobalSecondaryIndexReadCapacity(indexName: string, props: EnableScalingProps): IScalableTableAttribute
```

Enable read capacity scaling for the given GSI.

###### `indexName`<sup>Required</sup> <a name="indexName" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.autoScaleGlobalSecondaryIndexReadCapacity.parameter.indexName"></a>

- *Type:* string

---

###### `props`<sup>Required</sup> <a name="props" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.autoScaleGlobalSecondaryIndexReadCapacity.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_dynamodb.EnableScalingProps

---

##### `autoScaleGlobalSecondaryIndexWriteCapacity` <a name="autoScaleGlobalSecondaryIndexWriteCapacity" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.autoScaleGlobalSecondaryIndexWriteCapacity"></a>

```typescript
public autoScaleGlobalSecondaryIndexWriteCapacity(indexName: string, props: EnableScalingProps): IScalableTableAttribute
```

Enable write capacity scaling for the given GSI.

###### `indexName`<sup>Required</sup> <a name="indexName" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.autoScaleGlobalSecondaryIndexWriteCapacity.parameter.indexName"></a>

- *Type:* string

---

###### `props`<sup>Required</sup> <a name="props" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.autoScaleGlobalSecondaryIndexWriteCapacity.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_dynamodb.EnableScalingProps

---

##### `autoScaleReadCapacity` <a name="autoScaleReadCapacity" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.autoScaleReadCapacity"></a>

```typescript
public autoScaleReadCapacity(props: EnableScalingProps): IScalableTableAttribute
```

Enable read capacity scaling for this table.

###### `props`<sup>Required</sup> <a name="props" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.autoScaleReadCapacity.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_dynamodb.EnableScalingProps

---

##### `autoScaleWriteCapacity` <a name="autoScaleWriteCapacity" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.autoScaleWriteCapacity"></a>

```typescript
public autoScaleWriteCapacity(props: EnableScalingProps): IScalableTableAttribute
```

Enable write capacity scaling for this table.

###### `props`<sup>Required</sup> <a name="props" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.autoScaleWriteCapacity.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_dynamodb.EnableScalingProps

---

##### `grant` <a name="grant" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.grant"></a>

```typescript
public grant(grantee: IGrantable, actions: string): Grant
```

Adds an IAM policy statement associated with this table to an IAM principal's policy.

If `encryptionKey` is present, appropriate grants to the key needs to be added
separately using the `table.encryptionKey.grant*` methods.

###### `grantee`<sup>Required</sup> <a name="grantee" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.grant.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

The principal (no-op if undefined).

---

###### `actions`<sup>Required</sup> <a name="actions" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.grant.parameter.actions"></a>

- *Type:* string

The set of actions to allow (i.e. "dynamodb:PutItem", "dynamodb:GetItem", ...).

---

##### `grantFullAccess` <a name="grantFullAccess" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.grantFullAccess"></a>

```typescript
public grantFullAccess(grantee: IGrantable): Grant
```

Permits all DynamoDB operations ("dynamodb:*") to an IAM principal.

Appropriate grants will also be added to the customer-managed KMS key
if one was configured.

###### `grantee`<sup>Required</sup> <a name="grantee" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.grantFullAccess.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

The principal to grant access to.

---

##### `grantReadData` <a name="grantReadData" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.grantReadData"></a>

```typescript
public grantReadData(grantee: IGrantable): Grant
```

Permits an IAM principal all data read operations from this table: BatchGetItem, GetRecords, GetShardIterator, Query, GetItem, Scan, DescribeTable.

Appropriate grants will also be added to the customer-managed KMS key
if one was configured.

###### `grantee`<sup>Required</sup> <a name="grantee" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.grantReadData.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

The principal to grant access to.

---

##### `grantReadWriteData` <a name="grantReadWriteData" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.grantReadWriteData"></a>

```typescript
public grantReadWriteData(grantee: IGrantable): Grant
```

Permits an IAM principal to all data read/write operations to this table.

BatchGetItem, GetRecords, GetShardIterator, Query, GetItem, Scan,
BatchWriteItem, PutItem, UpdateItem, DeleteItem, DescribeTable

Appropriate grants will also be added to the customer-managed KMS key
if one was configured.

###### `grantee`<sup>Required</sup> <a name="grantee" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.grantReadWriteData.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

The principal to grant access to.

---

##### `grantStream` <a name="grantStream" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.grantStream"></a>

```typescript
public grantStream(grantee: IGrantable, actions: string): Grant
```

Adds an IAM policy statement associated with this table's stream to an IAM principal's policy.

If `encryptionKey` is present, appropriate grants to the key needs to be added
separately using the `table.encryptionKey.grant*` methods.

###### `grantee`<sup>Required</sup> <a name="grantee" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.grantStream.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

The principal (no-op if undefined).

---

###### `actions`<sup>Required</sup> <a name="actions" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.grantStream.parameter.actions"></a>

- *Type:* string

The set of actions to allow (i.e. "dynamodb:DescribeStream", "dynamodb:GetRecords", ...).

---

##### `grantStreamRead` <a name="grantStreamRead" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.grantStreamRead"></a>

```typescript
public grantStreamRead(grantee: IGrantable): Grant
```

Permits an IAM principal all stream data read operations for this table's stream: DescribeStream, GetRecords, GetShardIterator, ListStreams.

Appropriate grants will also be added to the customer-managed KMS key
if one was configured.

###### `grantee`<sup>Required</sup> <a name="grantee" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.grantStreamRead.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

The principal to grant access to.

---

##### `grantTableListStreams` <a name="grantTableListStreams" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.grantTableListStreams"></a>

```typescript
public grantTableListStreams(grantee: IGrantable): Grant
```

Permits an IAM Principal to list streams attached to current dynamodb table.

###### `grantee`<sup>Required</sup> <a name="grantee" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.grantTableListStreams.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

The principal (no-op if undefined).

---

##### `grantWriteData` <a name="grantWriteData" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.grantWriteData"></a>

```typescript
public grantWriteData(grantee: IGrantable): Grant
```

Permits an IAM principal all data write operations to this table: BatchWriteItem, PutItem, UpdateItem, DeleteItem, DescribeTable.

Appropriate grants will also be added to the customer-managed KMS key
if one was configured.

###### `grantee`<sup>Required</sup> <a name="grantee" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.grantWriteData.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

The principal to grant access to.

---

##### `metric` <a name="metric" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.metric"></a>

```typescript
public metric(metricName: string, props?: MetricOptions): Metric
```

Return the given named metric for this Table.

By default, the metric will be calculated as a sum over a period of 5 minutes.
You can customize this by using the `statistic` and `period` properties.

###### `metricName`<sup>Required</sup> <a name="metricName" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.metric.parameter.metricName"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.metric.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricConditionalCheckFailedRequests` <a name="metricConditionalCheckFailedRequests" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.metricConditionalCheckFailedRequests"></a>

```typescript
public metricConditionalCheckFailedRequests(props?: MetricOptions): Metric
```

Metric for the conditional check failed requests this table.

By default, the metric will be calculated as a sum over a period of 5 minutes.
You can customize this by using the `statistic` and `period` properties.

###### `props`<sup>Optional</sup> <a name="props" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.metricConditionalCheckFailedRequests.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricConsumedReadCapacityUnits` <a name="metricConsumedReadCapacityUnits" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.metricConsumedReadCapacityUnits"></a>

```typescript
public metricConsumedReadCapacityUnits(props?: MetricOptions): Metric
```

Metric for the consumed read capacity units this table.

By default, the metric will be calculated as a sum over a period of 5 minutes.
You can customize this by using the `statistic` and `period` properties.

###### `props`<sup>Optional</sup> <a name="props" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.metricConsumedReadCapacityUnits.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricConsumedWriteCapacityUnits` <a name="metricConsumedWriteCapacityUnits" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.metricConsumedWriteCapacityUnits"></a>

```typescript
public metricConsumedWriteCapacityUnits(props?: MetricOptions): Metric
```

Metric for the consumed write capacity units this table.

By default, the metric will be calculated as a sum over a period of 5 minutes.
You can customize this by using the `statistic` and `period` properties.

###### `props`<sup>Optional</sup> <a name="props" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.metricConsumedWriteCapacityUnits.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricSuccessfulRequestLatency` <a name="metricSuccessfulRequestLatency" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.metricSuccessfulRequestLatency"></a>

```typescript
public metricSuccessfulRequestLatency(props?: MetricOptions): Metric
```

Metric for the successful request latency this table.

By default, the metric will be calculated as an average over a period of 5 minutes.
You can customize this by using the `statistic` and `period` properties.

###### `props`<sup>Optional</sup> <a name="props" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.metricSuccessfulRequestLatency.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricSystemErrorsForOperations` <a name="metricSystemErrorsForOperations" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.metricSystemErrorsForOperations"></a>

```typescript
public metricSystemErrorsForOperations(props?: SystemErrorsForOperationsMetricOptions): IMetric
```

Metric for the system errors this table.

This will sum errors across all possible operations.
Note that by default, each individual metric will be calculated as a sum over a period of 5 minutes.
You can customize this by using the `statistic` and `period` properties.

###### `props`<sup>Optional</sup> <a name="props" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.metricSystemErrorsForOperations.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_dynamodb.SystemErrorsForOperationsMetricOptions

---

##### ~~`metricThrottledRequests`~~ <a name="metricThrottledRequests" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.metricThrottledRequests"></a>

```typescript
public metricThrottledRequests(props?: MetricOptions): Metric
```

How many requests are throttled on this table.

Default: sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.metricThrottledRequests.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricThrottledRequestsForOperation` <a name="metricThrottledRequestsForOperation" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.metricThrottledRequestsForOperation"></a>

```typescript
public metricThrottledRequestsForOperation(operation: string, props?: MetricOptions): Metric
```

How many requests are throttled on this table, for the given operation.

Default: sum over 5 minutes

###### `operation`<sup>Required</sup> <a name="operation" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.metricThrottledRequestsForOperation.parameter.operation"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.metricThrottledRequestsForOperation.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricUserErrors` <a name="metricUserErrors" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.metricUserErrors"></a>

```typescript
public metricUserErrors(props?: MetricOptions): Metric
```

Metric for the user errors.

Note that this metric reports user errors across all
the tables in the account and region the table resides in.

By default, the metric will be calculated as a sum over a period of 5 minutes.
You can customize this by using the `statistic` and `period` properties.

###### `props`<sup>Optional</sup> <a name="props" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.metricUserErrors.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `schema` <a name="schema" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.schema"></a>

```typescript
public schema(indexName?: string): SchemaOptions
```

Get schema attributes of table or index.

###### `indexName`<sup>Optional</sup> <a name="indexName" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.schema.parameter.indexName"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.fromTableArn">fromTableArn</a></code> | Creates a Table construct that represents an external table via table arn. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.fromTableAttributes">fromTableAttributes</a></code> | Creates a Table construct that represents an external table. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.fromTableName">fromTableName</a></code> | Creates a Table construct that represents an external table via table name. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.isConstruct"></a>

```typescript
import { aws_dynamodb } from 'truemark-cdk-lib'

aws_dynamodb.ObservedTable.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isResource` <a name="isResource" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.isResource"></a>

```typescript
import { aws_dynamodb } from 'truemark-cdk-lib'

aws_dynamodb.ObservedTable.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `fromTableArn` <a name="fromTableArn" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.fromTableArn"></a>

```typescript
import { aws_dynamodb } from 'truemark-cdk-lib'

aws_dynamodb.ObservedTable.fromTableArn(scope: Construct, id: string, tableArn: string)
```

Creates a Table construct that represents an external table via table arn.

###### `scope`<sup>Required</sup> <a name="scope" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.fromTableArn.parameter.scope"></a>

- *Type:* constructs.Construct

The parent creating construct (usually `this`).

---

###### `id`<sup>Required</sup> <a name="id" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.fromTableArn.parameter.id"></a>

- *Type:* string

The construct's name.

---

###### `tableArn`<sup>Required</sup> <a name="tableArn" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.fromTableArn.parameter.tableArn"></a>

- *Type:* string

The table's ARN.

---

##### `fromTableAttributes` <a name="fromTableAttributes" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.fromTableAttributes"></a>

```typescript
import { aws_dynamodb } from 'truemark-cdk-lib'

aws_dynamodb.ObservedTable.fromTableAttributes(scope: Construct, id: string, attrs: TableAttributes)
```

Creates a Table construct that represents an external table.

###### `scope`<sup>Required</sup> <a name="scope" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.fromTableAttributes.parameter.scope"></a>

- *Type:* constructs.Construct

The parent creating construct (usually `this`).

---

###### `id`<sup>Required</sup> <a name="id" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.fromTableAttributes.parameter.id"></a>

- *Type:* string

The construct's name.

---

###### `attrs`<sup>Required</sup> <a name="attrs" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.fromTableAttributes.parameter.attrs"></a>

- *Type:* aws-cdk-lib.aws_dynamodb.TableAttributes

A `TableAttributes` object.

---

##### `fromTableName` <a name="fromTableName" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.fromTableName"></a>

```typescript
import { aws_dynamodb } from 'truemark-cdk-lib'

aws_dynamodb.ObservedTable.fromTableName(scope: Construct, id: string, tableName: string)
```

Creates a Table construct that represents an external table via table name.

###### `scope`<sup>Required</sup> <a name="scope" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.fromTableName.parameter.scope"></a>

- *Type:* constructs.Construct

The parent creating construct (usually `this`).

---

###### `id`<sup>Required</sup> <a name="id" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.fromTableName.parameter.id"></a>

- *Type:* string

The construct's name.

---

###### `tableName`<sup>Required</sup> <a name="tableName" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.fromTableName.parameter.tableName"></a>

- *Type:* string

The table's name.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.property.tableArn">tableArn</a></code> | <code>string</code> | Arn of the dynamodb table. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.property.tableName">tableName</a></code> | <code>string</code> | Table name of the dynamodb table. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.property.encryptionKey">encryptionKey</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | KMS encryption key, if this table uses a customer-managed encryption key. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.property.tableStreamArn">tableStreamArn</a></code> | <code>string</code> | ARN of the table's stream, if there is one. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTable.property.tableAlarms">tableAlarms</a></code> | <code>truemark-cdk-lib.aws_dynamodb.TableAlarms</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `tableArn`<sup>Required</sup> <a name="tableArn" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.property.tableArn"></a>

```typescript
public readonly tableArn: string;
```

- *Type:* string

Arn of the dynamodb table.

---

##### `tableName`<sup>Required</sup> <a name="tableName" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.property.tableName"></a>

```typescript
public readonly tableName: string;
```

- *Type:* string

Table name of the dynamodb table.

---

##### `encryptionKey`<sup>Optional</sup> <a name="encryptionKey" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.property.encryptionKey"></a>

```typescript
public readonly encryptionKey: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

KMS encryption key, if this table uses a customer-managed encryption key.

---

##### `tableStreamArn`<sup>Optional</sup> <a name="tableStreamArn" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.property.tableStreamArn"></a>

```typescript
public readonly tableStreamArn: string;
```

- *Type:* string

ARN of the table's stream, if there is one.

---

##### `tableAlarms`<sup>Required</sup> <a name="tableAlarms" id="truemark-cdk-lib.aws_dynamodb.ObservedTable.property.tableAlarms"></a>

```typescript
public readonly tableAlarms: TableAlarms;
```

- *Type:* truemark-cdk-lib.aws_dynamodb.TableAlarms

---


### ParameterReader <a name="ParameterReader" id="truemark-cdk-lib.aws_ssm.ParameterReader"></a>

Custom resource allowing SSM parameter strings to be read across regions.

#### Initializers <a name="Initializers" id="truemark-cdk-lib.aws_ssm.ParameterReader.Initializer"></a>

```typescript
import { aws_ssm } from 'truemark-cdk-lib'

new aws_ssm.ParameterReader(scope: Construct, id: string, props: ParameterReaderProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_ssm.ParameterReader.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_ssm.ParameterReader.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_ssm.ParameterReader.Initializer.parameter.props">props</a></code> | <code>truemark-cdk-lib.aws_ssm.ParameterReaderProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="truemark-cdk-lib.aws_ssm.ParameterReader.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="truemark-cdk-lib.aws_ssm.ParameterReader.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="truemark-cdk-lib.aws_ssm.ParameterReader.Initializer.parameter.props"></a>

- *Type:* truemark-cdk-lib.aws_ssm.ParameterReaderProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_ssm.ParameterReader.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#truemark-cdk-lib.aws_ssm.ParameterReader.getResponseField">getResponseField</a></code> | Returns response data for the AWS SDK call as string. |
| <code><a href="#truemark-cdk-lib.aws_ssm.ParameterReader.getResponseFieldReference">getResponseFieldReference</a></code> | Returns response data for the AWS SDK call. |
| <code><a href="#truemark-cdk-lib.aws_ssm.ParameterReader.stringValue">stringValue</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="truemark-cdk-lib.aws_ssm.ParameterReader.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `getResponseField` <a name="getResponseField" id="truemark-cdk-lib.aws_ssm.ParameterReader.getResponseField"></a>

```typescript
public getResponseField(dataPath: string): string
```

Returns response data for the AWS SDK call as string.

Example for S3 / listBucket : 'Buckets.0.Name'

Note that you cannot use this method if `ignoreErrorCodesMatching`
is configured for any of the SDK calls. This is because in such a case,
the response data might not exist, and will cause a CloudFormation deploy time error.

###### `dataPath`<sup>Required</sup> <a name="dataPath" id="truemark-cdk-lib.aws_ssm.ParameterReader.getResponseField.parameter.dataPath"></a>

- *Type:* string

the path to the data.

---

##### `getResponseFieldReference` <a name="getResponseFieldReference" id="truemark-cdk-lib.aws_ssm.ParameterReader.getResponseFieldReference"></a>

```typescript
public getResponseFieldReference(dataPath: string): Reference
```

Returns response data for the AWS SDK call.

Example for S3 / listBucket : 'Buckets.0.Name'

Use `Token.asXxx` to encode the returned `Reference` as a specific type or
use the convenience `getDataString` for string attributes.

Note that you cannot use this method if `ignoreErrorCodesMatching`
is configured for any of the SDK calls. This is because in such a case,
the response data might not exist, and will cause a CloudFormation deploy time error.

###### `dataPath`<sup>Required</sup> <a name="dataPath" id="truemark-cdk-lib.aws_ssm.ParameterReader.getResponseFieldReference.parameter.dataPath"></a>

- *Type:* string

the path to the data.

---

##### `stringValue` <a name="stringValue" id="truemark-cdk-lib.aws_ssm.ParameterReader.stringValue"></a>

```typescript
public stringValue(): string
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_ssm.ParameterReader.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="truemark-cdk-lib.aws_ssm.ParameterReader.isConstruct"></a>

```typescript
import { aws_ssm } from 'truemark-cdk-lib'

aws_ssm.ParameterReader.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="truemark-cdk-lib.aws_ssm.ParameterReader.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_ssm.ParameterReader.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#truemark-cdk-lib.aws_ssm.ParameterReader.property.grantPrincipal">grantPrincipal</a></code> | <code>aws-cdk-lib.aws_iam.IPrincipal</code> | The principal to grant permissions to. |

---

##### `node`<sup>Required</sup> <a name="node" id="truemark-cdk-lib.aws_ssm.ParameterReader.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `grantPrincipal`<sup>Required</sup> <a name="grantPrincipal" id="truemark-cdk-lib.aws_ssm.ParameterReader.property.grantPrincipal"></a>

```typescript
public readonly grantPrincipal: IPrincipal;
```

- *Type:* aws-cdk-lib.aws_iam.IPrincipal

The principal to grant permissions to.

---


### ParameterStore <a name="ParameterStore" id="truemark-cdk-lib.aws_ssm.ParameterStore"></a>

Utility construct to ease reading and writing parameters with cross-region read support.

#### Initializers <a name="Initializers" id="truemark-cdk-lib.aws_ssm.ParameterStore.Initializer"></a>

```typescript
import { aws_ssm } from 'truemark-cdk-lib'

new aws_ssm.ParameterStore(scope: Construct, id: string, props?: ParameterStoreOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_ssm.ParameterStore.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_ssm.ParameterStore.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_ssm.ParameterStore.Initializer.parameter.props">props</a></code> | <code>truemark-cdk-lib.aws_ssm.ParameterStoreOptions</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="truemark-cdk-lib.aws_ssm.ParameterStore.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="truemark-cdk-lib.aws_ssm.ParameterStore.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="truemark-cdk-lib.aws_ssm.ParameterStore.Initializer.parameter.props"></a>

- *Type:* truemark-cdk-lib.aws_ssm.ParameterStoreOptions

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_ssm.ParameterStore.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#truemark-cdk-lib.aws_ssm.ParameterStore.read">read</a></code> | Reads an SSM parameter from a local or remote region. |
| <code><a href="#truemark-cdk-lib.aws_ssm.ParameterStore.regionMatch">regionMatch</a></code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_ssm.ParameterStore.write">write</a></code> | Creates a new SSM parameter in the local region. |

---

##### `toString` <a name="toString" id="truemark-cdk-lib.aws_ssm.ParameterStore.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `read` <a name="read" id="truemark-cdk-lib.aws_ssm.ParameterStore.read"></a>

```typescript
public read(name: string): string
```

Reads an SSM parameter from a local or remote region.

###### `name`<sup>Required</sup> <a name="name" id="truemark-cdk-lib.aws_ssm.ParameterStore.read.parameter.name"></a>

- *Type:* string

the name of the parameter to read.

---

##### `regionMatch` <a name="regionMatch" id="truemark-cdk-lib.aws_ssm.ParameterStore.regionMatch"></a>

```typescript
public regionMatch(): boolean
```

##### `write` <a name="write" id="truemark-cdk-lib.aws_ssm.ParameterStore.write"></a>

```typescript
public write(name: string, value: string): StringParameter
```

Creates a new SSM parameter in the local region.

###### `name`<sup>Required</sup> <a name="name" id="truemark-cdk-lib.aws_ssm.ParameterStore.write.parameter.name"></a>

- *Type:* string

the name of the parameter.

---

###### `value`<sup>Required</sup> <a name="value" id="truemark-cdk-lib.aws_ssm.ParameterStore.write.parameter.value"></a>

- *Type:* string

the value to store.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_ssm.ParameterStore.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="truemark-cdk-lib.aws_ssm.ParameterStore.isConstruct"></a>

```typescript
import { aws_ssm } from 'truemark-cdk-lib'

aws_ssm.ParameterStore.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="truemark-cdk-lib.aws_ssm.ParameterStore.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_ssm.ParameterStore.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#truemark-cdk-lib.aws_ssm.ParameterStore.property.identifierPrefix">identifierPrefix</a></code> | <code>string</code> | The prefix used on identifiers. |
| <code><a href="#truemark-cdk-lib.aws_ssm.ParameterStore.property.identifierSuffix">identifierSuffix</a></code> | <code>string</code> | The suffix used on identifiers. |
| <code><a href="#truemark-cdk-lib.aws_ssm.ParameterStore.property.prefix">prefix</a></code> | <code>string</code> | The prefix on parameters read and written by this store. |
| <code><a href="#truemark-cdk-lib.aws_ssm.ParameterStore.property.region">region</a></code> | <code>string</code> | The region in which to access the parameters. |
| <code><a href="#truemark-cdk-lib.aws_ssm.ParameterStore.property.suffix">suffix</a></code> | <code>string</code> | The suffix on parameters read and written by this store. |

---

##### `node`<sup>Required</sup> <a name="node" id="truemark-cdk-lib.aws_ssm.ParameterStore.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `identifierPrefix`<sup>Required</sup> <a name="identifierPrefix" id="truemark-cdk-lib.aws_ssm.ParameterStore.property.identifierPrefix"></a>

```typescript
public readonly identifierPrefix: string;
```

- *Type:* string

The prefix used on identifiers.

---

##### `identifierSuffix`<sup>Required</sup> <a name="identifierSuffix" id="truemark-cdk-lib.aws_ssm.ParameterStore.property.identifierSuffix"></a>

```typescript
public readonly identifierSuffix: string;
```

- *Type:* string

The suffix used on identifiers.

---

##### `prefix`<sup>Required</sup> <a name="prefix" id="truemark-cdk-lib.aws_ssm.ParameterStore.property.prefix"></a>

```typescript
public readonly prefix: string;
```

- *Type:* string

The prefix on parameters read and written by this store.

---

##### `region`<sup>Required</sup> <a name="region" id="truemark-cdk-lib.aws_ssm.ParameterStore.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

The region in which to access the parameters.

---

##### `suffix`<sup>Required</sup> <a name="suffix" id="truemark-cdk-lib.aws_ssm.ParameterStore.property.suffix"></a>

```typescript
public readonly suffix: string;
```

- *Type:* string

The suffix on parameters read and written by this store.

---


### PipelineNotificationRule <a name="PipelineNotificationRule" id="truemark-cdk-lib.aws_codepipeline.PipelineNotificationRule"></a>

Configures notifications for a pipeline to a ChatOps Slack channel.

#### Initializers <a name="Initializers" id="truemark-cdk-lib.aws_codepipeline.PipelineNotificationRule.Initializer"></a>

```typescript
import { aws_codepipeline } from 'truemark-cdk-lib'

new aws_codepipeline.PipelineNotificationRule(scope: Construct, id: string, props: PipelineNotificationRuleProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.PipelineNotificationRule.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.PipelineNotificationRule.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.PipelineNotificationRule.Initializer.parameter.props">props</a></code> | <code>truemark-cdk-lib.aws_codepipeline.PipelineNotificationRuleProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="truemark-cdk-lib.aws_codepipeline.PipelineNotificationRule.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="truemark-cdk-lib.aws_codepipeline.PipelineNotificationRule.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="truemark-cdk-lib.aws_codepipeline.PipelineNotificationRule.Initializer.parameter.props"></a>

- *Type:* truemark-cdk-lib.aws_codepipeline.PipelineNotificationRuleProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.PipelineNotificationRule.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="truemark-cdk-lib.aws_codepipeline.PipelineNotificationRule.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.PipelineNotificationRule.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="truemark-cdk-lib.aws_codepipeline.PipelineNotificationRule.isConstruct"></a>

```typescript
import { aws_codepipeline } from 'truemark-cdk-lib'

aws_codepipeline.PipelineNotificationRule.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="truemark-cdk-lib.aws_codepipeline.PipelineNotificationRule.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.PipelineNotificationRule.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.PipelineNotificationRule.property.notificationRule">notificationRule</a></code> | <code>aws-cdk-lib.aws_codestarnotifications.NotificationRule</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.PipelineNotificationRule.property.slackChannel">slackChannel</a></code> | <code>aws-cdk-lib.aws_chatbot.ISlackChannelConfiguration</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="truemark-cdk-lib.aws_codepipeline.PipelineNotificationRule.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `notificationRule`<sup>Required</sup> <a name="notificationRule" id="truemark-cdk-lib.aws_codepipeline.PipelineNotificationRule.property.notificationRule"></a>

```typescript
public readonly notificationRule: NotificationRule;
```

- *Type:* aws-cdk-lib.aws_codestarnotifications.NotificationRule

---

##### `slackChannel`<sup>Required</sup> <a name="slackChannel" id="truemark-cdk-lib.aws_codepipeline.PipelineNotificationRule.property.slackChannel"></a>

```typescript
public readonly slackChannel: ISlackChannelConfiguration;
```

- *Type:* aws-cdk-lib.aws_chatbot.ISlackChannelConfiguration

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.PipelineNotificationRule.property.ACTION_EXECUTION_EVENTS">ACTION_EXECUTION_EVENTS</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.PipelineNotificationRule.property.ALL_NOTIFICATION_EVENTS">ALL_NOTIFICATION_EVENTS</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.PipelineNotificationRule.property.MANUAL_APPROVAL_EVENTS">MANUAL_APPROVAL_EVENTS</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.PipelineNotificationRule.property.PIPELINE_EXECUTION_EVENTS">PIPELINE_EXECUTION_EVENTS</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.PipelineNotificationRule.property.STAGE_EXECUTION_EVENTS">STAGE_EXECUTION_EVENTS</a></code> | <code>string[]</code> | *No description.* |

---

##### `ACTION_EXECUTION_EVENTS`<sup>Required</sup> <a name="ACTION_EXECUTION_EVENTS" id="truemark-cdk-lib.aws_codepipeline.PipelineNotificationRule.property.ACTION_EXECUTION_EVENTS"></a>

```typescript
public readonly ACTION_EXECUTION_EVENTS: string[];
```

- *Type:* string[]

---

##### `ALL_NOTIFICATION_EVENTS`<sup>Required</sup> <a name="ALL_NOTIFICATION_EVENTS" id="truemark-cdk-lib.aws_codepipeline.PipelineNotificationRule.property.ALL_NOTIFICATION_EVENTS"></a>

```typescript
public readonly ALL_NOTIFICATION_EVENTS: string[];
```

- *Type:* string[]

---

##### `MANUAL_APPROVAL_EVENTS`<sup>Required</sup> <a name="MANUAL_APPROVAL_EVENTS" id="truemark-cdk-lib.aws_codepipeline.PipelineNotificationRule.property.MANUAL_APPROVAL_EVENTS"></a>

```typescript
public readonly MANUAL_APPROVAL_EVENTS: string[];
```

- *Type:* string[]

---

##### `PIPELINE_EXECUTION_EVENTS`<sup>Required</sup> <a name="PIPELINE_EXECUTION_EVENTS" id="truemark-cdk-lib.aws_codepipeline.PipelineNotificationRule.property.PIPELINE_EXECUTION_EVENTS"></a>

```typescript
public readonly PIPELINE_EXECUTION_EVENTS: string[];
```

- *Type:* string[]

---

##### `STAGE_EXECUTION_EVENTS`<sup>Required</sup> <a name="STAGE_EXECUTION_EVENTS" id="truemark-cdk-lib.aws_codepipeline.PipelineNotificationRule.property.STAGE_EXECUTION_EVENTS"></a>

```typescript
public readonly STAGE_EXECUTION_EVENTS: string[];
```

- *Type:* string[]

---

### TableAlarms <a name="TableAlarms" id="truemark-cdk-lib.aws_dynamodb.TableAlarms"></a>

Creates CloudWatch alarms for DynamoDB Tables.

#### Initializers <a name="Initializers" id="truemark-cdk-lib.aws_dynamodb.TableAlarms.Initializer"></a>

```typescript
import { aws_dynamodb } from 'truemark-cdk-lib'

new aws_dynamodb.TableAlarms(scope: Construct, id: string, props: TableAlarmsProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarms.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarms.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarms.Initializer.parameter.props">props</a></code> | <code>truemark-cdk-lib.aws_dynamodb.TableAlarmsProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="truemark-cdk-lib.aws_dynamodb.TableAlarms.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="truemark-cdk-lib.aws_dynamodb.TableAlarms.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="truemark-cdk-lib.aws_dynamodb.TableAlarms.Initializer.parameter.props"></a>

- *Type:* truemark-cdk-lib.aws_dynamodb.TableAlarmsProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarms.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarms.alarms">alarms</a></code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarms.criticalAlarms">criticalAlarms</a></code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarms.warningAlarms">warningAlarms</a></code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarms.addGlobalSecondaryIndexMonitoring">addGlobalSecondaryIndexMonitoring</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="truemark-cdk-lib.aws_dynamodb.TableAlarms.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `alarms` <a name="alarms" id="truemark-cdk-lib.aws_dynamodb.TableAlarms.alarms"></a>

```typescript
public alarms(category: AlarmCategory): Alarm[]
```

###### `category`<sup>Required</sup> <a name="category" id="truemark-cdk-lib.aws_dynamodb.TableAlarms.alarms.parameter.category"></a>

- *Type:* truemark-cdk-lib.aws_monitoring.AlarmCategory

---

##### `criticalAlarms` <a name="criticalAlarms" id="truemark-cdk-lib.aws_dynamodb.TableAlarms.criticalAlarms"></a>

```typescript
public criticalAlarms(): Alarm[]
```

##### `warningAlarms` <a name="warningAlarms" id="truemark-cdk-lib.aws_dynamodb.TableAlarms.warningAlarms"></a>

```typescript
public warningAlarms(): Alarm[]
```

##### `addGlobalSecondaryIndexMonitoring` <a name="addGlobalSecondaryIndexMonitoring" id="truemark-cdk-lib.aws_dynamodb.TableAlarms.addGlobalSecondaryIndexMonitoring"></a>

```typescript
public addGlobalSecondaryIndexMonitoring(indexName: string): void
```

###### `indexName`<sup>Required</sup> <a name="indexName" id="truemark-cdk-lib.aws_dynamodb.TableAlarms.addGlobalSecondaryIndexMonitoring.parameter.indexName"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarms.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="truemark-cdk-lib.aws_dynamodb.TableAlarms.isConstruct"></a>

```typescript
import { aws_dynamodb } from 'truemark-cdk-lib'

aws_dynamodb.TableAlarms.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="truemark-cdk-lib.aws_dynamodb.TableAlarms.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarms.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarms.property.monitoringFacade">monitoringFacade</a></code> | <code>cdk-monitoring-constructs.MonitoringFacade</code> | The MonitoringFacade instance either passed in or generated. |

---

##### `node`<sup>Required</sup> <a name="node" id="truemark-cdk-lib.aws_dynamodb.TableAlarms.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `monitoringFacade`<sup>Required</sup> <a name="monitoringFacade" id="truemark-cdk-lib.aws_dynamodb.TableAlarms.property.monitoringFacade"></a>

```typescript
public readonly monitoringFacade: MonitoringFacade;
```

- *Type:* cdk-monitoring-constructs.MonitoringFacade

The MonitoringFacade instance either passed in or generated.

---


### WeightedARecord <a name="WeightedARecord" id="truemark-cdk-lib.aws_route53.WeightedARecord"></a>

An extended ARecord that performs weight based routing.

#### Initializers <a name="Initializers" id="truemark-cdk-lib.aws_route53.WeightedARecord.Initializer"></a>

```typescript
import { aws_route53 } from 'truemark-cdk-lib'

new aws_route53.WeightedARecord(scope: Construct, id: string, props: WeightedARecordProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedARecord.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedARecord.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedARecord.Initializer.parameter.props">props</a></code> | <code>truemark-cdk-lib.aws_route53.WeightedARecordProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="truemark-cdk-lib.aws_route53.WeightedARecord.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="truemark-cdk-lib.aws_route53.WeightedARecord.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="truemark-cdk-lib.aws_route53.WeightedARecord.Initializer.parameter.props"></a>

- *Type:* truemark-cdk-lib.aws_route53.WeightedARecordProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedARecord.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedARecord.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |

---

##### `toString` <a name="toString" id="truemark-cdk-lib.aws_route53.WeightedARecord.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="truemark-cdk-lib.aws_route53.WeightedARecord.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="truemark-cdk-lib.aws_route53.WeightedARecord.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedARecord.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedARecord.isResource">isResource</a></code> | Check whether the given construct is a Resource. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="truemark-cdk-lib.aws_route53.WeightedARecord.isConstruct"></a>

```typescript
import { aws_route53 } from 'truemark-cdk-lib'

aws_route53.WeightedARecord.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="truemark-cdk-lib.aws_route53.WeightedARecord.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isResource` <a name="isResource" id="truemark-cdk-lib.aws_route53.WeightedARecord.isResource"></a>

```typescript
import { aws_route53 } from 'truemark-cdk-lib'

aws_route53.WeightedARecord.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="truemark-cdk-lib.aws_route53.WeightedARecord.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedARecord.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedARecord.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedARecord.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedARecord.property.domainName">domainName</a></code> | <code>string</code> | The domain name of the record. |

---

##### `node`<sup>Required</sup> <a name="node" id="truemark-cdk-lib.aws_route53.WeightedARecord.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="truemark-cdk-lib.aws_route53.WeightedARecord.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="truemark-cdk-lib.aws_route53.WeightedARecord.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `domainName`<sup>Required</sup> <a name="domainName" id="truemark-cdk-lib.aws_route53.WeightedARecord.property.domainName"></a>

```typescript
public readonly domainName: string;
```

- *Type:* string

The domain name of the record.

---


### WeightedLatencyARecord <a name="WeightedLatencyARecord" id="truemark-cdk-lib.aws_route53.WeightedLatencyARecord"></a>

- *Implements:* aws-cdk-lib.aws_route53.IRecordSet

An WeightedARecord that uses as LatencyARecord internally to do both weight and latency based routing.

#### Initializers <a name="Initializers" id="truemark-cdk-lib.aws_route53.WeightedLatencyARecord.Initializer"></a>

```typescript
import { aws_route53 } from 'truemark-cdk-lib'

new aws_route53.WeightedLatencyARecord(scope: Construct, id: string, props: WeightedLatencyARecordProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedLatencyARecord.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedLatencyARecord.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedLatencyARecord.Initializer.parameter.props">props</a></code> | <code>truemark-cdk-lib.aws_route53.WeightedLatencyARecordProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="truemark-cdk-lib.aws_route53.WeightedLatencyARecord.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="truemark-cdk-lib.aws_route53.WeightedLatencyARecord.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="truemark-cdk-lib.aws_route53.WeightedLatencyARecord.Initializer.parameter.props"></a>

- *Type:* truemark-cdk-lib.aws_route53.WeightedLatencyARecordProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedLatencyARecord.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedLatencyARecord.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |

---

##### `toString` <a name="toString" id="truemark-cdk-lib.aws_route53.WeightedLatencyARecord.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="truemark-cdk-lib.aws_route53.WeightedLatencyARecord.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="truemark-cdk-lib.aws_route53.WeightedLatencyARecord.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedLatencyARecord.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="truemark-cdk-lib.aws_route53.WeightedLatencyARecord.isConstruct"></a>

```typescript
import { aws_route53 } from 'truemark-cdk-lib'

aws_route53.WeightedLatencyARecord.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="truemark-cdk-lib.aws_route53.WeightedLatencyARecord.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedLatencyARecord.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedLatencyARecord.property.domainName">domainName</a></code> | <code>string</code> | The domain name of the record. |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedLatencyARecord.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedLatencyARecord.property.latencyRecord">latencyRecord</a></code> | <code>truemark-cdk-lib.aws_route53.LatencyARecord</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedLatencyARecord.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedLatencyARecord.property.weightedRecord">weightedRecord</a></code> | <code>truemark-cdk-lib.aws_route53.WeightedARecord</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="truemark-cdk-lib.aws_route53.WeightedLatencyARecord.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `domainName`<sup>Required</sup> <a name="domainName" id="truemark-cdk-lib.aws_route53.WeightedLatencyARecord.property.domainName"></a>

```typescript
public readonly domainName: string;
```

- *Type:* string

The domain name of the record.

---

##### `env`<sup>Required</sup> <a name="env" id="truemark-cdk-lib.aws_route53.WeightedLatencyARecord.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `latencyRecord`<sup>Required</sup> <a name="latencyRecord" id="truemark-cdk-lib.aws_route53.WeightedLatencyARecord.property.latencyRecord"></a>

```typescript
public readonly latencyRecord: LatencyARecord;
```

- *Type:* truemark-cdk-lib.aws_route53.LatencyARecord

---

##### `stack`<sup>Required</sup> <a name="stack" id="truemark-cdk-lib.aws_route53.WeightedLatencyARecord.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `weightedRecord`<sup>Required</sup> <a name="weightedRecord" id="truemark-cdk-lib.aws_route53.WeightedLatencyARecord.property.weightedRecord"></a>

```typescript
public readonly weightedRecord: WeightedARecord;
```

- *Type:* truemark-cdk-lib.aws_route53.WeightedARecord

---


## Structs <a name="Structs" id="Structs"></a>

### AlarmFacadeProps <a name="AlarmFacadeProps" id="truemark-cdk-lib.aws_monitoring.AlarmFacadeProps"></a>

Properties for AlarmFacade TODO: I broke this as a problem to do with passing symbols around for JSII (not supported) - we will have to put it back to something that makes sense..

#### Initializer <a name="Initializer" id="truemark-cdk-lib.aws_monitoring.AlarmFacadeProps.Initializer"></a>

```typescript
import { aws_monitoring } from 'truemark-cdk-lib'

const alarmFacadeProps: aws_monitoring.AlarmFacadeProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmFacadeProps.property.actions">actions</a></code> | <code>aws-cdk-lib.aws_cloudwatch.IAlarmAction[]</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmFacadeProps.property.defaultThreshold">defaultThreshold</a></code> | <code>number \| aws-cdk-lib.Duration</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmFacadeProps.property.prop">prop</a></code> | <code>string</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmFacadeProps.property.threshold">threshold</a></code> | <code>number \| aws-cdk-lib.Duration</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmFacadeProps.property.topics">topics</a></code> | <code>aws-cdk-lib.aws_sns.ITopic[]</code> | *No description.* |

---

##### `actions`<sup>Optional</sup> <a name="actions" id="truemark-cdk-lib.aws_monitoring.AlarmFacadeProps.property.actions"></a>

```typescript
public readonly actions: IAlarmAction[];
```

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction[]

---

##### `defaultThreshold`<sup>Optional</sup> <a name="defaultThreshold" id="truemark-cdk-lib.aws_monitoring.AlarmFacadeProps.property.defaultThreshold"></a>

```typescript
public readonly defaultThreshold: number | Duration;
```

- *Type:* number | aws-cdk-lib.Duration

---

##### `prop`<sup>Optional</sup> <a name="prop" id="truemark-cdk-lib.aws_monitoring.AlarmFacadeProps.property.prop"></a>

```typescript
public readonly prop: string;
```

- *Type:* string

---

##### `threshold`<sup>Optional</sup> <a name="threshold" id="truemark-cdk-lib.aws_monitoring.AlarmFacadeProps.property.threshold"></a>

```typescript
public readonly threshold: number | Duration;
```

- *Type:* number | aws-cdk-lib.Duration

---

##### `topics`<sup>Optional</sup> <a name="topics" id="truemark-cdk-lib.aws_monitoring.AlarmFacadeProps.property.topics"></a>

```typescript
public readonly topics: ITopic[];
```

- *Type:* aws-cdk-lib.aws_sns.ITopic[]

---

### AlarmsCategoryOptions <a name="AlarmsCategoryOptions" id="truemark-cdk-lib.aws_monitoring.AlarmsCategoryOptions"></a>

#### Initializer <a name="Initializer" id="truemark-cdk-lib.aws_monitoring.AlarmsCategoryOptions.Initializer"></a>

```typescript
import { aws_monitoring } from 'truemark-cdk-lib'

const alarmsCategoryOptions: aws_monitoring.AlarmsCategoryOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmsCategoryOptions.property.notifyActions">notifyActions</a></code> | <code>aws-cdk-lib.aws_cloudwatch.IAlarmAction[]</code> | Actions to send alarm notifications. |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmsCategoryOptions.property.notifyTopics">notifyTopics</a></code> | <code>aws-cdk-lib.aws_sns.ITopic[]</code> | Topics to send alarm notifications. |

---

##### `notifyActions`<sup>Optional</sup> <a name="notifyActions" id="truemark-cdk-lib.aws_monitoring.AlarmsCategoryOptions.property.notifyActions"></a>

```typescript
public readonly notifyActions: IAlarmAction[];
```

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction[]

Actions to send alarm notifications.

---

##### `notifyTopics`<sup>Optional</sup> <a name="notifyTopics" id="truemark-cdk-lib.aws_monitoring.AlarmsCategoryOptions.property.notifyTopics"></a>

```typescript
public readonly notifyTopics: ITopic[];
```

- *Type:* aws-cdk-lib.aws_sns.ITopic[]

Topics to send alarm notifications.

---

### AlarmsOptions <a name="AlarmsOptions" id="truemark-cdk-lib.aws_monitoring.AlarmsOptions"></a>

#### Initializer <a name="Initializer" id="truemark-cdk-lib.aws_monitoring.AlarmsOptions.Initializer"></a>

```typescript
import { aws_monitoring } from 'truemark-cdk-lib'

const alarmsOptions: aws_monitoring.AlarmsOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmsOptions.property.addToAlarmDashboard">addToAlarmDashboard</a></code> | <code>boolean</code> | Add widgets to alarm dashboard. |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmsOptions.property.addToDetailDashboard">addToDetailDashboard</a></code> | <code>boolean</code> | Add widgets to detailed dashboard. |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmsOptions.property.addToSummaryDashboard">addToSummaryDashboard</a></code> | <code>boolean</code> | Add widgets to summary dashboard. |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmsOptions.property.alarmNamePrefix">alarmNamePrefix</a></code> | <code>string</code> | Prefix for generated alarms. |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmsOptions.property.criticalAlarmOptions">criticalAlarmOptions</a></code> | <code>truemark-cdk-lib.aws_monitoring.AlarmsCategoryOptions</code> | Alarm thresholds for critical alarms. |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmsOptions.property.dashboardFactory">dashboardFactory</a></code> | <code>cdk-monitoring-constructs.IDashboardFactory</code> | The DashboardFactory to use when generating CloudWatch dashboards. |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmsOptions.property.monitoringFacade">monitoringFacade</a></code> | <code>cdk-monitoring-constructs.MonitoringFacade</code> | Main entry point for monitoring. |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmsOptions.property.warningAlarmOptions">warningAlarmOptions</a></code> | <code>truemark-cdk-lib.aws_monitoring.AlarmsCategoryOptions</code> | Alarm thresholds for warning alarms. |

---

##### `addToAlarmDashboard`<sup>Optional</sup> <a name="addToAlarmDashboard" id="truemark-cdk-lib.aws_monitoring.AlarmsOptions.property.addToAlarmDashboard"></a>

```typescript
public readonly addToAlarmDashboard: boolean;
```

- *Type:* boolean
- *Default:* true

Add widgets to alarm dashboard.

---

##### `addToDetailDashboard`<sup>Optional</sup> <a name="addToDetailDashboard" id="truemark-cdk-lib.aws_monitoring.AlarmsOptions.property.addToDetailDashboard"></a>

```typescript
public readonly addToDetailDashboard: boolean;
```

- *Type:* boolean
- *Default:* true

Add widgets to detailed dashboard.

---

##### `addToSummaryDashboard`<sup>Optional</sup> <a name="addToSummaryDashboard" id="truemark-cdk-lib.aws_monitoring.AlarmsOptions.property.addToSummaryDashboard"></a>

```typescript
public readonly addToSummaryDashboard: boolean;
```

- *Type:* boolean
- *Default:* true

Add widgets to summary dashboard.

---

##### `alarmNamePrefix`<sup>Optional</sup> <a name="alarmNamePrefix" id="truemark-cdk-lib.aws_monitoring.AlarmsOptions.property.alarmNamePrefix"></a>

```typescript
public readonly alarmNamePrefix: string;
```

- *Type:* string
- *Default:* Stack.of(this).stackName

Prefix for generated alarms.

---

##### `criticalAlarmOptions`<sup>Optional</sup> <a name="criticalAlarmOptions" id="truemark-cdk-lib.aws_monitoring.AlarmsOptions.property.criticalAlarmOptions"></a>

```typescript
public readonly criticalAlarmOptions: AlarmsCategoryOptions;
```

- *Type:* truemark-cdk-lib.aws_monitoring.AlarmsCategoryOptions

Alarm thresholds for critical alarms.

If no properties are provided, a set of default alarms are created.

---

##### `dashboardFactory`<sup>Optional</sup> <a name="dashboardFactory" id="truemark-cdk-lib.aws_monitoring.AlarmsOptions.property.dashboardFactory"></a>

```typescript
public readonly dashboardFactory: IDashboardFactory;
```

- *Type:* cdk-monitoring-constructs.IDashboardFactory

The DashboardFactory to use when generating CloudWatch dashboards.

If not defined, dashboards are not generated.

---

##### `monitoringFacade`<sup>Optional</sup> <a name="monitoringFacade" id="truemark-cdk-lib.aws_monitoring.AlarmsOptions.property.monitoringFacade"></a>

```typescript
public readonly monitoringFacade: MonitoringFacade;
```

- *Type:* cdk-monitoring-constructs.MonitoringFacade

Main entry point for monitoring.

If no value is provided, a default facade will be created.

---

##### `warningAlarmOptions`<sup>Optional</sup> <a name="warningAlarmOptions" id="truemark-cdk-lib.aws_monitoring.AlarmsOptions.property.warningAlarmOptions"></a>

```typescript
public readonly warningAlarmOptions: AlarmsCategoryOptions;
```

- *Type:* truemark-cdk-lib.aws_monitoring.AlarmsCategoryOptions

Alarm thresholds for warning alarms.

If no properties are provided, a set of default alarms are created.

---

### ArtifactBucketProps <a name="ArtifactBucketProps" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucketProps"></a>

Properties for ArtifactBucket.

#### Initializer <a name="Initializer" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucketProps.Initializer"></a>

```typescript
import { aws_codepipeline } from 'truemark-cdk-lib'

const artifactBucketProps: aws_codepipeline.ArtifactBucketProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucketProps.property.encryptionKey">encryptionKey</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | By default, CDK will create KMS keys for cross account deployments. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ArtifactBucketProps.property.accountIds">accountIds</a></code> | <code>string[]</code> | List of AWS account IDs that should have access to this bucket. |

---

##### `encryptionKey`<sup>Required</sup> <a name="encryptionKey" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucketProps.property.encryptionKey"></a>

```typescript
public readonly encryptionKey: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

By default, CDK will create KMS keys for cross account deployments.

This
can be costly if you have a large number of pipelines. This property
allows a common key to be shared across pipelines.

---

##### `accountIds`<sup>Optional</sup> <a name="accountIds" id="truemark-cdk-lib.aws_codepipeline.ArtifactBucketProps.property.accountIds"></a>

```typescript
public readonly accountIds: string[];
```

- *Type:* string[]

List of AWS account IDs that should have access to this bucket.

---

### BashExecutionProps <a name="BashExecutionProps" id="truemark-cdk-lib.helpers.BashExecutionProps"></a>

#### Initializer <a name="Initializer" id="truemark-cdk-lib.helpers.BashExecutionProps.Initializer"></a>

```typescript
import { helpers } from 'truemark-cdk-lib'

const bashExecutionProps: helpers.BashExecutionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.helpers.BashExecutionProps.property.script">script</a></code> | <code>string</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.helpers.BashExecutionProps.property.environment">environment</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.helpers.BashExecutionProps.property.workingDirectory">workingDirectory</a></code> | <code>string</code> | *No description.* |

---

##### `script`<sup>Required</sup> <a name="script" id="truemark-cdk-lib.helpers.BashExecutionProps.property.script"></a>

```typescript
public readonly script: string;
```

- *Type:* string

---

##### `environment`<sup>Optional</sup> <a name="environment" id="truemark-cdk-lib.helpers.BashExecutionProps.property.environment"></a>

```typescript
public readonly environment: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---

##### `workingDirectory`<sup>Optional</sup> <a name="workingDirectory" id="truemark-cdk-lib.helpers.BashExecutionProps.property.workingDirectory"></a>

```typescript
public readonly workingDirectory: string;
```

- *Type:* string

---

### CdkPipelineProps <a name="CdkPipelineProps" id="truemark-cdk-lib.aws_codepipeline.CdkPipelineProps"></a>

Properties for CdkPipeline.

#### Initializer <a name="Initializer" id="truemark-cdk-lib.aws_codepipeline.CdkPipelineProps.Initializer"></a>

```typescript
import { aws_codepipeline } from 'truemark-cdk-lib'

const cdkPipelineProps: aws_codepipeline.CdkPipelineProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.CdkPipelineProps.property.branch">branch</a></code> | <code>string</code> | Branch to use inside the source code repository. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.CdkPipelineProps.property.connectionArn">connectionArn</a></code> | <code>string</code> | Arn of the CodeStar connection used to access the source code repository. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.CdkPipelineProps.property.keyArn">keyArn</a></code> | <code>string</code> | By default, CDK will create KMS keys for cross account deployments. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.CdkPipelineProps.property.repo">repo</a></code> | <code>string</code> | Name of the source code repository. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.CdkPipelineProps.property.accountIds">accountIds</a></code> | <code>string[]</code> | List of account IDs this pipeline will deploy into. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.CdkPipelineProps.property.additionalInputs">additionalInputs</a></code> | <code>{[ key: string ]: aws-cdk-lib.pipelines.IFileSetProducer}</code> | Additional FileSets to put in other directories. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.CdkPipelineProps.property.buildImage">buildImage</a></code> | <code>aws-cdk-lib.aws_codebuild.IBuildImage</code> | The image to use for builds. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.CdkPipelineProps.property.commands">commands</a></code> | <code>string[]</code> | Overrides default commands. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.CdkPipelineProps.property.computeType">computeType</a></code> | <code>aws-cdk-lib.aws_codebuild.ComputeType</code> | Type of compute to use for this build. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.CdkPipelineProps.property.dockerEnabledForSelfMutation">dockerEnabledForSelfMutation</a></code> | <code>boolean</code> | Enable docker for the self-mutate step. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.CdkPipelineProps.property.dockerEnabledForSynth">dockerEnabledForSynth</a></code> | <code>boolean</code> | Enable docker for the 'synth' step. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.CdkPipelineProps.property.notificationEvents">notificationEvents</a></code> | <code>string[]</code> | The list of notification events to receive. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.CdkPipelineProps.property.selfMutation">selfMutation</a></code> | <code>boolean</code> | Enable or disable self-mutation. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.CdkPipelineProps.property.slackChannelConfigurationArn">slackChannelConfigurationArn</a></code> | <code>string</code> | The Slack channel configuration to use for notifications. |

---

##### `branch`<sup>Required</sup> <a name="branch" id="truemark-cdk-lib.aws_codepipeline.CdkPipelineProps.property.branch"></a>

```typescript
public readonly branch: string;
```

- *Type:* string

Branch to use inside the source code repository.

---

##### `connectionArn`<sup>Required</sup> <a name="connectionArn" id="truemark-cdk-lib.aws_codepipeline.CdkPipelineProps.property.connectionArn"></a>

```typescript
public readonly connectionArn: string;
```

- *Type:* string

Arn of the CodeStar connection used to access the source code repository.

---

##### `keyArn`<sup>Required</sup> <a name="keyArn" id="truemark-cdk-lib.aws_codepipeline.CdkPipelineProps.property.keyArn"></a>

```typescript
public readonly keyArn: string;
```

- *Type:* string

By default, CDK will create KMS keys for cross account deployments.

This
can be costly if you have a large number of pipelines. This property
allows a common key to be shared across pipelines.

---

##### `repo`<sup>Required</sup> <a name="repo" id="truemark-cdk-lib.aws_codepipeline.CdkPipelineProps.property.repo"></a>

```typescript
public readonly repo: string;
```

- *Type:* string

Name of the source code repository.

---

##### `accountIds`<sup>Optional</sup> <a name="accountIds" id="truemark-cdk-lib.aws_codepipeline.CdkPipelineProps.property.accountIds"></a>

```typescript
public readonly accountIds: string[];
```

- *Type:* string[]

List of account IDs this pipeline will deploy into.

---

##### `additionalInputs`<sup>Optional</sup> <a name="additionalInputs" id="truemark-cdk-lib.aws_codepipeline.CdkPipelineProps.property.additionalInputs"></a>

```typescript
public readonly additionalInputs: {[ key: string ]: IFileSetProducer};
```

- *Type:* {[ key: string ]: aws-cdk-lib.pipelines.IFileSetProducer}

Additional FileSets to put in other directories.

---

##### `buildImage`<sup>Optional</sup> <a name="buildImage" id="truemark-cdk-lib.aws_codepipeline.CdkPipelineProps.property.buildImage"></a>

```typescript
public readonly buildImage: IBuildImage;
```

- *Type:* aws-cdk-lib.aws_codebuild.IBuildImage
- *Default:* LinuxBuildImage.AMAZON_LINUX_2_3

The image to use for builds.

---

##### `commands`<sup>Optional</sup> <a name="commands" id="truemark-cdk-lib.aws_codepipeline.CdkPipelineProps.property.commands"></a>

```typescript
public readonly commands: string[];
```

- *Type:* string[]

Overrides default commands.

---

##### `computeType`<sup>Optional</sup> <a name="computeType" id="truemark-cdk-lib.aws_codepipeline.CdkPipelineProps.property.computeType"></a>

```typescript
public readonly computeType: ComputeType;
```

- *Type:* aws-cdk-lib.aws_codebuild.ComputeType
- *Default:* ComputeType.SMALL

Type of compute to use for this build.

---

##### `dockerEnabledForSelfMutation`<sup>Optional</sup> <a name="dockerEnabledForSelfMutation" id="truemark-cdk-lib.aws_codepipeline.CdkPipelineProps.property.dockerEnabledForSelfMutation"></a>

```typescript
public readonly dockerEnabledForSelfMutation: boolean;
```

- *Type:* boolean
- *Default:* true

Enable docker for the self-mutate step.

---

##### `dockerEnabledForSynth`<sup>Optional</sup> <a name="dockerEnabledForSynth" id="truemark-cdk-lib.aws_codepipeline.CdkPipelineProps.property.dockerEnabledForSynth"></a>

```typescript
public readonly dockerEnabledForSynth: boolean;
```

- *Type:* boolean
- *Default:* true

Enable docker for the 'synth' step.

---

##### `notificationEvents`<sup>Optional</sup> <a name="notificationEvents" id="truemark-cdk-lib.aws_codepipeline.CdkPipelineProps.property.notificationEvents"></a>

```typescript
public readonly notificationEvents: string[];
```

- *Type:* string[]

The list of notification events to receive.

By default, this is all notifications.

> [https://docs.aws.amazon.com/dtconsole/latest/userguide/concepts.html#events-ref-pipeline](https://docs.aws.amazon.com/dtconsole/latest/userguide/concepts.html#events-ref-pipeline)

---

##### `selfMutation`<sup>Optional</sup> <a name="selfMutation" id="truemark-cdk-lib.aws_codepipeline.CdkPipelineProps.property.selfMutation"></a>

```typescript
public readonly selfMutation: boolean;
```

- *Type:* boolean
- *Default:* true

Enable or disable self-mutation.

Useful for cdk pipeline development.

---

##### `slackChannelConfigurationArn`<sup>Optional</sup> <a name="slackChannelConfigurationArn" id="truemark-cdk-lib.aws_codepipeline.CdkPipelineProps.property.slackChannelConfigurationArn"></a>

```typescript
public readonly slackChannelConfigurationArn: string;
```

- *Type:* string

The Slack channel configuration to use for notifications.

---

### EstimatedChargesAlarmProps <a name="EstimatedChargesAlarmProps" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarmProps"></a>

#### Initializer <a name="Initializer" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarmProps.Initializer"></a>

```typescript
import { aws_cloudwatch } from 'truemark-cdk-lib'

const estimatedChargesAlarmProps: aws_cloudwatch.EstimatedChargesAlarmProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarmProps.property.alarmActions">alarmActions</a></code> | <code>aws-cdk-lib.aws_cloudwatch.IAlarmAction[]</code> | Actions to trigger when alarm is breached. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarmProps.property.alarmTopics">alarmTopics</a></code> | <code>aws-cdk-lib.aws_sns.ITopic[]</code> | Topics to notify if alarm is breached. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarmProps.property.insufficientDataActions">insufficientDataActions</a></code> | <code>aws-cdk-lib.aws_cloudwatch.IAlarmAction[]</code> | Actions to take when an alarm has insufficient data. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarmProps.property.insufficientDataTopic">insufficientDataTopic</a></code> | <code>aws-cdk-lib.aws_sns.ITopic[]</code> | Topics to notify when alarm has insufficient data. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarmProps.property.okActions">okActions</a></code> | <code>aws-cdk-lib.aws_cloudwatch.IAlarmAction[]</code> | Actions to take when alarm returns to an ok status. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarmProps.property.okTopics">okTopics</a></code> | <code>aws-cdk-lib.aws_sns.ITopic[]</code> | Topics to notify when alarm returns to an ok status. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarmProps.property.alarmDescription">alarmDescription</a></code> | <code>string</code> | Description for the alarm. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarmProps.property.alarmName">alarmName</a></code> | <code>string</code> | Name of the alarm. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarmProps.property.maxMonthly">maxMonthly</a></code> | <code>number</code> | Amount in USD the estimated charges must be greater than to tigger the alarm. |

---

##### `alarmActions`<sup>Optional</sup> <a name="alarmActions" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarmProps.property.alarmActions"></a>

```typescript
public readonly alarmActions: IAlarmAction[];
```

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction[]

Actions to trigger when alarm is breached.

---

##### `alarmTopics`<sup>Optional</sup> <a name="alarmTopics" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarmProps.property.alarmTopics"></a>

```typescript
public readonly alarmTopics: ITopic[];
```

- *Type:* aws-cdk-lib.aws_sns.ITopic[]

Topics to notify if alarm is breached.

---

##### `insufficientDataActions`<sup>Optional</sup> <a name="insufficientDataActions" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarmProps.property.insufficientDataActions"></a>

```typescript
public readonly insufficientDataActions: IAlarmAction[];
```

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction[]

Actions to take when an alarm has insufficient data.

---

##### `insufficientDataTopic`<sup>Optional</sup> <a name="insufficientDataTopic" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarmProps.property.insufficientDataTopic"></a>

```typescript
public readonly insufficientDataTopic: ITopic[];
```

- *Type:* aws-cdk-lib.aws_sns.ITopic[]

Topics to notify when alarm has insufficient data.

---

##### `okActions`<sup>Optional</sup> <a name="okActions" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarmProps.property.okActions"></a>

```typescript
public readonly okActions: IAlarmAction[];
```

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction[]

Actions to take when alarm returns to an ok status.

---

##### `okTopics`<sup>Optional</sup> <a name="okTopics" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarmProps.property.okTopics"></a>

```typescript
public readonly okTopics: ITopic[];
```

- *Type:* aws-cdk-lib.aws_sns.ITopic[]

Topics to notify when alarm returns to an ok status.

---

##### `alarmDescription`<sup>Optional</sup> <a name="alarmDescription" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarmProps.property.alarmDescription"></a>

```typescript
public readonly alarmDescription: string;
```

- *Type:* string
- *Default:* No description

Description for the alarm.

---

##### `alarmName`<sup>Optional</sup> <a name="alarmName" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarmProps.property.alarmName"></a>

```typescript
public readonly alarmName: string;
```

- *Type:* string
- *Default:* Automatically generated name

Name of the alarm.

---

##### `maxMonthly`<sup>Required</sup> <a name="maxMonthly" id="truemark-cdk-lib.aws_cloudwatch.EstimatedChargesAlarmProps.property.maxMonthly"></a>

```typescript
public readonly maxMonthly: number;
```

- *Type:* number

Amount in USD the estimated charges must be greater than to tigger the alarm.

---

### ExportedStackOptions <a name="ExportedStackOptions" id="truemark-cdk-lib.aws_codepipeline.ExportedStackOptions"></a>

Options for ExportedStackProps.

#### Initializer <a name="Initializer" id="truemark-cdk-lib.aws_codepipeline.ExportedStackOptions.Initializer"></a>

```typescript
import { aws_codepipeline } from 'truemark-cdk-lib'

const exportedStackOptions: aws_codepipeline.ExportedStackOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStackOptions.property.parameterExportsPrefix">parameterExportsPrefix</a></code> | <code>string</code> | *No description.* |

---

##### `parameterExportsPrefix`<sup>Optional</sup> <a name="parameterExportsPrefix" id="truemark-cdk-lib.aws_codepipeline.ExportedStackOptions.property.parameterExportsPrefix"></a>

```typescript
public readonly parameterExportsPrefix: string;
```

- *Type:* string

---

### ExportedStackProps <a name="ExportedStackProps" id="truemark-cdk-lib.aws_codepipeline.ExportedStackProps"></a>

Properties for ExportedStack.

#### Initializer <a name="Initializer" id="truemark-cdk-lib.aws_codepipeline.ExportedStackProps.Initializer"></a>

```typescript
import { aws_codepipeline } from 'truemark-cdk-lib'

const exportedStackProps: aws_codepipeline.ExportedStackProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStackProps.property.parameterExportsPrefix">parameterExportsPrefix</a></code> | <code>string</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStackProps.property.analyticsReporting">analyticsReporting</a></code> | <code>boolean</code> | Include runtime versioning information in this Stack. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStackProps.property.description">description</a></code> | <code>string</code> | A description of the stack. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStackProps.property.env">env</a></code> | <code>aws-cdk-lib.Environment</code> | The AWS environment (account/region) where this stack will be deployed. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStackProps.property.stackName">stackName</a></code> | <code>string</code> | Name to deploy the stack with. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStackProps.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method to use while deploying this stack. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStackProps.property.tags">tags</a></code> | <code>{[ key: string ]: string}</code> | Stack tags that will be applied to all the taggable resources and the stack itself. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.ExportedStackProps.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether to enable termination protection for this stack. |

---

##### `parameterExportsPrefix`<sup>Optional</sup> <a name="parameterExportsPrefix" id="truemark-cdk-lib.aws_codepipeline.ExportedStackProps.property.parameterExportsPrefix"></a>

```typescript
public readonly parameterExportsPrefix: string;
```

- *Type:* string

---

##### `analyticsReporting`<sup>Optional</sup> <a name="analyticsReporting" id="truemark-cdk-lib.aws_codepipeline.ExportedStackProps.property.analyticsReporting"></a>

```typescript
public readonly analyticsReporting: boolean;
```

- *Type:* boolean
- *Default:* `analyticsReporting` setting of containing `App`, or value of 'aws:cdk:version-reporting' context key

Include runtime versioning information in this Stack.

---

##### `description`<sup>Optional</sup> <a name="description" id="truemark-cdk-lib.aws_codepipeline.ExportedStackProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* No description.

A description of the stack.

---

##### `env`<sup>Optional</sup> <a name="env" id="truemark-cdk-lib.aws_codepipeline.ExportedStackProps.property.env"></a>

```typescript
public readonly env: Environment;
```

- *Type:* aws-cdk-lib.Environment
- *Default:* The environment of the containing `Stage` if available, otherwise create the stack will be environment-agnostic.

The AWS environment (account/region) where this stack will be deployed.

Set the `region`/`account` fields of `env` to either a concrete value to
select the indicated environment (recommended for production stacks), or to
the values of environment variables
`CDK_DEFAULT_REGION`/`CDK_DEFAULT_ACCOUNT` to let the target environment
depend on the AWS credentials/configuration that the CDK CLI is executed
under (recommended for development stacks).

If the `Stack` is instantiated inside a `Stage`, any undefined
`region`/`account` fields from `env` will default to the same field on the
encompassing `Stage`, if configured there.

If either `region` or `account` are not set nor inherited from `Stage`, the
Stack will be considered "*environment-agnostic*"". Environment-agnostic
stacks can be deployed to any environment but may not be able to take
advantage of all features of the CDK. For example, they will not be able to
use environmental context lookups such as `ec2.Vpc.fromLookup` and will not
automatically translate Service Principals to the right format based on the
environment's AWS partition, and other such enhancements.

---

*Example*

```typescript
// Use a concrete account and region to deploy this stack to:
// `.account` and `.region` will simply return these values.
new Stack(app, 'Stack1', {
  env: {
    account: '123456789012',
    region: 'us-east-1'
  },
});

// Use the CLI's current credentials to determine the target environment:
// `.account` and `.region` will reflect the account+region the CLI
// is configured to use (based on the user CLI credentials)
new Stack(app, 'Stack2', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  },
});

// Define multiple stacks stage associated with an environment
const myStage = new Stage(app, 'MyStage', {
  env: {
    account: '123456789012',
    region: 'us-east-1'
  }
});

// both of these stacks will use the stage's account/region:
// `.account` and `.region` will resolve to the concrete values as above
new MyStack(myStage, 'Stack1');
new YourStack(myStage, 'Stack2');

// Define an environment-agnostic stack:
// `.account` and `.region` will resolve to `{ "Ref": "AWS::AccountId" }` and `{ "Ref": "AWS::Region" }` respectively.
// which will only resolve to actual values by CloudFormation during deployment.
new MyStack(app, 'Stack1');
```


##### `stackName`<sup>Optional</sup> <a name="stackName" id="truemark-cdk-lib.aws_codepipeline.ExportedStackProps.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string
- *Default:* Derived from construct path.

Name to deploy the stack with.

---

##### `synthesizer`<sup>Optional</sup> <a name="synthesizer" id="truemark-cdk-lib.aws_codepipeline.ExportedStackProps.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer
- *Default:* `DefaultStackSynthesizer` if the `@aws-cdk/core:newStyleStackSynthesis` feature flag is set, `LegacyStackSynthesizer` otherwise.

Synthesis method to use while deploying this stack.

---

##### `tags`<sup>Optional</sup> <a name="tags" id="truemark-cdk-lib.aws_codepipeline.ExportedStackProps.property.tags"></a>

```typescript
public readonly tags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* {}

Stack tags that will be applied to all the taggable resources and the stack itself.

---

##### `terminationProtection`<sup>Optional</sup> <a name="terminationProtection" id="truemark-cdk-lib.aws_codepipeline.ExportedStackProps.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to enable termination protection for this stack.

---

### ExtendedAlarmProps <a name="ExtendedAlarmProps" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps"></a>

Properties for ExtendedAlarm.

#### Initializer <a name="Initializer" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.Initializer"></a>

```typescript
import { aws_cloudwatch } from 'truemark-cdk-lib'

const extendedAlarmProps: aws_cloudwatch.ExtendedAlarmProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.property.alarmActions">alarmActions</a></code> | <code>aws-cdk-lib.aws_cloudwatch.IAlarmAction[]</code> | Actions to trigger when alarm is breached. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.property.alarmTopics">alarmTopics</a></code> | <code>aws-cdk-lib.aws_sns.ITopic[]</code> | Topics to notify if alarm is breached. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.property.insufficientDataActions">insufficientDataActions</a></code> | <code>aws-cdk-lib.aws_cloudwatch.IAlarmAction[]</code> | Actions to take when an alarm has insufficient data. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.property.insufficientDataTopic">insufficientDataTopic</a></code> | <code>aws-cdk-lib.aws_sns.ITopic[]</code> | Topics to notify when alarm has insufficient data. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.property.okActions">okActions</a></code> | <code>aws-cdk-lib.aws_cloudwatch.IAlarmAction[]</code> | Actions to take when alarm returns to an ok status. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.property.okTopics">okTopics</a></code> | <code>aws-cdk-lib.aws_sns.ITopic[]</code> | Topics to notify when alarm returns to an ok status. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.property.evaluationPeriods">evaluationPeriods</a></code> | <code>number</code> | The number of periods over which data is compared to the specified threshold. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.property.threshold">threshold</a></code> | <code>number</code> | The value against which the specified statistic is compared. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.property.actionsEnabled">actionsEnabled</a></code> | <code>boolean</code> | Whether the actions for this alarm are enabled. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.property.alarmDescription">alarmDescription</a></code> | <code>string</code> | Description for the alarm. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.property.alarmName">alarmName</a></code> | <code>string</code> | Name of the alarm. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.property.comparisonOperator">comparisonOperator</a></code> | <code>aws-cdk-lib.aws_cloudwatch.ComparisonOperator</code> | Comparison to use to check if metric is breaching. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.property.datapointsToAlarm">datapointsToAlarm</a></code> | <code>number</code> | The number of datapoints that must be breaching to trigger the alarm. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.property.evaluateLowSampleCountPercentile">evaluateLowSampleCountPercentile</a></code> | <code>string</code> | Specifies whether to evaluate the data and potentially change the alarm state if there are too few data points to be statistically significant. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.property.treatMissingData">treatMissingData</a></code> | <code>aws-cdk-lib.aws_cloudwatch.TreatMissingData</code> | Sets how this alarm is to handle missing data points. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.property.metric">metric</a></code> | <code>aws-cdk-lib.aws_cloudwatch.IMetric</code> | The metric to add the alarm on. |

---

##### `alarmActions`<sup>Optional</sup> <a name="alarmActions" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.property.alarmActions"></a>

```typescript
public readonly alarmActions: IAlarmAction[];
```

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction[]

Actions to trigger when alarm is breached.

---

##### `alarmTopics`<sup>Optional</sup> <a name="alarmTopics" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.property.alarmTopics"></a>

```typescript
public readonly alarmTopics: ITopic[];
```

- *Type:* aws-cdk-lib.aws_sns.ITopic[]

Topics to notify if alarm is breached.

---

##### `insufficientDataActions`<sup>Optional</sup> <a name="insufficientDataActions" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.property.insufficientDataActions"></a>

```typescript
public readonly insufficientDataActions: IAlarmAction[];
```

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction[]

Actions to take when an alarm has insufficient data.

---

##### `insufficientDataTopic`<sup>Optional</sup> <a name="insufficientDataTopic" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.property.insufficientDataTopic"></a>

```typescript
public readonly insufficientDataTopic: ITopic[];
```

- *Type:* aws-cdk-lib.aws_sns.ITopic[]

Topics to notify when alarm has insufficient data.

---

##### `okActions`<sup>Optional</sup> <a name="okActions" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.property.okActions"></a>

```typescript
public readonly okActions: IAlarmAction[];
```

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction[]

Actions to take when alarm returns to an ok status.

---

##### `okTopics`<sup>Optional</sup> <a name="okTopics" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.property.okTopics"></a>

```typescript
public readonly okTopics: ITopic[];
```

- *Type:* aws-cdk-lib.aws_sns.ITopic[]

Topics to notify when alarm returns to an ok status.

---

##### `evaluationPeriods`<sup>Required</sup> <a name="evaluationPeriods" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.property.evaluationPeriods"></a>

```typescript
public readonly evaluationPeriods: number;
```

- *Type:* number

The number of periods over which data is compared to the specified threshold.

---

##### `threshold`<sup>Required</sup> <a name="threshold" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.property.threshold"></a>

```typescript
public readonly threshold: number;
```

- *Type:* number

The value against which the specified statistic is compared.

---

##### `actionsEnabled`<sup>Optional</sup> <a name="actionsEnabled" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.property.actionsEnabled"></a>

```typescript
public readonly actionsEnabled: boolean;
```

- *Type:* boolean
- *Default:* true

Whether the actions for this alarm are enabled.

---

##### `alarmDescription`<sup>Optional</sup> <a name="alarmDescription" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.property.alarmDescription"></a>

```typescript
public readonly alarmDescription: string;
```

- *Type:* string
- *Default:* No description

Description for the alarm.

---

##### `alarmName`<sup>Optional</sup> <a name="alarmName" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.property.alarmName"></a>

```typescript
public readonly alarmName: string;
```

- *Type:* string
- *Default:* Automatically generated name

Name of the alarm.

---

##### `comparisonOperator`<sup>Optional</sup> <a name="comparisonOperator" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.property.comparisonOperator"></a>

```typescript
public readonly comparisonOperator: ComparisonOperator;
```

- *Type:* aws-cdk-lib.aws_cloudwatch.ComparisonOperator
- *Default:* GreaterThanOrEqualToThreshold

Comparison to use to check if metric is breaching.

---

##### `datapointsToAlarm`<sup>Optional</sup> <a name="datapointsToAlarm" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.property.datapointsToAlarm"></a>

```typescript
public readonly datapointsToAlarm: number;
```

- *Type:* number
- *Default:* ``evaluationPeriods``

The number of datapoints that must be breaching to trigger the alarm.

This is used only if you are setting an "M
out of N" alarm. In that case, this value is the M. For more information, see Evaluating an Alarm in the Amazon
CloudWatch User Guide.

> [https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarm-evaluation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarm-evaluation)

---

##### `evaluateLowSampleCountPercentile`<sup>Optional</sup> <a name="evaluateLowSampleCountPercentile" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.property.evaluateLowSampleCountPercentile"></a>

```typescript
public readonly evaluateLowSampleCountPercentile: string;
```

- *Type:* string
- *Default:* Not configured.

Specifies whether to evaluate the data and potentially change the alarm state if there are too few data points to be statistically significant.

Used only for alarms that are based on percentiles.

---

##### `treatMissingData`<sup>Optional</sup> <a name="treatMissingData" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.property.treatMissingData"></a>

```typescript
public readonly treatMissingData: TreatMissingData;
```

- *Type:* aws-cdk-lib.aws_cloudwatch.TreatMissingData
- *Default:* TreatMissingData.Missing

Sets how this alarm is to handle missing data points.

---

##### `metric`<sup>Required</sup> <a name="metric" id="truemark-cdk-lib.aws_cloudwatch.ExtendedAlarmProps.property.metric"></a>

```typescript
public readonly metric: IMetric;
```

- *Type:* aws-cdk-lib.aws_cloudwatch.IMetric

The metric to add the alarm on.

Metric objects can be obtained from most resources, or you can construct
custom Metric objects by instantiating one.

---

### ExtendedCreateAlarmOptions <a name="ExtendedCreateAlarmOptions" id="truemark-cdk-lib.aws_cloudwatch.ExtendedCreateAlarmOptions"></a>

Extra options for ExtendedAlarmProps.

#### Initializer <a name="Initializer" id="truemark-cdk-lib.aws_cloudwatch.ExtendedCreateAlarmOptions.Initializer"></a>

```typescript
import { aws_cloudwatch } from 'truemark-cdk-lib'

const extendedCreateAlarmOptions: aws_cloudwatch.ExtendedCreateAlarmOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedCreateAlarmOptions.property.alarmActions">alarmActions</a></code> | <code>aws-cdk-lib.aws_cloudwatch.IAlarmAction[]</code> | Actions to trigger when alarm is breached. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedCreateAlarmOptions.property.alarmTopics">alarmTopics</a></code> | <code>aws-cdk-lib.aws_sns.ITopic[]</code> | Topics to notify if alarm is breached. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedCreateAlarmOptions.property.insufficientDataActions">insufficientDataActions</a></code> | <code>aws-cdk-lib.aws_cloudwatch.IAlarmAction[]</code> | Actions to take when an alarm has insufficient data. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedCreateAlarmOptions.property.insufficientDataTopic">insufficientDataTopic</a></code> | <code>aws-cdk-lib.aws_sns.ITopic[]</code> | Topics to notify when alarm has insufficient data. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedCreateAlarmOptions.property.okActions">okActions</a></code> | <code>aws-cdk-lib.aws_cloudwatch.IAlarmAction[]</code> | Actions to take when alarm returns to an ok status. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.ExtendedCreateAlarmOptions.property.okTopics">okTopics</a></code> | <code>aws-cdk-lib.aws_sns.ITopic[]</code> | Topics to notify when alarm returns to an ok status. |

---

##### `alarmActions`<sup>Optional</sup> <a name="alarmActions" id="truemark-cdk-lib.aws_cloudwatch.ExtendedCreateAlarmOptions.property.alarmActions"></a>

```typescript
public readonly alarmActions: IAlarmAction[];
```

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction[]

Actions to trigger when alarm is breached.

---

##### `alarmTopics`<sup>Optional</sup> <a name="alarmTopics" id="truemark-cdk-lib.aws_cloudwatch.ExtendedCreateAlarmOptions.property.alarmTopics"></a>

```typescript
public readonly alarmTopics: ITopic[];
```

- *Type:* aws-cdk-lib.aws_sns.ITopic[]

Topics to notify if alarm is breached.

---

##### `insufficientDataActions`<sup>Optional</sup> <a name="insufficientDataActions" id="truemark-cdk-lib.aws_cloudwatch.ExtendedCreateAlarmOptions.property.insufficientDataActions"></a>

```typescript
public readonly insufficientDataActions: IAlarmAction[];
```

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction[]

Actions to take when an alarm has insufficient data.

---

##### `insufficientDataTopic`<sup>Optional</sup> <a name="insufficientDataTopic" id="truemark-cdk-lib.aws_cloudwatch.ExtendedCreateAlarmOptions.property.insufficientDataTopic"></a>

```typescript
public readonly insufficientDataTopic: ITopic[];
```

- *Type:* aws-cdk-lib.aws_sns.ITopic[]

Topics to notify when alarm has insufficient data.

---

##### `okActions`<sup>Optional</sup> <a name="okActions" id="truemark-cdk-lib.aws_cloudwatch.ExtendedCreateAlarmOptions.property.okActions"></a>

```typescript
public readonly okActions: IAlarmAction[];
```

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction[]

Actions to take when alarm returns to an ok status.

---

##### `okTopics`<sup>Optional</sup> <a name="okTopics" id="truemark-cdk-lib.aws_cloudwatch.ExtendedCreateAlarmOptions.property.okTopics"></a>

```typescript
public readonly okTopics: ITopic[];
```

- *Type:* aws-cdk-lib.aws_sns.ITopic[]

Topics to notify when alarm returns to an ok status.

---

### LatencyARecordProps <a name="LatencyARecordProps" id="truemark-cdk-lib.aws_route53.LatencyARecordProps"></a>

Properties for LatencyARecord.

#### Initializer <a name="Initializer" id="truemark-cdk-lib.aws_route53.LatencyARecordProps.Initializer"></a>

```typescript
import { aws_route53 } from 'truemark-cdk-lib'

const latencyARecordProps: aws_route53.LatencyARecordProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_route53.LatencyARecordProps.property.zone">zone</a></code> | <code>aws-cdk-lib.aws_route53.IHostedZone</code> | The hosted zone in which to define the new record. |
| <code><a href="#truemark-cdk-lib.aws_route53.LatencyARecordProps.property.comment">comment</a></code> | <code>string</code> | A comment to add on the record. |
| <code><a href="#truemark-cdk-lib.aws_route53.LatencyARecordProps.property.deleteExisting">deleteExisting</a></code> | <code>boolean</code> | Whether to delete the same record set in the hosted zone if it already exists. |
| <code><a href="#truemark-cdk-lib.aws_route53.LatencyARecordProps.property.recordName">recordName</a></code> | <code>string</code> | The domain name for this record. |
| <code><a href="#truemark-cdk-lib.aws_route53.LatencyARecordProps.property.ttl">ttl</a></code> | <code>aws-cdk-lib.Duration</code> | The resource record cache time to live (TTL). |
| <code><a href="#truemark-cdk-lib.aws_route53.LatencyARecordProps.property.target">target</a></code> | <code>aws-cdk-lib.aws_route53.RecordTarget</code> | The target. |
| <code><a href="#truemark-cdk-lib.aws_route53.LatencyARecordProps.property.region">region</a></code> | <code>string</code> | The region to use for the record. |
| <code><a href="#truemark-cdk-lib.aws_route53.LatencyARecordProps.property.setIdentifier">setIdentifier</a></code> | <code>string</code> | The identifier to use for the record. |

---

##### `zone`<sup>Required</sup> <a name="zone" id="truemark-cdk-lib.aws_route53.LatencyARecordProps.property.zone"></a>

```typescript
public readonly zone: IHostedZone;
```

- *Type:* aws-cdk-lib.aws_route53.IHostedZone

The hosted zone in which to define the new record.

---

##### `comment`<sup>Optional</sup> <a name="comment" id="truemark-cdk-lib.aws_route53.LatencyARecordProps.property.comment"></a>

```typescript
public readonly comment: string;
```

- *Type:* string
- *Default:* no comment

A comment to add on the record.

---

##### `deleteExisting`<sup>Optional</sup> <a name="deleteExisting" id="truemark-cdk-lib.aws_route53.LatencyARecordProps.property.deleteExisting"></a>

```typescript
public readonly deleteExisting: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to delete the same record set in the hosted zone if it already exists.

This allows to deploy a new record set while minimizing the downtime because the
new record set will be created immediately after the existing one is deleted. It
also avoids "manual" actions to delete existing record sets.

---

##### `recordName`<sup>Optional</sup> <a name="recordName" id="truemark-cdk-lib.aws_route53.LatencyARecordProps.property.recordName"></a>

```typescript
public readonly recordName: string;
```

- *Type:* string
- *Default:* zone root

The domain name for this record.

---

##### `ttl`<sup>Optional</sup> <a name="ttl" id="truemark-cdk-lib.aws_route53.LatencyARecordProps.property.ttl"></a>

```typescript
public readonly ttl: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* Duration.minutes(30)

The resource record cache time to live (TTL).

---

##### `target`<sup>Required</sup> <a name="target" id="truemark-cdk-lib.aws_route53.LatencyARecordProps.property.target"></a>

```typescript
public readonly target: RecordTarget;
```

- *Type:* aws-cdk-lib.aws_route53.RecordTarget

The target.

---

##### `region`<sup>Optional</sup> <a name="region" id="truemark-cdk-lib.aws_route53.LatencyARecordProps.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string
- *Default:* Stack.of(this).region

The region to use for the record.

---

##### `setIdentifier`<sup>Optional</sup> <a name="setIdentifier" id="truemark-cdk-lib.aws_route53.LatencyARecordProps.property.setIdentifier"></a>

```typescript
public readonly setIdentifier: string;
```

- *Type:* string
- *Default:* Stack.of(this).region

The identifier to use for the record.

---

### LogMetricAlarmProps <a name="LogMetricAlarmProps" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarmProps"></a>

Properties for LogAlarm.

#### Initializer <a name="Initializer" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarmProps.Initializer"></a>

```typescript
import { aws_cloudwatch } from 'truemark-cdk-lib'

const logMetricAlarmProps: aws_cloudwatch.LogMetricAlarmProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarmProps.property.logGroup">logGroup</a></code> | <code>aws-cdk-lib.aws_logs.ILogGroup</code> | The log group to create the filter on. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarmProps.property.metricName">metricName</a></code> | <code>string</code> | The name of the metric to emit. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarmProps.property.pattern">pattern</a></code> | <code>string</code> | The pattern to apply to the logs. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarmProps.property.metricNamespace">metricNamespace</a></code> | <code>string</code> | The namespace of the metric to emit. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarmProps.property.actionsEnabled">actionsEnabled</a></code> | <code>boolean</code> | Whether the actions for this alarm are enabled. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarmProps.property.alarmDescription">alarmDescription</a></code> | <code>string</code> | Description for the alarm. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarmProps.property.alarmName">alarmName</a></code> | <code>string</code> | Name of the alarm. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarmProps.property.comparisonOperator">comparisonOperator</a></code> | <code>aws-cdk-lib.aws_cloudwatch.ComparisonOperator</code> | Comparison to use to check if metric is breaching. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarmProps.property.datapointsToAlarm">datapointsToAlarm</a></code> | <code>number</code> | The number of datapoints that must be breaching to trigger the alarm. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarmProps.property.evaluateLowSampleCountPercentile">evaluateLowSampleCountPercentile</a></code> | <code>string</code> | Specifies whether to evaluate the data and potentially change the alarm state if there are too few data points to be statistically significant. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarmProps.property.evaluationPeriods">evaluationPeriods</a></code> | <code>number</code> | The number of periods over which data is compared to the specified threshold. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarmProps.property.period">period</a></code> | <code>aws-cdk-lib.Duration</code> | The period over which statistics are applied. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarmProps.property.threshold">threshold</a></code> | <code>number</code> | The value against which the specified statistic is compared. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricAlarmProps.property.treatMissingData">treatMissingData</a></code> | <code>aws-cdk-lib.aws_cloudwatch.TreatMissingData</code> | Sets how this alarm is to handle missing data points. |

---

##### `logGroup`<sup>Required</sup> <a name="logGroup" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarmProps.property.logGroup"></a>

```typescript
public readonly logGroup: ILogGroup;
```

- *Type:* aws-cdk-lib.aws_logs.ILogGroup

The log group to create the filter on.

---

##### `metricName`<sup>Required</sup> <a name="metricName" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarmProps.property.metricName"></a>

```typescript
public readonly metricName: string;
```

- *Type:* string

The name of the metric to emit.

---

##### `pattern`<sup>Required</sup> <a name="pattern" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarmProps.property.pattern"></a>

```typescript
public readonly pattern: string;
```

- *Type:* string

The pattern to apply to the logs.

---

##### `metricNamespace`<sup>Optional</sup> <a name="metricNamespace" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarmProps.property.metricNamespace"></a>

```typescript
public readonly metricNamespace: string;
```

- *Type:* string
- *Default:* 'TrueMark/Logs'

The namespace of the metric to emit.

---

##### `actionsEnabled`<sup>Optional</sup> <a name="actionsEnabled" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarmProps.property.actionsEnabled"></a>

```typescript
public readonly actionsEnabled: boolean;
```

- *Type:* boolean
- *Default:* true

Whether the actions for this alarm are enabled.

---

##### `alarmDescription`<sup>Optional</sup> <a name="alarmDescription" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarmProps.property.alarmDescription"></a>

```typescript
public readonly alarmDescription: string;
```

- *Type:* string
- *Default:* No description

Description for the alarm.

---

##### `alarmName`<sup>Optional</sup> <a name="alarmName" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarmProps.property.alarmName"></a>

```typescript
public readonly alarmName: string;
```

- *Type:* string
- *Default:* Automatically generated name

Name of the alarm.

---

##### `comparisonOperator`<sup>Optional</sup> <a name="comparisonOperator" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarmProps.property.comparisonOperator"></a>

```typescript
public readonly comparisonOperator: ComparisonOperator;
```

- *Type:* aws-cdk-lib.aws_cloudwatch.ComparisonOperator
- *Default:* GreaterThanOrEqualToThreshold

Comparison to use to check if metric is breaching.

---

##### `datapointsToAlarm`<sup>Optional</sup> <a name="datapointsToAlarm" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarmProps.property.datapointsToAlarm"></a>

```typescript
public readonly datapointsToAlarm: number;
```

- *Type:* number
- *Default:* 1

The number of datapoints that must be breaching to trigger the alarm.

This is used only if you are setting an "M
out of N" alarm. In that case, this value is the M. For more information, see Evaluating an Alarm in the Amazon
CloudWatch User Guide.

> [https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarm-evaluation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarm-evaluation)

---

##### `evaluateLowSampleCountPercentile`<sup>Optional</sup> <a name="evaluateLowSampleCountPercentile" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarmProps.property.evaluateLowSampleCountPercentile"></a>

```typescript
public readonly evaluateLowSampleCountPercentile: string;
```

- *Type:* string
- *Default:* Not configured.

Specifies whether to evaluate the data and potentially change the alarm state if there are too few data points to be statistically significant.

Used only for alarms that are based on percentiles.

---

##### `evaluationPeriods`<sup>Optional</sup> <a name="evaluationPeriods" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarmProps.property.evaluationPeriods"></a>

```typescript
public readonly evaluationPeriods: number;
```

- *Type:* number
- *Default:* 2

The number of periods over which data is compared to the specified threshold.

---

##### `period`<sup>Optional</sup> <a name="period" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarmProps.property.period"></a>

```typescript
public readonly period: Duration;
```

- *Type:* aws-cdk-lib.Duration

The period over which statistics are applied.

Default is 5 minutes.

---

##### `threshold`<sup>Optional</sup> <a name="threshold" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarmProps.property.threshold"></a>

```typescript
public readonly threshold: number;
```

- *Type:* number
- *Default:* 1

The value against which the specified statistic is compared.

---

##### `treatMissingData`<sup>Optional</sup> <a name="treatMissingData" id="truemark-cdk-lib.aws_cloudwatch.LogMetricAlarmProps.property.treatMissingData"></a>

```typescript
public readonly treatMissingData: TreatMissingData;
```

- *Type:* aws-cdk-lib.aws_cloudwatch.TreatMissingData
- *Default:* TreatMissingData.Missing

Sets how this alarm is to handle missing data points.

---

### LogMetricFilterProps <a name="LogMetricFilterProps" id="truemark-cdk-lib.aws_cloudwatch.LogMetricFilterProps"></a>

Properties for LogMetricFilter.

#### Initializer <a name="Initializer" id="truemark-cdk-lib.aws_cloudwatch.LogMetricFilterProps.Initializer"></a>

```typescript
import { aws_cloudwatch } from 'truemark-cdk-lib'

const logMetricFilterProps: aws_cloudwatch.LogMetricFilterProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricFilterProps.property.logGroup">logGroup</a></code> | <code>aws-cdk-lib.aws_logs.ILogGroup</code> | The log group to create the filter on. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricFilterProps.property.metricName">metricName</a></code> | <code>string</code> | The name of the metric to emit. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricFilterProps.property.pattern">pattern</a></code> | <code>string</code> | The pattern to apply to the logs. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.LogMetricFilterProps.property.metricNamespace">metricNamespace</a></code> | <code>string</code> | The namespace of the metric to emit. |

---

##### `logGroup`<sup>Required</sup> <a name="logGroup" id="truemark-cdk-lib.aws_cloudwatch.LogMetricFilterProps.property.logGroup"></a>

```typescript
public readonly logGroup: ILogGroup;
```

- *Type:* aws-cdk-lib.aws_logs.ILogGroup

The log group to create the filter on.

---

##### `metricName`<sup>Required</sup> <a name="metricName" id="truemark-cdk-lib.aws_cloudwatch.LogMetricFilterProps.property.metricName"></a>

```typescript
public readonly metricName: string;
```

- *Type:* string

The name of the metric to emit.

---

##### `pattern`<sup>Required</sup> <a name="pattern" id="truemark-cdk-lib.aws_cloudwatch.LogMetricFilterProps.property.pattern"></a>

```typescript
public readonly pattern: string;
```

- *Type:* string

The pattern to apply to the logs.

---

##### `metricNamespace`<sup>Optional</sup> <a name="metricNamespace" id="truemark-cdk-lib.aws_cloudwatch.LogMetricFilterProps.property.metricNamespace"></a>

```typescript
public readonly metricNamespace: string;
```

- *Type:* string
- *Default:* 'TrueMark/Logs'

The namespace of the metric to emit.

---

### MetricAlarmBaseProps <a name="MetricAlarmBaseProps" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBaseProps"></a>

#### Initializer <a name="Initializer" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBaseProps.Initializer"></a>

```typescript
import { aws_cloudwatch } from 'truemark-cdk-lib'

const metricAlarmBaseProps: aws_cloudwatch.MetricAlarmBaseProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.MetricAlarmBaseProps.property.alarmActions">alarmActions</a></code> | <code>aws-cdk-lib.aws_cloudwatch.IAlarmAction[]</code> | Actions to trigger when alarm is breached. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.MetricAlarmBaseProps.property.alarmTopics">alarmTopics</a></code> | <code>aws-cdk-lib.aws_sns.ITopic[]</code> | Topics to notify if alarm is breached. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.MetricAlarmBaseProps.property.insufficientDataActions">insufficientDataActions</a></code> | <code>aws-cdk-lib.aws_cloudwatch.IAlarmAction[]</code> | Actions to take when an alarm has insufficient data. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.MetricAlarmBaseProps.property.insufficientDataTopic">insufficientDataTopic</a></code> | <code>aws-cdk-lib.aws_sns.ITopic[]</code> | Topics to notify when alarm has insufficient data. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.MetricAlarmBaseProps.property.okActions">okActions</a></code> | <code>aws-cdk-lib.aws_cloudwatch.IAlarmAction[]</code> | Actions to take when alarm returns to an ok status. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.MetricAlarmBaseProps.property.okTopics">okTopics</a></code> | <code>aws-cdk-lib.aws_sns.ITopic[]</code> | Topics to notify when alarm returns to an ok status. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.MetricAlarmBaseProps.property.alarmDescription">alarmDescription</a></code> | <code>string</code> | Description for the alarm. |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.MetricAlarmBaseProps.property.alarmName">alarmName</a></code> | <code>string</code> | Name of the alarm. |

---

##### `alarmActions`<sup>Optional</sup> <a name="alarmActions" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBaseProps.property.alarmActions"></a>

```typescript
public readonly alarmActions: IAlarmAction[];
```

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction[]

Actions to trigger when alarm is breached.

---

##### `alarmTopics`<sup>Optional</sup> <a name="alarmTopics" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBaseProps.property.alarmTopics"></a>

```typescript
public readonly alarmTopics: ITopic[];
```

- *Type:* aws-cdk-lib.aws_sns.ITopic[]

Topics to notify if alarm is breached.

---

##### `insufficientDataActions`<sup>Optional</sup> <a name="insufficientDataActions" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBaseProps.property.insufficientDataActions"></a>

```typescript
public readonly insufficientDataActions: IAlarmAction[];
```

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction[]

Actions to take when an alarm has insufficient data.

---

##### `insufficientDataTopic`<sup>Optional</sup> <a name="insufficientDataTopic" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBaseProps.property.insufficientDataTopic"></a>

```typescript
public readonly insufficientDataTopic: ITopic[];
```

- *Type:* aws-cdk-lib.aws_sns.ITopic[]

Topics to notify when alarm has insufficient data.

---

##### `okActions`<sup>Optional</sup> <a name="okActions" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBaseProps.property.okActions"></a>

```typescript
public readonly okActions: IAlarmAction[];
```

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction[]

Actions to take when alarm returns to an ok status.

---

##### `okTopics`<sup>Optional</sup> <a name="okTopics" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBaseProps.property.okTopics"></a>

```typescript
public readonly okTopics: ITopic[];
```

- *Type:* aws-cdk-lib.aws_sns.ITopic[]

Topics to notify when alarm returns to an ok status.

---

##### `alarmDescription`<sup>Optional</sup> <a name="alarmDescription" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBaseProps.property.alarmDescription"></a>

```typescript
public readonly alarmDescription: string;
```

- *Type:* string
- *Default:* No description

Description for the alarm.

---

##### `alarmName`<sup>Optional</sup> <a name="alarmName" id="truemark-cdk-lib.aws_cloudwatch.MetricAlarmBaseProps.property.alarmName"></a>

```typescript
public readonly alarmName: string;
```

- *Type:* string
- *Default:* Automatically generated name

Name of the alarm.

---

### ObservedTableProps <a name="ObservedTableProps" id="truemark-cdk-lib.aws_dynamodb.ObservedTableProps"></a>

Properties for ObservedTable.

#### Initializer <a name="Initializer" id="truemark-cdk-lib.aws_dynamodb.ObservedTableProps.Initializer"></a>

```typescript
import { aws_dynamodb } from 'truemark-cdk-lib'

const observedTableProps: aws_dynamodb.ObservedTableProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.partitionKey">partitionKey</a></code> | <code>aws-cdk-lib.aws_dynamodb.Attribute</code> | Partition key attribute definition. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.sortKey">sortKey</a></code> | <code>aws-cdk-lib.aws_dynamodb.Attribute</code> | Sort key attribute definition. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.billingMode">billingMode</a></code> | <code>aws-cdk-lib.aws_dynamodb.BillingMode</code> | Specify how you are charged for read and write throughput and how you manage capacity. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.contributorInsightsEnabled">contributorInsightsEnabled</a></code> | <code>boolean</code> | Whether CloudWatch contributor insights is enabled. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.encryption">encryption</a></code> | <code>aws-cdk-lib.aws_dynamodb.TableEncryption</code> | Whether server-side encryption with an AWS managed customer master key is enabled. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.encryptionKey">encryptionKey</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | External KMS key to use for table encryption. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.pointInTimeRecovery">pointInTimeRecovery</a></code> | <code>boolean</code> | Whether point-in-time recovery is enabled. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.readCapacity">readCapacity</a></code> | <code>number</code> | The read capacity for the table. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.removalPolicy">removalPolicy</a></code> | <code>aws-cdk-lib.RemovalPolicy</code> | The removal policy to apply to the DynamoDB Table. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.replicationRegions">replicationRegions</a></code> | <code>string[]</code> | Regions where replica tables will be created. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.replicationTimeout">replicationTimeout</a></code> | <code>aws-cdk-lib.Duration</code> | The timeout for a table replication operation in a single region. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.stream">stream</a></code> | <code>aws-cdk-lib.aws_dynamodb.StreamViewType</code> | When an item in the table is modified, StreamViewType determines what information is written to the stream for this table. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.tableClass">tableClass</a></code> | <code>aws-cdk-lib.aws_dynamodb.TableClass</code> | Specify the table class. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.timeToLiveAttribute">timeToLiveAttribute</a></code> | <code>string</code> | The name of TTL attribute. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.waitForReplicationToFinish">waitForReplicationToFinish</a></code> | <code>boolean</code> | Indicates whether CloudFormation stack waits for replication to finish. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.writeCapacity">writeCapacity</a></code> | <code>number</code> | The write capacity for the table. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.kinesisStream">kinesisStream</a></code> | <code>aws-cdk-lib.aws_kinesis.IStream</code> | Kinesis Data Stream to capture item-level changes for the table. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.tableName">tableName</a></code> | <code>string</code> | Enforces a particular physical table name. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.addToAlarmDashboard">addToAlarmDashboard</a></code> | <code>boolean</code> | Add widgets to alarm dashboard. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.addToDetailDashboard">addToDetailDashboard</a></code> | <code>boolean</code> | Add widgets to detailed dashboard. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.addToSummaryDashboard">addToSummaryDashboard</a></code> | <code>boolean</code> | Add widgets to summary dashboard. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.alarmNamePrefix">alarmNamePrefix</a></code> | <code>string</code> | Prefix for generated alarms. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.criticalAlarmOptions">criticalAlarmOptions</a></code> | <code>truemark-cdk-lib.aws_monitoring.AlarmsCategoryOptions</code> | Alarm thresholds for critical alarms. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.dashboardFactory">dashboardFactory</a></code> | <code>cdk-monitoring-constructs.IDashboardFactory</code> | The DashboardFactory to use when generating CloudWatch dashboards. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.monitoringFacade">monitoringFacade</a></code> | <code>cdk-monitoring-constructs.MonitoringFacade</code> | Main entry point for monitoring. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.warningAlarmOptions">warningAlarmOptions</a></code> | <code>truemark-cdk-lib.aws_monitoring.AlarmsCategoryOptions</code> | Alarm thresholds for warning alarms. |

---

##### `partitionKey`<sup>Required</sup> <a name="partitionKey" id="truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.partitionKey"></a>

```typescript
public readonly partitionKey: Attribute;
```

- *Type:* aws-cdk-lib.aws_dynamodb.Attribute

Partition key attribute definition.

---

##### `sortKey`<sup>Optional</sup> <a name="sortKey" id="truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.sortKey"></a>

```typescript
public readonly sortKey: Attribute;
```

- *Type:* aws-cdk-lib.aws_dynamodb.Attribute
- *Default:* no sort key

Sort key attribute definition.

---

##### `billingMode`<sup>Optional</sup> <a name="billingMode" id="truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.billingMode"></a>

```typescript
public readonly billingMode: BillingMode;
```

- *Type:* aws-cdk-lib.aws_dynamodb.BillingMode
- *Default:* PROVISIONED if `replicationRegions` is not specified, PAY_PER_REQUEST otherwise

Specify how you are charged for read and write throughput and how you manage capacity.

---

##### `contributorInsightsEnabled`<sup>Optional</sup> <a name="contributorInsightsEnabled" id="truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.contributorInsightsEnabled"></a>

```typescript
public readonly contributorInsightsEnabled: boolean;
```

- *Type:* boolean
- *Default:* false

Whether CloudWatch contributor insights is enabled.

---

##### `encryption`<sup>Optional</sup> <a name="encryption" id="truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.encryption"></a>

```typescript
public readonly encryption: TableEncryption;
```

- *Type:* aws-cdk-lib.aws_dynamodb.TableEncryption
- *Default:* server-side encryption is enabled with an AWS owned customer master key

Whether server-side encryption with an AWS managed customer master key is enabled.

This property cannot be set if `serverSideEncryption` is set.

> **NOTE**: if you set this to `CUSTOMER_MANAGED` and `encryptionKey` is not
> specified, the key that the Tablet generates for you will be created with
> default permissions. If you are using CDKv2, these permissions will be
> sufficient to enable the key for use with DynamoDB tables.  If you are
> using CDKv1, make sure the feature flag
> `@aws-cdk/aws-kms:defaultKeyPolicies` is set to `true` in your `cdk.json`.

---

##### `encryptionKey`<sup>Optional</sup> <a name="encryptionKey" id="truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.encryptionKey"></a>

```typescript
public readonly encryptionKey: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey
- *Default:* If `encryption` is set to `TableEncryption.CUSTOMER_MANAGED` and this property is undefined, a new KMS key will be created and associated with this table.

External KMS key to use for table encryption.

This property can only be set if `encryption` is set to `TableEncryption.CUSTOMER_MANAGED`.

---

##### `pointInTimeRecovery`<sup>Optional</sup> <a name="pointInTimeRecovery" id="truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.pointInTimeRecovery"></a>

```typescript
public readonly pointInTimeRecovery: boolean;
```

- *Type:* boolean
- *Default:* point-in-time recovery is disabled

Whether point-in-time recovery is enabled.

---

##### `readCapacity`<sup>Optional</sup> <a name="readCapacity" id="truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.readCapacity"></a>

```typescript
public readonly readCapacity: number;
```

- *Type:* number
- *Default:* 5

The read capacity for the table.

Careful if you add Global Secondary Indexes, as
those will share the table's provisioned throughput.

Can only be provided if billingMode is Provisioned.

---

##### `removalPolicy`<sup>Optional</sup> <a name="removalPolicy" id="truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.removalPolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* aws-cdk-lib.RemovalPolicy
- *Default:* RemovalPolicy.RETAIN

The removal policy to apply to the DynamoDB Table.

---

##### `replicationRegions`<sup>Optional</sup> <a name="replicationRegions" id="truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.replicationRegions"></a>

```typescript
public readonly replicationRegions: string[];
```

- *Type:* string[]
- *Default:* no replica tables are created

Regions where replica tables will be created.

---

##### `replicationTimeout`<sup>Optional</sup> <a name="replicationTimeout" id="truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.replicationTimeout"></a>

```typescript
public readonly replicationTimeout: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* Duration.minutes(30)

The timeout for a table replication operation in a single region.

---

##### `stream`<sup>Optional</sup> <a name="stream" id="truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.stream"></a>

```typescript
public readonly stream: StreamViewType;
```

- *Type:* aws-cdk-lib.aws_dynamodb.StreamViewType
- *Default:* streams are disabled unless `replicationRegions` is specified

When an item in the table is modified, StreamViewType determines what information is written to the stream for this table.

---

##### `tableClass`<sup>Optional</sup> <a name="tableClass" id="truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.tableClass"></a>

```typescript
public readonly tableClass: TableClass;
```

- *Type:* aws-cdk-lib.aws_dynamodb.TableClass
- *Default:* STANDARD

Specify the table class.

---

##### `timeToLiveAttribute`<sup>Optional</sup> <a name="timeToLiveAttribute" id="truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.timeToLiveAttribute"></a>

```typescript
public readonly timeToLiveAttribute: string;
```

- *Type:* string
- *Default:* TTL is disabled

The name of TTL attribute.

---

##### `waitForReplicationToFinish`<sup>Optional</sup> <a name="waitForReplicationToFinish" id="truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.waitForReplicationToFinish"></a>

```typescript
public readonly waitForReplicationToFinish: boolean;
```

- *Type:* boolean
- *Default:* true

Indicates whether CloudFormation stack waits for replication to finish.

If set to false, the CloudFormation resource will mark the resource as
created and replication will be completed asynchronously. This property is
ignored if replicationRegions property is not set.

DO NOT UNSET this property if adding/removing multiple replicationRegions
in one deployment, as CloudFormation only supports one region replication
at a time. CDK overcomes this limitation by waiting for replication to
finish before starting new replicationRegion.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-globaltable.html#cfn-dynamodb-globaltable-replicas](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-globaltable.html#cfn-dynamodb-globaltable-replicas)

---

##### `writeCapacity`<sup>Optional</sup> <a name="writeCapacity" id="truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.writeCapacity"></a>

```typescript
public readonly writeCapacity: number;
```

- *Type:* number
- *Default:* 5

The write capacity for the table.

Careful if you add Global Secondary Indexes, as
those will share the table's provisioned throughput.

Can only be provided if billingMode is Provisioned.

---

##### `kinesisStream`<sup>Optional</sup> <a name="kinesisStream" id="truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.kinesisStream"></a>

```typescript
public readonly kinesisStream: IStream;
```

- *Type:* aws-cdk-lib.aws_kinesis.IStream
- *Default:* no Kinesis Data Stream

Kinesis Data Stream to capture item-level changes for the table.

---

##### `tableName`<sup>Optional</sup> <a name="tableName" id="truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.tableName"></a>

```typescript
public readonly tableName: string;
```

- *Type:* string
- *Default:* <generated>

Enforces a particular physical table name.

---

##### `addToAlarmDashboard`<sup>Optional</sup> <a name="addToAlarmDashboard" id="truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.addToAlarmDashboard"></a>

```typescript
public readonly addToAlarmDashboard: boolean;
```

- *Type:* boolean
- *Default:* true

Add widgets to alarm dashboard.

---

##### `addToDetailDashboard`<sup>Optional</sup> <a name="addToDetailDashboard" id="truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.addToDetailDashboard"></a>

```typescript
public readonly addToDetailDashboard: boolean;
```

- *Type:* boolean
- *Default:* true

Add widgets to detailed dashboard.

---

##### `addToSummaryDashboard`<sup>Optional</sup> <a name="addToSummaryDashboard" id="truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.addToSummaryDashboard"></a>

```typescript
public readonly addToSummaryDashboard: boolean;
```

- *Type:* boolean
- *Default:* true

Add widgets to summary dashboard.

---

##### `alarmNamePrefix`<sup>Optional</sup> <a name="alarmNamePrefix" id="truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.alarmNamePrefix"></a>

```typescript
public readonly alarmNamePrefix: string;
```

- *Type:* string
- *Default:* Stack.of(this).stackName

Prefix for generated alarms.

---

##### `criticalAlarmOptions`<sup>Optional</sup> <a name="criticalAlarmOptions" id="truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.criticalAlarmOptions"></a>

```typescript
public readonly criticalAlarmOptions: AlarmsCategoryOptions;
```

- *Type:* truemark-cdk-lib.aws_monitoring.AlarmsCategoryOptions

Alarm thresholds for critical alarms.

If no properties are provided, a set of default alarms are created.

---

##### `dashboardFactory`<sup>Optional</sup> <a name="dashboardFactory" id="truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.dashboardFactory"></a>

```typescript
public readonly dashboardFactory: IDashboardFactory;
```

- *Type:* cdk-monitoring-constructs.IDashboardFactory

The DashboardFactory to use when generating CloudWatch dashboards.

If not defined, dashboards are not generated.

---

##### `monitoringFacade`<sup>Optional</sup> <a name="monitoringFacade" id="truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.monitoringFacade"></a>

```typescript
public readonly monitoringFacade: MonitoringFacade;
```

- *Type:* cdk-monitoring-constructs.MonitoringFacade

Main entry point for monitoring.

If no value is provided, a default facade will be created.

---

##### `warningAlarmOptions`<sup>Optional</sup> <a name="warningAlarmOptions" id="truemark-cdk-lib.aws_dynamodb.ObservedTableProps.property.warningAlarmOptions"></a>

```typescript
public readonly warningAlarmOptions: AlarmsCategoryOptions;
```

- *Type:* truemark-cdk-lib.aws_monitoring.AlarmsCategoryOptions

Alarm thresholds for warning alarms.

If no properties are provided, a set of default alarms are created.

---

### ParameterReaderProps <a name="ParameterReaderProps" id="truemark-cdk-lib.aws_ssm.ParameterReaderProps"></a>

Properties for ParameterReader.

#### Initializer <a name="Initializer" id="truemark-cdk-lib.aws_ssm.ParameterReaderProps.Initializer"></a>

```typescript
import { aws_ssm } from 'truemark-cdk-lib'

const parameterReaderProps: aws_ssm.ParameterReaderProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_ssm.ParameterReaderProps.property.parameterName">parameterName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_ssm.ParameterReaderProps.property.region">region</a></code> | <code>string</code> | *No description.* |

---

##### `parameterName`<sup>Required</sup> <a name="parameterName" id="truemark-cdk-lib.aws_ssm.ParameterReaderProps.property.parameterName"></a>

```typescript
public readonly parameterName: string;
```

- *Type:* string

---

##### `region`<sup>Required</sup> <a name="region" id="truemark-cdk-lib.aws_ssm.ParameterReaderProps.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

---

### ParameterStoreOptions <a name="ParameterStoreOptions" id="truemark-cdk-lib.aws_ssm.ParameterStoreOptions"></a>

Properties for ParameterStore.

#### Initializer <a name="Initializer" id="truemark-cdk-lib.aws_ssm.ParameterStoreOptions.Initializer"></a>

```typescript
import { aws_ssm } from 'truemark-cdk-lib'

const parameterStoreOptions: aws_ssm.ParameterStoreOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_ssm.ParameterStoreOptions.property.prefix">prefix</a></code> | <code>string</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_ssm.ParameterStoreOptions.property.region">region</a></code> | <code>string</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_ssm.ParameterStoreOptions.property.suffix">suffix</a></code> | <code>string</code> | *No description.* |

---

##### `prefix`<sup>Optional</sup> <a name="prefix" id="truemark-cdk-lib.aws_ssm.ParameterStoreOptions.property.prefix"></a>

```typescript
public readonly prefix: string;
```

- *Type:* string

---

##### `region`<sup>Optional</sup> <a name="region" id="truemark-cdk-lib.aws_ssm.ParameterStoreOptions.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

---

##### `suffix`<sup>Optional</sup> <a name="suffix" id="truemark-cdk-lib.aws_ssm.ParameterStoreOptions.property.suffix"></a>

```typescript
public readonly suffix: string;
```

- *Type:* string

---

### PipelineNotificationRuleProps <a name="PipelineNotificationRuleProps" id="truemark-cdk-lib.aws_codepipeline.PipelineNotificationRuleProps"></a>

Properties for PipelineNotificationRule.

#### Initializer <a name="Initializer" id="truemark-cdk-lib.aws_codepipeline.PipelineNotificationRuleProps.Initializer"></a>

```typescript
import { aws_codepipeline } from 'truemark-cdk-lib'

const pipelineNotificationRuleProps: aws_codepipeline.PipelineNotificationRuleProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.PipelineNotificationRuleProps.property.slackChannelConfigurationArn">slackChannelConfigurationArn</a></code> | <code>string</code> | Arn of the Slack channel to notify. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.PipelineNotificationRuleProps.property.source">source</a></code> | <code>aws-cdk-lib.aws_codepipeline.IPipeline</code> | Pipeline source for the events. |
| <code><a href="#truemark-cdk-lib.aws_codepipeline.PipelineNotificationRuleProps.property.events">events</a></code> | <code>string[]</code> | The events to notify on. |

---

##### `slackChannelConfigurationArn`<sup>Required</sup> <a name="slackChannelConfigurationArn" id="truemark-cdk-lib.aws_codepipeline.PipelineNotificationRuleProps.property.slackChannelConfigurationArn"></a>

```typescript
public readonly slackChannelConfigurationArn: string;
```

- *Type:* string

Arn of the Slack channel to notify.

---

##### `source`<sup>Required</sup> <a name="source" id="truemark-cdk-lib.aws_codepipeline.PipelineNotificationRuleProps.property.source"></a>

```typescript
public readonly source: IPipeline;
```

- *Type:* aws-cdk-lib.aws_codepipeline.IPipeline

Pipeline source for the events.

---

##### `events`<sup>Optional</sup> <a name="events" id="truemark-cdk-lib.aws_codepipeline.PipelineNotificationRuleProps.property.events"></a>

```typescript
public readonly events: string[];
```

- *Type:* string[]
- *Default:* PipelineNotificationRule.PIPELINE_EXECUTION_EVENTS

The events to notify on.

> [https://docs.aws.amazon.com/dtconsole/latest/userguide/concepts.html#events-ref-pipeline](https://docs.aws.amazon.com/dtconsole/latest/userguide/concepts.html#events-ref-pipeline)

---

### StandardAlarmActionsStrategyProps <a name="StandardAlarmActionsStrategyProps" id="truemark-cdk-lib.aws_monitoring.StandardAlarmActionsStrategyProps"></a>

Properties for StandardAlarmActionsStrategy.

#### Initializer <a name="Initializer" id="truemark-cdk-lib.aws_monitoring.StandardAlarmActionsStrategyProps.Initializer"></a>

```typescript
import { aws_monitoring } from 'truemark-cdk-lib'

const standardAlarmActionsStrategyProps: aws_monitoring.StandardAlarmActionsStrategyProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_monitoring.StandardAlarmActionsStrategyProps.property.actions">actions</a></code> | <code>aws-cdk-lib.aws_cloudwatch.IAlarmAction[]</code> | *No description.* |

---

##### `actions`<sup>Optional</sup> <a name="actions" id="truemark-cdk-lib.aws_monitoring.StandardAlarmActionsStrategyProps.property.actions"></a>

```typescript
public readonly actions: IAlarmAction[];
```

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction[]

---

### TableAlarmsCategoryOptions <a name="TableAlarmsCategoryOptions" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions"></a>

Category options for CloudWatch alarms for DynamoDB Tables.

#### Initializer <a name="Initializer" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.Initializer"></a>

```typescript
import { aws_dynamodb } from 'truemark-cdk-lib'

const tableAlarmsCategoryOptions: aws_dynamodb.TableAlarmsCategoryOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.property.notifyActions">notifyActions</a></code> | <code>aws-cdk-lib.aws_cloudwatch.IAlarmAction[]</code> | Actions to send alarm notifications. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.property.notifyTopics">notifyTopics</a></code> | <code>aws-cdk-lib.aws_sns.ITopic[]</code> | Topics to send alarm notifications. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.property.averageSuccessfulBatchGetItemLatency">averageSuccessfulBatchGetItemLatency</a></code> | <code>aws-cdk-lib.Duration</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.property.averageSuccessfulBatchWriteItemLatency">averageSuccessfulBatchWriteItemLatency</a></code> | <code>aws-cdk-lib.Duration</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.property.averageSuccessfulDeleteItemLatency">averageSuccessfulDeleteItemLatency</a></code> | <code>aws-cdk-lib.Duration</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.property.averageSuccessfulGetItemLatency">averageSuccessfulGetItemLatency</a></code> | <code>aws-cdk-lib.Duration</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.property.averageSuccessfulGetRecordsLatency">averageSuccessfulGetRecordsLatency</a></code> | <code>aws-cdk-lib.Duration</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.property.averageSuccessfulPutItemLatency">averageSuccessfulPutItemLatency</a></code> | <code>aws-cdk-lib.Duration</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.property.averageSuccessfulQueryLatency">averageSuccessfulQueryLatency</a></code> | <code>aws-cdk-lib.Duration</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.property.averageSuccessfulScanLatency">averageSuccessfulScanLatency</a></code> | <code>aws-cdk-lib.Duration</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.property.averageSuccessfulUpdateItemLatency">averageSuccessfulUpdateItemLatency</a></code> | <code>aws-cdk-lib.Duration</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.property.maxConsumedReadCapacity">maxConsumedReadCapacity</a></code> | <code>number</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.property.maxConsumedWriteCapacity">maxConsumedWriteCapacity</a></code> | <code>number</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.property.maxReadThrottledEventsCount">maxReadThrottledEventsCount</a></code> | <code>number</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.property.maxSystemErrorCount">maxSystemErrorCount</a></code> | <code>number</code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.property.maxWriteThrottledEventsCount">maxWriteThrottledEventsCount</a></code> | <code>number</code> | *No description.* |

---

##### `notifyActions`<sup>Optional</sup> <a name="notifyActions" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.property.notifyActions"></a>

```typescript
public readonly notifyActions: IAlarmAction[];
```

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction[]

Actions to send alarm notifications.

---

##### `notifyTopics`<sup>Optional</sup> <a name="notifyTopics" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.property.notifyTopics"></a>

```typescript
public readonly notifyTopics: ITopic[];
```

- *Type:* aws-cdk-lib.aws_sns.ITopic[]

Topics to send alarm notifications.

---

##### `averageSuccessfulBatchGetItemLatency`<sup>Optional</sup> <a name="averageSuccessfulBatchGetItemLatency" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.property.averageSuccessfulBatchGetItemLatency"></a>

```typescript
public readonly averageSuccessfulBatchGetItemLatency: Duration;
```

- *Type:* aws-cdk-lib.Duration

---

##### `averageSuccessfulBatchWriteItemLatency`<sup>Optional</sup> <a name="averageSuccessfulBatchWriteItemLatency" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.property.averageSuccessfulBatchWriteItemLatency"></a>

```typescript
public readonly averageSuccessfulBatchWriteItemLatency: Duration;
```

- *Type:* aws-cdk-lib.Duration

---

##### `averageSuccessfulDeleteItemLatency`<sup>Optional</sup> <a name="averageSuccessfulDeleteItemLatency" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.property.averageSuccessfulDeleteItemLatency"></a>

```typescript
public readonly averageSuccessfulDeleteItemLatency: Duration;
```

- *Type:* aws-cdk-lib.Duration

---

##### `averageSuccessfulGetItemLatency`<sup>Optional</sup> <a name="averageSuccessfulGetItemLatency" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.property.averageSuccessfulGetItemLatency"></a>

```typescript
public readonly averageSuccessfulGetItemLatency: Duration;
```

- *Type:* aws-cdk-lib.Duration

---

##### `averageSuccessfulGetRecordsLatency`<sup>Optional</sup> <a name="averageSuccessfulGetRecordsLatency" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.property.averageSuccessfulGetRecordsLatency"></a>

```typescript
public readonly averageSuccessfulGetRecordsLatency: Duration;
```

- *Type:* aws-cdk-lib.Duration

---

##### `averageSuccessfulPutItemLatency`<sup>Optional</sup> <a name="averageSuccessfulPutItemLatency" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.property.averageSuccessfulPutItemLatency"></a>

```typescript
public readonly averageSuccessfulPutItemLatency: Duration;
```

- *Type:* aws-cdk-lib.Duration

---

##### `averageSuccessfulQueryLatency`<sup>Optional</sup> <a name="averageSuccessfulQueryLatency" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.property.averageSuccessfulQueryLatency"></a>

```typescript
public readonly averageSuccessfulQueryLatency: Duration;
```

- *Type:* aws-cdk-lib.Duration

---

##### `averageSuccessfulScanLatency`<sup>Optional</sup> <a name="averageSuccessfulScanLatency" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.property.averageSuccessfulScanLatency"></a>

```typescript
public readonly averageSuccessfulScanLatency: Duration;
```

- *Type:* aws-cdk-lib.Duration

---

##### `averageSuccessfulUpdateItemLatency`<sup>Optional</sup> <a name="averageSuccessfulUpdateItemLatency" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.property.averageSuccessfulUpdateItemLatency"></a>

```typescript
public readonly averageSuccessfulUpdateItemLatency: Duration;
```

- *Type:* aws-cdk-lib.Duration

---

##### `maxConsumedReadCapacity`<sup>Optional</sup> <a name="maxConsumedReadCapacity" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.property.maxConsumedReadCapacity"></a>

```typescript
public readonly maxConsumedReadCapacity: number;
```

- *Type:* number

---

##### `maxConsumedWriteCapacity`<sup>Optional</sup> <a name="maxConsumedWriteCapacity" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.property.maxConsumedWriteCapacity"></a>

```typescript
public readonly maxConsumedWriteCapacity: number;
```

- *Type:* number

---

##### `maxReadThrottledEventsCount`<sup>Optional</sup> <a name="maxReadThrottledEventsCount" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.property.maxReadThrottledEventsCount"></a>

```typescript
public readonly maxReadThrottledEventsCount: number;
```

- *Type:* number

---

##### `maxSystemErrorCount`<sup>Optional</sup> <a name="maxSystemErrorCount" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.property.maxSystemErrorCount"></a>

```typescript
public readonly maxSystemErrorCount: number;
```

- *Type:* number

---

##### `maxWriteThrottledEventsCount`<sup>Optional</sup> <a name="maxWriteThrottledEventsCount" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsCategoryOptions.property.maxWriteThrottledEventsCount"></a>

```typescript
public readonly maxWriteThrottledEventsCount: number;
```

- *Type:* number

---

### TableAlarmsOptions <a name="TableAlarmsOptions" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsOptions"></a>

Options for TableAlarms.

#### Initializer <a name="Initializer" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsOptions.Initializer"></a>

```typescript
import { aws_dynamodb } from 'truemark-cdk-lib'

const tableAlarmsOptions: aws_dynamodb.TableAlarmsOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsOptions.property.addToAlarmDashboard">addToAlarmDashboard</a></code> | <code>boolean</code> | Add widgets to alarm dashboard. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsOptions.property.addToDetailDashboard">addToDetailDashboard</a></code> | <code>boolean</code> | Add widgets to detailed dashboard. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsOptions.property.addToSummaryDashboard">addToSummaryDashboard</a></code> | <code>boolean</code> | Add widgets to summary dashboard. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsOptions.property.alarmNamePrefix">alarmNamePrefix</a></code> | <code>string</code> | Prefix for generated alarms. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsOptions.property.criticalAlarmOptions">criticalAlarmOptions</a></code> | <code>truemark-cdk-lib.aws_monitoring.AlarmsCategoryOptions</code> | Alarm thresholds for critical alarms. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsOptions.property.dashboardFactory">dashboardFactory</a></code> | <code>cdk-monitoring-constructs.IDashboardFactory</code> | The DashboardFactory to use when generating CloudWatch dashboards. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsOptions.property.monitoringFacade">monitoringFacade</a></code> | <code>cdk-monitoring-constructs.MonitoringFacade</code> | Main entry point for monitoring. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsOptions.property.warningAlarmOptions">warningAlarmOptions</a></code> | <code>truemark-cdk-lib.aws_monitoring.AlarmsCategoryOptions</code> | Alarm thresholds for warning alarms. |

---

##### `addToAlarmDashboard`<sup>Optional</sup> <a name="addToAlarmDashboard" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsOptions.property.addToAlarmDashboard"></a>

```typescript
public readonly addToAlarmDashboard: boolean;
```

- *Type:* boolean
- *Default:* true

Add widgets to alarm dashboard.

---

##### `addToDetailDashboard`<sup>Optional</sup> <a name="addToDetailDashboard" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsOptions.property.addToDetailDashboard"></a>

```typescript
public readonly addToDetailDashboard: boolean;
```

- *Type:* boolean
- *Default:* true

Add widgets to detailed dashboard.

---

##### `addToSummaryDashboard`<sup>Optional</sup> <a name="addToSummaryDashboard" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsOptions.property.addToSummaryDashboard"></a>

```typescript
public readonly addToSummaryDashboard: boolean;
```

- *Type:* boolean
- *Default:* true

Add widgets to summary dashboard.

---

##### `alarmNamePrefix`<sup>Optional</sup> <a name="alarmNamePrefix" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsOptions.property.alarmNamePrefix"></a>

```typescript
public readonly alarmNamePrefix: string;
```

- *Type:* string
- *Default:* Stack.of(this).stackName

Prefix for generated alarms.

---

##### `criticalAlarmOptions`<sup>Optional</sup> <a name="criticalAlarmOptions" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsOptions.property.criticalAlarmOptions"></a>

```typescript
public readonly criticalAlarmOptions: AlarmsCategoryOptions;
```

- *Type:* truemark-cdk-lib.aws_monitoring.AlarmsCategoryOptions

Alarm thresholds for critical alarms.

If no properties are provided, a set of default alarms are created.

---

##### `dashboardFactory`<sup>Optional</sup> <a name="dashboardFactory" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsOptions.property.dashboardFactory"></a>

```typescript
public readonly dashboardFactory: IDashboardFactory;
```

- *Type:* cdk-monitoring-constructs.IDashboardFactory

The DashboardFactory to use when generating CloudWatch dashboards.

If not defined, dashboards are not generated.

---

##### `monitoringFacade`<sup>Optional</sup> <a name="monitoringFacade" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsOptions.property.monitoringFacade"></a>

```typescript
public readonly monitoringFacade: MonitoringFacade;
```

- *Type:* cdk-monitoring-constructs.MonitoringFacade

Main entry point for monitoring.

If no value is provided, a default facade will be created.

---

##### `warningAlarmOptions`<sup>Optional</sup> <a name="warningAlarmOptions" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsOptions.property.warningAlarmOptions"></a>

```typescript
public readonly warningAlarmOptions: AlarmsCategoryOptions;
```

- *Type:* truemark-cdk-lib.aws_monitoring.AlarmsCategoryOptions

Alarm thresholds for warning alarms.

If no properties are provided, a set of default alarms are created.

---

### TableAlarmsProps <a name="TableAlarmsProps" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsProps"></a>

Properties for TableAlarms.

#### Initializer <a name="Initializer" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsProps.Initializer"></a>

```typescript
import { aws_dynamodb } from 'truemark-cdk-lib'

const tableAlarmsProps: aws_dynamodb.TableAlarmsProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsProps.property.addToAlarmDashboard">addToAlarmDashboard</a></code> | <code>boolean</code> | Add widgets to alarm dashboard. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsProps.property.addToDetailDashboard">addToDetailDashboard</a></code> | <code>boolean</code> | Add widgets to detailed dashboard. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsProps.property.addToSummaryDashboard">addToSummaryDashboard</a></code> | <code>boolean</code> | Add widgets to summary dashboard. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsProps.property.alarmNamePrefix">alarmNamePrefix</a></code> | <code>string</code> | Prefix for generated alarms. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsProps.property.criticalAlarmOptions">criticalAlarmOptions</a></code> | <code>truemark-cdk-lib.aws_monitoring.AlarmsCategoryOptions</code> | Alarm thresholds for critical alarms. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsProps.property.dashboardFactory">dashboardFactory</a></code> | <code>cdk-monitoring-constructs.IDashboardFactory</code> | The DashboardFactory to use when generating CloudWatch dashboards. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsProps.property.monitoringFacade">monitoringFacade</a></code> | <code>cdk-monitoring-constructs.MonitoringFacade</code> | Main entry point for monitoring. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsProps.property.warningAlarmOptions">warningAlarmOptions</a></code> | <code>truemark-cdk-lib.aws_monitoring.AlarmsCategoryOptions</code> | Alarm thresholds for warning alarms. |
| <code><a href="#truemark-cdk-lib.aws_dynamodb.TableAlarmsProps.property.table">table</a></code> | <code>aws-cdk-lib.aws_dynamodb.ITable</code> | The table to create alarms for. |

---

##### `addToAlarmDashboard`<sup>Optional</sup> <a name="addToAlarmDashboard" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsProps.property.addToAlarmDashboard"></a>

```typescript
public readonly addToAlarmDashboard: boolean;
```

- *Type:* boolean
- *Default:* true

Add widgets to alarm dashboard.

---

##### `addToDetailDashboard`<sup>Optional</sup> <a name="addToDetailDashboard" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsProps.property.addToDetailDashboard"></a>

```typescript
public readonly addToDetailDashboard: boolean;
```

- *Type:* boolean
- *Default:* true

Add widgets to detailed dashboard.

---

##### `addToSummaryDashboard`<sup>Optional</sup> <a name="addToSummaryDashboard" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsProps.property.addToSummaryDashboard"></a>

```typescript
public readonly addToSummaryDashboard: boolean;
```

- *Type:* boolean
- *Default:* true

Add widgets to summary dashboard.

---

##### `alarmNamePrefix`<sup>Optional</sup> <a name="alarmNamePrefix" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsProps.property.alarmNamePrefix"></a>

```typescript
public readonly alarmNamePrefix: string;
```

- *Type:* string
- *Default:* Stack.of(this).stackName

Prefix for generated alarms.

---

##### `criticalAlarmOptions`<sup>Optional</sup> <a name="criticalAlarmOptions" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsProps.property.criticalAlarmOptions"></a>

```typescript
public readonly criticalAlarmOptions: AlarmsCategoryOptions;
```

- *Type:* truemark-cdk-lib.aws_monitoring.AlarmsCategoryOptions

Alarm thresholds for critical alarms.

If no properties are provided, a set of default alarms are created.

---

##### `dashboardFactory`<sup>Optional</sup> <a name="dashboardFactory" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsProps.property.dashboardFactory"></a>

```typescript
public readonly dashboardFactory: IDashboardFactory;
```

- *Type:* cdk-monitoring-constructs.IDashboardFactory

The DashboardFactory to use when generating CloudWatch dashboards.

If not defined, dashboards are not generated.

---

##### `monitoringFacade`<sup>Optional</sup> <a name="monitoringFacade" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsProps.property.monitoringFacade"></a>

```typescript
public readonly monitoringFacade: MonitoringFacade;
```

- *Type:* cdk-monitoring-constructs.MonitoringFacade

Main entry point for monitoring.

If no value is provided, a default facade will be created.

---

##### `warningAlarmOptions`<sup>Optional</sup> <a name="warningAlarmOptions" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsProps.property.warningAlarmOptions"></a>

```typescript
public readonly warningAlarmOptions: AlarmsCategoryOptions;
```

- *Type:* truemark-cdk-lib.aws_monitoring.AlarmsCategoryOptions

Alarm thresholds for warning alarms.

If no properties are provided, a set of default alarms are created.

---

##### `table`<sup>Required</sup> <a name="table" id="truemark-cdk-lib.aws_dynamodb.TableAlarmsProps.property.table"></a>

```typescript
public readonly table: ITable;
```

- *Type:* aws-cdk-lib.aws_dynamodb.ITable

The table to create alarms for.

---

### WeightedARecordProps <a name="WeightedARecordProps" id="truemark-cdk-lib.aws_route53.WeightedARecordProps"></a>

Properties for WeightedARecord.

#### Initializer <a name="Initializer" id="truemark-cdk-lib.aws_route53.WeightedARecordProps.Initializer"></a>

```typescript
import { aws_route53 } from 'truemark-cdk-lib'

const weightedARecordProps: aws_route53.WeightedARecordProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedARecordProps.property.zone">zone</a></code> | <code>aws-cdk-lib.aws_route53.IHostedZone</code> | The hosted zone in which to define the new record. |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedARecordProps.property.comment">comment</a></code> | <code>string</code> | A comment to add on the record. |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedARecordProps.property.deleteExisting">deleteExisting</a></code> | <code>boolean</code> | Whether to delete the same record set in the hosted zone if it already exists. |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedARecordProps.property.recordName">recordName</a></code> | <code>string</code> | The domain name for this record. |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedARecordProps.property.ttl">ttl</a></code> | <code>aws-cdk-lib.Duration</code> | The resource record cache time to live (TTL). |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedARecordProps.property.target">target</a></code> | <code>aws-cdk-lib.aws_route53.RecordTarget</code> | The target. |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedARecordProps.property.setIdentifier">setIdentifier</a></code> | <code>string</code> | The identifier to use for the record. |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedARecordProps.property.weight">weight</a></code> | <code>number</code> | Weight for the record. |

---

##### `zone`<sup>Required</sup> <a name="zone" id="truemark-cdk-lib.aws_route53.WeightedARecordProps.property.zone"></a>

```typescript
public readonly zone: IHostedZone;
```

- *Type:* aws-cdk-lib.aws_route53.IHostedZone

The hosted zone in which to define the new record.

---

##### `comment`<sup>Optional</sup> <a name="comment" id="truemark-cdk-lib.aws_route53.WeightedARecordProps.property.comment"></a>

```typescript
public readonly comment: string;
```

- *Type:* string
- *Default:* no comment

A comment to add on the record.

---

##### `deleteExisting`<sup>Optional</sup> <a name="deleteExisting" id="truemark-cdk-lib.aws_route53.WeightedARecordProps.property.deleteExisting"></a>

```typescript
public readonly deleteExisting: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to delete the same record set in the hosted zone if it already exists.

This allows to deploy a new record set while minimizing the downtime because the
new record set will be created immediately after the existing one is deleted. It
also avoids "manual" actions to delete existing record sets.

---

##### `recordName`<sup>Optional</sup> <a name="recordName" id="truemark-cdk-lib.aws_route53.WeightedARecordProps.property.recordName"></a>

```typescript
public readonly recordName: string;
```

- *Type:* string
- *Default:* zone root

The domain name for this record.

---

##### `ttl`<sup>Optional</sup> <a name="ttl" id="truemark-cdk-lib.aws_route53.WeightedARecordProps.property.ttl"></a>

```typescript
public readonly ttl: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* Duration.minutes(30)

The resource record cache time to live (TTL).

---

##### `target`<sup>Required</sup> <a name="target" id="truemark-cdk-lib.aws_route53.WeightedARecordProps.property.target"></a>

```typescript
public readonly target: RecordTarget;
```

- *Type:* aws-cdk-lib.aws_route53.RecordTarget

The target.

---

##### `setIdentifier`<sup>Optional</sup> <a name="setIdentifier" id="truemark-cdk-lib.aws_route53.WeightedARecordProps.property.setIdentifier"></a>

```typescript
public readonly setIdentifier: string;
```

- *Type:* string
- *Default:* Stack.of(this).region

The identifier to use for the record.

---

##### `weight`<sup>Optional</sup> <a name="weight" id="truemark-cdk-lib.aws_route53.WeightedARecordProps.property.weight"></a>

```typescript
public readonly weight: number;
```

- *Type:* number
- *Default:* 0

Weight for the record.

---

### WeightedLatencyARecordProps <a name="WeightedLatencyARecordProps" id="truemark-cdk-lib.aws_route53.WeightedLatencyARecordProps"></a>

Properties for WeightedLatencyARecord.

#### Initializer <a name="Initializer" id="truemark-cdk-lib.aws_route53.WeightedLatencyARecordProps.Initializer"></a>

```typescript
import { aws_route53 } from 'truemark-cdk-lib'

const weightedLatencyARecordProps: aws_route53.WeightedLatencyARecordProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedLatencyARecordProps.property.zone">zone</a></code> | <code>aws-cdk-lib.aws_route53.IHostedZone</code> | The hosted zone in which to define the new record. |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedLatencyARecordProps.property.comment">comment</a></code> | <code>string</code> | A comment to add on the record. |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedLatencyARecordProps.property.deleteExisting">deleteExisting</a></code> | <code>boolean</code> | Whether to delete the same record set in the hosted zone if it already exists. |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedLatencyARecordProps.property.recordName">recordName</a></code> | <code>string</code> | The domain name for this record. |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedLatencyARecordProps.property.ttl">ttl</a></code> | <code>aws-cdk-lib.Duration</code> | The resource record cache time to live (TTL). |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedLatencyARecordProps.property.target">target</a></code> | <code>aws-cdk-lib.aws_route53.RecordTarget</code> | The target. |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedLatencyARecordProps.property.setIdentifier">setIdentifier</a></code> | <code>string</code> | The identifier to use for the record. |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedLatencyARecordProps.property.weight">weight</a></code> | <code>number</code> | Weight for the record. |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedLatencyARecordProps.property.region">region</a></code> | <code>string</code> | The region to use for the record. |
| <code><a href="#truemark-cdk-lib.aws_route53.WeightedLatencyARecordProps.property.latencyRecordPrefix">latencyRecordPrefix</a></code> | <code>string</code> | Value to use as a prefix on the latency route53 record. |

---

##### `zone`<sup>Required</sup> <a name="zone" id="truemark-cdk-lib.aws_route53.WeightedLatencyARecordProps.property.zone"></a>

```typescript
public readonly zone: IHostedZone;
```

- *Type:* aws-cdk-lib.aws_route53.IHostedZone

The hosted zone in which to define the new record.

---

##### `comment`<sup>Optional</sup> <a name="comment" id="truemark-cdk-lib.aws_route53.WeightedLatencyARecordProps.property.comment"></a>

```typescript
public readonly comment: string;
```

- *Type:* string
- *Default:* no comment

A comment to add on the record.

---

##### `deleteExisting`<sup>Optional</sup> <a name="deleteExisting" id="truemark-cdk-lib.aws_route53.WeightedLatencyARecordProps.property.deleteExisting"></a>

```typescript
public readonly deleteExisting: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to delete the same record set in the hosted zone if it already exists.

This allows to deploy a new record set while minimizing the downtime because the
new record set will be created immediately after the existing one is deleted. It
also avoids "manual" actions to delete existing record sets.

---

##### `recordName`<sup>Optional</sup> <a name="recordName" id="truemark-cdk-lib.aws_route53.WeightedLatencyARecordProps.property.recordName"></a>

```typescript
public readonly recordName: string;
```

- *Type:* string
- *Default:* zone root

The domain name for this record.

---

##### `ttl`<sup>Optional</sup> <a name="ttl" id="truemark-cdk-lib.aws_route53.WeightedLatencyARecordProps.property.ttl"></a>

```typescript
public readonly ttl: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* Duration.minutes(30)

The resource record cache time to live (TTL).

---

##### `target`<sup>Required</sup> <a name="target" id="truemark-cdk-lib.aws_route53.WeightedLatencyARecordProps.property.target"></a>

```typescript
public readonly target: RecordTarget;
```

- *Type:* aws-cdk-lib.aws_route53.RecordTarget

The target.

---

##### `setIdentifier`<sup>Optional</sup> <a name="setIdentifier" id="truemark-cdk-lib.aws_route53.WeightedLatencyARecordProps.property.setIdentifier"></a>

```typescript
public readonly setIdentifier: string;
```

- *Type:* string
- *Default:* Stack.of(this).region

The identifier to use for the record.

---

##### `weight`<sup>Optional</sup> <a name="weight" id="truemark-cdk-lib.aws_route53.WeightedLatencyARecordProps.property.weight"></a>

```typescript
public readonly weight: number;
```

- *Type:* number
- *Default:* 0

Weight for the record.

---

##### `region`<sup>Optional</sup> <a name="region" id="truemark-cdk-lib.aws_route53.WeightedLatencyARecordProps.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string
- *Default:* Stack.of(this).region

The region to use for the record.

---

##### `latencyRecordPrefix`<sup>Optional</sup> <a name="latencyRecordPrefix" id="truemark-cdk-lib.aws_route53.WeightedLatencyARecordProps.property.latencyRecordPrefix"></a>

```typescript
public readonly latencyRecordPrefix: string;
```

- *Type:* string
- *Default:* lbr

Value to use as a prefix on the latency route53 record.

---

## Classes <a name="Classes" id="Classes"></a>

### AlarmFacade <a name="AlarmFacade" id="truemark-cdk-lib.aws_monitoring.AlarmFacade"></a>

Facade to assist in generating a CustomAlarmThreshold instance.

#### Initializers <a name="Initializers" id="truemark-cdk-lib.aws_monitoring.AlarmFacade.Initializer"></a>

```typescript
import { aws_monitoring } from 'truemark-cdk-lib'

new aws_monitoring.AlarmFacade(props: AlarmFacadeProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmFacade.Initializer.parameter.props">props</a></code> | <code>truemark-cdk-lib.aws_monitoring.AlarmFacadeProps</code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="truemark-cdk-lib.aws_monitoring.AlarmFacade.Initializer.parameter.props"></a>

- *Type:* truemark-cdk-lib.aws_monitoring.AlarmFacadeProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmFacade.toCustomAlarmThreshold">toCustomAlarmThreshold</a></code> | Converts this AlarmFacade into a CustomAlarmThreshold instance. |

---

##### `toCustomAlarmThreshold` <a name="toCustomAlarmThreshold" id="truemark-cdk-lib.aws_monitoring.AlarmFacade.toCustomAlarmThreshold"></a>

```typescript
public toCustomAlarmThreshold(): CustomAlarmThreshold
```

Converts this AlarmFacade into a CustomAlarmThreshold instance.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmFacade.property.actions">actions</a></code> | <code>aws-cdk-lib.aws_cloudwatch.IAlarmAction[]</code> | *No description.* |

---

##### `actions`<sup>Required</sup> <a name="actions" id="truemark-cdk-lib.aws_monitoring.AlarmFacade.property.actions"></a>

```typescript
public readonly actions: IAlarmAction[];
```

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction[]

---


### AlarmFacadeSet <a name="AlarmFacadeSet" id="truemark-cdk-lib.aws_monitoring.AlarmFacadeSet"></a>

Facade to assist in creating Record instances containing alarms.

TODO: I broke this as a problem to do with passing symbols around for JSII (not supported) - we will have to put it back to something that makes sense..

#### Initializers <a name="Initializers" id="truemark-cdk-lib.aws_monitoring.AlarmFacadeSet.Initializer"></a>

```typescript
import { aws_monitoring } from 'truemark-cdk-lib'

new aws_monitoring.AlarmFacadeSet(props: AlarmsOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmFacadeSet.Initializer.parameter.props">props</a></code> | <code>truemark-cdk-lib.aws_monitoring.AlarmsOptions</code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="truemark-cdk-lib.aws_monitoring.AlarmFacadeSet.Initializer.parameter.props"></a>

- *Type:* truemark-cdk-lib.aws_monitoring.AlarmsOptions

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmFacadeSet.addAlarm">addAlarm</a></code> | Add an alarm to the record set. |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmFacadeSet.addAlarms">addAlarms</a></code> | Adds critical and warning alarms to the record set. |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmFacadeSet.addCriticalAlarm">addCriticalAlarm</a></code> | Adds a critical alarm to the record set. |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmFacadeSet.addWarningAlarm">addWarningAlarm</a></code> | Adds a warning alarm to the record set. |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmFacadeSet.toRecord">toRecord</a></code> | Returns the record set if alarms were created and undefined if otherwise. |

---

##### `addAlarm` <a name="addAlarm" id="truemark-cdk-lib.aws_monitoring.AlarmFacadeSet.addAlarm"></a>

```typescript
public addAlarm(category: AlarmCategory, oprop: string, tprop: string, defaultThreshold?: number | Duration): AlarmFacadeSet
```

Add an alarm to the record set.

###### `category`<sup>Required</sup> <a name="category" id="truemark-cdk-lib.aws_monitoring.AlarmFacadeSet.addAlarm.parameter.category"></a>

- *Type:* truemark-cdk-lib.aws_monitoring.AlarmCategory

category of the alarm.

---

###### `oprop`<sup>Required</sup> <a name="oprop" id="truemark-cdk-lib.aws_monitoring.AlarmFacadeSet.addAlarm.parameter.oprop"></a>

- *Type:* string

property from the AlarmsCategoryOptions instance.

---

###### `tprop`<sup>Required</sup> <a name="tprop" id="truemark-cdk-lib.aws_monitoring.AlarmFacadeSet.addAlarm.parameter.tprop"></a>

- *Type:* string

property from the CustomAlarmThreshold instance.

---

###### `defaultThreshold`<sup>Optional</sup> <a name="defaultThreshold" id="truemark-cdk-lib.aws_monitoring.AlarmFacadeSet.addAlarm.parameter.defaultThreshold"></a>

- *Type:* number | aws-cdk-lib.Duration

optional default value for the threshold.

---

##### `addAlarms` <a name="addAlarms" id="truemark-cdk-lib.aws_monitoring.AlarmFacadeSet.addAlarms"></a>

```typescript
public addAlarms(oprop: string, tprop: string, defaultCriticalThreshold?: number | Duration, defaultWarningThreshold?: number | Duration): AlarmFacadeSet
```

Adds critical and warning alarms to the record set.

###### `oprop`<sup>Required</sup> <a name="oprop" id="truemark-cdk-lib.aws_monitoring.AlarmFacadeSet.addAlarms.parameter.oprop"></a>

- *Type:* string

property from the AlarmsCategoryOptions instance.

---

###### `tprop`<sup>Required</sup> <a name="tprop" id="truemark-cdk-lib.aws_monitoring.AlarmFacadeSet.addAlarms.parameter.tprop"></a>

- *Type:* string

property from the CustomAlarmThreshold instance.

---

###### `defaultCriticalThreshold`<sup>Optional</sup> <a name="defaultCriticalThreshold" id="truemark-cdk-lib.aws_monitoring.AlarmFacadeSet.addAlarms.parameter.defaultCriticalThreshold"></a>

- *Type:* number | aws-cdk-lib.Duration

optional default value for the critical threshold.

---

###### `defaultWarningThreshold`<sup>Optional</sup> <a name="defaultWarningThreshold" id="truemark-cdk-lib.aws_monitoring.AlarmFacadeSet.addAlarms.parameter.defaultWarningThreshold"></a>

- *Type:* number | aws-cdk-lib.Duration

optional default value for the warning threshold.

---

##### `addCriticalAlarm` <a name="addCriticalAlarm" id="truemark-cdk-lib.aws_monitoring.AlarmFacadeSet.addCriticalAlarm"></a>

```typescript
public addCriticalAlarm(oprop: string, tprop: string, defaultThreshold?: number | Duration): AlarmFacadeSet
```

Adds a critical alarm to the record set.

###### `oprop`<sup>Required</sup> <a name="oprop" id="truemark-cdk-lib.aws_monitoring.AlarmFacadeSet.addCriticalAlarm.parameter.oprop"></a>

- *Type:* string

property from the AlarmsCategoryOptions instance.

---

###### `tprop`<sup>Required</sup> <a name="tprop" id="truemark-cdk-lib.aws_monitoring.AlarmFacadeSet.addCriticalAlarm.parameter.tprop"></a>

- *Type:* string

property from the CustomAlarmThreshold instance.

---

###### `defaultThreshold`<sup>Optional</sup> <a name="defaultThreshold" id="truemark-cdk-lib.aws_monitoring.AlarmFacadeSet.addCriticalAlarm.parameter.defaultThreshold"></a>

- *Type:* number | aws-cdk-lib.Duration

optional default value for the threshold.

---

##### `addWarningAlarm` <a name="addWarningAlarm" id="truemark-cdk-lib.aws_monitoring.AlarmFacadeSet.addWarningAlarm"></a>

```typescript
public addWarningAlarm(oprop: string, tprop: string, defaultThreshold?: number | Duration): AlarmFacadeSet
```

Adds a warning alarm to the record set.

###### `oprop`<sup>Required</sup> <a name="oprop" id="truemark-cdk-lib.aws_monitoring.AlarmFacadeSet.addWarningAlarm.parameter.oprop"></a>

- *Type:* string

property from the AlarmsCategoryOptions instance.

---

###### `tprop`<sup>Required</sup> <a name="tprop" id="truemark-cdk-lib.aws_monitoring.AlarmFacadeSet.addWarningAlarm.parameter.tprop"></a>

- *Type:* string

property from the CustomAlarmThreshold instance.

---

###### `defaultThreshold`<sup>Optional</sup> <a name="defaultThreshold" id="truemark-cdk-lib.aws_monitoring.AlarmFacadeSet.addWarningAlarm.parameter.defaultThreshold"></a>

- *Type:* number | aws-cdk-lib.Duration

optional default value for the threshold.

---

##### `toRecord` <a name="toRecord" id="truemark-cdk-lib.aws_monitoring.AlarmFacadeSet.toRecord"></a>

```typescript
public toRecord(): {[ key: string ]: CustomAlarmThreshold}
```

Returns the record set if alarms were created and undefined if otherwise.




### AlarmHelper <a name="AlarmHelper" id="truemark-cdk-lib.aws_monitoring.AlarmHelper"></a>

#### Initializers <a name="Initializers" id="truemark-cdk-lib.aws_monitoring.AlarmHelper.Initializer"></a>

```typescript
import { aws_monitoring } from 'truemark-cdk-lib'

new aws_monitoring.AlarmHelper()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmHelper.combineActions">combineActions</a></code> | Helper function to combine an array if IAlarmAction and ITopic objects into a single IAlarmAction array. |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmHelper.toRecord">toRecord</a></code> | Helper function to generate categorized alarms. |

---

##### `combineActions` <a name="combineActions" id="truemark-cdk-lib.aws_monitoring.AlarmHelper.combineActions"></a>

```typescript
import { aws_monitoring } from 'truemark-cdk-lib'

aws_monitoring.AlarmHelper.combineActions(actions?: IAlarmAction[], topics?: ITopic[])
```

Helper function to combine an array if IAlarmAction and ITopic objects into a single IAlarmAction array.

###### `actions`<sup>Optional</sup> <a name="actions" id="truemark-cdk-lib.aws_monitoring.AlarmHelper.combineActions.parameter.actions"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction[]

the actions.

---

###### `topics`<sup>Optional</sup> <a name="topics" id="truemark-cdk-lib.aws_monitoring.AlarmHelper.combineActions.parameter.topics"></a>

- *Type:* aws-cdk-lib.aws_sns.ITopic[]

the topics.

---

##### `toRecord` <a name="toRecord" id="truemark-cdk-lib.aws_monitoring.AlarmHelper.toRecord"></a>

```typescript
import { aws_monitoring } from 'truemark-cdk-lib'

aws_monitoring.AlarmHelper.toRecord(options: AlarmsOptions, oprop: string, tprop: string, defaultCriticalThreshold?: number | Duration, defaultWarningThreshold?: number | Duration)
```

Helper function to generate categorized alarms.

###### `options`<sup>Required</sup> <a name="options" id="truemark-cdk-lib.aws_monitoring.AlarmHelper.toRecord.parameter.options"></a>

- *Type:* truemark-cdk-lib.aws_monitoring.AlarmsOptions

the AlarmsOptions instance.

---

###### `oprop`<sup>Required</sup> <a name="oprop" id="truemark-cdk-lib.aws_monitoring.AlarmHelper.toRecord.parameter.oprop"></a>

- *Type:* string

property from the AlarmsCategoryOptions instance.

---

###### `tprop`<sup>Required</sup> <a name="tprop" id="truemark-cdk-lib.aws_monitoring.AlarmHelper.toRecord.parameter.tprop"></a>

- *Type:* string

property from the CustomAlarmThreshold instance.

---

###### `defaultCriticalThreshold`<sup>Optional</sup> <a name="defaultCriticalThreshold" id="truemark-cdk-lib.aws_monitoring.AlarmHelper.toRecord.parameter.defaultCriticalThreshold"></a>

- *Type:* number | aws-cdk-lib.Duration

optional default value for the critical threshold.

---

###### `defaultWarningThreshold`<sup>Optional</sup> <a name="defaultWarningThreshold" id="truemark-cdk-lib.aws_monitoring.AlarmHelper.toRecord.parameter.defaultWarningThreshold"></a>

- *Type:* number | aws-cdk-lib.Duration

optional default value for the warning threshold.

---



### MetricHelper <a name="MetricHelper" id="truemark-cdk-lib.aws_cloudwatch.MetricHelper"></a>

#### Initializers <a name="Initializers" id="truemark-cdk-lib.aws_cloudwatch.MetricHelper.Initializer"></a>

```typescript
import { aws_cloudwatch } from 'truemark-cdk-lib'

new aws_cloudwatch.MetricHelper()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_cloudwatch.MetricHelper.billingEstimatedCharges">billingEstimatedCharges</a></code> | *No description.* |

---

##### `billingEstimatedCharges` <a name="billingEstimatedCharges" id="truemark-cdk-lib.aws_cloudwatch.MetricHelper.billingEstimatedCharges"></a>

```typescript
import { aws_cloudwatch } from 'truemark-cdk-lib'

aws_cloudwatch.MetricHelper.billingEstimatedCharges()
```



### ShellHelper <a name="ShellHelper" id="truemark-cdk-lib.helpers.ShellHelper"></a>

Simple helper class for executing shell scripts and commands.

#### Initializers <a name="Initializers" id="truemark-cdk-lib.helpers.ShellHelper.Initializer"></a>

```typescript
import { helpers } from 'truemark-cdk-lib'

new helpers.ShellHelper()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.helpers.ShellHelper.bashVersion">bashVersion</a></code> | *No description.* |
| <code><a href="#truemark-cdk-lib.helpers.ShellHelper.checkDirectoryAccess">checkDirectoryAccess</a></code> | *No description.* |
| <code><a href="#truemark-cdk-lib.helpers.ShellHelper.dotnetVersion">dotnetVersion</a></code> | *No description.* |
| <code><a href="#truemark-cdk-lib.helpers.ShellHelper.executeBash">executeBash</a></code> | *No description.* |
| <code><a href="#truemark-cdk-lib.helpers.ShellHelper.executeBashScript">executeBashScript</a></code> | *No description.* |
| <code><a href="#truemark-cdk-lib.helpers.ShellHelper.goVersion">goVersion</a></code> | *No description.* |
| <code><a href="#truemark-cdk-lib.helpers.ShellHelper.nodeVersion">nodeVersion</a></code> | *No description.* |
| <code><a href="#truemark-cdk-lib.helpers.ShellHelper.pythonVersion">pythonVersion</a></code> | *No description.* |
| <code><a href="#truemark-cdk-lib.helpers.ShellHelper.version">version</a></code> | *No description.* |

---

##### `bashVersion` <a name="bashVersion" id="truemark-cdk-lib.helpers.ShellHelper.bashVersion"></a>

```typescript
import { helpers } from 'truemark-cdk-lib'

helpers.ShellHelper.bashVersion()
```

##### `checkDirectoryAccess` <a name="checkDirectoryAccess" id="truemark-cdk-lib.helpers.ShellHelper.checkDirectoryAccess"></a>

```typescript
import { helpers } from 'truemark-cdk-lib'

helpers.ShellHelper.checkDirectoryAccess(dir?: string)
```

###### `dir`<sup>Optional</sup> <a name="dir" id="truemark-cdk-lib.helpers.ShellHelper.checkDirectoryAccess.parameter.dir"></a>

- *Type:* string

---

##### `dotnetVersion` <a name="dotnetVersion" id="truemark-cdk-lib.helpers.ShellHelper.dotnetVersion"></a>

```typescript
import { helpers } from 'truemark-cdk-lib'

helpers.ShellHelper.dotnetVersion()
```

##### `executeBash` <a name="executeBash" id="truemark-cdk-lib.helpers.ShellHelper.executeBash"></a>

```typescript
import { helpers } from 'truemark-cdk-lib'

helpers.ShellHelper.executeBash(props: BashExecutionProps)
```

###### `props`<sup>Required</sup> <a name="props" id="truemark-cdk-lib.helpers.ShellHelper.executeBash.parameter.props"></a>

- *Type:* truemark-cdk-lib.helpers.BashExecutionProps

---

##### `executeBashScript` <a name="executeBashScript" id="truemark-cdk-lib.helpers.ShellHelper.executeBashScript"></a>

```typescript
import { helpers } from 'truemark-cdk-lib'

helpers.ShellHelper.executeBashScript(props: BashExecutionProps)
```

###### `props`<sup>Required</sup> <a name="props" id="truemark-cdk-lib.helpers.ShellHelper.executeBashScript.parameter.props"></a>

- *Type:* truemark-cdk-lib.helpers.BashExecutionProps

---

##### `goVersion` <a name="goVersion" id="truemark-cdk-lib.helpers.ShellHelper.goVersion"></a>

```typescript
import { helpers } from 'truemark-cdk-lib'

helpers.ShellHelper.goVersion()
```

##### `nodeVersion` <a name="nodeVersion" id="truemark-cdk-lib.helpers.ShellHelper.nodeVersion"></a>

```typescript
import { helpers } from 'truemark-cdk-lib'

helpers.ShellHelper.nodeVersion()
```

##### `pythonVersion` <a name="pythonVersion" id="truemark-cdk-lib.helpers.ShellHelper.pythonVersion"></a>

```typescript
import { helpers } from 'truemark-cdk-lib'

helpers.ShellHelper.pythonVersion()
```

##### `version` <a name="version" id="truemark-cdk-lib.helpers.ShellHelper.version"></a>

```typescript
import { helpers } from 'truemark-cdk-lib'

helpers.ShellHelper.version(command: string, args: string[])
```

###### `command`<sup>Required</sup> <a name="command" id="truemark-cdk-lib.helpers.ShellHelper.version.parameter.command"></a>

- *Type:* string

---

###### `args`<sup>Required</sup> <a name="args" id="truemark-cdk-lib.helpers.ShellHelper.version.parameter.args"></a>

- *Type:* string[]

---



### StandardAlarmActionsStrategy <a name="StandardAlarmActionsStrategy" id="truemark-cdk-lib.aws_monitoring.StandardAlarmActionsStrategy"></a>

- *Implements:* cdk-monitoring-constructs.IAlarmActionStrategy

Utility class to help actions to alarms.

#### Initializers <a name="Initializers" id="truemark-cdk-lib.aws_monitoring.StandardAlarmActionsStrategy.Initializer"></a>

```typescript
import { aws_monitoring } from 'truemark-cdk-lib'

new aws_monitoring.StandardAlarmActionsStrategy(props: StandardAlarmActionsStrategyProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#truemark-cdk-lib.aws_monitoring.StandardAlarmActionsStrategy.Initializer.parameter.props">props</a></code> | <code>truemark-cdk-lib.aws_monitoring.StandardAlarmActionsStrategyProps</code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="truemark-cdk-lib.aws_monitoring.StandardAlarmActionsStrategy.Initializer.parameter.props"></a>

- *Type:* truemark-cdk-lib.aws_monitoring.StandardAlarmActionsStrategyProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_monitoring.StandardAlarmActionsStrategy.addAlarmActions">addAlarmActions</a></code> | *No description.* |

---

##### `addAlarmActions` <a name="addAlarmActions" id="truemark-cdk-lib.aws_monitoring.StandardAlarmActionsStrategy.addAlarmActions"></a>

```typescript
public addAlarmActions(props: AlarmActionStrategyProps): void
```

###### `props`<sup>Required</sup> <a name="props" id="truemark-cdk-lib.aws_monitoring.StandardAlarmActionsStrategy.addAlarmActions.parameter.props"></a>

- *Type:* cdk-monitoring-constructs.AlarmActionStrategyProps

---





## Enums <a name="Enums" id="Enums"></a>

### AlarmCategory <a name="AlarmCategory" id="truemark-cdk-lib.aws_monitoring.AlarmCategory"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmCategory.CRITICAL">CRITICAL</a></code> | *No description.* |
| <code><a href="#truemark-cdk-lib.aws_monitoring.AlarmCategory.WARNING">WARNING</a></code> | *No description.* |

---

##### `CRITICAL` <a name="CRITICAL" id="truemark-cdk-lib.aws_monitoring.AlarmCategory.CRITICAL"></a>

---


##### `WARNING` <a name="WARNING" id="truemark-cdk-lib.aws_monitoring.AlarmCategory.WARNING"></a>

---

