/// <reference path="../parseCourseProcessor.ts" />

module ParsePluralsightCourse.CourseParser.Processors {
    export class InitializeResult extends ParseCourseProcessor {
        execute(args: CourseParserArguments): void {
            args.Result = Monads.Some.wrapNull(new ParsePluralsightCourse.Models.CourseModel());
        }

        canExecute(args: CourseParserArguments): boolean {
            var canExecute = args.Result == null || args.Result.isNone();
            return super.canExecute(args) && canExecute;
        }
    }
}