/// <reference path="../../foundation/pipelines/queryPipelineArguments.ts" />
/// <reference path="../../foundation/pipelines/basePipeline.ts" />
/// <reference path="../../foundation/pipelines/commandProcessor.ts" />
/// <reference path="../../feature/messageListener/messageListener.ts" />
/// <reference path="../../feature/ParsePluralsightCourse/models/courseModel.ts" />
/// <reference path="../../feature/ParsePluralsightCourse/models/sectionModel.ts" />

import Ok = Monads.Ok;
import Result = Monads.Result;
import Some = Monads.Some;
import CommandProcessor = Pipelines.CommandProcessor;
import CourseModel = ParsePluralsightCourse.Models.CourseModel;
import SectionModel = ParsePluralsightCourse.Models.SectionModel;

module Logic {

    export class ParseCourseMessageProcessor extends Chrome.Messages.BaseMessageListenerProcessor {
        execute(args: Chrome.Messages.MessageListenerArgs): void {
            var parseArguments: CourseParserArguments = new CourseParserArguments();
            ChainCourseParser.Instance.process(parseArguments);

            args.response = parseArguments.Result;
        }
    }

    export class ParseCourseMessageListener extends Chrome.Messages.BaseMessageListener {
        public static Instance: ParseCourseMessageListener = new ParseCourseMessageListener("parseCourse", [new ParseCourseMessageProcessor()]);
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

        abstract fillCourse(course: CourseModel): void;

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

    class GetCourseLink extends FillCourseDataProcessor {
        fillCourse(course: CourseModel): void {
            course.Link = window.location.href;
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
                new GetCourseLink(),
                new AddSections()
            ]
        );
    }
}