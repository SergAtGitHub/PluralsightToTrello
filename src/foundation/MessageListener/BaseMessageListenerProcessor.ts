import { SafeProcessor } from 'solid-pipelines';
import { MessageListenerArgs } from './MessageListenerArgs'

export abstract class BaseMessageListenerProcessor extends SafeProcessor<MessageListenerArgs> {
}