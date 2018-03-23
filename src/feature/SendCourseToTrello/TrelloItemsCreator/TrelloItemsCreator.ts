import { Result, Err } from "../../../foundation/index";
import { PipelineRunner } from "solid-pipelines";
import { TrelloItemsCreatorPipeline } from "./TrelloItemsCreatorPipeline";
import { TrelloItemsCreatorArguments } from "./TrelloItemsCreatorArguments";
import { Ok } from "../../../foundation/monads";

export class TrelloItemsCreator {
    public static readonly Instance = new TrelloItemsCreator();

    async create(args: TrelloItemsCreatorArguments): Promise<Result<TrelloItemsCreatorResult, string>> {
        var runner = new PipelineRunner();

        await runner.RunPipeline(TrelloItemsCreatorPipeline.Instance, args);

        return args.Result.okOr(args.getConsoleMessage());
    }
}

export class TrelloItemsCreatorResult {
    cardId: string;
    checklistId: string;
    itemsId: string[] = [];
}

export class TrelloItemsCreatorMessages {

}