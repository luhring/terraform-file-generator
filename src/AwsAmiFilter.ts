import { IRenderable } from "./IRenderable";
import { TerraformConstruct } from "./TerraformConstruct";

export class AwsAmiFilter extends TerraformConstruct implements IRenderable {
  protected readonly terraformResourceType = "aws_autoscaling_group";
  private readonly name: string;
  private readonly values: string[];
  private sizeOfLeftIndent: number = 2;

  constructor(
    name: string,
    values: string[]
  ) {
    super();
    this.name = name;
    this.values = values;
  }

  public render(): string {
    return (
      this.insertIndent(this.sizeOfLeftIndent) + `filter {` + "\n" +
      this.insertIndent(this.sizeOfLeftIndent) +
      this.insertIndent(this.sizeOfLeftIndent) +
      `  name = "${this.name}"` + "\n" +
      this.insertIndent(this.sizeOfLeftIndent) +
      this.insertIndent(this.sizeOfLeftIndent) +
      `  values = ${this.serializeArray(this.values)}` + "\n" +
      this.insertIndent(this.sizeOfLeftIndent) + `}` + "\n"
    );
  }

  public setSizeOfLeftIndentForRender(size: number): void {
    this.sizeOfLeftIndent = size;
  }
}
