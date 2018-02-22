/// <reference path="../../foundation/declarations/trello/index.d.ts" />
/// <reference path="../../foundation/monads/result.ts" />
/// <reference path="../ParsePluralsightCourse/models/courseModel.ts" />

module PluralsightToTrelloModelsMapper {
    export class CardMapper {
        public static Instance: CardMapper = new CardMapper();

        map(
            pluralsightModel: ParsePluralsightCourse.Models.CourseModel):
            Monads.Result<CardModel, string> {

            var result: CardModel = {
                name: pluralsightModel.Title,

                // _link_ [hh:mm]
                desc:
                    "[link](" + pluralsightModel.Link + ") ["
                    + pluralsightModel.Duration + "]",

                pos: VerticalPosition.top,
                due: null,
                idList: null
            };
            return new Monads.Ok(result);
        }
    }
}