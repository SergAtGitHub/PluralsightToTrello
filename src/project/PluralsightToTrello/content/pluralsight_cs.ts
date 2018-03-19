import { ParseCourseMessageListener } from "../..";

chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) =>
        ParseCourseMessageListener.Instance.onMessage(message, sender, sendResponse));

chrome.runtime.sendMessage({ action: "show" });