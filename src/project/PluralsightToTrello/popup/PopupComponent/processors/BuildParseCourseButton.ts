import { PopupBuilderProcessor } from "../PopupBuilderProcessor";
import { PopupBuilderArguments } from "../PopupBuilderArguments";
import { ParseCourseMessageListener } from "../../../../../feature";

export class BuildParseCourseButton extends PopupBuilderProcessor {
    public static readonly Instance = new BuildParseCourseButton();

    async SafeExecute(args: PopupBuilderArguments): Promise<void> {
        var parseCourse = <HTMLButtonElement>document.createElement("button");
        parseCourse.onclick = function (e) {
            e.preventDefault();

            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: ParseCourseMessageListener.Message }, _ => console.log("Started course parsing"));
            });
        };
        parseCourse.textContent = "Parse course";
        parseCourse.id = "parseCourse";
        args.ParseCourseButton = parseCourse;
    }

    SafeCondition(args: PopupBuilderArguments): boolean {
        return super.SafeCondition(args) && !args.ParseCourseButton;
    }
}