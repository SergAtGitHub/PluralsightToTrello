import { IPipeline, IProcessor } from 'solid-pipelines'
import * as Processors from './Processors'

export class CourseParserPipeline implements IPipeline {
public static readonly Instance = new CourseParserPipeline();

    GetProcessors(): IProcessor[] {
        return [
            Processors.InitializeResult.Instance,
            Processors.GetCourseTitle.Instance,
            Processors.GetCourseDuration.Instance,
            Processors.GetCourseLink.Instance,
            Processors.AddSections.Instance
        ];
    }
}