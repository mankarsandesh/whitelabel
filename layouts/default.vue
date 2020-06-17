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
          {{ item.title }}
        </v-btn>
      </template>
      <div v-if="GetUserData">   
        <v-btn text dark to="/profile">
          <v-list flat>
            <v-list-item class="px-0">
              <v-list-item-avatar class="mr-0">
                <img
                  :src="this.defaultImage"
                  :alt="GetUserData.username"
                />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title> &nbsp;{{
                 GetUserData.username
                }}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-icon size="15">{{
                  $route.name === "profile"
                    ? "far fa-chevron-up"
                    : "far fa-chevron-down"
                }}</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-btn>
        <v-btn text dark @click="userLogout()">
          Logout
        </v-btn>
      </div>
      <div v-else>
        <v-btn
          :rounded="true"
          :outlined="true"
          color="pink"
          @click="loginDialog = true"
          class="mx-2"
        >
          <v-icon left>fas fa-user</v-icon>
          Login
        </v-btn>

        <v-btn
          :rounded="true"
          :outlined="false"
          color="pink"
          @click="registerDialog = true"
          class="mx-2"
        >
          <v-icon left>fas fa-user-plus</v-icon>
          Register
        </v-btn>
      </div>

      <v-btn class="mx-2" large icon>
        <v-icon> fas fa-globe</v-icon>
      </v-btn>
      <v-btn class="mx-2" large icon @click.stop="OpenDrawer = !OpenDrawer">
        <v-icon> {{ OpenDrawer ? "fas fa-times" : "mdi-menu" }} </v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Register Form -->
    <v-dialog
      dark
      v-model="registerDialog"
      width="600"
      style=" border-radius:none !important;"
    >
      <Register />
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
export default {
  data() {
    return {
      defaultImage: "../default.jpg",
      forgotPasswordDialog: false,
      loginDialog: false,
      registerDialog: false,
      selectedLanguage: "us",
      OpenDrawer: false,
      menu: json.menu,
      slideMenu: json.slideMenu,
      userData: [],
      userUUID :  Cookies.get("userUUID")
    };
  },
  components: {
    Login,
    Register,
    forgotPassword
  },
  created() {
    
    if (this.userUUID) {
      this.userInfo();
    }else{
         this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters("login", ["GetUserData"]),
    checkPageBackground() {
      const route = this.$route.name;
      switch (true) {
        case route === "index":
          return null;
          break;
        case route === "profile" ||
          route === "profile-deposit" ||
          route === "profile-WithDrawal":
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
    ...mapMutations("login", ["CLEAR_USER_DATA","SET_USER_DATA"]), 
    // Logout Users
    async userLogout() {    
        Cookies.remove('userUUID');
        this.CLEAR_USER_DATA();
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
        }
      } catch (ex) {
        console.log(ex);
      }
    },
    // Close Register Screen
    // closeRegister() {
    //   this.registerDialog = false;
    // },
    // Close Login Screen

    // closeLogin() {
    //   this.loginDialog = false;
    // },
    // showRegisterDialog() {
    //   this.loginDialog = false;
    //   this.registerDialog = true;
    // },
    // showLoginDialog() {
    //   this.registerDialog = false;
    //   this.loginDialog = true;
    // }
    closeLogin() {
      this.loginDialog = false;
    },
    // Close Login Screen
    closeForgot() {
      this.forgotPasswordDialog = false;
    },
    showRegisterDialog() {
      this.loginDialog = false;
      this.registerDialog = true;
    },
    showLoginDialog() {
      this.registerDialog = false;
      this.loginDialog = true;
    },
    showForgotDialog() {
      this.forgotPasswordDialog = true;
      this.loginDialog = false;
    }
  }
};
</script>
