import { OnPopupClosedProcessor } from "../OnPopupClosedProcessor";
import { TrelloBoardRepository, GetTrelloBoardArguments } from "../../../../../feature/ObtainTrelloDestination/Boards";
import { TrelloDataCache, TrelloListsCache } from "../../../../../feature/TrelloDataCache";
import { OnPopupClosedArguments } from "../OnPopupClosedArguments";

export class StoreListsToCache extends OnPopupClosedProcessor {
    public static readonly Instance = new StoreListsToCache();

    async SafeExecute(args: OnPopupClosedArguments): Promise<void> {
        let listsCacheData = new TrelloListsCache();

        for (const {value, text} of args.ListCombobox.options) {
            listsCacheData.lists.push({id: value, name: text});
        }
        
        listsCacheData.lastUsedList = args.ListCombobox.selectedOptions[0].value;

        args.TrelloDataCache.SetLastUsedLists(listsCacheData);
    }

    SafeCondition(args: OnPopupClosedArguments) : boolean {
        return super.SafeCondition(args) && !!args.ListCombobox && !!args.TrelloDataCache;
    }
}