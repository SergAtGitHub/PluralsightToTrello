import { MessageListenerArgs } from "../../../foundation";
import { CourseModel } from "../../ParsePluralsightCourse/Models";

export class SendCourseMessageListenerArguments extends MessageListenerArgs {
    public constructor(message: any, sender: chrome.runtime.MessageSender) {
        super(message, sender);
    }

    CourseModel: CourseModel;
    ListId: string;
}