/**
 * * Common
 */
export const ROUTE = "dapp";

/**
 * * User
 * GET: https://api-stag-ktn.esollabs.com/v1/dapp/user?address={_address}
 * POST: https://api-stag-ktn.esollabs.com/v1/dapp/user
 */
export const MODEL = "user";
export const GET_MESSAGE = `${ROUTE}/${MODEL}`;// [GET] Get a message
export const VERIFY_SIGN = `${ROUTE}/${MODEL}`;// [POST] Verify signature

/**
 * * Staking
 */
export const LEADER_BOARD_LIST_ITEMS = `${ROUTE}/leader_board`;
export const GET_LIST_MY_NFTS = `${ROUTE}/my_nfts`;
