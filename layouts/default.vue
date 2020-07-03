<template>
  <v-app id="page">
    <v-navigation-drawer
      v-model="OpenDrawer"
      class="top-80"
      right
      clipped
      temporary
      fixed
      color="#e91e636e "
      dark
    >
      <v-list>
        <v-list-item v-for="(item, i) in slideMenu" :key="i" :to="item.path">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :app="$route.name == 'index' ? false : true"
      fixed
      height="80"
      color="white"
      class="navbar"
      dark
    >
      <v-toolbar-title>
        <v-btn to="/" text color="transparent ">
          <v-img width="130" src="/logo/logo.png"></v-img>
        </v-btn>
      </v-toolbar-title>
      <v-spacer />
      <template v-for="(item, index) in menu">
        <v-btn
          :text="item.text"
          :rounded="item.rounded"
          :outlined="item.outline"
          :color="item.color"
          :key="index"
          :to="item.to"
          class="mx-2"
        >
          <v-icon left>{{ item.icon }}</v-icon>
          {{ $t("menu." + item.title) }}
        </v-btn>
      </template>
      <v-btn
        class="mx-5 countryFlag"
        large
        icon
        @click="$refs.language.showDialog()"
      >
        <country-flag :country="countryflag" size="normal" />
        <!-- <v-icon> fas fa-globe</v-icon> -->
      </v-btn>
      <languageDialog ref="language" />
      <div v-if="GetUserData">
        <v-list flat>
          <v-list-item class="px-0">
            <v-list-item-avatar class="mr-0">
              <img :src="this.defaultImage" :alt="GetUserData.username" />
            </v-list-item-avatar>
            <v-menu offset-y>
              <template v-slot:activator="{ attrs, on }">
                <v-list-item-content>
                  <v-list-item-title
                    class="white--text ma-8 "
                    v-bind="attrs"
                    v-on="on"
                  >
                    <span v-if="GetUserData.first_name">
                      {{ GetUserData.first_name }}
                      {{ GetUserData.last_name }}</span
                    >
                    <span v-if="!GetUserData.first_name">
                      {{ GetUserData.username }}
                    </span>
                  </v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list>
                <v-list-item link class="menuList" to="/profile">
                  <v-list-item-title>
                    {{ $t("menu.myAccount") }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item
                  link
                  class="menuList"
                  to="/profile/change_password"
                >
                  <v-list-item-title>
                    {{ $t("menu.changePassword") }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item link class="menuList" @click="userLogout()">
                  <v-list-item-title>
                    {{ $t("menu.logout") }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-list-item-action>
              <v-icon size="15">{{
                $route.name === "profile"
                  ? "far fa-chevron-up"
                  : "far fa-chevron-down"
              }}</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </div>
      <div v-else>
        <v-btn
          :rounded="true"
          :outlined="true"
          color="pink"
          @click="openLoginForm()"
          class="mx-2"
        >
          <v-icon left>fas fa-user</v-icon>
          {{ $t("profile.login") }}
        </v-btn>

        <v-btn
          :rounded="true"
          :outlined="false"
          color="pink"
          @click="openRegisterForm()"
          class="mx-2"
        >
          <v-icon left>fas fa-user-plus</v-icon>
          {{ $t("profile.register") }}
        </v-btn>
      </div>

      <!-- <v-btn class="mx-2" large icon @click.stop="OpenDrawer = !OpenDrawer">
        <v-icon> {{ OpenDrawer ? "fas fa-times" : "mdi-menu" }} </v-icon>
      </v-btn> -->
    </v-app-bar>

    <!-- Register Form -->
    <v-dialog
      dark
      v-model="registerDialog"
      width="600"
      style=" border-radius:none !important;"
    >
      <Register
        v-if="renderRegister"
        @registerClose="closeRegister"
        @loginOpen="showLoginDialog"
      />
    </v-dialog>
    <!-- Ending Register Form -->

    <!-- forgotPasswordDialog Form -->
    <v-dialog
      dark
      v-model="forgotPasswordDialog"
      width="550"
      style=" border-radius:none !important;"
    >
      <forgotPassword
        v-if="renderForgot"
        @forgotClose="closeForgot"
        @loginOpen="showForgotDialog"
      />
    </v-dialog>
    <!-- Ending Register Form -->

    <!-- Login Form -->
    <v-dialog
      dark
      v-model="loginDialog"
      width="550"
      style=" border-radius:none !important;"
    >
      <Login
        v-if="renderLogin"
        @loginClose="closeLogin"
        @registerOpen="showRegisterDialog"
        @forgotPasswordOpen="showForgotDialog"
      />
    </v-dialog>
    <!-- Ending Login Form -->

    <v-content :class="checkPageBackground">
      <nuxt />
    </v-content>
  </v-app>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import json from "~/json/items";
import config from "../config/config.global";
import Login from "../components/login";
import Register from "../components/register";
import forgotPassword from "../components/forgotPassword";
import axios from "axios";
import Cookies from "../plugins/js-cookie";
import countryFlag from "vue-country-flag";
import languageDialog from "../components/languageDialog";
export default {
  data() {
    return {
      renderLogin: false,
      renderRegister: false,
      renderForgot: false,
      defaultImage: "../default.jpg",
      forgotPasswordDialog: false,
      loginDialog: false,
      registerDialog: false,
      selectedLanguage: "us",
      OpenDrawer: false,
      menu: json.menu,
      slideMenu: json.slideMenu,
      userData: [],
      userUUID: Cookies.get("userUUID")
    };
  },
  components: {
    Login,
    Register,
    forgotPassword,
    countryFlag,
    languageDialog
  },
  created() {
    if (this.userUUID) {
      this.userInfo();
    } else {
      this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters("login", ["getLocale", "GetUserData"]),
    countryflag() {
      if (this.getLocale) {
        return this.getLocale;
      } else {
        return "us";
      }
    },
    checkPageBackground() {
      const route = this.$route.name;
      switch (true) {
        case route === "index":
          return null;
          break;
        case route === "profile" ||
          route === "profile-deposit" ||
          route === "profile-WithDrawal" ||
          route === "profile-withdrawal" ||
          route === "profile-order_history" ||
          route === "profile-change_password" ||
          route === "profile-track_order":
          return "profile-container";
          break;
        case route === "gameMode":
          return "game_mode-container";
          break;
        default:
          return null;
      }
    }
  },
  methods: {
    ...mapMutations("login", [
      "CLEAR_USER_DATA",
      "SET_USER_DATA",
      "SET_USER_UUID"
    ]),
    // Logout Users
    async userLogout() {
      this.CLEAR_USER_DATA();
      Cookies.remove("userUUID", { path: "" }); // removed! UserUUID Cookies
      this.$router.push("/");
    },
    // Get User Info
    async userInfo() {
      try {
        var reqBody = {
          user_uuid: this.userUUID
        };
        var { data } = await axios.post(config.getUserProfile.url, reqBody, {
          headers: config.header
        });
        if (data.code == 200) {
          this.userData = data.data[0];
          this.SET_USER_DATA(this.userData);
          this.SET_USER_UUID(data.data[0].uuid);
        }
      } catch (ex) {
        console.log(ex);
      }
    },
    // Force Render Login/Regisrer and Forgot Component
    forceRerender() {
      this.renderLogin = false;
      this.renderRegister = false;
      this.renderForgot = false;
      this.$nextTick(() => {
        this.renderLogin = true;
        this.renderRegister = true;
        this.renderForgot = true;
      });
    },
    // Open Register Form
    openRegisterForm() {
      this.forceRerender();
      this.registerDialog = true;
    },
    //openLogin Form
    openLoginForm() {
      this.forceRerender();
      this.loginDialog = true;
    },
    // Close Register Screen
    closeRegister() {
      this.registerDialog = false;
    },
    closeLogin() {
      this.loginDialog = false;
    },
    // Close Login Screen
    closeForgot() {
      this.forgotPasswordDialog = false;
    },
    // Show Register Form
    showRegisterDialog() {
      this.loginDialog = false;
      this.registerDialog = true;
    },
    // Show Login Form
    showLoginDialog() {
      this.registerDialog = false;
      this.loginDialog = true;
    },
    // Show Forgot Password Popup
    showForgotDialog() {
      this.forgotPasswordDialog = true;
      this.loginDialog = false;
    }
  }
};
</script>
<style scoped>
.countryFlag {
  border: 1px solid #dddddd;
  background-color: #dddddd;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  padding: 5px;
}
.profileName {
  text-transform: capitalize !important;
}
.menuList:hover {
  background-color: #ff0167;
  color: #fff !important;
}
.menuList .link:hover {
  color: #fff !important;
}
</style>
