import { BackgroundLoggingProcessor } from '../BackgroundLoggingProcessor'
import { BackgroundLoggingArguments } from '../BackgroundLoggingArguments';

export class LogMessageToConsole extends BackgroundLoggingProcessor {
    public static readonly Instance = new LogMessageToConsole();

    async SafeExecute(args: BackgroundLoggingArguments): Promise<void> {
        console.log(args.getConsoleMessageObject());
    }
}