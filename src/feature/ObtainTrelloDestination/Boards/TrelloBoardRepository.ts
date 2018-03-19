import { GetTrelloBoardArguments, TrelloBoardsCollectionApiReturnResult, TryToRetrieveBoard } from '.'
import { PipelineRunner, MessageFilter } from 'solid-pipelines';
import { Result } from '../../../foundation';

export class TrelloBoardRepository {
    public static Instance:TrelloBoardRepository = new TrelloBoardRepository();

    getTrelloBoards(args: GetTrelloBoardArguments): Result<TrelloBoardsCollectionApiReturnResult, string> {
        var runner:PipelineRunner = new PipelineRunner();
        runner.RunProcessor(new TryToRetrieveBoard(), args);

        return args.Result.okOr(args.GetMessages(MessageFilter.All).join('\n'));
    }
}