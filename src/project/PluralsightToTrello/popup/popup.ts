/// <reference path="../../../foundation/declarations/chrome/index.d.ts" />
/// <reference path="../../../feature/PluralsightToTrelloModelsMapper/cardMapper.ts" />
/// <reference path="../../../feature/PluralsightToTrelloModelsMapper/checkListItemMapper.ts" />

import CardMapper = PluralsightToTrelloModelsMapper.CardMapper;
import CheckListItemMapper = PluralsightToTrelloModelsMapper.CheckListItemMapper;
import ChainCourseSenderArguments = SendCourseToTrello.CourseSender.ChainCourseSenderArguments;
import ChainCourseSender = SendCourseToTrello.CourseSender.ChainCourseSender;

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
                (response: ParsePluralsightCourse.Models.CourseModel) =>
                    {
                        var getCardResult = CardMapper.Instance.map(response);
                        if (getCardResult.isErr()) { return; }
                        var card = getCardResult.unwrap();

                        var checklist = response.Sections.map(x => CheckListItemMapper.Instance.map(x).unwrapOr(null))
                        var arguments = ChainCourseSenderArguments.create(card, checklist)
                        ChainCourseSender.Instance.process(arguments);
                    });
        });
    });
});