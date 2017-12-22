import { AwsAlb } from "./AwsAlb";
import { AwsAlbListener } from "./AwsAlbListener";
import { AwsAlbTargetGroup } from "./AwsAlbTargetGroup";
import { AwsAmi } from "./AwsAmi";
import { AwsAmiFilter } from "./AwsAmiFilter";
import { AwsAutoscalingGroup } from "./AwsAutoscalingGroup";
import { AwsLaunchConfiguration } from "./AwsLaunchConfiguration";
import { AwsPlacementGroup } from "./AwsPlacementGroup";
import { IRenderable } from "./IRenderable";
import { TerraformAwsData } from "./TerraformAwsData";
import { TerraformAwsResource } from "./TerraformAwsResource";

function renderTerraformConstructsAndMergeOutput(renderableConstructs: IRenderable[]): string {
  let mergedOutput = "";

  for (const construct of renderableConstructs) {
    mergedOutput += (construct.render() + "\n");
  }

  return mergedOutput;
}

export {
  AwsAlb,
  AwsAlbListener,
  AwsAlbTargetGroup,
  AwsAmi,
  AwsAmiFilter,
  AwsAutoscalingGroup,
  AwsLaunchConfiguration,
  AwsPlacementGroup,
  IRenderable,
  TerraformAwsData,
  TerraformAwsResource,
  renderTerraformConstructsAndMergeOutput
};
