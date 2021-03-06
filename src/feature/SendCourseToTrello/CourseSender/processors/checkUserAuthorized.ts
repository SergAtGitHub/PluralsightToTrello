import {CourseSenderProcessor} from '../courseSenderProcessor'
import { ChainCourseSenderArguments } from '../ChainCourseSenderArguments';
import { Result } from '../../../../foundation/monads';

export class CheckUserAuthorized extends CourseSenderProcessor {
    public static readonly Instance = new CheckUserAuthorized();

    async SafeExecute(args: ChainCourseSenderArguments): Promise<void> {
        var authorizationResult: Result<boolean, string> = args.AuthorizationChecker.isAuthorized();
        if (authorizationResult.isErr()) {
            args.AbortPipelineWithErrorMessage("There is an error occured during the authorization check. We still don't know whether user is authorized.");
            args.AddError(authorizationResult.err().unwrap());
            return;
        }

        if (!authorizationResult.unwrap()) {
            args.AbortPipelineWithErrorMessage("User is not authorized.");
            return;
        }
    }

    SafeCondition(args: ChainCourseSenderArguments): boolean {
        return super.SafeCondition(args) && !!args.AuthorizationChecker;
    }
}