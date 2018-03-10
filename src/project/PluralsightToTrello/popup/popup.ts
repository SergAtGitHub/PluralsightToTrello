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
        var getTrelloBoardsArgs = new ObtainTrelloDestination.GetTrelloBoardArguments();
        ObtainTrelloDestination.TrelloBoardRepository.Instance.getTrelloBoards(getTrelloBoardsArgs);
        setTimeout(() => {
            var s = $('<select id="selectedBoard" />');
            var boards = getTrelloBoardsArgs.Result.unwrap().Boards;

            for (let board of boards) {
                $('<option />', { value: board.id, text: board.name }).appendTo(s);
            }

            s.appendTo('body');

            s = $('<select id="selectedList" />');
            s.appendTo('body');

            $('#selectedBoard').change(function (e) {
                e.preventDefault();

                var args = new ObtainTrelloDestination.GetTrelloListArguments($("#selectedBoard").val().toString());
                ObtainTrelloDestination.TrelloListRepository.Instance.getTrelloLists(args);
                setTimeout(() => {
                    var s = $('#selectedList');
                    s.empty();
                    var lists = args.Result.unwrap().lists;
                    for (let list of lists) {
                        $('<option />', { value: list.id, text: list.name }).appendTo(s);
                    }

                }, 2000);
            });

        }, 2000);

    } else {
        var el = $('<input id="openOptions" type="submit" value="Open options" />');
        $("body").append(el);
    }

    $('#openOptions').click(function (e) {
        e.preventDefault();
        chrome.runtime.openOptionsPage();
    });

    var el = $('<input id="parseCourse" type="submit" value="Parse course" />');
    $("body").append(el);


    $('#parseCourse').click(function (e) {
        e.preventDefault();

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "parseCourse" },
                (response: ParsePluralsightCourse.Models.CourseModel) => {
                    var listId = $("#selectedList").val().toString();
                    var getCardResult = CardMapper.Instance.map(response, listId);
                    if (getCardResult.isErr()) { return; }
                    var card = getCardResult.unwrap();

                    var checklist = response.Sections.map((x, num) => CheckListItemMapper.Instance.map(x, num + 1).unwrapOr(null))
                    var arguments = ChainCourseSenderArguments.create(card, checklist)
                    ChainCourseSender.Instance.process(arguments);
                });
        });
    });
});