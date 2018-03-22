/// <reference path="../../../../foundation/TrelloApi/client.d.ts" />
import { TrelloItemsCreatorProcessor } from "../TrelloItemsCreatorProcessor";
import { TrelloItemsCreatorArguments } from "../TrelloItemsCreatorArguments";
import { ChecklistModel, VerticalPosition } from "../../../../foundation";

export class CreateCard extends TrelloItemsCreatorProcessor {
    public static readonly Instance = new CreateCard();

    async SafeExecute(args: TrelloItemsCreatorArguments): Promise<void> {
        await Trello.post(
            '/cards/', 
            args.Card, 
            (cardData) => this.CardSuccessfullyCreated(cardData, args), 
            (error) => this.CardCreationFailed(error, args)
        );
    }
    
    CardSuccessfullyCreated(cardData, args: TrelloItemsCreatorArguments) {
        args.Result.unwrap().cardId = cardData.id;
    }
    
    CardCreationFailed(error, args: TrelloItemsCreatorArguments) {
        args.AbortPipelineWithErrorMessage(error);
    }

    SafeCondition(args: TrelloItemsCreatorArguments) : boolean {
        return super.SafeCondition(args) && !!args.Card;
    }
}