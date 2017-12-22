import { IRenderable } from "./IRenderable";
import { TerraformAwsResource } from "./TerraformAwsResource";

export class AwsPlacementGroup extends TerraformAwsResource implements IRenderable {
  protected readonly terraformResourceType = "aws_placement_group";
  private readonly strategy: string;

  constructor(
    resourceName: string,
    strategy: string = "cluster"
  ) {
    super(resourceName);
    this.strategy = strategy;
  }

  public render(): string {
    return (
      `${this.generateResourceDeclarationText()} {` + "\n" +
      `  name = "${this.resourceName}"` + "\n" +
      `  strategy = "${this.strategy}"` + "\n" +
      `}` + "\n"
    );
  }
}
