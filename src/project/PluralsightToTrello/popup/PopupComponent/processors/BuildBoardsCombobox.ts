import { PopupBuilderProcessor } from "../PopupBuilderProcessor";
import { PopupBuilderArguments } from "../PopupBuilderArguments";
import { TrelloListRepository, GetTrelloListArguments } from "../../../../../feature";

export class BuildBoardsCombobox extends PopupBuilderProcessor {
    public static readonly Instance = new BuildBoardsCombobox();

    async SafeExecute(args: PopupBuilderArguments): Promise<void> {
        let selectedBoard = <HTMLSelectElement>document.createElement("select");
        selectedBoard.id = "selectedBoard";

        args.Boards = selectedBoard;
    }

    SafeCondition(args: PopupBuilderArguments): boolean {
        return super.SafeCondition(args) && !args.Boards;
    }
}