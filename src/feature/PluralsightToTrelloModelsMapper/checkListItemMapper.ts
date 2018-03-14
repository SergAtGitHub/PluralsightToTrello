import { SectionModel } from "../ParsePluralsightCourse/models";
import { Result, Ok } from "../../foundation/monads/result";
import { ChecklistItemModel, VerticalPosition } from "../../foundation/lib/trello";

export class CheckListItemMapper {
    public static Instance: CheckListItemMapper = new CheckListItemMapper();

    map(
        sectionModel: SectionModel, listPosition: number):
        Result<ChecklistItemModel, string> {

        var result: ChecklistItemModel = new ChecklistItemModel();
        result.name = `${("00" + listPosition).slice(-2)}. _${sectionModel.Title}_ [${sectionModel.Duration}]`;
        result.pos = VerticalPosition.bottom;
        result.checked = false;

        return new Ok(result);
    }
}