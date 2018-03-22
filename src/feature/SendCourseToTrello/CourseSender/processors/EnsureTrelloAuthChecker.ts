import { CourseSenderProcessor } from "../CourseSenderProcessor";
import { ChainCourseSenderArguments } from "../ChainCourseSenderArguments";
import { ParseCourseMessageListener, TrelloAuthorizationChecker } from "../../../../feature";

export class EnsureTrelloAuthChecker extends CourseSenderProcessor {
    public static readonly Instance = new EnsureTrelloAuthChecker();

    async SafeExecute(args: ChainCourseSenderArguments): Promise<void> {
        args.AuthorizationChecker = TrelloAuthorizationChecker.Instance;
    }

    SafeCondition(args: ChainCourseSenderArguments): boolean {
        return super.SafeCondition(args) && !args.AuthorizationChecker;
    }
}