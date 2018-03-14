import { QueryPipelineArguments } from "../../foundation/pipelines/queryPipelineArguments";
import { Some } from "../../foundation/monads/option";
import { MessageFilter, PipelineRunner, SafeProcessor } from "solid-pipelines";
import { Result } from "../../foundation/monads/result";

export class TrelloListsCollectionApiReturnResult {
    lists: TrelloListApiReturnResult[];
}

export class TrelloListApiReturnResult {
    id: string;
    name: string;
    closed: boolean;
    idBoard: string;
    pos: number;
    subscribed: boolean;
}

export class GetTrelloListArguments extends QueryPipelineArguments<TrelloListsCollectionApiReturnResult> {
    constructor(public boardId: string) {
        super();
    }
}

export abstract class GetTrelloListProcessor extends SafeProcessor<GetTrelloListArguments> { }

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

export class TrelloListRepository {
    public static Instance:TrelloListRepository = new TrelloListRepository();

    getTrelloListsByBoard(boardId: string): Result<TrelloListsCollectionApiReturnResult, string> {
        var args = new GetTrelloListArguments(boardId);
        return this.getTrelloLists(args);
    }

    getTrelloLists(args: GetTrelloListArguments): Result<TrelloListsCollectionApiReturnResult, string> {
        var runner:PipelineRunner = new PipelineRunner();
        runner.RunProcessor(new TryToRetrieveList(), args);

        return args.Result.okOr(args.GetMessages(MessageFilter.All).join('\n'));
    }
}