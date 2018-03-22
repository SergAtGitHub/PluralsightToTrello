import { PipelineRunner } from "solid-pipelines";
import { ChainCourseSenderArguments } from './ChainCourseSenderArguments'
import { CourseSenderPipeline } from './CourseSenderPipeline'

export class ChainCourseSender {
    public static Instance: ChainCourseSender = new ChainCourseSender();

    execute(args:ChainCourseSenderArguments) : void {
        var runner:PipelineRunner = new PipelineRunner();

        runner.RunPipeline(CourseSenderPipeline.Instance, args);
    }
}