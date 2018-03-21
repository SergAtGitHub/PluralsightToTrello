import { PopupBuilderProcessor } from "../PopupBuilderProcessor";
import { PopupBuilderArguments } from "../PopupBuilderArguments";

export class AuthorizationCheck extends PopupBuilderProcessor {
    public static readonly Instance = new AuthorizationCheck();

    async SafeExecute(args: PopupBuilderArguments): Promise<void> {
        if (!args.TrelloAuthChecker) {
            args.AbortPipelineWithErrorMessage("You've missed an authorization checker, please, review the popup component builder.");
            return;
        }

        let getAuthorizationResult = args.TrelloAuthChecker.isAuthorized();
        if (getAuthorizationResult.isErr()) {
            args.AbortPipelineWithErrorMessage(getAuthorizationResult.err().unwrap());
        }

        args.UserIsAuthorized = getAuthorizationResult.unwrap();
    }

    SafeCondition(args: PopupBuilderArguments): boolean {
        return super.SafeCondition(args);
    }
}