/// <reference path="../CourseParser/courseParserArguments.ts" />
/// <reference path="../CourseParser/courseParserArguments.ts" />
/// <reference path="../../messageListener/messageListener.ts" />

module ParsePluralsightCourse.MessageListener {
    export class ParseCourseMessageProcessor extends Chrome.Messages.BaseMessageListenerProcessor {
        execute(args: Chrome.Messages.MessageListenerArgs): void {
            var parseArguments: CourseParser.CourseParserArguments = new CourseParser.CourseParserArguments();
            CourseParser.ChainCourseParser.Instance.process(parseArguments);

            args.response = parseArguments.Result;
        }
    }
}