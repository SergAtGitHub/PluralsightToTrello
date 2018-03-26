import { OnPopupClosedProcessor } from "../OnPopupClosedProcessor";
import { TrelloBoardRepository, GetTrelloBoardArguments } from "../../../../../feature/ObtainTrelloDestination/Boards";
import { TrelloDataCache, TrelloBoardsCache } from "../../../../../feature/TrelloDataCache";
import { OnPopupClosedArguments } from "../OnPopupClosedArguments";

export class StoreBoardsToCache extends OnPopupClosedProcessor {
    public static readonly Instance = new StoreBoardsToCache();

    async SafeExecute(args: OnPopupClosedArguments): Promise<void> {
        let boardsCacheData = new TrelloBoardsCache();

        for (const {value, text} of args.BoardCombobox.options) {
            boardsCacheData.boards.push({id: value, name: text});
        }

        boardsCacheData.lastUsedBoard = args.BoardCombobox.selectedOptions[0].value;

        args.TrelloDataCache.SetLastUsedBoards(boardsCacheData);
    }

    SafeCondition(args: OnPopupClosedArguments) : boolean {
        return super.SafeCondition(args) && !!args.BoardCombobox && !!args.TrelloDataCache;
    }
}