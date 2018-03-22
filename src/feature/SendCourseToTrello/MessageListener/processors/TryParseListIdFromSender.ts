import { SendCourseMessageListenerArguments } from "../SendCourseMessageListenerArguments";
import { SendCourseMessageListenerProcessor } from '../SendCourseMessageListenerProcessor';

export class TryParseListIdFromSender extends SendCourseMessageListenerProcessor {
    public static readonly Instance = new TryParseListIdFromSender();

    async SafeExecute(args: SendCourseMessageListenerArguments): Promise<void> {
        let message = args.message;
        if (message.isSome() && message.unwrap().list) {
            args.ListId = message.unwrap().list;
            return;
        }

        args.AbortPipelineWithErrorMessage("Could not parse a list id from a sender.");
    }

    SafeCondition(args: SendCourseMessageListenerArguments): boolean {
        return super.SafeCondition(args);
    }
}