import { IPipeline, IProcessor } from 'solid-pipelines'
import * as Processors from './processors'

export class BackgroundLoggingPipeline implements IPipeline {
    public static readonly Instance = new BackgroundLoggingPipeline();

    GetProcessors(): IProcessor[] {
        return [
            Processors.LogMessageToConsole.Instance
        ];
    }
}