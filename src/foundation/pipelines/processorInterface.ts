
module Pipelines {
    export interface IProcessor<T extends BasePipelineArguments> {
        process(arguments: T): void;
    }
}