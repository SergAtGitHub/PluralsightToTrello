import { PopupBuilderProcessor } from "../PopupBuilderProcessor";
import { PopupBuilderArguments } from "../PopupBuilderArguments";
import { ParseCourseMessageListener, TrelloAuthorizationChecker } from "../../../../../feature";

export class EnsureTrelloAuthChecker extends PopupBuilderProcessor {
    public static readonly Instance = new EnsureTrelloAuthChecker();

    async SafeExecute(args: PopupBuilderArguments): Promise<void> {
        args.TrelloAuthChecker = TrelloAuthorizationChecker.Instance;
    }

    SafeCondition(args: PopupBuilderArguments): boolean {
        return super.SafeCondition(args) && !args.TrelloAuthChecker;
    }
}