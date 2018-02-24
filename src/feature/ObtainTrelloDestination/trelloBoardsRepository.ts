/// <reference path="./trelloBoardApiReturnResult.ts" />
/// <reference path="../../foundation/monads/result.ts" />
/// <reference path="../../foundation/pipelines/basePipeline.ts" />
/// <reference path="../../foundation/pipelines/commandProcessor.ts" />
/// <reference path="../../foundation/pipelines/queryPipelineArguments.ts" />


module ObtainTrelloDestination {
    export class TrelloBoardsCollectionApiReturnResult {
        Boards: TrelloBoardApiReturnResult[];
    }

    export class GetTrelloBoardArguments extends Pipelines.QueryPipelineArguments<TrelloBoardsCollectionApiReturnResult> {
        constructor() {
            super();
        }
    }

    export abstract class GetTrelloBoardProcessor extends Pipelines.CommandProcessor<GetTrelloBoardArguments> {}

    export class TryToRetrieveBoard extends GetTrelloBoardProcessor {
        execute(args: GetTrelloBoardArguments): void {
            var result = Trello.get(`/member/me/boards`,
                (response) => this.success(args, response),
                (response) => this.error(args, response));
        }

        success(args: GetTrelloBoardArguments, response: TrelloBoardApiReturnResult[]) {
            var result = new TrelloBoardsCollectionApiReturnResult();
            result.Boards = response;
            args.Result = Monads.Some.wrapNull(result);
        }

        error(args: GetTrelloBoardArguments, response: any) {
            args.AbortPipelineWithErrorMessage(response);
        }
    }

    export class TrelloBoardRepository extends Pipelines.BasePipeline<GetTrelloBoardArguments> {
        public static Instance:TrelloBoardRepository = new TrelloBoardRepository([new TryToRetrieveBoard()]);

        getTrelloBoards(args: GetTrelloBoardArguments): Result<TrelloBoardsCollectionApiReturnResult, string> {
            this.process(args);

            return args.Result.okOr(args.Messages.join('\n'));
        }
    }
}