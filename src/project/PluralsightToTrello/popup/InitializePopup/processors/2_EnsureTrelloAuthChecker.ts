import { InitializePopupProcessor } from "../InitializePopupProcessor";
import { InitializePopupArguments } from "../InitializePopupArguments";
import { ParseCourseMessageListener, TrelloAuthorizationChecker } from "../../../../../feature";

export class EnsureTrelloAuthChecker extends InitializePopupProcessor {
    public static readonly Instance = new EnsureTrelloAuthChecker();

    async SafeExecute(args: InitializePopupArguments): Promise<void> {
        args.TrelloAuthChecker = TrelloAuthorizationChecker.Instance;
    }

    SafeCondition(args: InitializePopupArguments): boolean {
        return super.SafeCondition(args) && !args.TrelloAuthChecker;
    }
}