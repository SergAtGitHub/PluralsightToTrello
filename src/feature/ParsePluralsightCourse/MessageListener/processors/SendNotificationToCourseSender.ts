import { BaseMessageListenerProcessor, MessageListenerArgs } from "../../../../foundation";
import { CourseParserArguments, ChainCourseParser } from "../../CourseParser";
import { SendCourseMessageListener } from "../../../SendCourseToTrello";

export class SendNotificationToCourseSender extends BaseMessageListenerProcessor {
    async SafeExecute(args: MessageListenerArgs): Promise<void> {
        chrome.runtime.sendMessage(
            { 
                action: SendCourseMessageListener.Message, 
                model : args.Result.unwrap() 
            }, r => console.log("Course sending is started"));
    }

    SafeCondition(args: MessageListenerArgs) : boolean {
        return super.SafeCondition(args) && args.Result.isSome();
    }
}