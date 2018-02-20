module ParsePluralsightCourse.CourseParser.Processors {
    export class GetCourseDuration extends FillCourseDataProcessor {
        fillCourse(course: ParsePluralsightCourse.Models.CourseModel): void {
            course.Duration = $("#ps-main .detail-list__desc").eq(3).text();
        }
    }
}