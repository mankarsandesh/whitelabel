<template>
  <div class="registerForm">
    <v-row justify="center">
      <v-icon class="closeButton" @click="closePopup()" right size="20">
        fas fa-times
      </v-icon>
      <h2>
        <v-icon class="icon" left size="20">
          fas fa-user-plus
        </v-icon>
        {{ $t("profile.register") }}
      </h2>
    </v-row>
    <v-row justify="center">
      <p>
        {{ $t("profile.haveAccount") }}
        <span class="terms" @click="openLogin()">{{ $t("profile.loginNow") }}</span>
      </p>
    </v-row>

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
        height="30"
        dark
        v-model="registerForm.username"
        outlined
        rounded
        dense
        required
        autofocus
        :rules="[v => !!v || 'Username is required']"
      ></v-text-field>
      <label>{{ $t("myAccount.email") }}<span class="imp">*</span></label>
      <v-text-field
        class="inputClassRegi"
        height="30"
        v-model="registerForm.email"
        outlined
        rounded
        dense
        required
        :rules="emailRules"
      ></v-text-field>
      <label>{{ $t("profile.password") }}<span class="imp">*</span></label>
      <v-text-field
        class="inputClassRegi"
        height="30"
        type="password"
        v-model="registerForm.password"
        outlined
        rounded
        dense
        required
        :rules="[v => !!v || 'Password is required']"
      ></v-text-field>
      <label>{{ $t("profile.confirmPassword") }}<span class="imp">*</span></label>
      <v-text-field
        class="inputClassRegi"
        height="30"
        type="password"
        v-model="registerForm.repeatPassword"
        outlined
        rounded
        dense
        required
        :rules="[v => !!v || 'Password is required']"
      ></v-text-field>

      <div>
        <label>{{ $t("myAccount.gender") }}</label>
        <v-radio-group v-model="registerForm.gender" :mandatory="false" row>
          <v-radio
            height="30"
            class="genderClass"
            color="#ff0167"
            v-for="data in genders"
            :key="data"
            :label="`${data}`"
            :value="data"
            required
          ></v-radio>
        </v-radio-group>
      </div>

      <div>
        <label>{{ $t("myAccount.country") }}<span class="imp">*</span></label>
        <v-select
          height="30"
          class="inputClassRegi"
          outlined
          rounded
          dense
          required
          v-model="registerForm.country"
          :items="countrys"
          item-text="name"
          item-value="id"
          :rules="[v => !!v || 'Country is required']"
        ></v-select>
      </div>

      <div class="float-left">
        <v-checkbox
          v-model="registerForm.agree"
          :rules="[v => !!v || 'You must agree to continue!']"
          :label="$t('profile.agree')"
          required
          dense
          color="#ff1067"
        ></v-checkbox>
      </div>
      <div class="col xs-12 sm-12 text-center" mt-5>
        <v-btn
          class="registerButton"
          @click="validate"
          :disabled="!valid"
          height="50"
        >
          {{ $t("profile.register")}}
          <v-icon class="icon" size="20">
            fas fa-chevron-double-right
          </v-icon>
          <v-icon class="icon" size="20">
            fas fa-chevron-double-right
          </v-icon>
          &nbsp;<v-progress-circular
            v-if="loadingImage"
            indeterminate
            color="#FFF"
            size="20"
          ></v-progress-circular>
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
import config from "../../../config/config.global";

export default {
  data() {
    return {
      loadingImage: false,
      errorMessage: "",
      sucessMessage: "",
      valid: false,
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
.terms {
  color: #ff0167 !important;
}
.genderClass {
  text-transform: capitalize;
  color: #ffffff !important;
}
.errorMessage {
  color: red !important;
}
.sucessMessage {
  color: green !important;
}
.inputClass .radio {
  padding: 8px 15px;
  cursor: pointer;
}
input[type="radio"]:checked + label {
  color: #ff0066 !important;
}
.label-text span {
  color: #ffffff !important;
}

.registerForm {
  position: sticky;
  background-image: url(/mobile/mobile-bg-1.jpg);
  padding: 50px 20px 0px 20px;
  background-size: cover;
  width: 100%;
  height: auto;
  background-color: rgba(4, 1, 17, 0.88);
  background-blend-mode: multiply;
}
.registerForm .icon {
  color: #ff0167;
}
.registerForm h2 {
  text-transform: uppercase;
  color: #ff0167;
  margin-bottom: 20px;
}
.registerForm p {
  color: #ffffff;
}
.registerForm p span {
  color: #ffffff;
  cursor: pointer;
  font-weight: 600;
}
.registerForm .inputClassRegi {
  /* border:1px solid red; */
  width: 100%;
}
.registerForm .inputClass {
  width: 100%;
  padding: 3px 10px;
  margin: 5px 0px;
}
.registerForm label {
  color: #ffffff;
  width: 100%;
  font-weight: 600;
}
.registerForm .inputClass .input {
  border: 1px solid #d2d1d2;
  width: 100%;
  border-radius: 30px;
  padding: 10px 20px;
  color: #ffffff;
}
.imp {
  color: #ff0167;
}
.registerButton {
  background: linear-gradient(50deg, #ff0167 0%, #ff0167 100%);
  border-radius: 50px;
  font-size: 18px;
  padding: 20px 0px;
  text-align: center;
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
  color: #0b4db7;
}
label .label-text {
  color: #ffffff;
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
