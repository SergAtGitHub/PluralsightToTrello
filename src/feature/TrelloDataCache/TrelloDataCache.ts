import { Option, None, Some } from '../../foundation/monads'
import { TrelloBoardDestinationModel, TrelloListDestinationModel } from '../ObtainTrelloDestination/Models'

export class TrelloDataCache {
    public static readonly Instance = new TrelloDataCache();

    GetLastUsedLists() : Option<TrelloListsCache> {
        var result = new None<TrelloListsCache>();
        
        chrome.storage.sync.get(
            [TrelloListsCache.Key], 
            (items: { [key:string] : any }) => 
                result = Some.wrapNull(items[TrelloListsCache.Key]));

        return result;
    }

    SetLastUsedLists(cacheData: TrelloListsCache) {
        var jsonVariable = {};
        jsonVariable[TrelloListsCache.Key] = cacheData;
        chrome.storage.sync.set(jsonVariable);
    }
    
    GetLastUsedBoards() : Option<TrelloBoardsCache> {
        var result = new None<TrelloBoardsCache>();
        
        chrome.storage.sync.get(
            [TrelloBoardsCache.Key], 
            (items: { [key:string] : any }) => 
                result = Some.wrapNull(items[TrelloBoardsCache.Key]));

        return result;
    }

    SetLastUsedBoards(cacheData: TrelloBoardsCache) {
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

