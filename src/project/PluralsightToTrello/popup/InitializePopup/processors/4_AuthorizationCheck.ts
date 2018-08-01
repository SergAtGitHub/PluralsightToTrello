import { InitializePopupProcessor } from "../InitializePopupProcessor";
import { InitializePopupArguments, InitializePopupProperties } from "../InitializePopupArguments";
import { ITrelloAuthorizationChecker, TrelloAuthorizationChecker } from "../../../../../feature";

export class AuthorizationCheck extends InitializePopupProcessor {
    public static readonly Instance = new AuthorizationCheck();

    async SafeExecute(args: InitializePopupArguments): Promise<void> {
        let authChecker =
            args.GetPropertyValueOrDefault<ITrelloAuthorizationChecker>(
                InitializePopupProperties.TrelloAuthChecker,
                TrelloAuthorizationChecker.Instance
            );

        let getAuthorizationResult = authChecker.isAuthorized();
        if (getAuthorizationResult.isErr()) {
            args.AbortPipelineWithErrorMessage(getAuthorizationResult.err().unwrap());
        }
        else {
            args.SetOrAddProperty(
                InitializePopupProperties.UserIsAuthorized, 
                getAuthorizationResult.unwrap()
            );
        }
    }

    SafeCondition(args: InitializePopupArguments): boolean {
        return super.SafeCondition(args);
    }
}