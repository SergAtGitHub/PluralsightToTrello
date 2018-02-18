var Pipelines;
(function (Pipelines) {
    var CommandProcessor = /** @class */ (function () {
        function CommandProcessor() {
        }
        CommandProcessor.prototype.process = function (args) {
            if (this.canExecute(args)) {
                this.execute(args);
            }
        };
        CommandProcessor.prototype.canExecute = function (args) {
            return true;
        };
        return CommandProcessor;
    }());
    Pipelines.CommandProcessor = CommandProcessor;
    var BasePipeline = /** @class */ (function () {
        function BasePipeline(processors) {
            this.processors = processors;
        }
        BasePipeline.prototype.process = function (args) {
            for (var i = 0; i < this.processors.length; i++) {
                this.processors[i].process(args);
            }
        };
        return BasePipeline;
    }());
    Pipelines.BasePipeline = BasePipeline;
    var QueryPipelineArguments = /** @class */ (function () {
        function QueryPipelineArguments() {
        }
        return QueryPipelineArguments;
    }());
    Pipelines.QueryPipelineArguments = QueryPipelineArguments;
})(Pipelines || (Pipelines = {}));
