<template>
  <v-app id="page">
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="false"
      clipped
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
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
      <v-btn class="mx-2" large icon>
        <v-icon> fas fa-globe</v-icon>
      </v-btn>
      <v-btn class="mx-2" large icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

     <v-dialog
      dark
      v-model="loginDialog"
      max-width="450"
      style=" border-radius:none !important;"
    >
      <div class="loginForm">
        <h2>
          <v-icon class="icon" left size="20">
            fas fa-user
          </v-icon>
          login
        </h2>
        <p>Doesn't have an account yet? <a href="">Register Now</a></p>
        <div class="inputClass">
          <label>Email/Username</label>
          <input type="text" placeholder="Email/Username" class="input" />
        </div>
        <div class="inputClass">
          <label>Password</label>
          <input type="password" placeholder="123145" class="input" />
        </div>
        <div class="inputClass ">
          <label>
            <input class="check" type="checkbox" />
            <span class="label-text">Remember Me </span></label
          >
          <label>
            <a href="#">Forgot Password?</a>
          </label>
        </div>
        <div class="footerLogin">
          <div class="loginButton">
            <span> Login</span>
            <v-icon class="icon" size="28">
              fas fa-angle-double-right
            </v-icon>
            <v-icon class="icon" size="28">
              fas fa-angle-double-right
            </v-icon>
          </div>
        </div>
      </div>
    </v-dialog>


    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>
<script>
import json from "~/json/items";
export default {
  data() {
    return {
        loginDialog: false,
      selectedLanguage: "us",
      rightDrawer: false,
      menu: json.menu
    };
  }
};
</script>
<style scoped>
.remberberme {
  color: #333 !important;
}
.loginForm {
  background-color: #fff;
  padding: 20px;
}
.loginForm .icon {
  color: #ff0167;
}
.loginForm h2 {
  color: #ff0167;
}
.loginForm p {
  color: #c1c0c1;
}
.loginForm p a {
  color: #ff0167;
  text-decoration: none;
}
.loginForm .inputClass {
  width: 100%;
  /* border:1px solid red; */
  padding: 5px 10px;
  margin:10px 0px;
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
  color: #d2d1d2;
}
.forgotPassword {
  float: left;
}
.footerLogin {
  text-align: center;
  margin: 0px auto;
}
.loginButton {
  background: linear-gradient(50deg, #ff0167 0%, #ff0167 100%);
  border-radius: 50px;
  font-size: 27px;
  padding: 10px 40px;
  font-weight: 800;
  width: 250px;
  margin: 0 auto;
  cursor: pointer;
}
.inputClass {
}

label .label-text {
  color: #333;
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
input:focus{
    outline: none;
}
</style>
