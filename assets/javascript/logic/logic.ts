import Ok = Monads.Ok;
import Result = Monads.Result;
import CommandProcessor = Pipelines.CommandProcessor;


module Logic {
    interface IMessageListener {
        Execute(message: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void): void;
    }

    export class ParseCourseMessageListener implements IMessageListener {
        public static Instance: ParseCourseMessageListener = new ParseCourseMessageListener();

        Execute(message: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void): void {
            if (message.action === "parseCourse") {
                var parseArguments: CourseParserArguments = new CourseParserArguments();
                ChainCourseParser.Instance.process(parseArguments);
                var result = parseArguments.Result.okOr("No result.");

                if (result.isOk()) {
                    var data = result.unwrap();
                    console.log(data.Title + "\n" + data.Duration);
                    console.log(data.Sections);
                }
                else {
                    alert(result.err());
                }
            }
        }
    }

    class CourseParserArguments extends Pipelines.QueryPipelineArguments<CourseModel> {

    }

    interface ICourseParser {
        Parse(args: CourseParserArguments): Result<CourseModel, string>;
    }

    abstract class ParseCourseProcessor extends CommandProcessor<CourseParserArguments> {
    }

    abstract class FillCourseDataProcessor extends ParseCourseProcessor {
        execute(args: CourseParserArguments): void {
            var course = args.Result.unwrap();
            this.fillCourse(course);
        }

        abstract fillCourse(course: CourseModel) : void;
        
        canExecute(args: CourseParserArguments): boolean {
            var canExecute = args.Result.isSome();
            return super.canExecute(args) && canExecute;
        }
    }

    class InitializeResult extends ParseCourseProcessor {
        execute(args: CourseParserArguments): void {
            args.Result = Monads.Some.wrapNull(new CourseModel());
        }

        canExecute(args: CourseParserArguments): boolean {
            var canExecute = args.Result == null || args.Result.isNone();
            return super.canExecute(args) && canExecute;
        }
    }

    class GetCourseTitle extends FillCourseDataProcessor {
        fillCourse(course: CourseModel): void {
            course.Title = $(".course-hero__title").first().text();
        }
    }

    class GetCourseDuration extends FillCourseDataProcessor {
        fillCourse(course: CourseModel): void {
            course.Duration = $("#ps-main .detail-list__desc").eq(3).text();
        }
    }

    class AddSections extends FillCourseDataProcessor {
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

    class ChainCourseParser extends Pipelines.BasePipeline<CourseParserArguments> {
        public static Instance: ChainCourseParser = new ChainCourseParser(
            [
                new InitializeResult(), 
                new GetCourseTitle(), 
                new GetCourseDuration(),
                new AddSections()
            ]
        );
    }

    class CourseModel {
        Title: string;
        Duration: string;
        Sections: SectionModel[];
    }

    class SectionModel {
        Title: string;
        Duration: string;
    }
}