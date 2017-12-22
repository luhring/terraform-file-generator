import { IRenderable } from "./IRenderable";
import { TerraformConstruct } from "./TerraformConstruct";

export abstract class TerraformAwsResource extends TerraformConstruct implements IRenderable {
  protected abstract readonly terraformResourceType: string;
  protected readonly resourceName: string;

  protected serializeArray(array: string[]): string {
    const quotedArrayItems = array.map((arrayItem) => `"${arrayItem}"`);
    return `[${quotedArrayItems.join(", ")}]`;
  }

  constructor(
    resourceName: string,
  ) {
    super();
    this.resourceName = resourceName;
  }

  public abstract render(): string;

  public generateResourcePropertyVariableExpression(propertyName: string): string {
    return "${" + this.terraformResourceType + "." + this.resourceName + "." + propertyName + "}";
  }

  public generateArnVariableExpression(): string {
    return this.generateResourcePropertyVariableExpression("arn");
  }

  public generateIdVariableExpression(): string {
    return this.generateResourcePropertyVariableExpression("id");
  }

  public generateResourceDeclarationText(): string {
    return `resource "${this.terraformResourceType}" "${this.resourceName}"`;
  }
}
