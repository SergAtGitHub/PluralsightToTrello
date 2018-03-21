import { PipelineContext, MessageFilter } from "solid-pipelines";

export class CommandPipelineArguments extends PipelineContext {
    getConsoleMessage() : string {
        return JSON.stringify({
            overall: "Operation ended up with such messages",
            informations: this.GetMessages(MessageFilter.Informations).map(x => x.Message),
            warnings: this.GetMessages(MessageFilter.Warnings).map(x => x.Message),
            errors: this.GetMessages(MessageFilter.Errors).map(x => x.Message)
        });
    }

    hasProblems(): boolean {
        return this.GetMessages(MessageFilter.All).length > 0;
    }
}
