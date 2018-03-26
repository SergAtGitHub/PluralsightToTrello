import { BaseMessageListener } from "../../../foundation";
import * as Processors from './processors'
import { BackgroundLoggingArguments } from './BackgroundLoggingArguments'
import { BackgroundLoggingPipeline } from './BackgroundLoggingPipeline'

export class BackgroundLoggingEventListener extends BaseMessageListener {
    public static readonly Message = "logMessage";

    public static Instance: BackgroundLoggingEventListener
        = new BackgroundLoggingEventListener(
            BackgroundLoggingEventListener.Message,
            BackgroundLoggingPipeline.Instance.GetProcessors()
        );

    onMessage(message: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void): void {
        let logMessageArgs = new BackgroundLoggingArguments(message, sender);
        this.process(logMessageArgs);
    }
    
}