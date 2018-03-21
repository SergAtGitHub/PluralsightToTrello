import { IPipeline, IProcessor } from 'solid-pipelines'
import * as Processors from './processors'

export class InitializePopupPipeline implements IPipeline {
    public static readonly Instance = new InitializePopupPipeline();
    GetProcessors(): IProcessor[] {
        return [
            Processors.ReauthOnLoad.Instance,
            Processors.BuildPopupComponent.Instance,
            Processors.FillInComponents.Instance
        ];
    }
}