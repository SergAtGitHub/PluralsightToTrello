import ITrelloAuthorizationChecker = SendCourseToTrello.TrelloServices.ITrelloAuthorizationChecker;

module SendCourseToTrello.CourseSender {
    export class ChainCourseSenderArguments extends Pipelines.CommandPipelineArguments {
        Card: Models.CardModel;
        AuthorizationChecker: Option<ITrelloAuthorizationChecker>;
    }
}