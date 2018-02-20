/// <reference path="./parseCourseMessageProcessor.ts" />

module ParsePluralsightCourse.MessageListener {
    export class ParseCourseMessageListener extends Chrome.Messages.BaseMessageListener {
        public static Instance: ParseCourseMessageListener
            = new ParseCourseMessageListener(
                "parseCourse",
                [
                    new ParseCourseMessageProcessor()
                ]
            );
    }
}