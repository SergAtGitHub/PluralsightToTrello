import { PopupBuilderProcessor } from "../PopupBuilderProcessor";
import { PopupBuilderArguments } from "../PopupBuilderArguments";
import { TrelloListRepository, GetTrelloListArguments } from "../../../../../feature";
import { TrelloDataCache } from "../../../../../feature/TrelloDataCache";

export class AddListsEventListenerToUpdateCache extends PopupBuilderProcessor {
    public static readonly Instance = new AddListsEventListenerToUpdateCache();

    async SafeExecute(args: PopupBuilderArguments): Promise<void> {
        args.Lists.addEventListener("change", async e => await this.OnListChanged(e, args.Lists, args.Cache));
    }

    async OnListChanged(event: Event, selectedList: HTMLSelectElement, cache: TrelloDataCache) : Promise<void> {
        event.preventDefault();

        if (!selectedList.selectedOptions) return;
        await cache.SetLastSelectedList(selectedList.selectedOptions[0].value);
    }

    SafeCondition(args: PopupBuilderArguments): boolean {
        return super.SafeCondition(args) && !!args.Lists && !!args.Boards && args.UserIsAuthorized;
    }
}