import { BaseMessageListenerProcessor, MessageListenerArgs, BaseMessageListener } from "../../../foundation";
import { ParseCourseMessageProcessor, SendNotificationToCourseSender } from './processors'

export class ParseCourseMessageListener extends BaseMessageListener {
    public static readonly Message = "parseCourse";

    public static Instance: ParseCourseMessageListener
        = new ParseCourseMessageListener(
            ParseCourseMessageListener.Message,
            [
                new ParseCourseMessageProcessor(),
                new SendNotificationToCourseSender()
            ]
        );
}