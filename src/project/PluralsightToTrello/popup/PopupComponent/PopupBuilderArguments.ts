import { CommandPipelineArguments, ITrelloAuthorizationChecker, Option } from "../../../../foundation";
import { TrelloBoardsCache, TrelloListsCache, TrelloDataCache } from "../../../../feature/TrelloDataCache";

export class PopupBuilderArguments extends CommandPipelineArguments {
    Root: HTMLElement;
    ParseCourseButton: HTMLButtonElement;
    Boards: HTMLSelectElement;
    Lists: HTMLSelectElement;
    NonAuthorizedControl: HTMLElement;
    UserIsAuthorized: boolean;
    CachedBoards: Option<TrelloBoardsCache>;
    CachedLists: Option<TrelloListsCache>;
    Cache: TrelloDataCache;
}