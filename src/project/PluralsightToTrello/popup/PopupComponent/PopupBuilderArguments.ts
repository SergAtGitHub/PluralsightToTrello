import { CommandPipelineArguments, ITrelloAuthorizationChecker } from "../../../../foundation";

export class PopupBuilderArguments extends CommandPipelineArguments {
    Root: HTMLElement;
    ParseCourseButton: HTMLButtonElement;
    Boards: HTMLSelectElement;
    Lists: HTMLSelectElement;
    NonAuthorizedControl: HTMLElement;
    TrelloAuthChecker: ITrelloAuthorizationChecker;
    UserIsAuthorized: boolean;
}