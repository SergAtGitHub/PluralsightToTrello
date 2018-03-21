import { CommandPipelineArguments, Option, Some, CardModel, ChecklistItemModel, ITrelloAuthorizationChecker, TrelloAuthorizationChecker } from '../../../foundation'

export class ChainCourseSenderArguments extends CommandPipelineArguments {
    public static create(card: CardModel, items: ChecklistItemModel[]): ChainCourseSenderArguments {
        var result: ChainCourseSenderArguments = new ChainCourseSenderArguments();
        result.Card = card;
        result.Sections = items;
        result.AuthorizationChecker = Some.wrapNull(TrelloAuthorizationChecker.Instance);
        return result;
    }

    Card: CardModel;
    Sections: ChecklistItemModel[];
    AuthorizationChecker: Option<ITrelloAuthorizationChecker>;
}