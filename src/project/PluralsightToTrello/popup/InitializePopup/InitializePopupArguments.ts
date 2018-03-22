import { CommandPipelineArguments, ITrelloAuthorizationChecker } from '../../../../foundation'

export class InitializePopupArguments extends CommandPipelineArguments {
    TrelloAuthChecker:ITrelloAuthorizationChecker;
    UserIsAuthorized: boolean;
}