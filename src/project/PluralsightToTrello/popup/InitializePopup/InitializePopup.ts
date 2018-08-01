import { PipelineRunner, PipelineExecutor } from "solid-pipelines";
import { InitializePopupPipeline } from './InitializePopupPipeline'

export class InitializePopup {
    public static readonly Instance = new PipelineExecutor(InitializePopupPipeline.Instance);
}