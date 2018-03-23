import { InitializePopupProcessor } from "../InitializePopupProcessor";
import { TrelloBoardRepository, GetTrelloBoardArguments } from "../../../../../feature/ObtainTrelloDestination/Boards";
import { TrelloDataCache, TrelloBoardsCache } from "../../../../../feature/TrelloDataCache";
import { InitializePopupArguments } from "../InitializePopupArguments";

export class FillInComponents extends InitializePopupProcessor {
    public static readonly Instance = new FillInComponents();

    async SafeExecute(args: InitializePopupArguments): Promise<void> {
        var getTrelloBoardsArgs = new GetTrelloBoardArguments();
        var result = await TrelloBoardRepository.Instance.getTrelloBoards(getTrelloBoardsArgs);
        var boards = getTrelloBoardsArgs.Result.unwrap().Boards;

        var cacheData = new TrelloBoardsCache();
        cacheData.boards = boards;
        args.TrelloDataCache.SetLastUsedBoards(cacheData);
    
        for (let board of boards) {
            let opt: HTMLOptionElement = <HTMLOptionElement>(document.createElement('option'));
            [opt.value, opt.text] = [board.id, board.name];
            args.BoardCombobox.appendChild(opt);
        }
    }

    SafeCondition(args: InitializePopupArguments) : boolean {
        return super.SafeCondition(args) 
            && args.UserIsAuthorized && args.BoardItems.isNone();
    }
}