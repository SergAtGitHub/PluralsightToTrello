/// <reference path="../TrelloServices/trelloAuthorizationChecker.ts" />
/// <reference path="../../../foundation/pipelines/commandPipelineArguments.ts" />
/// <reference path="../../../foundation/lib/trello.ts" />

import ChecklistItemModel = TrelloModels.ChecklistItemModel;
import ITrelloAuthorizationChecker = SendCourseToTrello.TrelloServices.ITrelloAuthorizationChecker;
import TrelloAuthorizationChecker = SendCourseToTrello.TrelloServices.TrelloAuthorizationChecker;

module SendCourseToTrello.CourseSender {
    export class ChainCourseSenderArguments extends Pipelines.CommandPipelineArguments {
        public static create(card: CardModel, items:ChecklistItemModel[]) : ChainCourseSenderArguments {
            var result: ChainCourseSenderArguments = new ChainCourseSenderArguments();
            result.Card = card;
            result.Sections = items;
            result.AuthorizationChecker = Monads.Some.wrapNull(TrelloAuthorizationChecker.Instance);
            return result;
        }

        Card: CardModel;
        Sections: ChecklistItemModel[];
        AuthorizationChecker: Option<ITrelloAuthorizationChecker>;
    }
}