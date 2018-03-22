import { BaseMessageListener } from "../../../foundation";
import * as Processors from './processors'
import { SendCourseMessageListenerArguments } from './SendCourseMessageListenerArguments'

export class SendCourseMessageListener extends BaseMessageListener {
    public static readonly Message = "sendCourse";

    public static Instance: SendCourseMessageListener
        = new SendCourseMessageListener(
            SendCourseMessageListener.Message,
            [
                Processors.SendCourseMessageProcessor.Instance
            ]
        );

    onMessage(message: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void): void {
        let sendCourseArguments = new SendCourseMessageListenerArguments(message, sender);
        this.process(sendCourseArguments);
    }
    
}