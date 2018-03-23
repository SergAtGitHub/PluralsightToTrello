import { PopupBuilderProcessor } from "../PopupBuilderProcessor";
import { PopupBuilderArguments } from "../PopupBuilderArguments";
import { TrelloListRepository, GetTrelloListArguments } from "../../../../../feature";

export class FillInListsCombobox extends PopupBuilderProcessor {
    public static readonly Instance = new FillInListsCombobox();

    async SafeExecute(args: PopupBuilderArguments): Promise<void> {
        let selectedId = args.CachedLists.unwrap().lastUsedList;

        for (let list of args.CachedLists.unwrap().lists) {
            let opt: HTMLOptionElement = <HTMLOptionElement>(document.createElement('option'));
            [opt.value, opt.text, opt.selected] = [list.id, list.name, list.id === selectedId];
            
            args.Lists.appendChild(opt);
        }
    }

    SafeCondition(args: PopupBuilderArguments): boolean {
        return super.SafeCondition(args) && args.CachedLists.isSome() && !!args.Lists;
    }
}