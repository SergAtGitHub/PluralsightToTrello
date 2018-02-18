/// <reference path="../declarations/jquery/index.d.ts" />
/// <reference path="../declarations/chrome/index.d.ts" />
/// <reference path="../lib/result.ts" />
/// <reference path="../lib/option.ts" />
var Ok = Monads.Ok;
var Logic;
(function (Logic) {
    var ParseCourseMessageListener = /** @class */ (function () {
        function ParseCourseMessageListener() {
        }
        ParseCourseMessageListener.prototype.Execute = function (message, sender, sendResponse) {
            if (message.action === "parseCourse") {
                var parseArguments = new CourseParserArguments();
                var result = ChainCourseParser.Instance.Parse(parseArguments);
                if (result.isOk()) {
                    alert(result.unwrap().Title);
                }
                else {
                    alert("An error occured while parsing.");
                }
            }
        };
        ParseCourseMessageListener.Instance = new ParseCourseMessageListener();
        return ParseCourseMessageListener;
    }());
    Logic.ParseCourseMessageListener = ParseCourseMessageListener;
    var CourseParserArguments = /** @class */ (function () {
        function CourseParserArguments() {
        }
        return CourseParserArguments;
    }());
    var ChainCourseParser = /** @class */ (function () {
        function ChainCourseParser() {
        }
        ChainCourseParser.prototype.Parse = function (args) {
            var result = new CourseModel();
            result.Title = $(".course-hero__title").first().text();
            return new Ok(result);
        };
        ChainCourseParser.Instance = new ChainCourseParser();
        return ChainCourseParser;
    }());
    var CourseModel = /** @class */ (function () {
        function CourseModel() {
        }
        return CourseModel;
    }());
})(Logic || (Logic = {}));
