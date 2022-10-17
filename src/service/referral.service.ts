
import axiosClient from "./axiosClient"

import { LEADER_BOARD_LIST_ITEMS ,GET_LIST_MY_NFTS } from "./endpoint"

export const referralService = {

  getListLeaderBoard: (params) => {
    return axiosClient.get(LEADER_BOARD_LIST_ITEMS, { params })
  },

}