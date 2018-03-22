import { CourseModel, SectionModel } from "../../models";
import { CourseParserArguments } from "../CourseParserArguments";
import { ParseCourseProcessor } from "../ParseCourseProcessor";
import { Some } from "../../../../foundation";

export class InitializeResult extends ParseCourseProcessor {
    public static readonly Instance = new InitializeResult();

    async SafeExecute(args: CourseParserArguments): Promise<void> {
        args.Result = Some.wrapNull(new CourseModel());
    }

    SafeCondition(args: CourseParserArguments): boolean {
        var canExecute = args.Result == null || args.Result.isNone();
        return super.SafeCondition(args) && canExecute;
    }
}