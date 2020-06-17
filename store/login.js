import config from "~/config/config.global";
import Cookies from "../plugins/js-cookie";

const state = () => ({
  // User UUID
  uuid: null,
  userData: "" // Store user data
});

const getters = {
  // User UUID Getter
  GetUserUUID: state => state.uuid,

  GetUserData: state => state.userData
};

// Mutation
const mutations = {
  // Clear Data
  CLEAR_USER_DATA(state, payload) {
    state.userData = "";
  },
  // User Set Mutation
  SET_USER_UUID(state, payload) {
    state.uuid = payload;
  },
  // Store UserInfo
  SET_USER_DATA(state, payload) {
    state.userData = payload;
  }
};

// Action
const actions = {
  // User Action
  setUserUUID({ commit }, payload) {
    commit("SET_USER_UUID", payload);
  },
  // Set user data from api
  setUserData({ commit }, payload) {
    commit("SET_USER_DATA", payload);
  }
};


export default {
  state,
  mutations,
  actions,
  getters
};
