import { MessageListenerArgs } from './messageListenerArgs'
import { SafeProcessor, PipelineRunner } from 'solid-pipelines';

export interface IMessageListener {
    onMessage(message: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void): void;
}

export class BaseMessageListener implements IMessageListener {
    constructor(public message: string, public processors: BaseMessageListenerProcessor[]) {
    }

    async process(args: MessageListenerArgs): Promise<void> {
        var runner:PipelineRunner = new PipelineRunner();

        if (args.message.isSome() && this.message === args.message.unwrap().action) {
            await runner.RunProcessors(this.processors, args);

            if (args.sendResponse.isSome() && args.response.isSome()) {
                args.sendResponse.unwrap()(args.response.unwrap());
            }
        }
    }

    onMessage(message: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void): void {
        var args: MessageListenerArgs = MessageListenerArgs.from(message, sender, sendResponse);
        this.process(args);
    }
}

export abstract class BaseMessageListenerProcessor extends SafeProcessor<MessageListenerArgs> {
}