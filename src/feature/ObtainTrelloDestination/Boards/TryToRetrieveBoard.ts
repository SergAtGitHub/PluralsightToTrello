/// <reference path="../../../foundation/TrelloApi/client.d.ts" />

import { GetTrelloBoardProcessor, GetTrelloBoardArguments, TrelloBoardsCollectionApiReturnResult } from ".";
import { TrelloBoardApiReturnResult, Some } from '../..'

export class TryToRetrieveBoard extends GetTrelloBoardProcessor {
    async SafeExecute(args: GetTrelloBoardArguments): Promise<void> {
        var result = await Trello.get(`/member/me/boards`,
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