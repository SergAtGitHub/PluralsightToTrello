import { Option, None } from "../monads/option";
import { PipelineContext } from "solid-pipelines";

export class QueryPipelineArguments<T> extends PipelineContext {
    public Result: Option<T> = new None();
}