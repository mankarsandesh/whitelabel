<template>
  <div>
 
   

    <!-- Register Form -->
    <v-dialog
      dark
      v-model="registerDialog"
      width="600"
      style=" border-radius:none !important;"
    >
      <Register @registerClose="closeRegister" @loginOpen="showLoginDialog" />
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
    {{loginDialog}}
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
import Login from "../components/login";
import Register from "../components/register";
import forgotPassword from "../components/forgotPassword";
export default {
  data() {
    return {
      forgotPasswordDialog: false,
    //   loginDialog: false,
      registerDialog: false
    };
  },
  props: ["loginDialog"],
  components: {
    Login,
    Register,
    forgotPassword
  },
  methods: {
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
