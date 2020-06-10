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
      <v-form ref="form" v-model="valid" lazy-validation>
        <label>Username</label>
        <v-text-field
          class="inputClassRegi"
          height="48"
          light
          v-model="username"
          outlined
          rounded
          dense
          required
          :rules="[v => !!v || 'username is required']"
        ></v-text-field>
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
        <label>Confirm Password</label>
        <v-text-field
          class="inputClassRegi"
          height="48"
          light
          v-model="repeatPassword"
          outlined
          rounded
          dense
          required
          :rules="[v => !!v || 'Password is required']"
        ></v-text-field>

        <div class="inputClassRegi">
          <label>Gender</label>
          <v-radio-group v-model="gender" :mandatory="false" row>
            <v-radio
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
          <v-combobox
            class="inputClassRegi "
            light
            height="48"
            rounded
            outlined
            v-model="country"
            :items="countrys"
            label="Select Country"
            required
            :rules="[v => !!v || 'Country is required']"
          >
            <template slot="item" slot-scope="data">
              <v-icon class="icon"> fas fa-globe </v-icon>&nbsp;
              <span class="cb-item"> {{ data.item }}</span>
            </template>
          </v-combobox>
        </div>

        <div class="inputClassRegi float-left">
          <label class="remember">
            <input
              class="check"
              type="checkbox"
              v-model="agree"
              :rules="[v => !!v || 'You must agree to continue!']"
            />
            <span class="label-text"
              >Agree with <span>Terms & Conditions?</span>
            </span></label
          >
        </div>
        <v-btn
          class="registerButton "
          @click="validate"
          :disabled="!valid"
          height="50"
        >
          Register
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
export default {
  data() {
    return {
      valid: true,
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
      country: "China",
      gender: "Male",
      agree: "",
      genders: ["Male", "Female", "Other"],
      checkbox: false,
      countrys: ["China", "Laos", "Thailand"],
      loginDialog: false,
      registerDialog: false,
      selectedLanguage: "us",
      OpenDrawer: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    async closePopup() {
      this.$emit("registerClose");
    },
    validate() {
      this.$refs.form.validate();
    },
    async openLogin() {
      this.$emit("loginOpen");
    }
  }
};
</script>
<style scoped>
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
