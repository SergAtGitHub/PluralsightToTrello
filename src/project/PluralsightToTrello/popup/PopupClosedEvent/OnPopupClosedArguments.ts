import { CommandPipelineArguments, ITrelloAuthorizationChecker, Option } from '../../../../foundation'
import { TrelloDataCache } from '../../../../feature/TrelloDataCache';

export class OnPopupClosedProperties {
    public static readonly TrelloDataCache: string = "TrelloDataCache";
    public static readonly BoardCombobox: string = "BoardCombobox";
    public static readonly ListCombobox: string = "ListCombobox";
}