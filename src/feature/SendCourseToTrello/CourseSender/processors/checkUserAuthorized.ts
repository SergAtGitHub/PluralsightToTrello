import {CourseSenderProcessor} from '../courseSenderProcessor'
import { ChainCourseSenderArguments } from '../courseSenderArguments';
import { Result } from '../../../../foundation/monads/result';

export class CheckUserAuthorized extends CourseSenderProcessor {
    async SafeExecute(args: ChainCourseSenderArguments): Promise<void> {
        var authorizationResult: Result<boolean, string> = args.AuthorizationChecker.unwrap().isAuthorized();
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
        var safeToExecute = args.AuthorizationChecker.isSome();

        return super.SafeCondition(args) && safeToExecute;
    }
}