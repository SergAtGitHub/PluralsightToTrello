/// <reference path="../courseSenderProcessor.ts" />

module SendCourseToTrello.CourseSender.Processors {
    export class CheckUserAuthorized extends CourseSenderProcessor {
        execute(args: ChainCourseSenderArguments): void {
            var authorizationResult: Result<boolean, string> = args.AuthorizationChecker.unwrap().isAuthorized();
            if (authorizationResult.isErr())
            {
                args.AbortPipelineWithErrorMessage("There is an error occured during the authorization check. We still don't know whether user is authorized.");
                args.AddError(authorizationResult.err().unwrap());
                return;
            }

            if (!authorizationResult.unwrap())
            {
                args.AbortPipelineWithErrorMessage("User is not authorized.");
                return;
            }
        }

        canExecute(args: ChainCourseSenderArguments): boolean {
            var safeToExecute = args.AuthorizationChecker.isSome();

            return super.canExecute(args) && safeToExecute;
        }
    }
}