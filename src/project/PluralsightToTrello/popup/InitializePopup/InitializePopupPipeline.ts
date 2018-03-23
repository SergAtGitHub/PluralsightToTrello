import { IPipeline, IProcessor } from 'solid-pipelines'
import * as Processors from './processors'

export class InitializePopupPipeline implements IPipeline {
    public static readonly Instance = new InitializePopupPipeline();
    GetProcessors(): IProcessor[] {
        return [
            Processors.ReauthOnLoad.Instance,
            Processors.EnsureTrelloAuthChecker.Instance,
            Processors.EnsureTrelloDataCache.Instance,
            Processors.AuthorizationCheck.Instance,
            Processors.CheckCachedData.Instance,
            Processors.BuildPopupComponent.Instance,
            Processors.FillInComponents.Instance
        ];
    }
}