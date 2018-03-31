import { IPipeline, IProcessor } from 'solid-pipelines'
import * as Processors from './processors'

export class AddEntryToCachePipeline implements IPipeline {
    public static readonly Instance = new AddEntryToCachePipeline();

    GetProcessors(): IProcessor[] {
        return [  
            Processors.CheckQuota.Instance,
            Processors.AddToCache.Instance,
        
        ];
    }
}