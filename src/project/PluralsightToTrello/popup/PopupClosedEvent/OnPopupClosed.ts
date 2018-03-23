import { PipelineRunner } from "solid-pipelines";
import { OnPopupClosedArguments } from "./OnPopupClosedArguments";
import { OnPopupClosedPipeline } from './OnPopupClosedPipeline'

export class OnPopupClosed {
    public static readonly Instance = new OnPopupClosed();

    execute(): Promise<void> {
        var args = new OnPopupClosedArguments();
        return this.executeWithArguments(args);
    }

    async executeWithArguments(args: OnPopupClosedArguments): Promise<void> {
        var pipelineRunner = new PipelineRunner();
        return pipelineRunner.RunPipeline(OnPopupClosedPipeline.Instance, args);
    }
}