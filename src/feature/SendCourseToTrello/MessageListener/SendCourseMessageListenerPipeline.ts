import { IPipeline, IProcessor } from 'solid-pipelines'
import * as Processors from './processors'

export class SendCourseMessageListenerPipeline implements IPipeline {
    public static readonly Instance = new SendCourseMessageListenerPipeline();

    GetProcessors(): IProcessor[] {
        return [
            Processors.TryParseCourseModelFromSender.Instance,
            Processors.TryParseListIdFromSender.Instance,
            Processors.SendCourseMessageProcessor.Instance
        ];
    }
}