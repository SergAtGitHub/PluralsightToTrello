import { GetTrelloBoardProcessor } from "../GetTrelloBoardProcessor";
import { GetTrelloBoardArguments } from "../GetTrelloBoardArguments";
import { TrelloBoardsCollectionApiReturnResult } from "..";

export class TryGetFromCache extends GetTrelloBoardProcessor {
    public static readonly Instance = new TryGetFromCache();

    public async SafeExecute(args: GetTrelloBoardArguments): Promise<void> {
        args.Result = 
            (await args.Cache.GetLastUsedBoards())
                .map(c => c.boards)
                .map(cachedBoards => <TrelloBoardsCollectionApiReturnResult>{ Boards: cachedBoards });

        if (args.Result.isSome()) {
            args.AbortPipelineWithInformationMessage("Found in cache.");
        }
    }

    public SafeCondition(args: GetTrelloBoardArguments): boolean {
        return super.SafeCondition(args) && this.CustomCondition(args);
    }

    public CustomCondition(args: GetTrelloBoardArguments): boolean {
        let safeCondition = !!args.Cache && args.GetFromCache && args.Result.isNone();
        return safeCondition;
    }
}
