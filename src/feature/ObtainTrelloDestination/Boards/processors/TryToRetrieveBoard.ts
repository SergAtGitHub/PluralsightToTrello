/// <reference path="../../../../foundation/TrelloApi/client.d.ts" />

import { GetTrelloBoardArguments, TrelloBoardsCollectionApiReturnResult } from "..";
import { GetTrelloBoardProcessor } from '../GetTrelloBoardProcessor'
import { TrelloBoardApiReturnResult, Some } from '../../..'

export class TryToRetrieveBoard extends GetTrelloBoardProcessor {
    public static readonly Instance = new TryToRetrieveBoard();

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

    public SafeCondition(args: GetTrelloBoardArguments): boolean {
        return super.SafeCondition(args) && this.CustomCondition(args);
    }
    
    public CustomCondition(args: GetTrelloBoardArguments): boolean {
        let safeCondition = args.Result.isNone();
        return safeCondition;
    }
    
}