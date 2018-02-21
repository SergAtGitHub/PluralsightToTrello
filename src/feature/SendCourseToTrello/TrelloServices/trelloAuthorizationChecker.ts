/// <reference path="../../../foundation/monads/result.ts" />

import Result = Monads.Result;

module SendCourseToTrello.TrelloServices {

    export interface ITrelloAuthorizationChecker {
        isAuthorized(): Result<boolean, string>;
    }

    export class TrelloAuthorizationChecker {
        public static Instance: TrelloAuthorizationChecker = new TrelloAuthorizationChecker();

        public checkUserIsAuthorized() : boolean {
            return false;
        }
    }
}