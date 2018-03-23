import { CommandPipelineArguments, ITrelloAuthorizationChecker, Option } from '../../../../foundation'
import { TrelloBoardsCache, TrelloListsCache, TrelloDataCache } from '../../../../feature/TrelloDataCache';

export class InitializePopupArguments extends CommandPipelineArguments {
    TrelloAuthChecker:ITrelloAuthorizationChecker;
    TrelloDataCache: TrelloDataCache;
    UserIsAuthorized: boolean;
    BoardItems: Option<TrelloBoardsCache>;
    ListItems: Option<TrelloListsCache>;
    BoardCombobox: HTMLSelectElement;
    ListCombobox: HTMLSelectElement;
}