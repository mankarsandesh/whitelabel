<template>
  <div>
    <v-btn class="justify-center text-center my-btn" @click="methodRuning"
      >{{ title }}
      <span class=" ml-3">
        <v-icon size="15"> fas fa-chevron-double-right</v-icon
        ><v-icon size="15" class=" opcity-1">
          fas fa-chevron-double-right</v-icon
        >&nbsp;<v-progress-circular
          v-if="loadingImage"
          indeterminate
          color="#FFF"
          size="22"
        ></v-progress-circular>
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
import axios from "axios";
export default {
  data() {
    return {
      loadingImage: false,
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
              this.loadingImage = true;
              this.loginECgame();
            } else {
              this.$swal({
                title: "Your Balance is Low",
                type: "error"
              });
            }
          }
        } else {
          this.loginDialog = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // User Delete Bank Data
    async loginECgame() {
      try {
        var reqBody = {
          user_uuid: this.GetUserData.uuid,
          balance: this.GetUserData.balance
        };
        var { data } = await axios.post(config.ECGameLogin.url, reqBody, {
          headers: config.header
        });
        if (data.status) {
          window.open(data.data.URL, "_blank");
        }
        this.loadingImage = false;
      } catch (ex) {
        console.log(ex);
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
