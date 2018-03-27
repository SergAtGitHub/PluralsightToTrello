import { PopupBuilderProcessor } from "../PopupBuilderProcessor";
import { PopupBuilderArguments } from "../PopupBuilderArguments";
import { ParseCourseMessageListener, GetTrelloBoardArguments, TrelloBoardRepository } from "../../../../../feature";
import { TrelloBoardsCache } from "../../../../../feature/TrelloDataCache";

export class BuildRefreshDataButton extends PopupBuilderProcessor {
    public static readonly Instance = new BuildRefreshDataButton();

    async SafeExecute(args: PopupBuilderArguments): Promise<void> {
        var refreshData = <HTMLButtonElement>document.createElement("button");
        refreshData.onclick = (e) => this.ParseCourseButtonClicked(e, args);
        refreshData.textContent = "Refresh data";
        refreshData.id = "refreshData";
        refreshData.className = "button button-outline";
        args.RefreshData = refreshData;
    }

    public async ParseCourseButtonClicked(eventArgs: MouseEvent, args: PopupBuilderArguments){
        eventArgs.preventDefault();
        
        var result = await TrelloBoardRepository.Instance.getTrelloBoards(false, true);
        var boards = result.unwrap().Boards;
        args.Boards.innerHTML = '';
    
        for (let board of boards) {
            let opt: HTMLOptionElement = <HTMLOptionElement>(document.createElement('option'));
            [opt.value, opt.text] = [board.id, board.name];
            args.Boards.appendChild(opt);
        }
    }

    SafeCondition(args: PopupBuilderArguments): boolean {
        return super.SafeCondition(args) && !args.RefreshData && args.UserIsAuthorized;
    }
}