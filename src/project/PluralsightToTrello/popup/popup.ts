/// <reference path="../../../foundation/declarations/chrome/index.d.ts" />

$(function () {

    Trello.authorize({});
    if (Trello.authorized()) {
        var el = $('<input id="parseCourse" type="submit" value="Parse course" />');
        $("body").append(el);

        var args = new ObtainTrelloDestination.GetTrelloListArguments("5a730ecd1aa97e2d48f35205");
        ObtainTrelloDestination.TrelloListRepository.Instance.getTrelloLists(args);
        setTimeout(() => {var s = $('<select />');
        var lists = args.Result.unwrap().lists;

        for (let list of lists) {
            $('<option />', {value: list.id, text: list.name}).appendTo(s);
        }
        
        s.appendTo('body');}, 2000);
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
            chrome.tabs.sendMessage(tabs[0].id, { action: "parseCourse" }, 
                (response) => 
                    SendCourseToTrello.CourseSender.ChainCourseSender.Instance.process(
                        SendCourseToTrello.CourseSender.ChainCourseSenderArguments.create(response)));
        });
    });
});