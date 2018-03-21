/// <reference path="../../../foundation/TrelloApi/client.d.ts" />
import {
    GetTrelloBoardArguments,
    TrelloBoardRepository,
    GetTrelloListArguments,
    TrelloListRepository,
    CourseModel,
    ParseCourseMessageListener,
    CommandPipelineArguments,
    Result,
    Ok,
    Err
} from "../../../feature";
import { PipelineRunner, IPipeline, IProcessor, PipelineContext, SafeProcessor } from "solid-pipelines";
import { PopupComponent } from './PopupComponent/PopupComponent'

document.addEventListener("DOMContentLoaded", () => InitializePopup.Instance.initialize());

class InitializePopup {
    public static readonly Instance = new InitializePopup();

    public async initialize() : Promise<void> {
        var pipelineRunner = new PipelineRunner();
        var args = new InitializePopupArguments();

        pipelineRunner.RunPipeline(InitializePopupPipeline.Instance, args);
    }
}

class InitializePopupPipeline implements IPipeline {
    public static readonly Instance = new InitializePopupPipeline();
    GetProcessors(): IProcessor[] {
        return [
            ReauthOnLoad.Instance,
            BuildPopupComponent.Instance,
            FillInComponents.Instance
        ];
    }
}

abstract class InitializePopupProcessor extends SafeProcessor<InitializePopupArguments> {}

class InitializePopupArguments extends CommandPipelineArguments {
}

class ReauthOnLoad extends InitializePopupProcessor {
    public static readonly Instance = new ReauthOnLoad();

    async SafeExecute(args: InitializePopupArguments): Promise<void> {
        Trello.authorize({});
    }
}

class BuildPopupComponent extends InitializePopupProcessor {
    public static readonly Instance = new BuildPopupComponent();

    async SafeExecute(args: InitializePopupArguments): Promise<void> {
        await PopupComponent.Instance.build("root");
    }
}

class FillInComponents extends InitializePopupProcessor {
    public static readonly Instance = new FillInComponents();

    async SafeExecute(args: InitializePopupArguments): Promise<void> {
        var getTrelloBoardsArgs = new GetTrelloBoardArguments();
        var result = await TrelloBoardRepository.Instance.getTrelloBoards(getTrelloBoardsArgs);
        var boards = getTrelloBoardsArgs.Result.unwrap().Boards;
    
        for (let board of boards) {
            let opt: HTMLOptionElement = <HTMLOptionElement>(document.createElement('option'));
            [opt.value, opt.text] = [board.id, board.name];
            document.getElementById("selectedBoard").appendChild(opt);
        }
    }
}