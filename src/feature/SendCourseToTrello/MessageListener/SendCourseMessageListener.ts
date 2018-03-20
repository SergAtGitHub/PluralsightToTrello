import { BaseMessageListener } from "../../MessageListener/BaseMessageListener";
import { SendCourseMessageProcessor } from './SendCourseMessageProcessor'

export class SendCourseMessageListener extends BaseMessageListener {
    public static readonly Message = "sendCourse";

    public static Instance: SendCourseMessageListener
        = new SendCourseMessageListener(
            SendCourseMessageListener.Message,
            [
                new SendCourseMessageProcessor()
            ]
        );
}