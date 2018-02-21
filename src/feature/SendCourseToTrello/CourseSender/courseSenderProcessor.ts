module SendCourseToTrello.CourseSender {
    export abstract class CourseSenderProcessor extends Pipelines.CommandProcessor<ChainCourseSenderArguments> {
    }
}