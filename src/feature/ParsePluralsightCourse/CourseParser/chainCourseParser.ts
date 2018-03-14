import CourseParserArguments from './courseParserArguments'
import { PipelineRunner } from 'solid-pipelines';
import * as Processors from './processors';

export class ChainCourseParser {
    public static Instance: ChainCourseParser = new ChainCourseParser();

    public process(args: CourseParserArguments):void {
        var runner:PipelineRunner = new PipelineRunner();

        runner.RunProcessors(
            [
                new Processors.InitializeResult(),
                new Processors.GetCourseTitle(),
                new Processors.GetCourseDuration(),
                new Processors.GetCourseLink(),
                new Processors.AddSections()
            ], args);
    }
}