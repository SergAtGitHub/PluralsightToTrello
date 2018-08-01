import { IPipeline, IProcessor, PredefinedPipeline } from 'solid-pipelines'
import * as Processors from './processors'

export class OnPopupClosedPipeline {
    public static readonly Instance = new PredefinedPipeline([
        Processors.StoreBoardsToCache.Instance,
        Processors.StoreListsToCache.Instance
    ]);
}