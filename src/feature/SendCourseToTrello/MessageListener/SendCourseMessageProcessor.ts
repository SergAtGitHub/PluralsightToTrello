import { BaseMessageListenerProcessor, MessageListenerArgs, CourseModel, CardMapper, CheckListItemMapper } from "../..";
import { ChainCourseSender, ChainCourseSenderArguments } from "../CourseSender";

export class SendCourseMessageProcessor extends BaseMessageListenerProcessor {
    async SafeExecute(args: MessageListenerArgs): Promise<void> {

        var response: CourseModel = args.message.unwrap().model;
        var listId = $("#selectedList").val().toString();
        var getCardResult = CardMapper.Instance.map(response, listId);
        if (getCardResult.isErr()) { return; }
        var card = getCardResult.unwrap();

        var checklist = response.Sections.map((x, num) => CheckListItemMapper.Instance.map(x, num + 1).unwrapOr(null))
        var courseSenderArguments = ChainCourseSenderArguments.create(card, checklist)
        ChainCourseSender.Instance.execute(courseSenderArguments);
    }

    SafeCondition(args: MessageListenerArgs): boolean {
        return super.SafeCondition(args) && args.message.isSome();
    }
}
