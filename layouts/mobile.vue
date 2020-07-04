<template>
  <v-app>
    <v-navigation-drawer
      v-model="OpenDrawer"
      class="top-60"
      right
      clipped
      temporary
      fixed
      color="#1B191B"
      dark
    >
      <v-list dense>
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

    <v-app-bar app fixed color="#1E1E1F" height="60">
      <v-toolbar-title>
        <v-btn to="/" text color="transparent">
          <v-img width="100" src="/logo/logo.png"></v-img>
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- After User Login Show -->
      <div class="menu-list" v-if="GetUserData">
        <v-btn dark class="userLogout" to="/mobile/profile">
          <v-avatar size="35" mr-1>
            <img :src="this.defaultImage" alt />
          </v-avatar>
          <div class="userLogoutMenu">
            <span> &nbsp; &nbsp;{{ GetUserData.username }} </span>
          </div>
        </v-btn>

        <v-btn dark small icon @click.stop="OpenDrawer = !OpenDrawer">
          <v-icon>
            {{ OpenDrawer ? "fas fa-times" : "mdi-menu" }}
          </v-icon>
        </v-btn>
      </div>
      <!-- Without Login Show This Button -->
      <div v-else class="menu-list">
        <v-btn rounded small outlined color="pink" @click="openloginDialog()">
          <v-icon size="18">fas fa-user</v-icon>
          &nbsp;Login
        </v-btn>
        <v-btn dark small rounded color="pink" @click="openRegisterDialog()">
          <v-icon size="18">fas fa-user-plus</v-icon>
          &nbsp;Register
        </v-btn>
      </div>
    </v-app-bar>
    <!-- Login Form -->
    <v-dialog
      dark
      v-model="loginDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      light
      style=" border-radius:none !important;"
    >
      <Login
        @loginClose="closeTheLogin"
        @registerOpen="showRegisterDialog"
        @forgotPasswordOpen="showForgotDialog"
      />
    </v-dialog>
    <!-- Ending Login Form -->
    <!-- User Registration Form -->
    <v-dialog
      dark
      v-model="registerDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      light
      style=" border-radius:none !important;"
    >
      <register
        @registerClose="closeTheRegister"
        @loginOpen="openloginDialog"
      />
    </v-dialog>
    <!-- Ending User Registration Form -->
    <!-- Forgot Password Dialog -->
    <v-dialog
      dark
      v-model="forgotPasswordDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      light
      style=" border-radius:none !important;"
    >
      <forgotPassword
        @forgotPasswordClose="closeTheForgetPassword"
        @loginOpen="openloginDialog"
      />
    </v-dialog>
    <!--End of Forgot Password Dialog -->
    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper getter -->
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import json from "~/json/items";
import Login from "../components/Mobile/login/login";
import forgotPassword from "../components/Mobile/login/forgotPassword";
import register from "../components/Mobile/login/register";
import Cookies from "../plugins/js-cookie";
import axios from "axios";
import config from "../config/config.global";
export default {
  name: "mobile",
  data() {
    return {
      defaultImage: "../../default.jpg",
      loginDialog: false,
      registerDialog: false,
      forgotPasswordDialog: false,
      slideMenu: json.slideMenu,
      OpenDrawer: false,
      userUUID: Cookies.get("userUUID")
    };
  },
  components: {
    Login,
    register,
    forgotPassword
  },
  computed: {
    ...mapGetters("login", ["GetUserData"])
  },
  created() {
    if (this.userUUID) {
      this.userInfo();
    } else {
      this.$router.push("/");
    }
  },
  methods: {
    ...mapMutations("login", ["CLEAR_USER_DATA", "SET_USER_DATA"]),
    // Logout Users
    userLogout() {
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
        }
      } catch (ex) {
        console.log(ex);
      }
    },
    closeTheLogin() {
      this.loginDialog = false;
    },
    closeTheRegister() {
      this.registerDialog = false;
    },
    closeTheForgetPassword() {
      this.forgotPasswordDialog = false;
    },
    showRegisterDialog() {
      this.loginDialog = false;
      this.registerDialog = true;
    },
    showForgotDialog() {
      this.forgotPasswordDialog = true;
      this.loginDialog = false;
    },
    openloginDialog() {
      this.loginDialog = true;
    },
    openRegisterDialog() {
      this.registerDialog = true;
    }
  }
};
</script>

<style scoped>
.v-menu__content {
  border-radius: 15px;
}

.v-list {
  padding: 0px;
}

.userLogoutMenu {
  color: #fff;
  font-size: 16px;
  display: inline-grid;
}

.userLogoutMenu .balance {
  color: #fff;
  font-size: 16px;
}

.v-list__tile i {
  font-size: 16px;
}

.v-list__tile .v-list__tile__title {
  margin-left: 5px;
  text-transform: capitalize;
  font-size: 14px;
}

.fa-15x {
  font-size: 1.45em;
}

.margin-right-5 {
  margin-right: 4px;
}

.v-avatar {
  -webkit-box-align: center;
  align-items: center;
  border-radius: 50%;
  display: -webkit-inline-box;
  display: inline-flex;
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
  text-align: center;
  vertical-align: middle;
  border: 2px solid;
}
</style>
