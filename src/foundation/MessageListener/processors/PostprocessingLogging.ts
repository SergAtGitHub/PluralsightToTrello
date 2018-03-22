import { BaseMessageListenerProcessor } from "../BaseMessageListenerProcessor";
import { MessageListenerArgs } from "../MessageListenerArgs";

export class PostprocessingLogging extends BaseMessageListenerProcessor {
    public static readonly Instance = new PostprocessingLogging();

    async SafeExecute(args: MessageListenerArgs): Promise<void> {
        if (args.hasProblems()) {
            console.log(args.getConsoleMessageObject());
        }
        else {
            console.log(`Ended action: ${args.message.unwrap().action}`);
        }
    }

    SafeCondition(args: MessageListenerArgs): boolean {
        return super.SafeCondition(args) && args.LoggingEnabled;
    }
}