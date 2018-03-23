import { IPipeline, IProcessor } from "solid-pipelines";
import * as Processors from './Processors'

export class TrelloItemsCreatorPipeline implements IPipeline {
    public static readonly Instance = new TrelloItemsCreatorPipeline();
    
    GetProcessors(): IProcessor[] {
        return [
            Processors.InitializeResult.Instance,
            Processors.CreateCard.Instance,
            Processors.CreateChecklist.Instance,
            Processors.CreateChecklistItems.Instance
        ];
    }
}