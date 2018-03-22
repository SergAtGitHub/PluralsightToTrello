import { CardMapper, CheckListItemMapper } from "../../../PluralsightToTrelloModelsMapper";
import { BaseMessageListenerProcessor, MessageListenerArgs } from "../../../../foundation"
import { ChainCourseSender, ChainCourseSenderArguments } from "../../CourseSender";
import { CourseModel } from "../../../ParsePluralsightCourse/Models";
import { SendCourseMessageListenerArguments } from "../SendCourseMessageListenerArguments";
import { SendCourseMessageListenerProcessor } from '../SendCourseMessageListenerProcessor'

export class SendCourseMessageProcessor extends SendCourseMessageListenerProcessor {
    async SafeExecute(args: SendCourseMessageListenerArguments): Promise<void> {
        var getCardResult = CardMapper.Instance.map(args.CourseModel, args.ListId);
        if (getCardResult.isErr()) {
            args.AbortPipelineWithErrorMessage(getCardResult.err().unwrap());
            return;
        }
        var card = getCardResult.unwrap();

        var checklist = args.CourseModel.Sections.map((x, num) => CheckListItemMapper.Instance.map(x, num + 1).unwrapOr(null))
        var courseSenderArguments = ChainCourseSenderArguments.create(card, checklist)
        ChainCourseSender.Instance.execute(courseSenderArguments);
    }

    SafeCondition(args: SendCourseMessageListenerArguments): boolean {
        return super.SafeCondition(args) && args.message.isSome();
    }
}

export class TryParseCourseModelFromSender extends SendCourseMessageListenerProcessor {
    public static readonly Instance = new TryParseCourseModelFromSender();

    async SafeExecute(args: SendCourseMessageListenerArguments): Promise<void> {
        let message = args.message;
        if (message.isSome() && message.unwrap().model) {
            args.CourseModel = message.unwrap().model;
            return;
        }

        args.AbortPipelineWithErrorMessage("Could not parse a course model message from a sender.");
    }

    SafeCondition(args: SendCourseMessageListenerArguments): boolean {
        return super.SafeCondition(args);
    }
}

export class TryParseListIdFromSender extends SendCourseMessageListenerProcessor {
    public static readonly Instance = new TryParseCourseModelFromSender();

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