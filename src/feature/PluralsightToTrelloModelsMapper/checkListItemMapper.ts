/// <reference path="../../foundation/declarations/trello/index.d.ts" />
/// <reference path="../../foundation/monads/result.ts" />
/// <reference path="../ParsePluralsightCourse/models/sectionModel.ts" />

module PluralsightToTrelloModelsMapper {
    export class CheckListItemMapper {
        public static Instance: CheckListItemMapper = new CheckListItemMapper();

        map(
            pluralsightModel: ParsePluralsightCourse.Models.SectionModel):
                Monads.Result<ChecklistItemModel,string> {

            var result: ChecklistItemModel = new ChecklistItemModel();
            result.name = pluralsightModel.Title;
            result.pos = VerticalPosition.bottom;
            result.checked = false;

            return new Monads.Ok(result);
        }
    }
}