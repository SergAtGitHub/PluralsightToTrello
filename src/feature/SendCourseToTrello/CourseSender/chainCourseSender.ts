import { PipelineRunner } from "solid-pipelines";
import { CourseSenderArguments } from './courseSenderArguments'

export class ChainCourseSender {
    public static Instance: ChainCourseSender = new ChainCourseSender();

    execute(args:CourseSenderArguments) : void {
        var runner:PipelineRunner = new PipelineRunner();

        runner.RunProcessors(
            [
                new Processors.CheckUserAuthorized(),
                new Processors.PushCardToTrello()
            ], args);
    }
}