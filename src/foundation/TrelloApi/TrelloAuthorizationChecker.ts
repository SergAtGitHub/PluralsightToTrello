/// <reference path="./client.d.ts" />
import { Result, Ok, Err } from "..";

export interface ITrelloAuthorizationChecker {
    isAuthorized(): Result<boolean, string>;
    authorized(): boolean;
}

export class TrelloAuthorizationChecker implements ITrelloAuthorizationChecker {
    public static Instance: TrelloAuthorizationChecker = new TrelloAuthorizationChecker();

    public isAuthorized(): Result<boolean, string> {
        if (!Trello) {
            return new Err("Trello client is not defined, try to review, that you added a reference to trello client.");
        }
        
        return new Ok(Trello.authorized());
    }
    
    public authorized(): boolean {
        var authorizedMonad = this.isAuthorized();
        return authorizedMonad.isOk() && authorizedMonad.unwrap();
    }
}