module Pipelines {
    export class BasePipeline<T extends BasePipelineArguments> {
        constructor(public processors: IProcessor<T>[]) { }

        process(args: T): void {
            for (var i = 0; i < this.processors.length; i++) {
                this.processors[i].process(args);
            }
        }
    }
}