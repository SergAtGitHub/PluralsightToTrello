module ParsePluralsightCourse.CourseParser.Processors {
    export class GetCourseTitle extends FillCourseDataProcessor {
        fillCourse(course: ParsePluralsightCourse.Models.CourseModel): void {
            course.Title = $(".course-hero__title").first().text();
        }
    }
}