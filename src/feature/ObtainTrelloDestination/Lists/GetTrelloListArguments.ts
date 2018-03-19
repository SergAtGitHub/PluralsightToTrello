import { TrelloListsCollectionApiReturnResult } from "./TrelloListsCollectionApiReturnResult";
import { QueryPipelineArguments } from '../../../foundation'

export class GetTrelloListArguments extends QueryPipelineArguments<TrelloListsCollectionApiReturnResult> {
    constructor(public boardId: string) {
        super();
    }
}