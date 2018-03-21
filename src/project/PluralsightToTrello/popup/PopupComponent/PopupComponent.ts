import { Result, Ok, Err } from "../../../../foundation";
import { PipelineRunner } from "solid-pipelines";
import { PopupBuilderArguments } from './PopupBuilderArguments'
import { BuildPagePipeline } from './BuildPagePipeline'

export class PopupComponent {
    public static readonly Instance = new PopupComponent();

    public async build(rootElement: string): Promise<Result<any, string>> {
        let root = document.getElementById(rootElement);
        return this.buildInElement(root);
    }
    
    public async buildInElement(root: HTMLElement): Promise<Result<any, string>> {
        if (!root) return;

        var pipelineExecutor = new PipelineRunner();

        var args = new PopupBuilderArguments();
        args.Root = root;

        await pipelineExecutor.RunPipeline(BuildPagePipeline.Instance, args);

        return args.hasProblems() ? new Err(args.getConsoleMessage()) : new Ok("");
    }
}