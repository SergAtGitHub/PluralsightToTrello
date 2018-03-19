import { PipelineRunner } from "solid-pipelines";
import { ChainCourseSenderArguments } from './ChainCourseSenderArguments'
import { CheckUserAuthorized } from './processors/checkUserAuthorized'
import { PushCardToTrello } from './processors/pushCardToTrello'

export class ChainCourseSender {
    public static Instance: ChainCourseSender = new ChainCourseSender();

    execute(args:ChainCourseSenderArguments) : void {
        var runner:PipelineRunner = new PipelineRunner();

        runner.RunProcessors(
            [
                new CheckUserAuthorized(),
                new PushCardToTrello()
            ], args);
    }
}