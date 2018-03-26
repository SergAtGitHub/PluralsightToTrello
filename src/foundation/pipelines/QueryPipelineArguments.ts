import { Option, None } from "../monads";
import { PipelineContext } from "solid-pipelines";
import { BasePipelineContext } from './BasePipelineContext'

export class QueryPipelineArguments<T> extends BasePipelineContext {
    public Result: Option<T> = new None();
}