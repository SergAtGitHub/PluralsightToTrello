import { PipelineRunner, PipelineExecutor, PredefinedPipeline } from "solid-pipelines";
import * as Processors from './processors'

export class InitializePopup {
    public static readonly Pipeline = new PredefinedPipeline([
        Processors.ReauthOnLoad.Instance,
        Processors.EnsureTrelloAuthChecker.Instance,
        Processors.EnsureTrelloDataCache.Instance,
        Processors.AuthorizationCheck.Instance,
        Processors.CheckCachedData.Instance,
        Processors.BuildPopupComponent.Instance,
        Processors.FillInComponents.Instance
    ]);
    public static readonly Executor = new PipelineExecutor(InitializePopup.Pipeline);
}