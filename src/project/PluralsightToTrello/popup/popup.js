/// <reference path="../../../foundation/declarations/chrome/index.d.ts" />

$(function () {
    function parsedCourse(response) {
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

                $.each(response.Sections, function (indexInArray, valueOfElement) {
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
                name: response.Title,
                desc: "[link](" + response.Link + ") [" + response.Duration + "]",
                pos: "top",
                due: null,
                idList: destinationList
            };

        Trello.post('/cards/', newCard, successCard, errorCard);
    }

    Trello.authorize();
    if (Trello.authorized()) {
        var el = $('<input id="parseCourse" type="submit" value="Parse course" />');
        $("body").append(el);
    } else {
        var el = $('<input id="openOptions" type="submit" value="Open options" />');
        $("body").append(el);
    }

    $('#openOptions').click(function (e) {
        e.preventDefault();
        chrome.runtime.openOptionsPage();
    });

    $('#parseCourse').click(function (e) {
        e.preventDefault();

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "parseCourse" }, parsedCourse);
        });
    });
});