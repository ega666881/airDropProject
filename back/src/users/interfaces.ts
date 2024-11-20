


export interface IUser {
    id?: number;
    tgId?: number;
    balance?: number;
    subscription?: boolean;
    username?: string;
    wallet?: string;
    discount?: number;
    subscribeEndDate?: number | any;
    admin?: boolean;
}

export interface ITransaction {
    id: number;
    userId: number;
    amount: number;
    active: boolean;
    wallet: string;
}

export interface ISettings {
    id: number;
    subscribeCost: number;
    discount: number;
  }
  

export interface IAirdrop {
    id?: number;
    name?: string;
    subscribeCheck?: boolean;
    channelId?: number | null;
    miniGame?: boolean;
    coinLogoUrl?: string | null;
    backgroundUrl?: string | null;
    totalCoins: number;
    projectInfo: string;
    channelUrl?: string | null;
    endDate?: number;
    maxUsers?: number;
    stoped?: boolean;
    winCoins?: number | any;
}

export interface IAirdropUser {
    id: number;
    userId: number;
    airdropId: number;
    coins: number;
    wallet: string;
}

export interface IAirdropHistory {
    id: number;
    userId: number;
    airdropName: string;
    profit: number;
}

export interface IReferal {
    id: number;
    userId: number;
    referralId: number;
    profit: number;
}