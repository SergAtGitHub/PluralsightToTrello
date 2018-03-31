import { Option, None, Some } from '../../foundation/monads'
import { TrelloBoardDestinationModel, TrelloListDestinationModel } from '../ObtainTrelloDestination/Models'
import { AddEntryToCacheExecutor, AddEntryToCacheArguments } from '../../foundation/ChromeCache/AddEntryToCache'
import { Result } from '..';

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

    SetLastUsedLists(cacheData: TrelloListsCache) : Promise<Result<any, any>> {
        return AddEntryToCacheExecutor.Instance.addEntry(
            TrelloListsCache.Key, cacheData);
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

    SetLastUsedBoards(cacheData: TrelloBoardsCache) : Promise<Result<any, any>> {
        return AddEntryToCacheExecutor.Instance.addEntry(
                TrelloBoardsCache.Key, cacheData);
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

