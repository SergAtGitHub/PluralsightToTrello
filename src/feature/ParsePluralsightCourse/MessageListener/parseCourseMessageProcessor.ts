import { BaseMessageListenerProcessor, MessageListenerArgs } from "../..";
import { CourseParserArguments, ChainCourseParser } from "../CourseParser";

export class ParseCourseMessageProcessor extends BaseMessageListenerProcessor {
    async SafeExecute(args: MessageListenerArgs): Promise<void> {
        var parseArguments: CourseParserArguments = new CourseParserArguments();
        await ChainCourseParser.Instance.process(parseArguments);
        args.response = parseArguments.Result;
    }
}
