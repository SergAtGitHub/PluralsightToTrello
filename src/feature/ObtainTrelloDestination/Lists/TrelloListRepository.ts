import { TrelloListsCollectionApiReturnResult, GetTrelloListArguments, TryToRetrieveList } from ".";
import { PipelineRunner, MessageFilter } from "solid-pipelines";
import { Result } from "../..";

export class TrelloListRepository {
    public static Instance:TrelloListRepository = new TrelloListRepository();

    getTrelloListsByBoard(boardId: string): Promise<Result<TrelloListsCollectionApiReturnResult, string>> {
        var args = new GetTrelloListArguments(boardId);
        return this.getTrelloLists(args);
    }

    async getTrelloLists(args: GetTrelloListArguments): Promise<Result<TrelloListsCollectionApiReturnResult, string>> {
        var runner:PipelineRunner = new PipelineRunner();
        await runner.RunProcessor(new TryToRetrieveList(), args);

        return args.Result.okOr(args.GetMessages(MessageFilter.All).join('\n'));
    }
}