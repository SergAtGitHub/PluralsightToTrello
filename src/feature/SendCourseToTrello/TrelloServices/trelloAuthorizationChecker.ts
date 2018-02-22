/// <reference path="../../../foundation/monads/result.ts" />
/// <reference path="../../../foundation/declarations/trello/index.d.ts" />

import Result = Monads.Result;

module SendCourseToTrello.TrelloServices {

    export interface ITrelloAuthorizationChecker {
        isAuthorized(): Result<boolean, string>;
    }

    export class TrelloAuthorizationChecker implements ITrelloAuthorizationChecker {
        public static Instance: TrelloAuthorizationChecker = new TrelloAuthorizationChecker();

        public isAuthorized() : Result<boolean, string> {
            return new Monads.Ok(Trello.authorized());
        }
    }
}