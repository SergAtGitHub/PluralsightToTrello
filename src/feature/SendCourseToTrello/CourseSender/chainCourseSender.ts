/// <reference path="./processors/checkUserAuthorized.ts" />
/// <reference path="./processors/pushCardToTrello.ts" />

module SendCourseToTrello.CourseSender {
    export class ChainCourseSender extends Pipelines.BasePipeline<ChainCourseSenderArguments> {
        public static Instance: ChainCourseSender = new ChainCourseSender(
            [
                new Processors.CheckUserAuthorized(),
                new Processors.PushCardToTrello()
            ]
        );
    }
}