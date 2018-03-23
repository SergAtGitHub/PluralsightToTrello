/// <reference path="../../../../foundation/TrelloApi/client.d.ts" />
import { TrelloItemsCreatorProcessor } from "../TrelloItemsCreatorProcessor";
import { TrelloItemsCreatorArguments } from "../TrelloItemsCreatorArguments";
import { ChecklistModel, VerticalPosition } from "../../../../foundation";

export class CreateChecklistItems extends TrelloItemsCreatorProcessor {
    public static readonly Instance = new CreateChecklistItems();

    async SafeExecute(args: TrelloItemsCreatorArguments): Promise<void> {
        var checklistId = args.Result.unwrap().checklistId;
        for (const section of args.Sections) {
            await Trello.post(
                `/checklists/${checklistId}/checkItems`, 
                section, 
                (itemData) => this.ItemSuccessfullyCreated(itemData, args), 
                (error) => this.ItemCreationFailed(error, args)
            );
        }
    }
    
    ItemSuccessfullyCreated(itemData, args: TrelloItemsCreatorArguments) {
        args.Result.unwrap().itemsId.push(itemData.id);
    }
    
    ItemCreationFailed(error, args: TrelloItemsCreatorArguments) {
        args.AbortPipelineWithErrorMessage(error);
    }

    SafeCondition(args: TrelloItemsCreatorArguments) : boolean {
        return super.SafeCondition(args);
    }
}