import { FillCourseDataProcessor } from "./FillCourseDataProcessor";
import { CourseModel } from "../../Models";

export class GetCourseDuration extends FillCourseDataProcessor {
    public static readonly Instance = new GetCourseDuration();

    fillCourse(course: CourseModel): void {
        course.Duration = $("#ps-main .detail-list__desc").eq(3).text();
    }
}