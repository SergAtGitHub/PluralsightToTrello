import { TrelloListsCollectionApiReturnResult, GetTrelloListArguments, TryToRetrieveList } from ".";
import { PipelineRunner, MessageFilter } from "solid-pipelines";
import { Result } from "../..";

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