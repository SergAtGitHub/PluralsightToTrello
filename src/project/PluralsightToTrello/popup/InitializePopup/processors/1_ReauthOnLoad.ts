/// <reference path="../../../../../foundation/TrelloApi/client.d.ts" />

import { InitializePopupProcessor } from "../InitializePopupProcessor";
import { InitializePopupArguments } from "../InitializePopupArguments";
import { PipelineContext } from "../../../../../../node_modules/solid-pipelines";

export class ReauthOnLoad extends InitializePopupProcessor {
    public static readonly Instance = new ReauthOnLoad();

    async SafeExecute(args: InitializePopupArguments): Promise<void> {
        Trello.updateTokenFromStorage();
    }
}