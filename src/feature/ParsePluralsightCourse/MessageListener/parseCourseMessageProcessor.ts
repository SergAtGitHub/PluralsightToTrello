import { BaseMessageListenerProcessor } from "../../messageListener/messageListener";
import { MessageListenerArgs } from "../../messageListener/messageListenerArgs";
import CourseParserArguments from "../CourseParser/courseParserArguments";
import { ChainCourseParser } from "../CourseParser/chainCourseParser";

export class ParseCourseMessageProcessor extends BaseMessageListenerProcessor {
    async SafeExecute(args: MessageListenerArgs): Promise<void> {
        var parseArguments: CourseParserArguments = new CourseParserArguments();
        await ChainCourseParser.Instance.process(parseArguments);
        args.response = parseArguments.Result;
    }
}
