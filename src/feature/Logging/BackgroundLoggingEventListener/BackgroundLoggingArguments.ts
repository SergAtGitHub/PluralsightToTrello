import { MessageListenerArgs } from '../../../foundation'

export class BackgroundLoggingArguments extends MessageListenerArgs {
    public constructor(message: any, sender: chrome.runtime.MessageSender) {
        super(message, sender);
    }
}