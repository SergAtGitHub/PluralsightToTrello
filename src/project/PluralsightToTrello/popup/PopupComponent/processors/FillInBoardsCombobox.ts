import { PopupBuilderProcessor } from "../PopupBuilderProcessor";
import { PopupBuilderArguments } from "../PopupBuilderArguments";
import { TrelloListRepository, GetTrelloListArguments } from "../../../../../feature";

export class FillInBoardsCombobox extends PopupBuilderProcessor {
    public static readonly Instance = new FillInBoardsCombobox();

    async SafeExecute(args: PopupBuilderArguments): Promise<void> {
        let selectedId = args.CachedBoards.unwrap().lastUsedBoard;

        for (let board of args.CachedBoards.unwrap().boards) {
            let opt: HTMLOptionElement = <HTMLOptionElement>(document.createElement('option'));
            [opt.value, opt.text, opt.selected] = [board.id, board.name + ' [cached]', board.id === selectedId];
            
            args.Boards.appendChild(opt);
        }
    }

    SafeCondition(args: PopupBuilderArguments): boolean {
        return super.SafeCondition(args) && args.CachedBoards.isSome() && !!args.Boards;
    }
}