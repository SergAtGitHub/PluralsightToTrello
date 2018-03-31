import { PipelineContext } from "solid-pipelines";
import { CommandPipelineArguments } from "../..";

export class AddEntryToCacheArguments extends CommandPipelineArguments {
    key:string;
    value:any;
}
