import { Trello, TrelloBoardApiReturnResult, QueryPipelineArguments, Some, Result } from "../../foundation";
import { SafeProcessor, MessageFilter, PipelineRunner } from "solid-pipelines";

export class TrelloBoardsCollectionApiReturnResult {
    Boards: TrelloBoardApiReturnResult[];
}

export class GetTrelloBoardArguments extends QueryPipelineArguments<TrelloBoardsCollectionApiReturnResult> {
    constructor() {
        super();
    }
}

export abstract class GetTrelloBoardProcessor extends SafeProcessor<GetTrelloBoardArguments> { }

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

export class TrelloBoardRepository {
    public static Instance:TrelloBoardRepository = new TrelloBoardRepository();

    getTrelloBoards(args: GetTrelloBoardArguments): Result<TrelloBoardsCollectionApiReturnResult, string> {
        var runner:PipelineRunner = new PipelineRunner();
        runner.RunProcessor(new TryToRetrieveBoard(), args);

        return args.Result.okOr(args.GetMessages(MessageFilter.All).join('\n'));
    }
}
