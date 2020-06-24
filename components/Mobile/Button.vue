<template>
  <div>
    <v-btn class="justify-center text-center my-btn" @click="methodRuning"
      >{{ title }}
      <span class=" ml-3">
        <v-icon size="15"> fas fa-chevron-double-right</v-icon
        ><v-icon size="15" class=" opcity-1">
          fas fa-chevron-double-right</v-icon
        >
      </span>
    </v-btn>
    <!-- Register Form -->
    <v-dialog
      dark
      v-model="registerDialog"
      style=" border-radius:none !important;"
    >
      <Register @registerClose="closeRegister" @loginOpen="showLoginDialog" />
    </v-dialog>
    <!-- Ending Register Form -->

    <!-- forgotPasswordDialog Form -->
    <v-dialog
      dark
      v-model="forgotPasswordDialog"
      style=" border-radius:none !important;"
    >
      <forgotPassword
        @forgotPasswordClose="closeForgot"
        @loginOpen="showForgotDialog"
      />
    </v-dialog>
    <!-- Ending Register Form -->

    <!-- Login Form -->
    <v-dialog
      dark
      v-model="loginDialog"
      style=" border-radius:none !important;"
    >
      <Login
        @loginClose="closeLogin"
        @registerOpen="showRegisterDialog"
        @forgotPasswordOpen="showForgotDialog"
      />
    </v-dialog>
    <!-- Ending Login Form -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import config from "../../config/config.global";
import Login from "../../components/Mobile/login/login";
import Register from "../../components/Mobile/login/register";
import forgotPassword from "../../components/Mobile/login/forgotPassword";
export default {
  data() {
    return {
      forgotPasswordDialog: false,
      loginDialog: false,
      registerDialog: false
    };
  },
  components: {
    config,
    Login,
    Register,
    forgotPassword
  },
  props: ["title", "actions", "link"],
  computed: {
    ...mapGetters("login", ["GetUserData"])
  },
  methods: {
    async methodRuning() {
      try {
        if (this.GetUserData) {
          if (this.link == true) {
            if (this.GetUserData.balance > 300) {
              window.location =
                config.mainServer.url +
                "?portalProviderUUID=" +
                config.portalProviderID.url +
                "&portalProviderUserID=" +
                this.GetUserData.username +
                "&balance=" +
                this.GetUserData.balance;
            } else {
              this.$swal({
                title: "Your Balance is Low",
                type: "error"
              });
            }
          }
        } else {
          this.loginDialog = true;
          console.log("Yes Login");
        }
      } catch (error) {
        console.log(error);
      }
    },
    // Close Register Screen
    closeRegister() {
      this.registerDialog = false;
    },
    // Close Login Screen
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

<style></style>
