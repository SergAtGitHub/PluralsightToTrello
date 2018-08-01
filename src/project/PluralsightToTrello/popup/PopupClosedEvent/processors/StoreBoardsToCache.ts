import { OnPopupClosedProcessor } from "../OnPopupClosedProcessor";
import { TrelloBoardRepository, GetTrelloBoardArguments } from "../../../../../feature/ObtainTrelloDestination/Boards";
import { TrelloDataCache, TrelloBoardsCache } from "../../../../../feature/TrelloDataCache";
import { OnPopupClosedProperties } from "../OnPopupClosedArguments";
import { PipelineContext } from "../../../../../../node_modules/solid-pipelines";

export class StoreBoardsToCache extends OnPopupClosedProcessor {
    public static readonly Instance = new StoreBoardsToCache();

    async SafeExecute(args: PipelineContext): Promise<void> {
        let boardsCacheData = new TrelloBoardsCache();
        let board: HTMLSelectElement = 
        args.GetPropertyValueOrUndefined<HTMLSelectElement>(
            OnPopupClosedProperties.BoardCombobox
        );

        for (const {value, text} of board.options) {
            boardsCacheData.boards.push({id: value, name: text});
        }

        boardsCacheData.lastUsedBoard = board.selectedOptions[0].value;

        args.GetPropertyValueOrDefault(
            OnPopupClosedProperties.TrelloDataCache,
            TrelloDataCache.Instance
        ).SetLastUsedBoards(boardsCacheData);
    }

    SafeCondition(args: PipelineContext) : boolean {
        return super.SafeCondition(args) 
            && !!args.GetPropertyValueOrUndefined<HTMLSelectElement>(
                OnPopupClosedProperties.BoardCombobox);
    }
}