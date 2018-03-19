import { PipelineRunner } from 'solid-pipelines';
import { Processors, CourseParserArguments } from '.'

export class ChainCourseParser {
    public static Instance: ChainCourseParser = new ChainCourseParser();

    public process(args: CourseParserArguments): Promise<void> {
        var runner: PipelineRunner = new PipelineRunner();

        return runner.RunProcessors(
            [
                new Processors.InitializeResult(),
                new Processors.GetCourseTitle(),
                new Processors.GetCourseDuration(),
                new Processors.GetCourseLink(),
                new Processors.AddSections()
            ], args);
    }
}