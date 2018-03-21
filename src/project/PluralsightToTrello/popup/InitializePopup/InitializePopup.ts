import { PipelineRunner } from "solid-pipelines";
import { InitializePopupArguments } from './InitializePopupArguments'
import { InitializePopupPipeline } from './InitializePopupPipeline'

export class InitializePopup {
    public static readonly Instance = new InitializePopup();

    public async initialize(): Promise<void> {
        var pipelineRunner = new PipelineRunner();
        var args = new InitializePopupArguments();

        pipelineRunner.RunPipeline(InitializePopupPipeline.Instance, args);
    }
}