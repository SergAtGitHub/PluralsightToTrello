import { SafeProcessor } from 'solid-pipelines';
import { MessageListenerArgs } from './messageListenerArgs'

export abstract class BaseMessageListenerProcessor extends SafeProcessor<MessageListenerArgs> {
}