export class CourseModel {
    Title: string;
    Duration: string;
    Link: string;
    Sections: SectionModel[];
}

export class SectionModel {
    Title: string;
    Duration: string;
}