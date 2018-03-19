import { BaseMessageListener } from "../../index";
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