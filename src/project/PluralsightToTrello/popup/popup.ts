/// <reference path="../../../foundation/declarations/chrome/index.d.ts" />

$(function () {

    Trello.authorize({});
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
            chrome.tabs.sendMessage(tabs[0].id, { action: "parseCourse" }, 
                (response) => 
                    SendCourseToTrello.CourseSender.ChainCourseSender.Instance.process(
                        SendCourseToTrello.CourseSender.ChainCourseSenderArguments.create(response)));
        });
    });
});