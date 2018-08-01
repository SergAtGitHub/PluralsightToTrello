import { InitializePopupProcessor } from "../InitializePopupProcessor";
import { InitializePopupArguments, InitializePopupProperties } from "../InitializePopupArguments";
import { ITrelloAuthorizationChecker } from "../../../../../feature";

export class AuthorizationCheck extends InitializePopupProcessor {
    public static readonly Instance = new AuthorizationCheck();

    async SafeExecute(args: InitializePopupArguments): Promise<void> {
        let authChecker = 
            args.GetPropertyValueOrUndefined<ITrelloAuthorizationChecker>(
                InitializePopupProperties.TrelloAuthChecker);
                
        if (!authChecker) {
            args.AbortPipelineWithErrorMessage("You've missed an authorization checker, please, review the popup component builder.");
            return;
        }

        let getAuthorizationResult = authChecker.isAuthorized();
        if (getAuthorizationResult.isErr()) {
            args.AbortPipelineWithErrorMessage(getAuthorizationResult.err().unwrap());
        }

        args.UserIsAuthorized = getAuthorizationResult.unwrap();
    }

    SafeCondition(args: InitializePopupArguments): boolean {
        return super.SafeCondition(args);
    }
}