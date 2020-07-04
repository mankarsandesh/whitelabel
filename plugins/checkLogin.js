import config from "../config/config.global";
import Cookies from "./js-cookie";

export default async context => {
  try {
    const userUUID = Cookies.get("userUUID"); // => 'value'
  
  } catch (ex) {
    console.log(ex);
  }
};

/**
 * Check User Login from Server
 *
 * @param {*} portalProviderUUID
 * @param {*} portalProviderUserId
 * @param {*} balance
 * @param {*} store
 */

const checkUserLogin = async (userUUID, store, axios) => {
  try {
    if (config.authUser && config.authPassword) {
      var reqBody = {
        user_uuid: userUUID
      };
      var { data } = await axios.post(config.getUserProfile.url, reqBody, {
        headers: config.header
      });

      var userInfo = data.data[0];
      var userUuid = userInfo.uuid;
      if (data.code == 200) {
        store.dispatch("login", "setUserData", userInfo);
        store.dispatch("login", "setUserUUID", userUuid);
        // store.commit("SET_USER_DATA",userInfo);
        // store.commit("SET_USER_UUID", data.data[0].uuid);
      }
    } else {
      console.log("Invalid  credentials");
    }
  } catch (ex) {
    console.log(ex);
  }
};
