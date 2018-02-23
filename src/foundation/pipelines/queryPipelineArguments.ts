/// <reference path="../../foundation/pipelines/basePipelineArguments.ts" />
/// <reference path="../../foundation/monads/option.ts" />

import Option = Monads.Option;
import None = Monads.None;

module Pipelines {
    export class QueryPipelineArguments<T> extends BasePipelineArguments {
        public Result: Option<T> = new None();
    }
}