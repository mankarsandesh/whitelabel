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
      <p
        v-bind:class="{
          sucessMessage: sucessMessage,
          errorMessage: errorMessage
        }"
        h
      >
        {{ this.errorMessage }} {{ this.sucessMessage }}
      </p>

      <v-form ref="form" v-model="valid" lazy-validation>
        <div v-if="showStep1">
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
        </div>
        <div v-if="showStep2">
          <label>Enter your OTP</label>
          <v-text-field
            class="inputClassRegi"
            height="30"
            v-model="yourOTP"
            outlined
            rounded
            dense
            required
            :rules="[v => !!v || 'OTP is required']"
          ></v-text-field>
        </div>

        <div v-if="showStep3">
          <label>Enter New Password</label>
          <v-text-field
            class="inputClassRegi"
            height="30"
            v-model="newPassword"
            outlined
            rounded
            dense
            required
            type="password"
            :rules="[v => !!v || 'New Password is required']"
          ></v-text-field>
          <label>Enter Repeat New Password</label>
          <v-text-field
            class="inputClassRegi"
            height="30"
            v-model="newRepPassword"
            outlined
            rounded
            dense
            required
            type="password"
            :rules="[v => !!v || 'Repeat Password is required']"
          ></v-text-field>
        </div>
        <v-row class="mt-5">
          <v-btn
            v-if="showButton"
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
            <v-progress-circular
              v-if="loadingImage"
              indeterminate
              color="#FFF"
              size="22"
            ></v-progress-circular>
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
      loadingImage: false,
      showStep1: true,
      showStep2: false,
      showStep3: false,
      valid: false,
      showButton: true,
      yourOTP: "",
      newPassword: "",
      newRepPassword: "",
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    // Close Login Popup
    async closePopup() {
      this.errorMessage = "";
      this.sucessMessage = "";
      this.email = "";
      this.newPassword = "";
      this.newRepPassword = "";
      this.yourOTP = "";
      this.$emit("forgotPasswordClose");
    },
    // Validate Login Empty Filed
    validate() {
      this.$refs.form.validate();
      if (this.email && this.newPassword && this.newRepPassword) {
        this.loadingImage = true;
        this.passwordChange();
      } else if (this.email && this.yourOTP) {
        this.loadingImage = true;
        this.OTPRequest();
      } else {
        this.loadingImage = true;
        this.forgotPassword();
      }
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
          this.showStep2 = true;
          this.loadingImage = false;
        } else {
          this.errorMessage = data.message[0];
          this.sucessMessage = "";
          this.loadingImage = false;
        }
      } catch (ex) {
        console.log(ex);
      }
    },
    // User Send OTP Request to API and Send to User Email
    async OTPRequest() {
      try {
        var reqBody = {
          email: this.email,
          otp: this.yourOTP
        };
        var { data } = await axios.post(config.userVerifyOtp.url, reqBody, {
          headers: config.header
        });
        if (data.code == 200) {
          this.sucessMessage = data.message[0];
          this.errorMessage = "";
          this.yourOTP = "";
          this.showStep2 = false;
          this.showStep3 = true;
          this.loadingImage = false;
        } else {
          this.errorMessage = data.message[0];
          this.sucessMessage = "";
          this.loadingImage = false;
        }
      } catch (ex) {
        console.log(ex);
      }
    },
    // User Password Change New Password and Repeat New Password
    async passwordChange() {
      try {
        var reqBody = {
          email: this.email,
          password: this.newPassword,
          confirm_password: this.newRepPassword
        };
        var { data } = await axios.post(config.userResetPassword.url, reqBody, {
          headers: config.header
        });
        if (data.code == 200) {
          this.sucessMessage = data.message[0];
          this.errorMessage = "";
          this.loadingImage = false;
          this.newPassword = "";
          this.newRepPassword = "";
          this.showStep3 = false;
          this.showStep1 = false;
          this.showButton = false;
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
  position: sticky;
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
  color: #ffffff;
  border-color: #ff0066;
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
