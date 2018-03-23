import { TrelloItemsCreatorProcessor } from "../TrelloItemsCreatorProcessor";
import { TrelloItemsCreatorArguments } from "../TrelloItemsCreatorArguments";
import { TrelloItemsCreatorResult } from "../TrelloItemsCreator";
import { Some } from "../../../../foundation";

export class InitializeResult extends TrelloItemsCreatorProcessor {
    public static readonly Instance = new InitializeResult();

    async SafeExecute(args: TrelloItemsCreatorArguments): Promise<void> {
        args.Result = new Some(new TrelloItemsCreatorResult); 
    }

    SafeCondition(args: TrelloItemsCreatorArguments) : boolean {
        return super.SafeCondition(args) && (!args.Result || args.Result.isNone());
    }
}