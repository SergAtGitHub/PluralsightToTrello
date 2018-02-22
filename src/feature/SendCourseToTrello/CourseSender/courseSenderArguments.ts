/// <reference path="../TrelloServices/trelloAuthorizationChecker.ts" />

import ITrelloAuthorizationChecker = SendCourseToTrello.TrelloServices.ITrelloAuthorizationChecker;
import TrelloAuthorizationChecker = SendCourseToTrello.TrelloServices.TrelloAuthorizationChecker;

import CourseModel = ParsePluralsightCourse.Models.CourseModel;

module SendCourseToTrello.CourseSender {
    export class ChainCourseSenderArguments extends Pipelines.CommandPipelineArguments {
        public static create(card: CourseModel) : ChainCourseSenderArguments {
            var result: ChainCourseSenderArguments = new ChainCourseSenderArguments();
            result.Card = card;
            result.AuthorizationChecker = Monads.Some.wrapNull(TrelloAuthorizationChecker.Instance);
            return result;
        }

        Card: CourseModel;
        AuthorizationChecker: Option<ITrelloAuthorizationChecker>;
    }
}