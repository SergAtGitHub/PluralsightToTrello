import { IPipeline, IProcessor } from "solid-pipelines";
import * as Processors from './processors'

export class BuildPagePipeline implements IPipeline {
    GetProcessors(): IProcessor[] {
        return [
            Processors.EnsureTrelloAuthChecker.Instance,
            Processors.AuthorizationCheck.Instance,
            Processors.BuildAuthorizationControl.Instance,
            Processors.BuildDestinationComboboxes.Instance,
            Processors.BuildParseCourseButton.Instance,
            Processors.AppendControlsWhenAuthorizedToTrello.Instance,
            Processors.AppendControlsWhenNotAuthorizedToTrello.Instance
        ];
    }
    public static readonly Instance = new BuildPagePipeline();
}