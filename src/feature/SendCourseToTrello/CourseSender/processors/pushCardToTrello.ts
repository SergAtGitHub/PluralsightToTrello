import ChecklistModel = TrelloModels.ChecklistModel;

module SendCourseToTrello.CourseSender.Processors {
    export class PushCardToTrello extends CourseSenderProcessor {

        execute(args: ChainCourseSenderArguments): void {
            var successCard = function (cardData) {
                var newChecklist:ChecklistModel =
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
}