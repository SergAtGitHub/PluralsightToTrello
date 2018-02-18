var ParseCourseMessageListener = Logic.ParseCourseMessageListener;
chrome.runtime.onMessage.addListener(ParseCourseMessageListener.Instance.Execute);
chrome.runtime.sendMessage({ action: "show" });
