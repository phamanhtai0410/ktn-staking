/** REFERRAL CODE */
export interface IReferralCode{
    address: string,
    code: string,
    address_linked: string,
    code_linked:  string,
    point: number,
    total_earn:number,
}

/** LEADER BOARD */
export interface ILeaderBoardParams{
    search:string,
    page: number,
    page_size: number,
    event: string,
}