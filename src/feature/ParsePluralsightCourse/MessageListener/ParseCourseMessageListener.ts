import { BaseMessageListenerProcessor, MessageListenerArgs, BaseMessageListener } from "../../../foundation";
import * as Processors from './processors'

export class ParseCourseMessageListener extends BaseMessageListener {
    public static readonly Message = "parseCourse";

    public static Instance: ParseCourseMessageListener
        = new ParseCourseMessageListener(
            ParseCourseMessageListener.Message,
            [
                Processors.ParseCourseMessageProcessor.Instance,
                Processors.SendNotificationToCourseSender.Instance
            ]
        );
}