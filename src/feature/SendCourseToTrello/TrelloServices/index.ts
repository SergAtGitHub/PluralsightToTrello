/// <reference path="../../../foundation/TrelloApi/client.d.ts" />
import { Result, Ok } from "../../../foundation";

export interface ITrelloAuthorizationChecker {
    isAuthorized(): Result<boolean, string>;
}

export class TrelloAuthorizationChecker implements ITrelloAuthorizationChecker {
    public static Instance: TrelloAuthorizationChecker = new TrelloAuthorizationChecker();

    public isAuthorized(): Result<boolean, string> {
        return new Ok(Trello.authorized());
    }
}