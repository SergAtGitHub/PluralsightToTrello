import { InitializePopupProcessor } from "../InitializePopupProcessor";
import { InitializePopupArguments } from "../InitializePopupArguments";
import { PopupComponent } from '../../PopupComponent/PopupComponent'

export class BuildPopupComponent extends InitializePopupProcessor {
    public static readonly Instance = new BuildPopupComponent();

    async SafeExecute(args: InitializePopupArguments): Promise<void> {
        await PopupComponent.Instance.build("root");
    }
}