import { FillCourseDataProcessor } from "./FillCourseDataProcessor";
import { CourseModel, SectionModel } from "../../Models";

export class AddSections extends FillCourseDataProcessor {
    public static readonly Instance = new AddSections();

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