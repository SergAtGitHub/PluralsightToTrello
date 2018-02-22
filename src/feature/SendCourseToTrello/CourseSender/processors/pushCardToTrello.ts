
module SendCourseToTrello.CourseSender.Processors {
    export class PushCardToTrello extends CourseSenderProcessor {

        execute(args: ChainCourseSenderArguments): void {
            // Set the destination list for the new card
            var destinationList = "5a730ecd1aa97e2d48f35207";

            var successCard = function (cardData) {
                var newChecklist =
                    {
                        name: "Table of Contents",
                        pos: "bottom",
                        idCard: cardData.id
                    };

                var successCheckList = function (checklistData) {

                    $.each(args.Card.Sections, function (indexInArray, valueOfElement) {
                        var newCheckItem =
                            {
                                name: (indexInArray + 1).toString() + ') ' + valueOfElement.Title + ' [' + valueOfElement.Duration + ']',
                                checked: false,
                                pos: "bottom"
                            };

                        var successCheckItem = function (checkItemData) {
                            console.log(checkItemData.id);
                        }

                        var errorCheckItem = function (checkItemData) {
                            console.log(checkItemData);
                        }

                        Trello.post('/checklists/' + checklistData.id + '/checkItems', newCheckItem, successCheckItem, errorCheckItem);
                    });
                };

                Trello.post('/checklists', newChecklist, successCheckList);
            };

            var errorCard = function (errorMsg) {
                console.log(errorMsg);
            };

            var newCard =
                {
                    name: args.Card.Title,
                    desc: "[link](" + args.Card.Link + ") [" + args.Card.Duration + "]",
                    pos: "top",
                    due: null,
                    idList: destinationList
                };

            Trello.post('/cards/', newCard, successCard, errorCard);
        }
    }
}