/// <reference path="./client.d.ts" />
import { Result, Ok } from "..";

export interface ITrelloAuthorizationChecker {
    isAuthorized(): Result<boolean, string>;
    authorized(): boolean;
}

export class TrelloAuthorizationChecker implements ITrelloAuthorizationChecker {
    public static Instance: TrelloAuthorizationChecker = new TrelloAuthorizationChecker();

    public isAuthorized(): Result<boolean, string> {
        return new Ok(Trello.authorized());
    }
    
    public authorized(): boolean {
        return this.isAuthorized().isOk();
    }
}