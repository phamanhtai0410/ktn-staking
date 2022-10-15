
import axiosClient from "./axiosClient"

import { LEADER_BOARD_LIST_ITEMS ,GET_LIST_MY_NFTS } from "./endpoint"

export const stakingService = {

  getListLeaderBoard: (params) => {
    return axiosClient.get(LEADER_BOARD_LIST_ITEMS, { params })
  },

  getListMyNFTs: (params) => {
    return axiosClient.get(GET_LIST_MY_NFTS, { params })
  },


}





