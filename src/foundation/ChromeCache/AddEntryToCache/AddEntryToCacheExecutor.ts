import { PipelineRunner } from "solid-pipelines";
import { AddEntryToCacheArguments } from './AddEntryToCacheArguments'
import { AddEntryToCachePipeline } from './AddEntryToCachePipeline'
import { Result, Err, Ok } from "../..";

export class AddEntryToCacheExecutor {
    public static Instance: AddEntryToCacheExecutor = new AddEntryToCacheExecutor();

    async addEntry(key:string, value:any) : Promise<Result<any, any>> {
        let args = new AddEntryToCacheArguments();
        args.key = key;
        args.value = value;
        await this.execute(args);

        if (args.hasProblems()) {
            return new Err(args.getConsoleMessageObject());
        }

        return new Ok("Ok");
    }

    execute(args: AddEntryToCacheArguments) : Promise<void> {
        var runner:PipelineRunner = new PipelineRunner();

        return runner.RunPipeline(AddEntryToCachePipeline.Instance, args);
    }
}