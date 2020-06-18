<template>
  <div>
    <div class="loginForm">
      <v-row justify="center">
        <v-icon class="closeButton " v-on:click="closePopup" size="20">
          fas fa-times
        </v-icon>
        <h2>
          <v-icon class="icon" left size="20">
            fas fa-user
          </v-icon>
          login
        </h2>
      </v-row>
      <v-row justify="center">
        <p style="color: #ffffff;">
          Don't have an account yet?
          <span @click="openRegister()" class="terms">Register Now</span>
        </p>
      </v-row>
      <p class="errorMessage" v-if="this.errorMessage">
        {{ this.errorMessage }}
      </p>

      <p class="sucessMessage" v-if="this.sucessMessage">
        {{ this.sucessMessage }}
      </p>

      <v-form ref="form" v-model="valid" lazy-validation class="mt-5">
        <label>Email/Username</label>
        <v-text-field
          height="30"
          v-model="username"
          dark
          outlined
          rounded
          required
          dense
          pill
          autofocus
          color="#fff"
          :rules="[v => !!v || 'Username is required']"
        ></v-text-field>

        <label>Password</label>
        <v-text-field
          height="30"
          v-model="password"
          outlined
          color="rgb(255,255,255)"
          rounded
          dense
          type="password"
          required
          :rules="[v => !!v || 'Password is required']"
        ></v-text-field>

        <div class="row">
          <div class="col  xs-9 sm-9">
            <label>
              <input class="check" size="13" type="checkbox" />
              <span class="rememberme">Remember Me </span>
            </label>
          </div>
          <div class="col xs-3 sm-3">
            <label class="float-right">
              <span href="#" @click="openForgotPassword()" class="terms"
                >Forgot Password?</span
              >
            </label>
          </div>
        </div>
        <v-row class="mt-5">
          <v-btn
            class="loginButton"
            @click="validate"
            :disabled="!valid"
            height="50"
          >
            Login
            <v-icon class="icon" size="20">
              fas fa-chevron-double-right
            </v-icon>
            <v-icon class="icon" size="20">
              fas fa-chevron-double-right
            </v-icon>
          </v-btn>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import axios from "axios";
import config from "../../../config/config.global";
export default {
  data() {
    return {
      errorMessage: "",
      sucessMessage: "",
      valid: false,
      username: "",
      password: "",
      agree: false
    };
  },
  methods: {
    ...mapMutations("login", ["SET_AUTH", "SET_USER_DATA"]),
    // Validate Login Empty Filed
    validate() {
      this.$refs.form.validate();
      if (this.username && this.password) {
        this.loginUser();
      }
    },
    // Close Login Popup
    async closePopup() {
      this.$emit("loginClose");
    },
    // Close Register Popup
    async openRegister() {
      this.$emit("registerOpen");
    },
    // Open Forgot Password
    async openForgotPassword() {
      this.$emit("forgotPasswordOpen");
    },
    // User Login Request to API
    async loginUser() {
      try {
        var reqBody = {
          username: this.username,
          password: this.password,
          last_ip: "127.0.0.2"
        };
        var { data } = await axios.post(config.userLoginAuth.url, reqBody, {
          headers: config.header
        });
        console.log(data.data[0].uuid);
        if (data.code == 200) {
          this.sucessMessage = data.message[0];
          this.errorMessage = "";
          this.SET_USER_DATA(data.data[0]);
          this.$cookies.set("userUUID", data.data[0].uuid, {
            path: "/"
          });
          this.$emit("loginClose");
          this.$router.push("/profile");
        } else {
          this.errorMessage = data.message[0];
          this.sucessMessage = "";
        }
      } catch (ex) {
        console.log(ex);
      }
    }
  }
};
</script>
<style scoped>
.terms {
  color: #ff0167 !important;
}
.errorMessage {
  color: #ffffff !important;
}
.sucessMessage {
  color: green !important;
}
.errors {
  color: #ffffff !important;
}
.forgotPassword a {
  color: #ff0167;
  text-decoration: none;
}
.rememberme {
  color: #ffffff;
  font-size: 14px;
  font-weight: 300 !important;
}
.loginForm {
  position: absolute;
  background-image: url(/mobile/mobile-bg-1.jpg);
  padding: 80px 20px 405px 20px;
  background-size: cover;
  width: 100%;
  height: 100%;
  background-color: rgba(4, 1, 17, 0.88);
  background-blend-mode: multiply;
}
.loginForm .icon {
  color: #ff0167;
}
.loginForm h2 {
  text-transform: uppercase;
  color: #ff0167;
  margin-bottom: 20px;
}
.loginForm p {
  color: #c1c0c1;
}
.loginForm p span {
  color: #ffffff;
  cursor: pointer;
  font-weight: 600;
}
.loginForm .inputClassRegi {
  color: #ffffff;
  border-color: #ff0066;
  width: 100%;
}
.loginForm .inputClass {
  width: 100%;
  padding: 3px 10px;
  margin: 5px 0px;
}
.loginForm label {
  color: #ffffff;
  width: 100%;
  font-weight: 600;
}
.loginForm .inputClass .input {
  border: 1px solid #d2d1d2;
  width: 100%;
  border-radius: 30px;
  padding: 10px 20px;
  color: #ffffff;
}
.loginButton {
  text-align: center;
  background: linear-gradient(50deg, #ff0167 0%, #ff0167 100%);
  border-radius: 50px;
  font-size: 18px;
  font-weight: 800;
  margin: 0 auto !important;
  width: 180px;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  position: inherit;
  z-index: 999;
  bottom: 10px;
  left: 0;
  right: 0;
  box-shadow: 2px 11px 35px 13px #6e0221;
}
input[type="radio"]:checked + label {
  color: #ffffff;
}
label .label-text {
  color: #ffffff;
}
label input.check:checked + .label-text,
.check {
  color: #ff0167;
  cursor: pointer;
}
.label-text {
  cursor: pointer;
}
.loginButton .icon {
  color: #fff;
  margin-top: 0px;
}
.loginButton .icon:last-child {
  opacity: 0.4;
  margin-left: -10px;
  color: #fff;
}
input:focus {
  outline: none;
}
.closeButton {
  top: 15px;
  right: 15px;
  position: absolute;
  background-color: #ff0167;
  color: #fff;
  border-radius: 50%;
  height: 35px;
  width: 35px;
}
</style>
