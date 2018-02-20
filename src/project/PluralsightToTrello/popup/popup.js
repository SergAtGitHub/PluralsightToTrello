/// <reference path="../../../foundation/declarations/chrome/index.d.ts" />

$(function () {
    $('#openOptions').click(function (e) {
        e.preventDefault();
        chrome.runtime.openOptionsPage();
    });

    $('#parseCourse').click(function (e) {
        e.preventDefault();

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "parseCourse" }, (response) => console.log(response));
        });
    });

    $('#trelloBoards').click(function (e) { 
        e.preventDefault();
        
        var success = function (successMsg) {
            console.log("Success:");
            console.log(successMsg);
        };

        var error = function (errorMsg) {
            console.log("Error:");
            console.log(errorMsg);
        };

        Trello.get('/member/me/boards', success, error);
    });
});