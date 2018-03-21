import { PopupBuilderProcessor } from "../PopupBuilderProcessor";
import { PopupBuilderArguments } from "../PopupBuilderArguments";

export class AppendPopupComponentIntoRoot extends PopupBuilderProcessor {
    public static readonly Instance = new AppendPopupComponentIntoRoot();

    async SafeExecute(args: PopupBuilderArguments): Promise<void> {
        let root = args.Root;

        if (args.TrelloAuthChecker.isAuthorized()) {
            if (!args.Boards) {
                args.AddError("Couldn't build boards combobox.");
            }
            else {
                root.appendChild(args.Boards);
                root.appendChild(args.Lists);
            }

            if (!args.ParseCourseButton) {
                args.AddError("Couldn't build parse button.");
            }
            else {
                root.appendChild(args.ParseCourseButton);
            }
        }
        else {
            root.appendChild(args.NonAuthorizedControl);
        }

    }

    SafeCondition(args: PopupBuilderArguments): boolean {
        return super.SafeCondition(args) && !!args.Root && !!args.TrelloAuthChecker;
    }
}