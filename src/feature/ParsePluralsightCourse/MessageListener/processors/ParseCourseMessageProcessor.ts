import { BaseMessageListenerProcessor, MessageListenerArgs } from "../../../../foundation";
import { CourseParserArguments, ChainCourseParser } from "../../CourseParser";

export class ParseCourseMessageProcessor extends BaseMessageListenerProcessor {
    public static readonly Instance = new ParseCourseMessageProcessor();

    async SafeExecute(args: MessageListenerArgs): Promise<void> {
        var parseArguments: CourseParserArguments = new CourseParserArguments();
        await ChainCourseParser.Instance.process(parseArguments);
        args.Result = parseArguments.Result;
    }
}
