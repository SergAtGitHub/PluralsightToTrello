import { PopupBuilderProcessor } from "../PopupBuilderProcessor";
import { PopupBuilderArguments } from "../PopupBuilderArguments";

export class AppendControlsWhenNotAuthorizedToTrello extends PopupBuilderProcessor {
    public static readonly Instance = new AppendControlsWhenNotAuthorizedToTrello();

    async SafeExecute(args: PopupBuilderArguments): Promise<void> {
        args.Root.appendChild(args.NonAuthorizedControl);

    }

    SafeCondition(args: PopupBuilderArguments): boolean {
        return super.SafeCondition(args) && !!args.Root && !args.UserIsAuthorized;
    }
}