<template>
  <div class="mainLogin">
    <div class="triangle-topleft"></div>
    <div class="loginForm">
      <v-icon class="closeButton" @click="closePopup()" right size="20">
        fas fa-times
      </v-icon>
      <h2>
        <v-icon class="icon" left size="20">
          fas fa-user
        </v-icon>
        {{ $t("profile.login") }}
      </h2>
      <p>
        {{ $t("profile.noAccount") }}
        <span @click="openRegister()">{{ $t("profile.registerNow") }}</span>
      </p>
      <p
        v-bind:class="{
          sucessMessage: sucessMessage,
          errorMessage: errorMessage
        }"
      >
        {{ this.errorMessage }} {{ this.sucessMessage }}
      </p>

      <v-form ref="form" v-model="valid" lazy-validation>
        <label>{{ $t("myAccount.username") }}</label>
        <v-text-field
          class="inputClassRegi"
          height="42"
          light
          v-model="username"
          outlined
          rounded
          dense
          required
          :rules="[v => !!v || 'Username is required']"
        ></v-text-field>

        <label>{{ $t("profile.password") }}</label>
        <v-text-field
          class="inputClassRegi"
          height="42"
          light
          v-model="password"
          outlined
          rounded
          dense
          required
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          :rules="[v => !!v || 'Password is required']"
        ></v-text-field>
        <v-layout>
          <v-flex>
            <label class="remember float-left ">
              <input class="check" type="checkbox" />
              <span class="label-text">{{
                $t("profile.rememberMe")
              }}</span></label
            >
          </v-flex>
          <v-flex style="text-align:right;">
            <label class="forgotPassword">
              <a href="#" @click="openForgotPassword"
                >{{ $t("profile.forgotPassword") }}?</a
              >
            </label>
          </v-flex>
        </v-layout>

        <v-btn
          class="loginButton "
          @click="validate"
          :disabled="!valid"
          height="50"
        >
          {{ $t("profile.login") }}
          <v-icon size="30">
            fas fa-angle-double-right
          </v-icon>
          <v-icon class="icon" size="30">
            fas fa-angle-double-right
          </v-icon>
          &nbsp;<v-progress-circular
            v-if="loadingImage"
            indeterminate
            color="#FFF"
            size="22"
          ></v-progress-circular>
        </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import axios from "axios";
import config from "../config/config.global";
import Cookies from "../plugins/js-cookie";
export default {
  data() {
    return {
      loadingImage: false,
      showPassword: false,
      errorMessage: "",
      sucessMessage: "",
      valid: false,
      loginDialog: false,
      username: "",
      password: ""
    };
  },
  methods: {
    ...mapMutations("login", ["SET_USER_UUID", "SET_USER_DATA"]),
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
      this.loadingImage = true;
      try {
        var reqBody = {
          username: this.username,
          password: this.password,
          last_ip: "127.0.0.2"
        };
        var { data } = await axios.post(config.userLoginAuth.url, reqBody, {
          headers: config.header
        });
        if (data.code == 200) {
          this.sucessMessage = data.message[0];
          this.errorMessage = "";
          this.loadingImage = false;
          this.SET_USER_UUID(data.data[0].uuid);
          this.SET_USER_DATA(data.data[0]);
          Cookies.set("userUUID", data.data[0].uuid, {
            path: " "
          });
          this.$emit("loginClose");
          this.$router.push("/profile");
        } else {
          this.errorMessage = data.message[0];
          this.sucessMessage = "";
          this.loadingImage = false;
        }
      } catch (ex) {
        console.log(ex);
      }
    }
  }
};
</script>
<style scoped>
.errorMessage {
  color: #f17272 !important;
}
.sucessMessage {
  color: green !important;
}
.errors {
  color: #f17272 !important;
}
.inputClass .radio {
  padding: 8px 15px;
  cursor: pointer;
}
input[type="radio"]:checked + label {
  color: #ff0066 !important;
}
.label-text span {
  color: #ff0066 !important;
}
.mainLogin {
  width: 450px;
  height: 435px;
  margin: 0 auto;
  position: relative;
}
.triangle-topleft {
  width: 0;
  height: 0;
  border-top: 250px solid #ff0066;
  border-right: 250px solid transparent;
}
.forgotPassword a {
  color: #ff0167;
  text-decoration: none;
}
.remberberme {
  color: #333 !important;
}
.loginForm {
  width: 100% !important;
  position: absolute;
  top: 15px;
  left: 15px;
  background-color: #fff;
  padding: 30px 20px 65px 20px;
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
  color: #ff0167;
  cursor: pointer;
  font-weight: 600;
}
.loginForm .inputClassRegi {
  /* border:1px solid red; */
  width: 100%;
}
.loginForm .inputClass {
  width: 100%;
  padding: 3px 10px;
  margin: 5px 0px;
}
.loginForm label {
  color: #333;
  width: 100%;
  font-weight: 600;
}
.loginForm .inputClass .input {
  border: 1px solid #d2d1d2;
  width: 100%;
  border-radius: 30px;
  padding: 10px 20px;
  color: #333;
}

.footerLogin {
  position: absolute;
  text-align: center;
  margin: 0 auto;
  bottom: 0;
}
.loginButton {
  text-align: center;
  background: linear-gradient(50deg, #ff0167 0%, #ff0167 100%);
  border-radius: 50px;
  font-size: 27px;
  padding: 10px 40px;
  font-weight: 800;
  margin: 0 auto !important;
  width: 250px;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  position: absolute;
  z-index: 999;
  bottom: -20px;
  left: 0;
  right: 0;
}

input[type="radio"]:checked + label {
  color: #0b4db7;
}

label .label-text {
  color: #333;
}
label input.check:checked + .label-text,
.check {
  color: #ff0167;
  cursor: pointer;
}
label input.check:checked + .label-text,
.check {
  color: #ff0167;
  cursor: pointer;
}
.label-text {
  cursor: pointer;
}
.registerButton .icon {
  color: #fff;
  margin-top: 0px;
}
.registerButton .icon:last-child {
  opacity: 0.4;
  margin-left: -10px;
  color: #fff;
}

.loginButton .icon {
  color: #fff;
  opacity: 0.4;
  margin-top: 0px;
}

input:focus {
  outline: none;
}
.closeButton {
  top: -15px;
  right: -15px;
  position: absolute;
  background-color: #ff0167;
  color: #fff;
  border-radius: 50%;
  height: 35px;
  width: 35px;
}
</style>
