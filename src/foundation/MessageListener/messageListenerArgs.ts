import * as Monads from '../../foundation'
import { PipelineContext } from 'solid-pipelines';
import { QueryPipelineArguments } from '../../foundation';

export class MessageListenerArgs extends QueryPipelineArguments<any> {
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
}
