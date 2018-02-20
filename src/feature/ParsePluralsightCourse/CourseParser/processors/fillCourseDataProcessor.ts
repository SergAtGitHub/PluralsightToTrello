/// <reference path="../parseCourseProcessor.ts" />

module ParsePluralsightCourse.CourseParser.Processors {
    export abstract class FillCourseDataProcessor extends ParseCourseProcessor {
        execute(args: CourseParserArguments): void {
            var course = args.Result.unwrap();
            this.fillCourse(course);
        }

        abstract fillCourse(course: ParsePluralsightCourse.Models.CourseModel): void;

        canExecute(args: CourseParserArguments): boolean {
            var canExecute = args.Result.isSome();
            return super.canExecute(args) && canExecute;
        }
    }
}