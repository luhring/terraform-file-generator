import { IRenderable } from "./IRenderable";
import { TerraformConstruct } from "./TerraformConstruct";

export abstract class TerraformAwsData extends TerraformConstruct implements IRenderable {
  protected abstract readonly terraformDataType: string;
  protected readonly dataName: string;

  constructor(
    dataName: string,
  ) {
    super();
    this.dataName = dataName;
  }

  public abstract render(): string;

  public generateDataDeclarationText(): string {
    return `data "${this.terraformDataType}" "${this.dataName}"`;
  }

  public generateDataPropertyVariableExpression(propertyName: string): string {
    return "${data." + this.terraformDataType + "." + this.dataName + "." + propertyName + "}";
  }
}
