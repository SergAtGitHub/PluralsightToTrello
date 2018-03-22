import { IPipeline, IProcessor } from 'solid-pipelines'
import * as Processors from './processors'

export class CourseSenderPipeline implements IPipeline {
    public static readonly Instance = new CourseSenderPipeline();

    GetProcessors(): IProcessor[] {
        return [
            Processors.EnsureTrelloAuthChecker.Instance,
            Processors.UpdateTrelloToken.Instance,
            Processors.CheckUserAuthorized.Instance,
            Processors.PushCardToTrello.Instance
        ];
    }
}