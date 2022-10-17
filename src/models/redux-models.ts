
/** COMMON */
export interface IPagination{
    page: number,
    page_size: number,
    num_of_page: number,
}

/** LEADER BOARD */
export interface ILeaderBoardModel{
    address: string,
    total_user_linked: number
}

export interface ILeaderBoardArrayModel{
    items: ILeaderBoardModel[],
    pagination:IPagination,
    loading: boolean
}


/** MY NFTS */
export interface IMyNFTModel{
    token_id: number,
    address: string,
    name: string,
    type: number,
    created_time: number,
    rarity: number,
    price: string,
    token_uri: string,
}

export interface IMyNFTsArrayModel{
    items: IMyNFTModel[],
    pagination:IPagination,
    loading: boolean
}
