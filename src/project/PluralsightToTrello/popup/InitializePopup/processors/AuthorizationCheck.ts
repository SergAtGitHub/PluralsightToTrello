import { InitializePopupProcessor } from "../InitializePopupProcessor";
import { InitializePopupArguments } from "../InitializePopupArguments";

export class AuthorizationCheck extends InitializePopupProcessor {
    public static readonly Instance = new AuthorizationCheck();

    async SafeExecute(args: InitializePopupArguments): Promise<void> {
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

    SafeCondition(args: InitializePopupArguments): boolean {
        return super.SafeCondition(args);
    }
}