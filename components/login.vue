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
        login
      </h2>
      <p>
        Doesn't have an account yet?
        <span @click="openRegister()">Register Now</span>
      </p>
      <v-form ref="form" v-model="valid" lazy-validation>
        <label>Email</label>
        <v-text-field
          class="inputClassRegi"
          height="48"
          light
          v-model="email"
          outlined
          rounded
          dense
          required
          :rules="emailRules"
        ></v-text-field>

        <label>Password</label>
        <v-text-field
          class="inputClassRegi"
          height="48"
          light
          v-model="password"
          outlined
          rounded
          dense
          required
          :rules="[v => !!v || 'Password is required']"
        ></v-text-field>

        <label class="remember">
          <input class="check" type="checkbox" />
          <span class="label-text">Remember Me </span></label
        >
        <label class="float-right forgotPassword">
          <a href="#">Forgot Password?</a>
        </label>

        <v-btn
          class="loginButton "
          @click="validate"
          :disabled="!valid"
          height="50"
        >
          Login
          <v-icon class="icon" size="30">
            fas fa-angle-double-right
          </v-icon>
          <v-icon class="icon" size="30">
            fas fa-angle-double-right
          </v-icon>
        </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import config from '../config/config.global';
export default {
  data() {
    return {
      valid: false,
      loginDialog: false,
      email: "",
      password: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    // Validate Login Empty Filed
    validate() {
      this.$refs.form.validate();
      if (this.email && this.password) {
        this.userLogin();
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
    // User Login Request to API
    async userLogin() {
      try {
        var reqBody = {
          email: this.email,
          password: this.password
        };
        var { data } = await axios.post(config.userLoginAuth.url, reqBody, {
          headers: config.headers
        });
      } catch (ex) {
        console.log(ex);
      }
    }
  }
};
</script>
<style scoped>
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
  height: 500px;
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
.forgotPassword {
  float: left;
}
.footerLogin {
  position: absolute;
  text-align: center;
  margin: 0 auto;
  bottom: 0;
}
.registerButton {
  background: linear-gradient(50deg, #ff0167 0%, #ff0167 100%);
  border-radius: 50px;
  font-size: 24px;
  padding: 20px 0px;
  text-align: center;
  font-weight: 800;
  margin: 0 auto !important;
  width: 280px;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  position: absolute;
  z-index: 999;
  bottom: -20px;
  left: 0;
  right: 0;
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
