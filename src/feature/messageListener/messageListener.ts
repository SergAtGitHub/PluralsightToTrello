/// <reference path="../../foundation/pipelines/basePipeline.ts" />
/// <reference path="../../foundation/pipelines/commandProcessor.ts" />

module Chrome.Messages {
    export interface IMessageListener {
        onMessage(message: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void): void;
    }

    export class BaseMessageListener extends Pipelines.BasePipeline<MessageListenerArgs> implements IMessageListener {
        
        constructor(public message: string, public processors: BaseMessageListenerProcessor[]) {
            super(processors);
        }

        process(args: MessageListenerArgs): void {
            if (args.message.isSome() && this.message === args.message.unwrap().action)
            {
                super.process(args);

                if (args.sendResponse.isSome() && args.response.isSome())
                {
                    args.sendResponse.unwrap()(args.response.unwrap());
                }
            }
        }

        onMessage(message: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void): void {
            var args: MessageListenerArgs = MessageListenerArgs.from(message, sender, sendResponse);
            this.process(args);
        }
    }

    export abstract class BaseMessageListenerProcessor extends Pipelines.CommandProcessor<MessageListenerArgs> {
    }
}