import { IRenderable } from "./IRenderable";
import { TerraformAwsResource } from "./TerraformAwsResource";

export class AwsAlbTargetGroup extends TerraformAwsResource implements IRenderable {
  protected readonly terraformResourceType = "aws_alb_target_group";
  private readonly port: number;
  private readonly protocol: string;
  private readonly vpcId: string;

  constructor(
    instanceName: string,
    vpcId: string,
    port: number = 80,
    protocol: string = "HTTP"
  ) {
    super(instanceName);
    this.vpcId = vpcId;
    this.port = port;
    this.protocol = protocol;
  }

  public render(): string {
    return (
      `${this.generateResourceDeclarationText()} {` + "\n" +
      `  port = "${this.port}"` + "\n" +
      `  protocol = "${this.protocol}"` + "\n" +
      `  vpc_id = "${this.vpcId}"` + "\n" +
      `}` + "\n"
    );
  }
}
