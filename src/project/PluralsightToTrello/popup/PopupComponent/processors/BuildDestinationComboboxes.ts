import { PopupBuilderProcessor } from "../PopupBuilderProcessor";
import { PopupBuilderArguments } from "../PopupBuilderArguments";
import { TrelloListRepository, GetTrelloListArguments } from "../../../../../feature";

export class BuildDestinationComboboxes extends PopupBuilderProcessor {
    public static readonly Instance = new BuildDestinationComboboxes();

    async SafeExecute(args: PopupBuilderArguments): Promise<void> {
        let selectedBoard = <HTMLSelectElement>document.createElement("select");
        selectedBoard.id = "selectedBoard";
        let selectedList = <HTMLSelectElement>document.createElement("select");
        selectedList.id = "selectedList";

        selectedBoard.onchange = async e => {
            e.preventDefault();

            if (!selectedBoard.selectedOptions) return;

            var args = new GetTrelloListArguments(selectedBoard.selectedOptions[0].value);
            await TrelloListRepository.Instance.getTrelloLists(args);
            selectedList.innerHTML = '';
            var lists = args.Result.unwrap().lists;
            for (let list of lists) {
                let opt: HTMLOptionElement = <HTMLOptionElement>(document.createElement('option'));
                [opt.value, opt.text] = [list.id, list.name];
                selectedList.appendChild(opt);
            }
        };

        args.Boards = selectedBoard;
        args.Lists = selectedList;
    }
}