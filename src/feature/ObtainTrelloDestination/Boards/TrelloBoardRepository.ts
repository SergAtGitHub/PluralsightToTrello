import { GetTrelloBoardArguments, TrelloBoardsCollectionApiReturnResult } from '.'
import { PipelineRunner, MessageFilter } from 'solid-pipelines';
import { Result } from '../../../foundation';
import { GetTrelloBoardPipeline } from './GetTrelloBoardPipeline'
import { TrelloDataCache } from '../../TrelloDataCache';

export class TrelloBoardRepository {
    public static Instance: TrelloBoardRepository = new TrelloBoardRepository();

    async getTrelloBoards(retrieveFromCache = false, updateCache = true, cache = TrelloDataCache.Instance): Promise<Result<TrelloBoardsCollectionApiReturnResult, string>> {
        let args = new GetTrelloBoardArguments();
        args.UpdateCache = updateCache;
        args.GetFromCache = retrieveFromCache;
        args.Cache = cache;

        return this.getTrelloBoardsWithArguments(args);
    }

    async getTrelloBoardsWithArguments(args: GetTrelloBoardArguments): Promise<Result<TrelloBoardsCollectionApiReturnResult, string>> {
        var runner: PipelineRunner = new PipelineRunner();
        await runner.RunPipeline(GetTrelloBoardPipeline.Instance, args);

        return args.Result.okOr(args.GetMessages(MessageFilter.All).join('\n'));
    }
}