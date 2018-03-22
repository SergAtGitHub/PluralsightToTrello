import {CourseSenderProcessor} from '../courseSenderProcessor'
import { ChainCourseSenderArguments } from '../ChainCourseSenderArguments';
import { Result } from '../../../../foundation/monads';

export class UpdateTrelloToken extends CourseSenderProcessor {
    public static readonly Instance = new UpdateTrelloToken();

    async SafeExecute(args: ChainCourseSenderArguments): Promise<void> {
        Trello.updateTokenFromStorage();
    }

    SafeCondition(args: ChainCourseSenderArguments): boolean {
        return super.SafeCondition(args) 
            && args.AuthorizationChecker.isSome() 
            && !args.AuthorizationChecker.unwrap().authorized();
    }
}