import Option = Monads.Option;

module Pipelines {
    export interface IProcessor<T extends BasePipelineArguments> {
        process(arguments: T): void;
    }

    export abstract class CommandProcessor<T extends BasePipelineArguments> implements IProcessor<T> {
        process(args: T): void {
            if (!args.IsAborted && this.canExecute(args)) {
                this.execute(args);
            }
        }

        canExecute(args: T): boolean {
            return true;
        }

        abstract execute(args: T): void;
    }

    export class BasePipeline<T extends BasePipelineArguments> {
        constructor(public processors: IProcessor<T>[]) { }

        process(args: T): void {
            for (var i = 0; i < this.processors.length; i++) {
                this.processors[i].process(args);
            }
        }
    }

    export class BasePipelineArguments {
        public IsAborted: boolean;
    }

    export class QueryPipelineArguments<T> extends BasePipelineArguments {
        public Result: Option<T>;
    }
    
    export class CommandPipelineArguments extends BasePipelineArguments {
    }
}