module Pipelines {
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
}