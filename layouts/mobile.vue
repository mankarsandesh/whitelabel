<template>
  <!-- App.vue -->

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

    <v-app-bar fixed color="#1E1E1F" class="navbar-mobile" height="60" dens>
      <v-toolbar-title>
        <v-btn to="/" text color="transparent">
          <v-img width="100" src="/logo/logo.png"></v-img>
        </v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <div class=" menu-list">
        <v-btn rounded small outlined color="pink" @click="openloginDialog()">
          <v-icon size="13">fas fa-user</v-icon>
          Login
        </v-btn>
        <v-btn dark small rounded color="pink" @click="openRegisterDialog()">
          <v-icon size="13">fas fa-user-plus</v-icon>
          Register
        </v-btn>
        <v-btn dark small icon>
          <v-icon size="18">fas fa-globe-americas</v-icon>
        </v-btn>
        <v-btn dark small icon @click.stop="OpenDrawer = !OpenDrawer">
          <v-icon> {{ OpenDrawer ? "fas fa-times" : "mdi-menu" }} </v-icon>
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
import json from "~/json/items";
import Login from "../components/Mobile/login/login";
import forgotPassword from "../components/Mobile/login/forgotPassword";
import register from "../components/Mobile/login/register";
export default {
  name: "mobile",
  data() {
    return {
      loginDialog: false,
      registerDialog: false,
      forgotPasswordDialog: false,
      slideMenu: json.slideMenu,
      OpenDrawer: false
    };
  },
  components: {
    Login,
    register,
    forgotPassword
  },
  methods: {
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

<style></style>
