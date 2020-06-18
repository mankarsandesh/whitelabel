<template>
  <div class="mainRegister">
    <div class="triangle-topleft"></div>
    <div class="loginForm">
      <v-icon class="closeButton" @click="closePopup()" right size="20">
        fas fa-times
      </v-icon>
      <h2>
        <v-icon class="icon" left size="20">
          fas fa-user
        </v-icon>
        Register Account
      </h2>
      <p>
        Already have an account?
        <span @click="openLogin()">Login now</span>
      </p>
          <p
        v-bind:class="{
          sucessMessage: sucessMessage,
          errorMessage: errorMessage
        }"
      >
        {{ this.errorMessage }} {{ this.sucessMessage }}
      </p>


      <v-form ref="form" v-model="valid" lazy-validation v-if="showRegisterForm">
        <label>Username</label>
        <v-text-field
          class="inputClassRegi"
          height="42"
          light
          v-model="registerForm.username"
          outlined
          rounded
          dense
          required
          :rules="[v => !!v || 'username is required']"
        ></v-text-field>
        <label>Email</label>
        <v-text-field
          class="inputClassRegi"
          height="42"
          light
          v-model="registerForm.email"
          outlined
          rounded
          dense
          required
          :rules="emailRules"
        ></v-text-field>
        <label>Password</label>
        <v-text-field
          class="inputClassRegi"
          height="42"
          light
          v-model="registerForm.password"
          outlined
          rounded
          dense
          required
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          :rules="[v => !!v || 'Password is required']"
        ></v-text-field>
        <label>Confirm Password</label>
        <v-text-field
          class="inputClassRegi"
          height="42"
          light
          v-model="registerForm.repeatPassword"
          outlined
          rounded
          dense
          required
          :append-icon="showRepPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showRepPassword ? 'text' : 'password'"
          @click:append="showRepPassword = !showRepPassword"
          :rules="[v => !!v || 'Password is required']"
        ></v-text-field>

        <div class="inputClassRegi">
          <label>Gender</label>
          <v-radio-group v-model="registerForm.gender" :mandatory="false" row>
            <v-radio
              height="42"
              class="genderClass"
              color="#ff0167"
              light
              v-for="data in genders"
              :key="data"
              :label="`${data}`"
              :value="data"
            ></v-radio>
          </v-radio-group>
        </div>

        <div class="inputClassRegi float-left">
          <v-select
            height="42"
            rounded
            outlined
            light
            v-model="registerForm.country"
            :items="countrys"
            item-text="name"
            item-value="id"
            required
            :rules="[v => !!v || 'Country is required']"
          ></v-select>
        </div>

        <div class="inputClassRegi float-left">
          <v-checkbox
            light
            v-model="registerForm.agree"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="Agree with Terms & Conditions?"
            required
          ></v-checkbox>
        </div>
        <v-btn
          class="registerButton "
          @click="validate"
          :disabled="!valid"
          height="50"
        >
          Register
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
import axios from "axios";
import config from "../config/config.global";
export default {
  data() {
    return {
      showRegisterForm : true,
      loadingImage: false,
      showRepPassword: false,
      showPassword: false,
      errorMessage: "",
      sucessMessage: "",
      valid: true,
      registerForm: {
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
        country: 45,
        gender: "male",
        agree: false
      },
      genders: ["male", "female", "other"],
      countrys: [
        {
          id: 45,
          name: "China"
        },
        {
          id: 122,
          name: "Laos"
        },
        {
          id: 220,
          name: "Thailand"
        },
        {
          id: 236,
          name: "USA"
        }
      ],
      selectedLanguage: "us",
      OpenDrawer: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    // Close Register Popup
    async closePopup() {
      this.$emit("registerClose");
    },
    // Validate Login Empty Filed
    validate() {
      this.$refs.form.validate();
      if (
        this.registerForm.username &&
        this.registerForm.email &&
        this.registerForm.password &&
        this.registerForm.repeatPassword &&
        this.registerForm.gender &&
        this.registerForm.country &&
        this.registerForm.agree
      ) {
        if (this.registerForm.password == this.registerForm.repeatPassword) {
          this.loadingImage = true;
          this.userRegistration();
        } else {
          this.errorMessage = "Repeat Password did't Match";
        }
      }
    },
    // Show Login model
    async openLogin() {
      this.$emit("loginOpen");
    },
    // User Registertion Request TO API
    async userRegistration() {
      try {
        var reqBody = {
          username: this.registerForm.username,
          email: this.registerForm.email,
          password: this.registerForm.repeatPassword,
          gender: this.registerForm.gender,
          country_id: this.registerForm.country,
          currency_id: 1,
          last_ip: "127.0.0.2"
        };
        var { data } = await axios.post(config.userRegisterAuth.url, reqBody, {
          headers: config.header
        });

        if (data.code == 200) {
          this.sucessMessage = data.message[0];
          this.errorMessage = "";
          this.registerForm.username = "";
          this.registerForm.email = "";
          this.registerForm.password = "";
          this.registerForm.repeatPassword = "";
          this.registerForm.username = "";
          this.loadingImage = false;
          this.showRegisterForm = false;
        } else {
          this.errorMessage = data.message[0];
          this.sucessMessage = "";
          this.loadingImage = false;
        }
      } catch (ex) {
        console.log(ex);
        this.errorMessage = data.message[0];
      }
    }
  }
};
</script>
<style scoped>
.genderClass {
  text-transform: capitalize;
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
.mainRegister {
  width: 450px;
  height: 850px;
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
  padding: 30px 20px 40px 20px;
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
  opacity: 0.4;
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
