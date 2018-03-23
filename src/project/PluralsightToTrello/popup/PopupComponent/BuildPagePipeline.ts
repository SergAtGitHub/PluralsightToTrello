import { IPipeline, IProcessor } from "solid-pipelines";
import * as Processors from './processors'

export class BuildPagePipeline implements IPipeline {
    GetProcessors(): IProcessor[] {
        return [
            Processors.BuildAuthorizationControl.Instance,
            Processors.BuildBoardsCombobox.Instance,
            Processors.BuildListsCombobox.Instance,
            Processors.FillInBoardsCombobox.Instance,
            Processors.FillInListsCombobox.Instance,
            Processors.BuildParseCourseButton.Instance,
            Processors.AppendControlsWhenAuthorizedToTrello.Instance,
            Processors.AppendControlsWhenNotAuthorizedToTrello.Instance,
            Processors.AddBoardEventListenerToUpdateLists.Instance
        ];
    }
    public static readonly Instance = new BuildPagePipeline();
}