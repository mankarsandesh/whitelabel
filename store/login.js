import config from "~/config/config.global";
import Cookies from "../plugins/js-cookie";
import secureStorage from "../plugins/secure-storage"

//States
const state = () => ({
  // User UUID
  uuid: null,
  userData: "" ,// Store user data
  locales: ["cn", "us", "th", "la"], // Store language locales
  locale: secureStorage.getItem("lang"), // Store locale
});

//Getters
const getters = {
  // User UUID Getter
  GetUserUUID: state => state.uuid,

  GetUserData: state => state.userData,

  getLocale(state) {
    return state.locale;
  }

};

// Mutation
const mutations = {
  // Clear Data
  CLEAR_USER_DATA(state, payload) {
    state.userData = "";
    state.uuid = "";
  },
  // User Set Mutation
  SET_USER_UUID(state, payload) {
    state.uuid = payload;
  },
  // Store UserInfo
  SET_USER_DATA(state, payload) {
    state.userData = payload;
  },
  //Store language
  SET_LANGUAGE(state, payload) {
    state.locale = payload;
    secureStorage.setItem("lang", payload);

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
  },
  // Set user data from api
  async usersData(context) {
    try {
      var reqBody = {
        user_uuid: context.state.userUUID || Cookies.get("userUUID")
      };
      var res = await this.$axios.$post(config.getUserProfile.url, reqBody, {
        headers: config.header
      });
      console.log(reqBody);
      console.log(res);
      if (res.status) {
        let userInfo = res.data[0];
        context.commit("SET_USER_DATA", userInfo);
        context.commit("SET_USER_UUID", userInfo.uuid);
      } else {
        console.log("Something Worng");
      }
    } catch (ex) {
      console.error(ex);
    }
  },
  //Set Language locale
  setLanguage({ commit }, payload) {
    commit("SET_LANGUAGE", payload);
  }

};

export default {
  state,
  mutations,
  actions,
  getters
};
