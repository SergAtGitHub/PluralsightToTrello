
module SendCourseToTrello.CourseSender.Processors {
    export class PushCardToTrello extends CourseSenderProcessor {

        execute(args: ChainCourseSenderArguments): void {
            // Set the destination list for the new card
            var destinationList = "5a730ecd1aa97e2d48f35207";

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

            args.Card.idList = destinationList;

            Trello.post('/cards/', args.Card, successCard, errorCard);
        }
    }
}