import { CommandPipelineArguments, ITrelloAuthorizationChecker, Option } from '../../../../foundation'
import { TrelloDataCache } from '../../../../feature/TrelloDataCache';

export class OnPopupClosedArguments extends CommandPipelineArguments {
    TrelloDataCache: TrelloDataCache;
    BoardCombobox: HTMLSelectElement;
    ListCombobox: HTMLSelectElement;
}