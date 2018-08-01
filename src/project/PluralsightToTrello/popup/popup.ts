import { InitializePopup } from './InitializePopup/InitializePopup'
import { InitializePopupArguments } from './InitializePopup/InitializePopupArguments';
import { OnPopupClosed } from './PopupClosedEvent/OnPopupClosed'

var programArgs = new InitializePopupArguments();

document.addEventListener(
    "DOMContentLoaded",
    () => InitializePopup.Executor.Execute(programArgs));

window.addEventListener(
    "unload", 
    () => OnPopupClosed.Instance.Execute(programArgs));
