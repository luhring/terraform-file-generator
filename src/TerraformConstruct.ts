import { IRenderable } from "./IRenderable";

export abstract class TerraformConstruct implements IRenderable {
  protected serializeArray(array: string[]): string {
    const quotedArrayItems = array.map((arrayItem) => `"${arrayItem}"`);
    return `[${quotedArrayItems.join(", ")}]`;
  }

  protected insertIndent(sizeOfLeftIndent: number): string {
    let indent: string = "";
    let indentUnitsLeftToAppend = sizeOfLeftIndent;
    const indentUnit: string = " ";

    while (indentUnitsLeftToAppend > 0) {
      indent += indentUnit;
      indentUnitsLeftToAppend -= 1 ;
    }

    return indent;
  }

  public abstract render(): string;
}
