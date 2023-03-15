import {StandardFargateService, StandardFargateServiceProps} from "./standard-fargate-service";
import {Construct} from "constructs";
import { initMonitoring } from './fargate-alarms';
import { FargateServiceMonitoringProps } from "cdk-monitoring-constructs";

/**
 * Properties for FargateService.
 */
export interface ExtendedFargateServiceProps extends FargateServiceMonitoringProps, StandardFargateServiceProps {

}

/**
 * Extended version of the StandardFargateService that supports monitoring & alarms.
 */
export class ExtendedFargateService extends StandardFargateService {

  constructor(scope: Construct, id: string, props: ExtendedFargateServiceProps) {
    super(scope, id);

    const fargateMonitoring = initMonitoring(StandardFargateService, {
      dashboardName: 'Fargate Services'
    });

    fargateMonitoring.handler.monitorFargateService({
      fargateService: this.service,
      humanReadableName: 'Fargate Monitor'
    })
  }
}
