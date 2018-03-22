import { BaseMessageListener } from "../../../foundation";
import { SendCourseMessageProcessor } from './processors/SendCourseMessageProcessor'
import { SendCourseMessageListenerArguments } from './SendCourseMessageListenerArguments'

export class SendCourseMessageListener extends BaseMessageListener {
    public static readonly Message = "sendCourse";

    public static Instance: SendCourseMessageListener
        = new SendCourseMessageListener(
            SendCourseMessageListener.Message,
            [
                new SendCourseMessageProcessor()
            ]
        );

    onMessage(message: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void): void {
        let sendCourseArguments = new SendCourseMessageListenerArguments(message, sender);
        this.process(sendCourseArguments);
    }
    
}