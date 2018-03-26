import { InitializePopupProcessor } from "../InitializePopupProcessor";
import { InitializePopupArguments } from "../InitializePopupArguments";
import { TrelloDataCache } from "../../../../../feature/TrelloDataCache";

export class EnsureTrelloDataCache extends InitializePopupProcessor {
    public static readonly Instance = new EnsureTrelloDataCache();

    async SafeExecute(args: InitializePopupArguments): Promise<void> {
        args.TrelloDataCache = TrelloDataCache.Instance;
    }

    SafeCondition(args: InitializePopupArguments): boolean {
        return super.SafeCondition(args) && !args.TrelloDataCache;
    }
}