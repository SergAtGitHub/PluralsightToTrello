import { PopupBuilderProcessor } from "../PopupBuilderProcessor";
import { PopupBuilderArguments } from "../PopupBuilderArguments";
import { ParseCourseMessageListener, TrelloAuthorizationChecker } from "../../../../../feature";

export class BuildAuthorizationControl extends PopupBuilderProcessor {
    public static readonly Instance = new BuildAuthorizationControl();

    async SafeExecute(args: PopupBuilderArguments): Promise<void> {
        let el = document.createElement("button");
        el.id = "openOptions";
        el.textContent = "Authorize";
        el.onclick = this.OpenOptionsClicked;
        el.className = "button button-outline";
        args.NonAuthorizedControl = el;
    }

    OpenOptionsClicked(eventArguments: MouseEvent) {
        eventArguments.preventDefault();
        chrome.runtime.openOptionsPage();
    }

    SafeCondition(args: PopupBuilderArguments): boolean {
        return super.SafeCondition(args) && !args.NonAuthorizedControl;
    }
}