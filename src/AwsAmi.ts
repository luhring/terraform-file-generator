import { AwsAmiFilter } from "./AwsAmiFilter";
import { IRenderable } from "./IRenderable";
import { TerraformAwsData } from "./TerraformAwsData";

export class AwsAmi extends TerraformAwsData implements IRenderable {
  protected readonly terraformDataType = "aws_ami";
  private readonly mostRecent: boolean | null;
  private readonly executableUsers: string[] | null;
  private readonly filters: AwsAmiFilter[] | null;
  private readonly nameRegex: string | null;
  private readonly owners: string[] | null;

  private generateAssignmentForMostRecent(): string {
    if (this.mostRecent !== null) {
      return `most_recent = ${this.mostRecent ? "true" : "false"}`;
    } else {
      return "";
    }
  }

  private generateAssignmentForExecutableUsers(): string {
    if (this.executableUsers !== null) {
      return `executable_users = ${this.serializeArray(this.executableUsers)}`;
    } else {
      return "";
    }
  }

  private generateAssignmentForNameRegex(): string {
    if (this.nameRegex !== null) {
      return `name_regex = "${this.nameRegex}"`;
    } else {
      return "";
    }
  }

  private generateAssignmentForOwners(): string {
    if (this.owners !== null) {
      return `owners = ${this.serializeArray(this.owners)}`;
    } else {
      return "";
    }
  }

  private generateBlockForFilters(sizeOfLeftIndent: number): string {
    if (this.filters.length > 0) {
      let outputBlock = "";

      for (const filter of this.filters) {
        filter.setSizeOfLeftIndentForRender(sizeOfLeftIndent);
        outputBlock += (filter.render() + "\n");
      }

      return outputBlock;
    } else {
      return "";
    }
  }

  constructor(
    dataName: string,
    executableUsers: string[] | null = null,
    filters: AwsAmiFilter[] | null = null,
    nameRegex: string | null = null,
    owners: string[] | null = null
  ) {
    super(dataName);

    if (
      executableUsers === null &&
      filters === null &&
      nameRegex === null &&
      owners === null
    ) {
      throw new Error("AwsAmi constructor must have at least one selector specified.");
    }

    this.executableUsers = executableUsers;
    this.filters = filters;
    this.nameRegex = nameRegex;
    this.owners = owners;
  }

  public render(): string {
    const sizeOfLeftIndentForFiltersBlock = 2;

    return (
      `${this.generateDataDeclarationText()} {` + "\n" +
      `  ${this.generateAssignmentForMostRecent()}` + "\n" +
      `  ${this.generateAssignmentForExecutableUsers()}` + "\n" + "\n" +
      `${this.generateBlockForFilters(sizeOfLeftIndentForFiltersBlock)}` +
      `  ${this.generateAssignmentForNameRegex()}` + "\n" +
      `  ${this.generateAssignmentForOwners()}` + "\n" +
      `}` + "\n"
    );
  }
}
