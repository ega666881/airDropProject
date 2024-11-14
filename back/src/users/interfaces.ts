


export interface IUser {
    id: number;
    tgId: number;
    balance: number;
    subscription: boolean;
    username: string;
}

export interface IAirdrop {
    id: number;
    name: string;
    subscribeCheck: boolean;
    channelId?: number | null;
    miniGame?: boolean;
    coinLogoUrl?: string | null;
    backgroundUrl?: string | null;
    totalCoins: number;
    projectInfo: string;
    channelUrl?: string | null;
    endDate: number;
}

export interface IAirdropUser {
    id: number;
    userId: number;
    airdropId: number;
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