import { SafeProcessor } from 'solid-pipelines';
import { BaseMessageListenerProcessor } from '../BaseMessageListenerProcessor'
import { MessageListenerArgs } from '../messageListenerArgs';

export class PreprocessingLogging extends BaseMessageListenerProcessor {
    public static readonly Instance = new PreprocessingLogging();

    async SafeExecute(args: MessageListenerArgs): Promise<void> {
        console.log(`Started action: ${args.message.unwrap().action}`);
    }

    SafeCondition(args: MessageListenerArgs): boolean {
        return super.SafeCondition(args) && args.LoggingEnabled;
    }
}