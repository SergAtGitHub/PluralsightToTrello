import { SafeProcessor } from "solid-pipelines";
import { BasePipelineContext } from './BasePipelineContext'

export abstract class BaseSafeProcessor<TArgs extends BasePipelineContext> extends SafeProcessor<TArgs> {
    SafeCondition(ars: TArgs): boolean {
        return super.SafeCondition(ars) && !ars.IsAborted;
    }
}
