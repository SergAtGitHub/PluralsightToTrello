import { SendCourseMessageListenerArguments } from "../SendCourseMessageListenerArguments";
import { SendCourseMessageListenerProcessor } from '../SendCourseMessageListenerProcessor';

export class TryParseCourseModelFromSender extends SendCourseMessageListenerProcessor {
    public static readonly Instance = new TryParseCourseModelFromSender();

    async SafeExecute(args: SendCourseMessageListenerArguments): Promise<void> {
        let message = args.message;
        if (!message.isSome()) {
            args.AbortPipelineWithErrorMessage("Course model was not passed to the sender.");
            return;
        }

        console.log(message);
        let model = message.unwrap().model;
        if (!model) {
            args.AbortPipelineWithErrorMessage("Sent model was not of expected type, try to review it.");
            console.log(model);
            return;
        }

        args.CourseModel = model;
    }

    SafeCondition(args: SendCourseMessageListenerArguments): boolean {
        return super.SafeCondition(args);
    }
}