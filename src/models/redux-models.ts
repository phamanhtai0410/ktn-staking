
export interface IPagination{
    page: number,
    page_size: number,
    num_of_page: number,
}

export interface ILeaderBoardModel{
    address: string,
    total_user_linked: number
}

export interface ILeaderBoardArrayModel{
    items: ILeaderBoardModel[],
    pagination:IPagination,
    loading: boolean
}
