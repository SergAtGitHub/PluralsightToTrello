import { Option, None, Some } from '../../foundation/monads'
import { TrelloBoardDestinationModel, TrelloListDestinationModel } from '../ObtainTrelloDestination/Models'

export class TrelloDataCache {
    public static readonly Instance = new TrelloDataCache();

    async GetLastUsedLists(): Promise<Option<TrelloListsCache>> {
        return Some.wrapNull(
            await this.GetFromChromeCache(TrelloListsCache.Key));
    }

    protected GetFromChromeCache(cacheKey: string): Promise<any> {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(
                [cacheKey],
                (items: { [key: string]: any }) => {
                    let err = chrome.runtime.lastError;
                    if (err) {
                        reject(err);
                    } else {
                        resolve(items[cacheKey]);
                    }
                });
        });
    }

    async SetLastUsedLists(cacheData: TrelloListsCache) : Promise<void> {
        var jsonVariable = {};
        jsonVariable[TrelloListsCache.Key] = cacheData;
        chrome.storage.sync.set(jsonVariable);
    }

    async SetLastSelectedList(listId: string) : Promise<void> {
        let lastCache = await this.GetLastUsedLists();
        if (lastCache.isNone()){
            return;
        }

        let cacheData = lastCache.unwrap();
        if (cacheData.lists.some((value) => value.id === listId)) {
            cacheData.lastUsedList = listId;
            this.SetLastUsedLists(cacheData);
        }
    }

    async SetLastSelectedBoard(boardId: string) : Promise<void> {
        let lastCache = await this.GetLastUsedBoards();
        if (lastCache.isNone()){
            return;
        }

        let cacheData = lastCache.unwrap();
        if (cacheData.boards.some((value) => value.id === boardId)) {
            cacheData.lastUsedBoard = boardId;
            this.SetLastUsedBoards(cacheData);
        }
    }

    async GetLastUsedBoards(): Promise<Option<TrelloBoardsCache>> {
        return Some.wrapNull(
            await this.GetFromChromeCache(TrelloBoardsCache.Key));
    }

    async SetLastUsedBoards(cacheData: TrelloBoardsCache) : Promise<void> {
        var jsonVariable = {};
        jsonVariable[TrelloBoardsCache.Key] = cacheData;
        chrome.storage.sync.set(jsonVariable);
    }
}

export class TrelloBoardsCache {
    public static readonly Key = "boardsCache";
    boards: TrelloBoardDestinationModel[];
    lastUsedBoard: string;
}

export class TrelloListsCache {
    public static readonly Key = "listsCache";
    lists: TrelloListDestinationModel[];
    lastUsedList: string;
}

