module Pipelines {
    export class BasePipelineArguments {
        public IsAborted: boolean;
        public Messages: PipelineMessage[] = [];

        public AddMessage(message: string) : void {
            this.AddMessageWithType(message, PipelineMessageType.Information);
        }

        public AddMessageWithType(message: string, type: PipelineMessageType) : void {
            var pipelineMessage: PipelineMessage = new PipelineMessage();
            pipelineMessage.Message = message;
            pipelineMessage.MessageType = type;
            this.AddMessageWithObject(pipelineMessage);
        }

        public AddMessageWithObject(pipelineMessage: PipelineMessage) : void {
            this.Messages.push(pipelineMessage);
        }

        public AbortPipeline() : void {
            this.IsAborted = true;
        }

        public AbortPipelineWithMessage(message: string) {
            this.AbortPipeline();
            this.AddMessage(message);
        }

        public AbortPipelineWithObjectMessage(message: string, type: PipelineMessageType) {
            this.AbortPipeline();
            this.AddMessageWithType(message, type);
        }

        public AbortPipelineWithErrorMessage(message: string) {
            this.AbortPipelineWithObjectMessage(message, PipelineMessageType.Error);
        }

        public AbortPipelineWithWarningMessage(message: string) {
            this.AbortPipelineWithObjectMessage(message, PipelineMessageType.Warning);
        }

        public AbortPipelineWithInformationMessage(message: string) {
            this.AbortPipelineWithObjectMessage(message, PipelineMessageType.Information);
        }

        public AddInformation(message: string) {
            this.AddMessageWithType(message, PipelineMessageType.Information);
        }

        public AddWarning(message: string) {
            this.AddMessageWithType(message, PipelineMessageType.Warning);
        }

        public AddError(message: string) {
            this.AddMessageWithType(message, PipelineMessageType.Error);
        }
    }
}