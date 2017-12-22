import { AwsLaunchConfiguration } from "./AwsLaunchConfiguration";
import { IRenderable } from "./IRenderable";
import { TerraformAwsResource } from "./TerraformAwsResource";

export class AwsAutoscalingGroup extends TerraformAwsResource implements IRenderable {
  protected readonly terraformResourceType = "aws_autoscaling_group";
  private readonly vpcZoneIdentifier: string[];
  private readonly maxSize: number;
  private readonly minSize: number;
  private readonly healthCheckGracePeriod: number;
  private readonly healthCheckType: string;
  private readonly desiredCapacity: number;
  private readonly forceDelete: boolean;
  private readonly launchConfiguration: AwsLaunchConfiguration;

  constructor(
    resourceName: string,
    vpcZoneIdentifier: string[],
    maxSize: number,
    minSize: number,
    healthCheckGracePeriod: number,
    healthCheckType: string,
    desiredCapacity: number,
    forceDelete: boolean,
    launchConfiguration: AwsLaunchConfiguration
  ) {
    super(resourceName);
    this.vpcZoneIdentifier = vpcZoneIdentifier;
    this.maxSize = maxSize;
    this.minSize = minSize;
    this.healthCheckGracePeriod = healthCheckGracePeriod;
    this.healthCheckType = healthCheckType;
    this.desiredCapacity = desiredCapacity;
    this.forceDelete = forceDelete;
    this.launchConfiguration = launchConfiguration;
  }

  public render(): string {
    return (
      `${this.generateResourceDeclarationText()} {` + "\n" +
      `  name = "${this.resourceName}"` + "\n" +
      `  vpc_zone_identifier = ${this.serializeArray(this.vpcZoneIdentifier)}` + "\n" +
      `  max_size = ${this.maxSize}` + "\n" +
      `  min_size = ${this.minSize}` + "\n" +
      `  health_check_grace_period = ${this.healthCheckGracePeriod}` + "\n" +
      `  health_check_type = "${this.healthCheckType}"` + "\n" +
      `  desired_capacity = ${this.desiredCapacity}` + "\n" +
      `  force_delete = ${this.forceDelete}` + "\n" +
      `  launch_configuration = ` +
      `"${this.launchConfiguration.generateResourcePropertyVariableExpression("name")}"` + "\n" +
      `}` + "\n"
    );
  }
}
