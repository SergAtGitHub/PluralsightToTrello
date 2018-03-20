import * as Monads from '../../foundation'
import { PipelineContext } from 'solid-pipelines';

export class MessageListenerArgs extends PipelineContext {
    public static from(message: any, sender: chrome.runtime.MessageSender): MessageListenerArgs {
        return new MessageListenerArgs(message, sender);
    }

    private constructor(message: any, sender: chrome.runtime.MessageSender) {
        super();

        this.message = Monads.Some.wrapNull(message);
        this.sender = Monads.Some.wrapNull(sender);
    }

    readonly message: Monads.Option<any>;
    readonly sender: Monads.Option<chrome.runtime.MessageSender>;
    readonly sendResponse: Monads.Option<(response: any) => void>;

    response: Monads.Option<any>;
}
