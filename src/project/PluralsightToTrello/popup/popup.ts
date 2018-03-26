import { InitializePopup } from './InitializePopup/InitializePopup'
import { InitializePopupArguments } from './InitializePopup/InitializePopupArguments';
import { OnPopupClosed } from './PopupClosedEvent/OnPopupClosed'
import { OnPopupClosedArguments } from './PopupClosedEvent/OnPopupClosedArguments'

var initializeArgs = new InitializePopupArguments();
document.addEventListener(
    "DOMContentLoaded",
    () => InitializePopup.Instance.initializeWithArguments(initializeArgs));

var closeArgs = new OnPopupClosedArguments();
window.addEventListener("unload", () => {
    [closeArgs.ListCombobox, closeArgs.BoardCombobox, closeArgs.TrelloDataCache] =
        [initializeArgs.ListCombobox, initializeArgs.BoardCombobox, initializeArgs.TrelloDataCache];
    OnPopupClosed.Instance.execute();
});