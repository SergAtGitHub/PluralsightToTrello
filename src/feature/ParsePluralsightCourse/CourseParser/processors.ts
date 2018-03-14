import { CourseModel, SectionModel } from "../models";
import { ParseCourseProcessor } from "./parseCourseProcessor";
import CourseParserArguments from "./courseParserArguments";
import { Some } from "../../../foundation/monads/option";

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

export class GetCourseTitle extends FillCourseDataProcessor {
    fillCourse(course: CourseModel): void {
        course.Title = $(".course-hero__title").first().text();
    }
}

export class AddSections extends FillCourseDataProcessor {
    fillCourse(course: CourseModel): void {
        var elements: SectionModel[] = [];

        $("#ps-main .accordian__section").each((index, element) => {
            var section = new SectionModel();
            var el = $(element);
            section.Title = el.find(".table-of-contents__title").text();
            section.Duration = el.find(".table-of-contents__time").first().text();
            elements.push(section);
        });

        course.Sections = elements;
    }
}

export class InitializeResult extends ParseCourseProcessor {
    async SafeExecute(args: CourseParserArguments): Promise<void> {
        args.Result = Some.wrapNull(new CourseModel());
    }

    SafeCondition(args: CourseParserArguments): boolean {
        var canExecute = args.Result == null || args.Result.isNone();
        return super.SafeCondition(args) && canExecute;
    }
}

export class GetCourseLink extends FillCourseDataProcessor {
    fillCourse(course: CourseModel): void {
        course.Link = window.location.href;
    }
}

export class GetCourseDuration extends FillCourseDataProcessor {
    fillCourse(course: CourseModel): void {
        course.Duration = $("#ps-main .detail-list__desc").eq(3).text();
    }
}