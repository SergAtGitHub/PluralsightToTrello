/// <reference path="../../foundation/monads/result.ts" />
/// <reference path="../../foundation/pipelines/queryPipelineArguments.ts" />

module ObtainTrelloDestination {
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

    export class GetTrelloListArguments extends Pipelines.QueryPipelineArguments<TrelloListsCollectionApiReturnResult> {
        constructor(public boardId: string) {
            super();   
        }
    }

    export abstract class GetTrelloListProcessor extends Pipelines.CommandProcessor<GetTrelloListArguments> {}

    export class TryToRetrieveList extends GetTrelloListProcessor {
        execute(args: GetTrelloListArguments): void {
            var result = Trello.get(`/boards/${args.boardId}/lists`,
                (response) => this.success(args, response), 
                (response) => this.error(args, response));
        }

        success(args: GetTrelloListArguments, response: TrelloListApiReturnResult[]) {
            var result = new TrelloListsCollectionApiReturnResult();
            result.lists = response;
            args.Result = Monads.Some.wrapNull(result);
        }

        error(args: GetTrelloListArguments, response: any) {
            args.AbortPipelineWithErrorMessage(response);
        }
    }

    export class TrelloListRepository extends Pipelines.BasePipeline<GetTrelloListArguments> {
        public static Instance:TrelloListRepository = new TrelloListRepository([new TryToRetrieveList()]);

        getTrelloListsByBoard(boardId: string): Result<TrelloListsCollectionApiReturnResult, string> {
            var args = new GetTrelloListArguments(boardId);
            return this.getTrelloLists(args);
        }

        getTrelloLists(args: GetTrelloListArguments): Result<TrelloListsCollectionApiReturnResult, string> {
            this.process(args);

            return args.Result.okOr(args.Messages.join('\n'));
        }
    }
}