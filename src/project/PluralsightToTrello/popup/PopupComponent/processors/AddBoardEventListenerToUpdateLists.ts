import { PopupBuilderProcessor } from "../PopupBuilderProcessor";
import { PopupBuilderArguments } from "../PopupBuilderArguments";
import { TrelloListRepository, GetTrelloListArguments } from "../../../../../feature";
import { TrelloDataCache, TrelloListsCache } from "../../../../../feature/TrelloDataCache";

export class AddBoardEventListenerToUpdateLists extends PopupBuilderProcessor {
    public static readonly Instance = new AddBoardEventListenerToUpdateLists();

    async SafeExecute(args: PopupBuilderArguments): Promise<void> {
        args.Boards.addEventListener("change", async e => await this.OnBoardChanged(e, args.Boards, args.Lists, args.Cache));
    }

    async OnBoardChanged(
        event: Event,
        selectedBoard: HTMLSelectElement,
        selectedList: HTMLSelectElement,
        cache: TrelloDataCache): Promise<void> {

        event.preventDefault();

        if (!selectedBoard.selectedOptions) return;

        let boardId = selectedBoard.selectedOptions[0].value;
        var getTrelloListArguments = new GetTrelloListArguments(boardId);
        await TrelloListRepository.Instance.getTrelloLists(getTrelloListArguments);
        selectedList.innerHTML = '';
        var lists = getTrelloListArguments.Result.unwrap().lists;
        for (let list of lists) {
            let opt: HTMLOptionElement = <HTMLOptionElement>(document.createElement('option'));
            [opt.value, opt.text] = [list.id, list.name];
            selectedList.appendChild(opt);
        }
        
        await cache.SetLastSelectedBoard(boardId);
        let cacheData = new TrelloListsCache();
        cacheData.lists = lists;
        cacheData.lastUsedList = lists[0].id;
        await cache.SetLastUsedLists(cacheData);
    }

    SafeCondition(args: PopupBuilderArguments): boolean {
        return super.SafeCondition(args) && !!args.Lists && !!args.Boards && args.UserIsAuthorized;
    }
}