import { AddEntryToCacheProcessor } from "../AddEntryToCacheProcessor";
import { AddEntryToCacheArguments } from "../AddEntryToCacheArguments";

export class AddToCache extends AddEntryToCacheProcessor {
    public static readonly Instance = new AddToCache();

    public async SafeExecute(args: AddEntryToCacheArguments): Promise<void> {
        var jsonVariable = {};
        jsonVariable[args.key] = args.value;
        await new Promise((resolve) => {
            chrome.storage.sync.set(jsonVariable);
            resolve();
        });
    }

    public SafeCondition(args: AddEntryToCacheArguments): boolean {
        return super.SafeCondition(args) && this.CustomCondition(args);
    }

    public CustomCondition(args: AddEntryToCacheArguments): boolean {
        let safeCondition = true;
        return safeCondition;
    }
}
