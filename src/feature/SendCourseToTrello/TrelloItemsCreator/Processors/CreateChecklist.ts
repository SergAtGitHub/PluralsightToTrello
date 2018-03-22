/// <reference path="../../../../foundation/TrelloApi/client.d.ts" />
import { TrelloItemsCreatorProcessor } from "../TrelloItemsCreatorProcessor";
import { TrelloItemsCreatorArguments } from "../TrelloItemsCreatorArguments";
import { ChecklistModel, VerticalPosition } from "../../../../foundation";

export class CreateChecklist extends TrelloItemsCreatorProcessor {
    public static readonly Instance = new CreateChecklist();

    async SafeExecute(args: TrelloItemsCreatorArguments): Promise<void> {
        args.Checklist =
        {
            name: "Table of Contents",
            pos: VerticalPosition.bottom,
            idCard: args.Result.unwrap().cardId
        };

        Trello.post(
            '/checklists',
            args.Checklist, 
            (cardData) => this.ChecklistSuccessfullyCreated(cardData, args), 
            (error) => this.ChecklistCreationFailed(error, args)
        );
    }
    
    ChecklistSuccessfullyCreated(checklistData, args: TrelloItemsCreatorArguments) {
        args.Result.unwrap().checklistId = checklistData.id;
    }
    
    ChecklistCreationFailed(error, args: TrelloItemsCreatorArguments) {
        args.AbortPipelineWithErrorMessage(error);
    }

    SafeCondition(args: TrelloItemsCreatorArguments) : boolean {
        return super.SafeCondition(args);
    }
}