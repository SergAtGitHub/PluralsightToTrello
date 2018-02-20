/// <reference path="../../../feature/ParsePluralsightCourse/logic.ts" />
/// <reference path="../../../feature/messageListener/messageListener.ts" />

import ParseCourseMessageListener = Logic.ParseCourseMessageListener;

chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) =>
        ParseCourseMessageListener.Instance.onMessage(message, sender, sendResponse));

chrome.runtime.sendMessage({ action: "show" });