import { PipelineRunner } from "solid-pipelines";
import { InitializePopupArguments } from './InitializePopupArguments'
import { InitializePopupPipeline } from './InitializePopupPipeline'

export class InitializePopup {
    public static readonly Instance = new InitializePopup();

    public initialize(): Promise<void> {
        var args = new InitializePopupArguments();
        return this.initializeWithArguments(args);
    }
    
    public initializeWithArguments(args: InitializePopupArguments): Promise<void> {
        var pipelineRunner = new PipelineRunner();

        return pipelineRunner.RunPipeline(InitializePopupPipeline.Instance, args);
    }
}