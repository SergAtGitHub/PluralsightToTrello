import { PipelineContext, MessageFilter } from "solid-pipelines";

export class BasePipelineContext extends PipelineContext {
    getConsoleMessage() : string {
        return JSON.stringify(this.getConsoleMessageObject());
    }

    getConsoleMessageObject() {
        return {
            informations: this.GetMessages(MessageFilter.Informations).map(x => x.Message),
            warnings: this.GetMessages(MessageFilter.Warnings).map(x => x.Message),
            errors: this.GetMessages(MessageFilter.Errors).map(x => x.Message)
        };
    }

    hasProblems(): boolean {
        return this.GetMessages(MessageFilter.All).length > 0;
    }

    LoggingEnabled: boolean;
}
