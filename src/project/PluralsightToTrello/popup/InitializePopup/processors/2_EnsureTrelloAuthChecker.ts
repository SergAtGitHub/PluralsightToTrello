import { InitializePopupProcessor } from "../InitializePopupProcessor";
import { InitializePopupArguments, InitializePopupProperties } from "../InitializePopupArguments";
import { ParseCourseMessageListener, TrelloAuthorizationChecker } from "../../../../../feature";

export class EnsureTrelloAuthChecker extends InitializePopupProcessor {
    public static readonly Instance = new EnsureTrelloAuthChecker();

    async SafeExecute(args: InitializePopupArguments): Promise<void> {
        args.AddOrSkipPropertyIfExists(
            InitializePopupProperties.TrelloAuthChecker, 
            TrelloAuthorizationChecker.Instance
        );
    }
    
}