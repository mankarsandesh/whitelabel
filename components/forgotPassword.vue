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
        Forgot Password
      </h2>
      <p>
        No problem! Just fill in the email below and we'll send you password
        reset instructions!
      </p>
      <p class="errorMessage" v-if="this.errorMessage">
        {{ this.errorMessage }}
      </p>

      <p class="sucessMessage" v-if="this.sucessMessage">
        {{ this.sucessMessage }}
      </p>
      <v-form ref="form" v-model="valid" lazy-validation>
        <label>Your Email</label>
        <v-text-field
          class="inputClassRegi"
          height="48"
          light
          v-model="email"
          outlined
          rounded
          dense
          required
           :rules="[v => !!v || 'Username is required']"
        ></v-text-field>

        <v-btn
          class="loginButton "
          @click="validate"
          :disabled="!valid"
          height="50"
        >
          Reset
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
import axios from "axios";
import config from "../config/config.global";
export default {
  data() {
    return {
      errorMessage: "",
      sucessMessage: "",
      valid: false,
      email: ""
    };
  },
  methods: {
    // Validate Login Empty Filed
    validate() {
      this.$refs.form.validate();
      if (this.email) {       
        this.forgotPassword();
      }
    },
    // Close Login Popup
    async closePopup() {
      this.$emit("forgotClose");
    },
    // User Login Request to API
    async forgotPassword() {
      try {
        var reqBody = {
          email: this.email
        };
        var { data } = await axios.post(
          config.userForgotPassword.url,
          reqBody,
          {
            headers: config.header
          }
        );
        if (data.code == 200) {
          this.sucessMessage = data.message[0];
          this.errorMessage = "";
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
  height: 500px;
  margin: 0 auto;
  position: relative;
}
.triangle-topleft {
  width: 0;
  height: 0;
  border-top: 150px solid #ff0066;
  border-right: 150px solid transparent;
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
