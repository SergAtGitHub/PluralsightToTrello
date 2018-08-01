import { CommandPipelineArguments, ITrelloAuthorizationChecker, Option } from '../../../../foundation'
import { TrelloBoardsCache, TrelloListsCache, TrelloDataCache } from '../../../../feature/TrelloDataCache';

export class InitializePopupArguments extends CommandPipelineArguments {
    BoardItems: Option<TrelloBoardsCache>;
    ListItems: Option<TrelloListsCache>;

    public get BoardCombobox(): HTMLSelectElement {
        return this.GetPropertyValueOrUndefined(InitializePopupProperties.BoardCombobox);
    }
    public set BoardCombobox(value: HTMLSelectElement) {
        this.AddOrSkipPropertyIfExists(InitializePopupProperties.BoardCombobox, value);
    }

    public get ListCombobox(): HTMLSelectElement {
        return this.GetPropertyValueOrUndefined(InitializePopupProperties.ListCombobox);
    }
    public set ListCombobox(value: HTMLSelectElement) {
        this.AddOrSkipPropertyIfExists(InitializePopupProperties.ListCombobox, value);
    }
}

export class InitializePopupProperties {
    public static readonly UserIsAuthorized: string = "UserIsAuthorized";
    public static readonly TrelloAuthChecker: string = "TrelloAuthChecker";
    public static readonly TrelloDataCache: string = "TrelloDataCache";
    public static readonly BoardCombobox: string = "BoardCombobox";
    public static readonly ListCombobox: string = "ListCombobox";
}