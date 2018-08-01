import { PipelineExecutor } from "solid-pipelines";
import { OnPopupClosedPipeline } from './OnPopupClosedPipeline'

export class OnPopupClosed {
    public static readonly Instance = new PipelineExecutor(OnPopupClosedPipeline.Instance);
}