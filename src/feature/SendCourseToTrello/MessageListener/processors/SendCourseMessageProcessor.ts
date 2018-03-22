import { CardMapper, CheckListItemMapper } from "../../../PluralsightToTrelloModelsMapper";
import { BaseMessageListenerProcessor, MessageListenerArgs } from "../../../../foundation"
import { ChainCourseSender, ChainCourseSenderArguments } from "../../CourseSender";
import { CourseModel } from "../../../ParsePluralsightCourse/Models";
import { SendCourseMessageListenerArguments } from "../SendCourseMessageListenerArguments";
import { SendCourseMessageListenerProcessor } from '../SendCourseMessageListenerProcessor'

export class SendCourseMessageProcessor extends SendCourseMessageListenerProcessor {
    public static readonly Instance = new SendCourseMessageProcessor();

    async SafeExecute(args: SendCourseMessageListenerArguments): Promise<void> {
        if (!args.CourseModel) {
            args.AbortPipelineWithErrorMessage("Course model was not recognized.");
            return;
        }

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
        return super.SafeCondition(args);
    }
}