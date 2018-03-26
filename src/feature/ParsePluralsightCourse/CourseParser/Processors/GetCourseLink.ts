import { FillCourseDataProcessor } from "./FillCourseDataProcessor";
import { CourseModel } from "../../Models";

export class GetCourseLink extends FillCourseDataProcessor {
    public static readonly Instance = new GetCourseLink();

    fillCourse(course: CourseModel): void {
        course.Link = window.location.href;
    }
}