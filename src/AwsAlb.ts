import { IRenderable } from "./IRenderable";
import { TerraformAwsResource } from "./TerraformAwsResource";

export class AwsAlb extends TerraformAwsResource implements IRenderable {
  protected readonly terraformResourceType = "aws_alb";
  private readonly subnetIds: string[];

  constructor(
    resourceName: string,
    subnetIds: string[]
  ) {
    super(resourceName);
    this.subnetIds = subnetIds;
  }

  public render(): string {
    return (
      `${this.generateResourceDeclarationText()} {` + "\n" +
      `  name = "${this.resourceName}"` + "\n" +
      `  subnets = ${this.serializeArray(this.subnetIds)}` + "\n" +
      `}` + "\n"
    );
  }
}
