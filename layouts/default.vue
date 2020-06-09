<template>
  <v-app id="page">
    <v-navigation-drawer
      v-model="OpenDrawer"
      class="top-80"
      right
      clipped
      temporary
      fixed
      color="#e91e636e "
      dark
    >
      <v-list>
        <v-list-item v-for="(item, i) in slideMenu" :key="i" :to="item.path">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed height="80" color="white" class="navbar" dark>
      <v-toolbar-title>
        <v-btn to="/" text color="transparent ">
          <v-img width="130" src="/logo/logo.png"></v-img>
        </v-btn>
      </v-toolbar-title>
      <v-spacer />
      <template v-for="(item, index) in menu">
        <v-btn
          :text="item.text"
          :rounded="item.rounded"
          :outlined="item.outline"
          :color="item.color"
          :key="index"
          :to="item.to"
          class="mx-2"
        >
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </template>

      <v-btn
        :rounded="true"
        :outlined="true"
        color="pink"
        @click="loginDialog = true"
        class="mx-2"
      >
        <v-icon left>fas fa-user</v-icon>
        Login
      </v-btn>

      <v-btn
        :rounded="true"
        :outlined="false"
        color="pink"
        @click="registerDialog = true"
        class="mx-2"
      >
        <v-icon left>fas fa-user-plus</v-icon>
        Register
      </v-btn>

      <v-btn class="mx-2" large icon>
        <v-icon> fas fa-globe</v-icon>
      </v-btn>
      <v-btn class="mx-2" large icon @click.stop="OpenDrawer = !OpenDrawer">
        <v-icon> {{ OpenDrawer ? "fas fa-times" : "mdi-menu" }} </v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Register Form -->
    <v-dialog
      dark
      v-model="registerDialog"
      width="500"
      style=" border-radius:none !important;"
    >
      <div class="mainRegister">
        <div class="triangle-topleft"></div>
        <div class="loginForm">
          <v-icon
            class="closeButton"
            @click="registerDialog = false"
            right
            size="20"
          >
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
            <span @click="showLoginDialog()">Login now</span>
          </p>
          <div class="inputClass">
            <label>Username</label>
            <input
              type="text"
              placeholder="Username"
              class="input"
              v-model="username"
            />
          </div>
          <div class="inputClass">
            <label>Email</label>
            <input
              type="text"
              placeholder="Email"
              class="input"
              v-model="email"
            />
          </div>

          <div class="inputClass">
            <label>Password</label>
            <input
              type="password"
              placeholder="123145"
              class="input"
              v-model="password"
            />
          </div>

          <div class="inputClass">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="123145"
              class="input"
              v-model="repeatPassword"
            />
          </div>

          <div class="inputClass float-left">
            <div class="control">
              <!-- <label class="remember">
                <input type="radio" class="check" name="gender" checked />
                <span class="label-text"> Male</span></label
              >
              <label class="remember">
                <input type="radio" class="check" name="gender" />
                <span class="label-text"> Female</span></label
              >
              <label class="remember">
                <input type="radio" class="check" name="gender" />
                <span class="label-text"> Other</span></label
              > -->

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
          </div>

          <div class="inputClass float-left">
            <v-combobox
              class="rounded-card"
              light
              v-model="select"
              :items="items"
              label="Select Country"
            >
              <template slot="item" slot-scope="data">
                <v-icon class="icon"> fas fa-globe </v-icon>&nbsp;
                <span class="cb-item"> {{ data.item }}</span>
              </template>
            </v-combobox>
          </div>

          <div class="inputClass float-left">
            <label class="remember">
              <input class="check" type="checkbox" />
              <span class="label-text"
                >Agree with <span>Terms & Conditions?</span>
              </span></label
            >
          </div>
          <div class="registerButton">
            <span> Register</span>
            <v-icon class="icon" size="30">
              fas fa-angle-double-right
            </v-icon>
            <v-icon class="icon" size="30">
              fas fa-angle-double-right
            </v-icon>
          </div>
        </div>
      </div>
    </v-dialog>
    <!-- Ending Register Form -->

    <!-- Login Form -->
    <v-dialog
      dark
      v-model="loginDialog"
      width="450"
      style=" border-radius:none !important;"
    >
      <div class="mainLogin">
        <div class="triangle-topleft"></div>
        <div class="loginForm">
          <v-icon
            class="closeButton"
            @click="loginDialog = false"
            right
            size="20"
          >
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
            <span @click="showRegisterDialog()">Register Now</span>
          </p>
          <div class="inputClass">
            <label>Email/Username</label>
            <input type="text" placeholder="Email/Username" class="input" />
          </div>
          <div class="inputClass">
            <label>Password</label>
            <input type="password" placeholder="123145" class="input" />
          </div>

          <label class="remember">
            <input class="check" type="checkbox" />
            <span class="label-text">Remember Me </span></label
          >
          <label class="float-right forgotPassword">
            <a href="#">Forgot Password?</a>
          </label>

          <div class="loginButton">
            <span> Login</span>
            <v-icon class="icon" size="30">
              fas fa-angle-double-right
            </v-icon>
            <v-icon class="icon" size="30">
              fas fa-angle-double-right
            </v-icon>
          </div>
        </div>
      </div>
    </v-dialog>
    <!-- Ending Login Form -->

    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>
<script>
import json from "~/json/items";
import config from "../config/config.global";
export default {
  data() {
    return {
      genders: ['Male','Female','Other'],
      checkbox: false,
      select: "China",
      items: ["China", "Laos", "Thailand"],
      gender: "Male",
      loginDialog: false,
      registerDialog: false,
      selectedLanguage: "us",
      OpenDrawer: false,
      menu: json.menu,
      slideMenu: json.slideMenu
    };
  },
  methods: {
    showRegisterDialog() {
      this.loginDialog = false;
      this.registerDialog = true;
    },
    showLoginDialog() {
      this.registerDialog = false;
      this.loginDialog = true;
    },
    // User Login
    async userLogin() {
      try {
        var reqBody = {
          email: email,
          password: password
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
  width: 430px;
  height: 800px;
  margin: 0 auto;
  position: relative;
}
.mainLogin {
  width: 400px;
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
  padding: 30px 10px 65px 20px;
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
.loginForm .inputClass {
  width: 100%;
  padding: 3px 10px;
  margin: 5px 0px;
}
.loginForm .inputClass label {
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
  padding: 10px 0px;
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
