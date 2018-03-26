import { IPipeline, IProcessor } from 'solid-pipelines'
import * as Processors from './processors'

export class OnPopupClosedPipeline implements IPipeline {
    public static readonly Instance = new OnPopupClosedPipeline();
    GetProcessors(): IProcessor[] {
        return [
            Processors.StoreBoardsToCache.Instance,
            Processors.StoreListsToCache.Instance
        ];
    }
}