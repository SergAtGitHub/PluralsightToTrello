import { GetTrelloBoardProcessor, GetTrelloBoardArguments, TrelloBoardsCollectionApiReturnResult } from ".";
import { Trello, TrelloBoardApiReturnResult, Some } from '../../../foundation'

export class TryToRetrieveBoard extends GetTrelloBoardProcessor {
    async SafeExecute(args: GetTrelloBoardArguments): Promise<void> {
        var result = Trello.get(`/member/me/boards`,
            (response) => this.success(args, response),
            (response) => this.error(args, response));
    }

    success(args: GetTrelloBoardArguments, response: TrelloBoardApiReturnResult[]) {
        var result = new TrelloBoardsCollectionApiReturnResult();
        result.Boards = response;
        args.Result = Some.wrapNull(result);
    }

    error(args: GetTrelloBoardArguments, response: any) {
        args.AbortPipelineWithErrorMessage(response);
    }
}