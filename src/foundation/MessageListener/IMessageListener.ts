export interface IMessageListener {
    onMessage(message: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void): void;
}