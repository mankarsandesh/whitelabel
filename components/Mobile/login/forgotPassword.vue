<template>
  <div>
    <div class="forgotPassForm">
      <v-row justify="center">
        <v-icon class="closeButton " @click="closePopup()" size="20">
          fas fa-times
        </v-icon>
        <h2>
          <v-icon class="icon" left size="20">
            fas fa-user
          </v-icon>
          Forgot Password
        </h2>
      </v-row>
      <p>
        No problem! Just fill in the email below and we'll send you password
        reset instructions!
      </p>

      <v-form ref="form" v-model="valid" lazy-validation>
        <label>Your Email</label>
        <v-text-field
          class="inputClassRegi"
          height="30"
          v-model="email"
          outlined
          rounded
          dense
          required
          autofocus
          :rules="emailRules"
        ></v-text-field>
        <v-row class="mt-5">
          <v-btn
            class="resetButton"
            @click="validate"
            :disabled="!valid"
            height="50"
          >
            Reset
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
import axios from "axios";
import config from "../../../config/config.global";
export default {
  data() {
    return {
      valid: false,
      email: "",
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
    },
    // Close Login Popup
    async closePopup() {
      this.$emit("forgotPasswordClose");
    }
    // User Forgot password Request to API
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
.forgotPassForm {
  position: absolute;
  background-image: url(/mobile/mobile-bg-1.jpg);
  padding: 180px 20px 405px 20px;
  background-size: cover;
  width: 100%;
  height: 100%;
  background-color: rgba(4, 1, 17, 0.88);
  background-blend-mode: multiply;
  vertical-align: middle;
}
.forgotPassForm .icon {
  color: #ff0167;
}
.forgotPassForm h2 {
  text-transform: uppercase;
  color: #ff0167;
  margin-bottom: 20px;
}
.forgotPassForm p {
  color: #c1c0c1;
}
.forgotPassForm p span {
  color: #ffffff;
  cursor: pointer;
  font-weight: 600;
}
.forgotPassForm .inputClassRegi {
  /* color: #ffffff; */
  /* border-color: #ff0066; */
  width: 100%;
}
.forgotPassForm .inputClass {
  width: 100%;
  padding: 3px 10px;
  margin: 5px 0px;
}
.forgotPassForm label {
  color: #ffffff;
  width: 100%;
  font-weight: 600;
}
.forgotPassForm .inputClass .input {
  border: 1px solid #d2d1d2;
  width: 100%;
  border-radius: 30px;
  padding: 10px 20px;
  color: #ffffff;
}
.resetButton {
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
.resetButton .icon {
  color: #fff;
  margin-top: 0px;
}
.resetButton .icon:last-child {
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
