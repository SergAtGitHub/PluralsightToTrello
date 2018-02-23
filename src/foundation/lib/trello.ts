
module TrelloModels {
    export class CardModel {
        name: string;
        desc: string;
        pos: VerticalPosition;
        due: Date;
        idList: string
    }

    export enum VerticalPosition {
        "bottom" = "bottom",
        "top" = "top"
    }

    export class ChecklistModel {
        name: string;
        pos: VerticalPosition;
        idCard: string;
    }

    export class ChecklistItemModel {
        name: string;
        checked: boolean;
        pos: VerticalPosition;
    }
}