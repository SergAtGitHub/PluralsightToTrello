var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Ok = Monads.Ok;
var CommandProcessor = Pipelines.CommandProcessor;
var Logic;
(function (Logic) {
    var ParseCourseMessageListener = /** @class */ (function () {
        function ParseCourseMessageListener() {
        }
        ParseCourseMessageListener.prototype.Execute = function (message, sender, sendResponse) {
            if (message.action === "parseCourse") {
                var parseArguments = new CourseParserArguments();
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
        };
        ParseCourseMessageListener.Instance = new ParseCourseMessageListener();
        return ParseCourseMessageListener;
    }());
    Logic.ParseCourseMessageListener = ParseCourseMessageListener;
    var CourseParserArguments = /** @class */ (function (_super) {
        __extends(CourseParserArguments, _super);
        function CourseParserArguments() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CourseParserArguments;
    }(Pipelines.QueryPipelineArguments));
    var ParseCourseProcessor = /** @class */ (function (_super) {
        __extends(ParseCourseProcessor, _super);
        function ParseCourseProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ParseCourseProcessor;
    }(CommandProcessor));
    var FillCourseDataProcessor = /** @class */ (function (_super) {
        __extends(FillCourseDataProcessor, _super);
        function FillCourseDataProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FillCourseDataProcessor.prototype.execute = function (args) {
            var course = args.Result.unwrap();
            this.fillCourse(course);
        };
        FillCourseDataProcessor.prototype.canExecute = function (args) {
            var canExecute = args.Result.isSome();
            return _super.prototype.canExecute.call(this, args) && canExecute;
        };
        return FillCourseDataProcessor;
    }(ParseCourseProcessor));
    var InitializeResult = /** @class */ (function (_super) {
        __extends(InitializeResult, _super);
        function InitializeResult() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InitializeResult.prototype.execute = function (args) {
            args.Result = Monads.Some.wrapNull(new CourseModel());
        };
        InitializeResult.prototype.canExecute = function (args) {
            var canExecute = args.Result == null || args.Result.isNone();
            return _super.prototype.canExecute.call(this, args) && canExecute;
        };
        return InitializeResult;
    }(ParseCourseProcessor));
    var GetCourseTitle = /** @class */ (function (_super) {
        __extends(GetCourseTitle, _super);
        function GetCourseTitle() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GetCourseTitle.prototype.fillCourse = function (course) {
            course.Title = $(".course-hero__title").first().text();
        };
        return GetCourseTitle;
    }(FillCourseDataProcessor));
    var GetCourseDuration = /** @class */ (function (_super) {
        __extends(GetCourseDuration, _super);
        function GetCourseDuration() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GetCourseDuration.prototype.fillCourse = function (course) {
            course.Duration = $("#ps-main .detail-list__desc").eq(3).text();
        };
        return GetCourseDuration;
    }(FillCourseDataProcessor));
    var AddSections = /** @class */ (function (_super) {
        __extends(AddSections, _super);
        function AddSections() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AddSections.prototype.fillCourse = function (course) {
            var elements = [];
            $("#ps-main .accordian__section").each(function (index, element) {
                var section = new SectionModel();
                var el = $(element);
                section.Title = el.find(".table-of-contents__title").text();
                section.Duration = el.find(".table-of-contents__time").first().text();
                elements.push(section);
            });
            course.Sections = elements;
        };
        return AddSections;
    }(FillCourseDataProcessor));
    var ChainCourseParser = /** @class */ (function (_super) {
        __extends(ChainCourseParser, _super);
        function ChainCourseParser() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ChainCourseParser.Instance = new ChainCourseParser([
            new InitializeResult(),
            new GetCourseTitle(),
            new GetCourseDuration(),
            new AddSections()
        ]);
        return ChainCourseParser;
    }(Pipelines.BasePipeline));
    var CourseModel = /** @class */ (function () {
        function CourseModel() {
        }
        return CourseModel;
    }());
    var SectionModel = /** @class */ (function () {
        function SectionModel() {
        }
        return SectionModel;
    }());
})(Logic || (Logic = {}));
