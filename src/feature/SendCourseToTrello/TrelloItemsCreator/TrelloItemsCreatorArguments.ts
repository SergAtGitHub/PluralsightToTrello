import { QueryPipelineArguments, CardModel, ChecklistModel, ChecklistItemModel } from "../../../foundation";
import { TrelloItemsCreatorResult } from "./TrelloItemsCreator";

export class TrelloItemsCreatorArguments extends QueryPipelineArguments<TrelloItemsCreatorResult> {
    Card: CardModel;
    Checklist: ChecklistModel;
    Sections: ChecklistItemModel[];
}