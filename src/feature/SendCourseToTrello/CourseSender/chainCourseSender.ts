module SendCourseToTrello.CourseSender {
    export class ChainCourseSender extends Pipelines.BasePipeline<ChainCourseSenderArguments> {
        public static Instance: ChainCourseSender = new ChainCourseSender(
            [
            ]
        );
    }
}