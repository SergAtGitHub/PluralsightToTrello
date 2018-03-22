import { FillCourseDataProcessor } from "./FillCourseDataProcessor";
import { CourseModel } from "../../Models";

export class GetCourseTitle extends FillCourseDataProcessor {
    public static readonly Instance = new GetCourseTitle();

    fillCourse(course: CourseModel): void {
        course.Title = $(".course-hero__title").first().text();
    }
}