import { OnPopupClosedProcessor } from "../OnPopupClosedProcessor";
import { TrelloBoardRepository, GetTrelloBoardArguments } from "../../../../../feature/ObtainTrelloDestination/Boards";
import { TrelloDataCache, TrelloListsCache } from "../../../../../feature/TrelloDataCache";
import { OnPopupClosedProperties } from "../OnPopupClosedArguments";
import { PipelineContext } from "../../../../../../node_modules/solid-pipelines";

export class StoreListsToCache extends OnPopupClosedProcessor {
    public static readonly Instance = new StoreListsToCache();

    async SafeExecute(args: PipelineContext): Promise<void> {
        let listsCacheData = new TrelloListsCache();
        let list: HTMLSelectElement = args.GetPropertyValueOrUndefined("ListCombobox");

        for (const {value, text} of list.options) {
            listsCacheData.lists.push({id: value, name: text});
        }
        
        listsCacheData.lastUsedList = list.selectedOptions[0].value;

        args.GetPropertyValueOrDefault(
            OnPopupClosedProperties.TrelloDataCache,
            TrelloDataCache.Instance
        ).SetLastUsedLists(listsCacheData);
    }

    SafeCondition(args: PipelineContext) : boolean {
        return super.SafeCondition(args) && !!args.GetPropertyValueOrUndefined("ListCombobox");
    }
}