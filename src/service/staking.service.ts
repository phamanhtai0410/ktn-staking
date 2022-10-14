
import axiosClient from "./axiosClient"

import { LEADER_BOARD_LIST_ITEMS } from "./endpoint"

export const stakingService = {

  getListLeaderBoard: (params) => {
    return axiosClient.get(LEADER_BOARD_LIST_ITEMS, { params })
  },

}





