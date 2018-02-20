module ParsePluralsightCourse.CourseParser.Processors {
    export class GetCourseLink extends FillCourseDataProcessor {
        fillCourse(course: ParsePluralsightCourse.Models.CourseModel): void {
            course.Link = window.location.href;
        }
    }
}