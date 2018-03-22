import { IMessageListener, BaseMessageListenerProcessor, MessageListenerArgs } from './index';
import { PipelineRunner, IProcessor } from 'solid-pipelines';
import { PostprocessingLogging, PreprocessingLogging } from './processors'

export class BaseMessageListener implements IMessageListener {
    constructor(public message: string, public processors: IProcessor[]) {
        this.processors.push(PostprocessingLogging.Instance);
        this.processors.unshift(PreprocessingLogging.Instance);
    }

    async process(args: MessageListenerArgs): Promise<void> {
        var runner: PipelineRunner = new PipelineRunner();

        if (args.message.isSome() && this.message === args.message.unwrap().action) {
            await runner.RunProcessors(this.processors, args);
        }
    }

    onMessage(message: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void): void {
        var args: MessageListenerArgs = MessageListenerArgs.from(message, sender);
        this.process(args);
    }
}