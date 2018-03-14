import { BaseMessageListener } from "../../messageListener/messageListener";
import { ParseCourseMessageProcessor } from './parseCourseMessageProcessor'

export class ParseCourseMessageListener extends BaseMessageListener {
    public static Instance: ParseCourseMessageListener
        = new ParseCourseMessageListener(
            "parseCourse",
            [
                new ParseCourseMessageProcessor()
            ]
        );
}