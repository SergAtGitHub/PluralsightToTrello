import { CourseModel } from "../ParsePluralsightCourse/models";
import { Result, Ok, VerticalPosition, CardModel } from "../../foundation";

export class CardMapper {
    public static Instance: CardMapper = new CardMapper();

    map(
        pluralsightModel: CourseModel, listId: string):
        Result<CardModel, string> {

        var result: CardModel = {
            name: pluralsightModel.Title,

            // _link_ [hh:mm]
            desc:
                "[Pluralsight](" + pluralsightModel.Link + ") ["
                + pluralsightModel.Duration + "]",

            pos: VerticalPosition.top,
            due: null,
            idList: listId
        };
        return new Ok(result);
    }
}