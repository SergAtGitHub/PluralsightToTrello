
module ObtainTrelloDestination {
  export interface TrelloBoardApiReturnResult {
    name: string;
    desc: string;
    descData?: null;
    closed: boolean;
    idOrganization?: string | null;
    limits?: null;
    pinned?: null;
    invitations?: null;
    shortLink: string;
    powerUps?: (string | null)[] | null;
    dateLastActivity?: string | null;
    idTags?: (null)[] | null;
    datePluginDisable?: null;
    id: string;
    invited: boolean;
    starred: boolean;
    url: string;
    prefs: Prefs;
    subscribed: boolean;
    labelNames: LabelNames;
    dateLastView: string;
    shortUrl: string;
    memberships?: (MembershipsEntity)[] | null;
  }
  export interface Prefs {
    permissionLevel: string;
    voting: string;
    comments: string;
    invitations: string;
    selfJoin: boolean;
    cardCovers: boolean;
    cardAging?: string | null;
    calendarFeedEnabled: boolean;
    background: string;
    backgroundImage?: null;
    backgroundImageScaled?: null;
    backgroundTile: boolean;
    backgroundBrightness: string;
    backgroundColor: string;
    backgroundBottomColor: string;
    backgroundTopColor: string;
    canBePublic: boolean;
    canBeOrg: boolean;
    canBePrivate: boolean;
    canInvite: boolean;
  }
  export interface LabelNames {
    green: string;
    yellow: string;
    orange: string;
    red: string;
    purple: string;
    blue: string;
    sky: string;
    lime: string;
    pink: string;
    black: string;
  }
  export interface MembershipsEntity {
    id: string;
    idMember: string;
    memberType: string;
    unconfirmed: boolean;
    deactivated: boolean;
  }
}