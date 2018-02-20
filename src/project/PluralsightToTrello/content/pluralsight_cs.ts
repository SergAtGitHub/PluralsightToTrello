/// <reference path="../../../feature/ParsePluralsightCourse/MessageListener/parseCourseMessageListener.ts" />
/// <reference path="../../../feature/messageListener/messageListener.ts" />

import ParseCourseMessageListener = ParsePluralsightCourse.MessageListener.ParseCourseMessageListener;

chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) =>
        ParseCourseMessageListener.Instance.onMessage(message, sender, sendResponse));

chrome.runtime.sendMessage({ action: "show" });