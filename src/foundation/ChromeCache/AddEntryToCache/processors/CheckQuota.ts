import { AddEntryToCacheProcessor } from "../AddEntryToCacheProcessor";
import { AddEntryToCacheArguments } from "../AddEntryToCacheArguments";
import size = require("object-sizeof");

export class CheckQuota extends AddEntryToCacheProcessor {
    public static readonly Instance = new CheckQuota();

    public SafeExecute(args: AddEntryToCacheArguments): Promise<void> {
        return new Promise((resolve, reject) => {
            this.CustomAction(args);
            resolve();
        });
    }

    public CustomAction(args: AddEntryToCacheArguments): void {
        let objSize = size(args.value);
        const quota = chrome.storage.sync.QUOTA_BYTES_PER_ITEM;

        if (objSize >= quota){
            args.AbortPipelineWithWarningMessage(
                "You passed a too big object to the cache. Try to reduce its size. " +
                "Used " + objSize + " of " + quota + ".");
        }
    }

    public SafeCondition(args: AddEntryToCacheArguments): boolean {
        return super.SafeCondition(args) && this.CustomCondition(args);
    }

    public CustomCondition(args: AddEntryToCacheArguments): boolean {
        let safeCondition = true;
        return safeCondition;
    }
}
