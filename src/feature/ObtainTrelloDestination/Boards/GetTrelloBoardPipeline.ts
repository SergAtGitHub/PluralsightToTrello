import { IPipeline, IProcessor } from 'solid-pipelines'
import * as Processors from './processors'

export class GetTrelloBoardPipeline implements IPipeline {
    public static readonly Instance = new GetTrelloBoardPipeline();

    GetProcessors(): IProcessor[] {
        return [
            Processors.TryGetFromCache.Instance,
            Processors.TryToRetrieveBoard.Instance,
            Processors.AddToCache.Instance
        ];
    }
}