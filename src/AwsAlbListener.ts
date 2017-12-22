import { AwsAlb } from "./AwsAlb";
import { AwsAlbTargetGroup } from "./AwsAlbTargetGroup";
import { IRenderable } from "./IRenderable";
import { TerraformAwsResource } from "./TerraformAwsResource";

export class AwsAlbListener extends TerraformAwsResource implements IRenderable {
  protected readonly terraformResourceType = "aws_alb_listener";
  private readonly awsAlb: AwsAlb;
  private readonly port: number;
  private readonly protocol: string;
  private readonly targetGroup: AwsAlbTargetGroup;

  constructor(
    instanceName: string,
    awsAlb: AwsAlb,
    targetGroup: AwsAlbTargetGroup,
    port: number = 80,
    protocol: string = "HTTP"
  ) {
    super(instanceName);
    this.awsAlb = awsAlb;
    this.targetGroup = targetGroup;
    this.port = port;
    this.protocol = protocol;
  }

  public render(): string {
    return (
      `${this.generateResourceDeclarationText()} {` + "\n" +
      `  load_balancer_arn = "${this.awsAlb.generateArnVariableExpression()}"` + "\n" +
      `  port = "${this.port}"` + "\n" +
      `  protocol = "${this.protocol}"` + "\n" +
      `` + "\n" +
      `  default_action {` + "\n" +
      `    target_group_arn = "${this.targetGroup.generateArnVariableExpression()}"` + "\n" +
      `    type = "forward"` + "\n" +
      `  }` + "\n" +
      `}` + "\n"
    );
  }
}
