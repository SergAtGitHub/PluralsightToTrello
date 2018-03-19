import { Option, None } from "..";
import { PipelineContext } from "solid-pipelines";

export class QueryPipelineArguments<T> extends PipelineContext {
    public Result: Option<T> = new None();
}