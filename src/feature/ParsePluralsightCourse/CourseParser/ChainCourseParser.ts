import { PipelineRunner } from 'solid-pipelines';
import { CourseParserArguments } from './CourseParserArguments'
import { CourseParserPipeline } from './CourseParserPipeline'

export class ChainCourseParser {
    public static Instance: ChainCourseParser = new ChainCourseParser();

    public process(args: CourseParserArguments): Promise<void> {
        var runner: PipelineRunner = new PipelineRunner();

        return runner.RunPipeline(CourseParserPipeline.Instance, args);
    }
}