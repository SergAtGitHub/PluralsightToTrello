import { InitializePopupProcessor } from "../InitializePopupProcessor";
import { InitializePopupArguments } from "../InitializePopupArguments";
import { PopupComponent } from '../../PopupComponent/PopupComponent'
import { PopupBuilderArguments } from "../../PopupComponent/PopupBuilderArguments";

export class BuildPopupComponent extends InitializePopupProcessor {
    public static readonly Instance = new BuildPopupComponent();

    async SafeExecute(args: InitializePopupArguments): Promise<void> {
        
        var popupBuilderArguments = new PopupBuilderArguments();
        popupBuilderArguments.Root = document.getElementById("root");
        popupBuilderArguments.UserIsAuthorized = args.UserIsAuthorized;
        popupBuilderArguments.CachedBoards = args.BoardItems;
        popupBuilderArguments.CachedLists = args.ListItems;

        await PopupComponent.Instance.buildWithArguments(popupBuilderArguments);

        args.BoardCombobox = popupBuilderArguments.Boards;
        args.ListCombobox = popupBuilderArguments.Lists;
    }
}