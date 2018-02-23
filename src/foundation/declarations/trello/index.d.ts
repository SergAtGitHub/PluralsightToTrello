declare var Trello: {
    version: () => any;
    key: () => any;
    setKey: (newKey: any) => void;
    token: () => any;
    setToken: (newToken: any) => void;
    rest: (method: any, ...args: any[]) => JQuery.jqXHR<any>;
    post: (url: string, data: any, success?: Function, error?: Function) => JQuery.jqXHR<any>;
    get: (url: string, success?: Function, error?: Function) => JQuery.jqXHR<any>;
    authorized: () => boolean;
    deauthorize: () => void;
    authorize: (userOpts: any) => Function;
    addCard: (options: any, next: any) => any;
};

declare class CardModel {
    name: string;
    desc: string;
    pos: VerticalPosition;
    due: Date;
    idList: string
}

declare enum VerticalPosition {
    "bottom" = "bottom",
    "top" = "top"
}

declare class ChecklistModel {
    name: string;
    pos: VerticalPosition;
    idCard: string;
}

declare class ChecklistItemModel {
    name: string;
    checked: boolean;
    pos: VerticalPosition;
}
