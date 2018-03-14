import {CommandPipelineArguments} from '../../../foundation/pipelines/commandPipelineArguments'
import { Option, Some } from '../../../foundation/monads/option';
import { ITrelloAuthorizationChecker, TrelloAuthorizationChecker } from '../TrelloServices/trelloAuthorizationChecker';
import { CardModel,ChecklistItemModel  } from '../../../foundation/lib/trello'

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