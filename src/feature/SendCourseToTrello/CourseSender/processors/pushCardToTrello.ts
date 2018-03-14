import { CourseSenderProcessor } from "../courseSenderProcessor";
import { ChainCourseSenderArguments } from "../courseSenderArguments";
import { ChecklistModel, VerticalPosition } from "../../../../foundation/lib/trello";

export class PushCardToTrello extends CourseSenderProcessor {

    async SafeExecute(args: ChainCourseSenderArguments): Promise<void> {
        var successCard = function (cardData) {
            var newChecklist: ChecklistModel =
                {
                    name: "Table of Contents",
                    pos: VerticalPosition.bottom,
                    idCard: cardData.id
                };

            var successCheckList = function (checklistData) {

                $.each(args.Sections, function (indexInArray, valueOfElement) {
                    var successCheckItem = function (checkItemData) {
                        console.log(checkItemData.id);
                    }

                    var errorCheckItem = function (checkItemData) {
                        console.log(checkItemData);
                    }

                    Trello.post('/checklists/' + checklistData.id + '/checkItems', valueOfElement, successCheckItem, errorCheckItem);
                });
            };

            Trello.post('/checklists', newChecklist, successCheckList);
        };

        var errorCard = function (errorMsg) {
            console.log(errorMsg);
        };

        Trello.post('/cards/', args.Card, successCard, errorCard);
    }
}