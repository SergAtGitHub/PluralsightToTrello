import { CourseModel, SectionModel } from "../../models";
import { ParseCourseProcessor } from "../ParseCourseProcessor";
import { CourseParserArguments } from "../CourseParserArguments";

export abstract class FillCourseDataProcessor extends ParseCourseProcessor {
    async SafeExecute(args: CourseParserArguments): Promise<void> {
        var course = args.Result.unwrap();
        this.fillCourse(course);
    }

    abstract fillCourse(course: CourseModel): void;

    SafeCondition(args: CourseParserArguments): boolean {
        var canExecute = args.Result.isSome();
        return super.SafeCondition(args) && canExecute;
    }
}