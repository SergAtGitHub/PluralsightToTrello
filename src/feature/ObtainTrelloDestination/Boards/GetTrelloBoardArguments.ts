import { QueryPipelineArguments } from "../../../foundation";
import { TrelloBoardsCollectionApiReturnResult } from ".";
import { TrelloDataCache } from "../../TrelloDataCache";

export class GetTrelloBoardArguments extends QueryPipelineArguments<TrelloBoardsCollectionApiReturnResult> {
    Cache: TrelloDataCache;
    GetFromCache: boolean;
    UpdateCache: boolean;
}