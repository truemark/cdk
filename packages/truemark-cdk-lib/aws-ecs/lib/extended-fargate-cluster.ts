import {StandardFargateCluster, StandardFargateClusterProps} from "./standard-fargate-cluster";
import {Construct} from "constructs";
import { initMonitoring } from './fargate-alarms';
import { FargateServiceMonitoringProps } from "cdk-monitoring-constructs";

/**
 * Properties for FargateService.
 */
export interface ExtendedFargateClusterProps extends FargateServiceMonitoringProps, StandardFargateClusterProps {

}

/**
 * Extended version of the StandardFargateCluster that supports monitoring & alarms.
 */
export class ExtendedFargateCluster extends StandardFargateCluster {

  constructor(scope: Construct, id: string, props: ExtendedFargateClusterProps) {
    super(scope, id);

    const fargateMonitoring = initMonitoring(StandardFargateCluster, {
      dashboardName: 'Fargate Cluster',
    });

    fargateMonitoring.handler.monitorFargateService({
      fargateService: this.service,
      humanReadableName: 'Fargate Monitor'
    })
  }

}

