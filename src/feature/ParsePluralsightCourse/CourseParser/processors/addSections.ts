/// <reference path="./fillCourseDataProcessor.ts" />

module ParsePluralsightCourse.CourseParser.Processors
{
    export class AddSections extends FillCourseDataProcessor {
        fillCourse(course: ParsePluralsightCourse.Models.CourseModel): void {
            var elements: ParsePluralsightCourse.Models.SectionModel[] = [];

            $("#ps-main .accordian__section").each((index, element) => {
                var section = new ParsePluralsightCourse.Models.SectionModel();
                var el = $(element);
                section.Title = el.find(".table-of-contents__title").text();
                section.Duration = el.find(".table-of-contents__time").first().text();
                elements.push(section);
            });

            course.Sections = elements;
        }
    }}