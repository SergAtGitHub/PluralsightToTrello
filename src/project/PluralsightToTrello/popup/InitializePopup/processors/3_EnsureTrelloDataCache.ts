import { InitializePopupProcessor } from "../InitializePopupProcessor";
import { InitializePopupArguments, InitializePopupProperties } from "../InitializePopupArguments";
import { TrelloDataCache } from "../../../../../feature/TrelloDataCache";

export class EnsureTrelloDataCache extends InitializePopupProcessor {
    public static readonly Instance = new EnsureTrelloDataCache();

    async SafeExecute(args: InitializePopupArguments): Promise<void> {
        args.AddOrSkipPropertyIfExists(
            InitializePopupProperties.TrelloDataCache, 
            TrelloDataCache.Instance
        );
    }
}