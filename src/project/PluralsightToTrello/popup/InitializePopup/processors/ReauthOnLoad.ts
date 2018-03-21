import { InitializePopupProcessor } from "../InitializePopupProcessor";
import { InitializePopupArguments } from "../InitializePopupArguments";

export class ReauthOnLoad extends InitializePopupProcessor {
    public static readonly Instance = new ReauthOnLoad();

    async SafeExecute(args: InitializePopupArguments): Promise<void> {
        Trello.authorize({});
    }
}