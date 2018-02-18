import Option = Monads.Option;

module Pipelines {
    export interface IProcessor<T> {
        process(arguments: T): void;
    }

    export abstract class CommandProcessor<T> implements IProcessor<T> {
        process(args: T): void {
            if (this.canExecute(args)) {
                this.execute(args);
            }
        }

        canExecute(args: T): boolean {
            return true;
        }

        abstract execute(args: T): void;
    }

    export class BasePipeline<T> {
        constructor(public processors: IProcessor<T>[]) { }

        process(args: T): void {
            for (var i = 0; i < this.processors.length; i++) {
                this.processors[i].process(args);
            }
        }
    }

    export class QueryPipelineArguments<T> {
        public Result: Option<T>;
    }
}