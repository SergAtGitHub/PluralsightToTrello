import { PopupBuilderProcessor } from "../PopupBuilderProcessor";
import { PopupBuilderArguments } from "../PopupBuilderArguments";
import { TrelloListRepository, GetTrelloListArguments } from "../../../../../feature";

export class BuildListsCombobox extends PopupBuilderProcessor {
    public static readonly Instance = new BuildListsCombobox();

    async SafeExecute(args: PopupBuilderArguments): Promise<void> {
        let selectedList = <HTMLSelectElement>document.createElement("select");
        selectedList.id = "selectedList";
        args.Lists = selectedList;
    }

    SafeCondition(args: PopupBuilderArguments): boolean {
        return super.SafeCondition(args) && !args.Lists;
    }
}