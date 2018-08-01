import { InitializePopupProcessor } from "../InitializePopupProcessor";
import { TrelloBoardRepository, GetTrelloBoardArguments } from "../../../../../feature/ObtainTrelloDestination/Boards";
import { TrelloDataCache, TrelloBoardsCache } from "../../../../../feature/TrelloDataCache";
import { InitializePopupArguments, InitializePopupProperties } from "../InitializePopupArguments";

export class CheckCachedData extends InitializePopupProcessor {
    public static readonly Instance = new CheckCachedData();

    async SafeExecute(args: InitializePopupArguments): Promise<void> {
        let cache = args.GetPropertyValueOrDefault(
            InitializePopupProperties.TrelloDataCache, 
            TrelloDataCache.Instance
        );

        args.BoardItems = await cache.GetLastUsedBoards();        
        args.ListItems = await cache.GetLastUsedLists();
    }
}