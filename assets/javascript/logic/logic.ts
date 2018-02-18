/// <reference path="../declarations/jquery/index.d.ts" />
/// <reference path="../declarations/chrome/index.d.ts" />
/// <reference path="../lib/result.ts" />
/// <reference path="../lib/option.ts" />

import Ok = Monads.Ok;
import Result = Monads.Result;

module Logic {
    interface IMessageListener {
        Execute(message: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void): void;
    }

    export class ParseCourseMessageListener implements IMessageListener {
        public static Instance: ParseCourseMessageListener = new ParseCourseMessageListener();

        Execute(message: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void): void {
            if (message.action === "parseCourse") {
                var parseArguments: CourseParserArguments = new CourseParserArguments();
                var result = ChainCourseParser.Instance.Parse(parseArguments);

                if (result.isOk()) {
                    alert(result.unwrap().Title);
                }
                else {
                    alert("An error occured while parsing.");
                }
            }
        }
    }

    class CourseParserArguments {

    }

    interface ICourseParser {
        Parse(args: CourseParserArguments): Result<CourseModel, string>;
    }

    class ChainCourseParser {
        public static Instance: ChainCourseParser = new ChainCourseParser();

        Parse(args: CourseParserArguments): Result<CourseModel, string> {
            var result = new CourseModel();
            result.Title = $(".course-hero__title").first().text();
            return new Ok(result);
        }
    }

    class CourseModel {
        Title: string;
    }
}