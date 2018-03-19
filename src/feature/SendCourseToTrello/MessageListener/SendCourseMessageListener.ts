import { BaseMessageListener } from "../../MessageListener/BaseMessageListener";
import { SendCourseMessageProcessor } from './SendCourseMessageProcessor'

export class SendCourseMessageListener extends BaseMessageListener {
    public static Instance: SendCourseMessageListener
        = new SendCourseMessageListener(
            "sendCourse",
            [
                new SendCourseMessageProcessor()
            ]
        );
}