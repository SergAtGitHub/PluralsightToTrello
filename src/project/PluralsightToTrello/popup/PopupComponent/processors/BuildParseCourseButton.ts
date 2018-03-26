import { PopupBuilderProcessor } from "../PopupBuilderProcessor";
import { PopupBuilderArguments } from "../PopupBuilderArguments";
import { ParseCourseMessageListener } from "../../../../../feature";

export class BuildParseCourseButton extends PopupBuilderProcessor {
    public static readonly Instance = new BuildParseCourseButton();

    async SafeExecute(args: PopupBuilderArguments): Promise<void> {
        var parseCourse = <HTMLButtonElement>document.createElement("button");
        parseCourse.onclick = this.ParseCourseButtonClicked;
        parseCourse.textContent = "Parse course";
        parseCourse.id = "parseCourse";
        parseCourse.className = "button button-outline";
        args.ParseCourseButton = parseCourse;
    }

    public ParseCourseButtonClicked(eventArgs: MouseEvent){
        eventArgs.preventDefault();

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(
                tabs[0].id, 
                { 
                    action: ParseCourseMessageListener.Message,
                    list: (<HTMLSelectElement>document.getElementById("selectedList")).selectedOptions[0].value
                }, 
                _ => console.log("Started course parsing")
            );
        });
    }

    SafeCondition(args: PopupBuilderArguments): boolean {
        return super.SafeCondition(args) && !args.ParseCourseButton;
    }
}