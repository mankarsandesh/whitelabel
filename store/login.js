import config from "~/config/config.global";

export const state = () => ({
  // User UUID
  uuid: null,
  userData: {} // Store user data
});

export const getters = {
  // User UUID Getter
  GetUserUUID: state => state.auth,

  GetUserData: state => state.userData
};

export const mutations = {
  // Clear Data
  CLEAR_USER_DATA(state,payload){
      state.userData = "";
  },
  // User Set Mutation
  SET_AUTH(state, payload) {
    state.uuid = payload;
  },
  // Store UserInfo
  SET_USER_DATA(state, payload) {
    state.userData = payload;
  }
};
export const actions = {
  // User Action
  userLogin({ commit }, payload) {
    commit("SET_AUTH", payload);
  }
};
