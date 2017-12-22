import { AwsAmi } from "./AwsAmi";
import { IRenderable } from "./IRenderable";
import { TerraformAwsResource } from "./TerraformAwsResource";

export class AwsLaunchConfiguration extends TerraformAwsResource implements IRenderable {
  protected readonly terraformResourceType = "aws_launch_configuration";
  private readonly ami: AwsAmi;
  private readonly instanceType: string;
  private readonly createBeforeDestroy: boolean;
  private readonly userDataPlainText: string;

  private base64EncodePlainText(plainText: string): string {
    return new Buffer(plainText).toString("base64");
  }

  private generateLineForUserData(sizeOfLeftIndent: number): string {
    if (this.userDataPlainText !== null) {
      return this.insertIndent(sizeOfLeftIndent) +
        `user_data = "${this.base64EncodePlainText(this.userDataPlainText)}"`;
    } else {
      return "";
    }
  }

  constructor(
    resourceName: string,
    ami: AwsAmi,
    instanceType: string,
    createBeforeDestroy: boolean,
    userDataPlainText: string = null
  ) {
    super(resourceName);
    this.ami = ami;
    this.instanceType = instanceType;
    this.createBeforeDestroy = createBeforeDestroy;
    this.userDataPlainText = userDataPlainText;
  }

  public render(): string {
    return (
      `${this.generateResourceDeclarationText()} {` + "\n" +
      `  name = "${this.resourceName}"` + "\n" +
      `  image_id = "${this.ami.generateDataPropertyVariableExpression("id")}"` + "\n" +
      `  instance_type = "${this.instanceType}"` + "\n" +
      this.generateLineForUserData(2) + "\n" +
      `` + "\n" +
      `  lifecycle {` + "\n" +
      `    create_before_destroy = ${this.createBeforeDestroy.toString()}` + "\n" +
      `  }` + "\n" +
      `}` + "\n"
    );
  }
}
