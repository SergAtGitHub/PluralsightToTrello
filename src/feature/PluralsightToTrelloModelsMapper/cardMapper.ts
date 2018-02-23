/// <reference path="../../foundation/declarations/trello/index.d.ts" />
/// <reference path="../../foundation/monads/result.ts" />
/// <reference path="../../foundation/lib/trello.ts" />
/// <reference path="../ParsePluralsightCourse/models/courseModel.ts" />

import CardModel = TrelloModels.CardModel;
import VerticalPosition = TrelloModels.VerticalPosition;

module PluralsightToTrelloModelsMapper {
    export class CardMapper {
        public static Instance: CardMapper = new CardMapper();

        map(
            pluralsightModel: ParsePluralsightCourse.Models.CourseModel, listId: string):
            Monads.Result<CardModel, string> {

            var result: CardModel = {
                name: pluralsightModel.Title,

                // _link_ [hh:mm]
                desc:
                    "[link](" + pluralsightModel.Link + ") ["
                    + pluralsightModel.Duration + "]",

                pos: VerticalPosition.top,
                due: null,
                idList: listId
            };
            return new Monads.Ok(result);
        }
    }
}