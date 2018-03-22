import {IMessageListener, BaseMessageListenerProcessor, MessageListenerArgs } from './index';
import { PipelineRunner } from 'solid-pipelines';

export class BaseMessageListener implements IMessageListener {
    constructor(public message: string, public processors: BaseMessageListenerProcessor[]) {
    }

    async process(args: MessageListenerArgs): Promise<void> {
        var runner:PipelineRunner = new PipelineRunner();

        if (args.message.isSome() && this.message === args.message.unwrap().action) {
            console.log(`Started action: ${this.message}`);
            await runner.RunProcessors(this.processors, args);
        }
    }

    onMessage(message: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void): void {
        var args: MessageListenerArgs = MessageListenerArgs.from(message, sender);
        this.process(args);
    }
}