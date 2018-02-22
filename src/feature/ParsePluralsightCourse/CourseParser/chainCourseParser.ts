/// <reference path="./processors/addSections.ts" />
/// <reference path="./processors/initializeResult.ts" />
/// <reference path="./processors/getCourseTitle.ts" />
/// <reference path="./processors/getCourseDuration.ts" />
/// <reference path="./processors/getCourseLink.ts" />
/// <reference path="../../../foundation/pipelines/basePipeline.ts" />

module ParsePluralsightCourse.CourseParser {
    export class ChainCourseParser extends Pipelines.BasePipeline<CourseParserArguments> {
        public static Instance: ChainCourseParser = new ChainCourseParser(
            [
                new Processors.InitializeResult(),
                new Processors.GetCourseTitle(),
                new Processors.GetCourseDuration(),
                new Processors.GetCourseLink(),
                new Processors.AddSections()
            ]
        );
    }
}