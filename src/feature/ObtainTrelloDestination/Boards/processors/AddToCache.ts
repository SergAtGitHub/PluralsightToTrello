import { GetTrelloBoardProcessor } from "../GetTrelloBoardProcessor";
import { GetTrelloBoardArguments } from "../GetTrelloBoardArguments";
import { TrelloBoardsCache } from "../../../TrelloDataCache";

export class AddToCache extends GetTrelloBoardProcessor {
    public static readonly Instance = new AddToCache();

    public async SafeExecute(args: GetTrelloBoardArguments): Promise<void> {
        var cacheData = new TrelloBoardsCache();
        cacheData.boards = args.Result.unwrap().Boards;
        var result = await args.Cache.SetLastUsedBoards(cacheData);
        if (result.isErr()) {
            console.log("Error adding to cache");
            console.log(result.err().unwrap());
        }
    }

    public SafeCondition(args: GetTrelloBoardArguments): boolean {
        return super.SafeCondition(args) && this.CustomCondition(args);
    }

    public CustomCondition(args: GetTrelloBoardArguments): boolean {
        let safeCondition = !!args.Cache && args.UpdateCache && args.Result.isSome();
        return safeCondition;
    }
}
