/// <reference path="../../../../foundation/TrelloApi/client.d.ts" />
import { CourseSenderProcessor } from "../courseSenderProcessor";
import { ChainCourseSenderArguments } from "../ChainCourseSenderArguments";
import { ChecklistModel, VerticalPosition } from "../../../../foundation";
import { TrelloItemsCreator, TrelloItemsCreatorArguments } from '../../TrelloItemsCreator'

export class PushCardToTrello extends CourseSenderProcessor {
    public static readonly Instance = new PushCardToTrello();

    async SafeExecute(args: ChainCourseSenderArguments): Promise<void> {
        var createItemsArgs = new TrelloItemsCreatorArguments();
        createItemsArgs.Card = args.Card;
        createItemsArgs.Sections = args.Sections;
        TrelloItemsCreator.Instance.create(createItemsArgs);
    }
}