import { BaseMessageListenerProcessor, MessageListenerArgs } from "../../../../foundation";
import { CourseParserArguments, ChainCourseParser } from "../../CourseParser";
import { SendCourseMessageListener } from "../../../SendCourseToTrello";

export class SendNotificationToCourseSender extends BaseMessageListenerProcessor {
    public static readonly Instance = new SendNotificationToCourseSender();

    async SafeExecute(args: MessageListenerArgs): Promise<void> {
        chrome.runtime.sendMessage(
            {
                action: SendCourseMessageListener.Message,
                message: { model: args.Result.unwrap(), list: args.message.unwrap().list }
            }, r => console.log("Course sending is started"));
    }

    SafeCondition(args: MessageListenerArgs): boolean {
        return super.SafeCondition(args) && args.Result.isSome();
    }
}