import { BaseMessageListener } from "../../../foundation";
import * as Processors from './processors'
import { SendCourseMessageListenerArguments } from './SendCourseMessageListenerArguments'
import { SendCourseMessageListenerPipeline } from './SendCourseMessageListenerPipeline'

export class SendCourseMessageListener extends BaseMessageListener {
    public static readonly Message = "sendCourse";

    public static Instance: SendCourseMessageListener
        = new SendCourseMessageListener(
            SendCourseMessageListener.Message,
            SendCourseMessageListenerPipeline.Instance.GetProcessors()
        );

    onMessage(message: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void): void {
        let sendCourseArguments = new SendCourseMessageListenerArguments(message, sender);
        this.process(sendCourseArguments);
    }
    
}