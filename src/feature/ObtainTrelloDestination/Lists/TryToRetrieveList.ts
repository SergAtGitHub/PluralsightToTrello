import { GetTrelloListArguments, GetTrelloListProcessor, TrelloListsCollectionApiReturnResult, TrelloListApiReturnResult } from '.'
import { Some, Trello } from '../..';

export class TryToRetrieveList extends GetTrelloListProcessor {
    async SafeExecute(args: GetTrelloListArguments): Promise<void> {
        var result = Trello.get(`/boards/${args.boardId}/lists`,
            (response) => this.success(args, response),
            (response) => this.error(args, response));
    }

    success(args: GetTrelloListArguments, response: TrelloListApiReturnResult[]) {
        var result = new TrelloListsCollectionApiReturnResult();
        result.lists = response;
        args.Result = Some.wrapNull(result);
    }

    error(args: GetTrelloListArguments, response: any) {
        args.AbortPipelineWithErrorMessage(response);
    }
}