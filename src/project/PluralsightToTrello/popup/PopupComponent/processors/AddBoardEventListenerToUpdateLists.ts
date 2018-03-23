import { PopupBuilderProcessor } from "../PopupBuilderProcessor";
import { PopupBuilderArguments } from "../PopupBuilderArguments";
import { TrelloListRepository, GetTrelloListArguments } from "../../../../../feature";

export class AddBoardEventListenerToUpdateLists extends PopupBuilderProcessor {
    public static readonly Instance = new AddBoardEventListenerToUpdateLists();

    async SafeExecute(args: PopupBuilderArguments): Promise<void> {
        args.Boards.addEventListener("change", async e => await this.OnBoardChanged(e, args.Boards, args.Lists));
    }

    async OnBoardChanged(event: Event, selectedBoard : HTMLSelectElement, selectedList: HTMLSelectElement) : Promise<void> {
        event.preventDefault();

        if (!selectedBoard.selectedOptions) return;

        var getTrelloListArguments = new GetTrelloListArguments(selectedBoard.selectedOptions[0].value);
        await TrelloListRepository.Instance.getTrelloLists(getTrelloListArguments);
        selectedList.innerHTML = '';
        var lists = getTrelloListArguments.Result.unwrap().lists;
        for (let list of lists) {
            let opt: HTMLOptionElement = <HTMLOptionElement>(document.createElement('option'));
            [opt.value, opt.text] = [list.id, list.name];
            selectedList.appendChild(opt);
        }
    }

    SafeCondition(args: PopupBuilderArguments): boolean {
        return super.SafeCondition(args) && !!args.Lists && !!args.Boards && args.UserIsAuthorized;
    }
}