<template>
  <v-app id="page">
    <v-app-bar clipped-left fixed color=" transparent">
      <div class="tnk-logo">
        <v-img width="130" src="/logo/logo.png"></v-img>
      </div>
      <div class="tnk-app-bar">
        <v-toolbar-items class="hidden-xs-only text-s1 ">
          <v-btn text v-for="item in menu" :key="item.title" :to="item.to">
            <i :class="item.icon" />
            <span>&nbsp;{{ item.title }}</span>
          </v-btn>

          <div class="tnk-app-bar-item">
            <v-btn
              dark
              rounded
              class="button-login"
              @click="loginDialog = true"
              outlined
            >
              <v-icon left size="18">
                fas fa-user
              </v-icon>
              login
            </v-btn>
          </div>
          <div class="tnk-app-bar-item">
            <v-btn dark rounded class="button-register">
              <v-icon left size="22">
                fas fa-user-plus
              </v-icon>
              register
            </v-btn>
          </div>

          <div class="tnk-app-bar-item">
            <v-icon left size="22" class="languageChange">
              fas fa-globe
            </v-icon>
          </div>
        </v-toolbar-items>

        <div class="tnk-app-bar-item">
          <v-btn large icon @click.stop="rightDrawer = !rightDrawer">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </div>
      </div>
    </v-app-bar>

    <nuxt />

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
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      loginDialog: false,
      selectedLanguage: "us",
      languages: [
        { text: "English", value: "us" },
        { text: "Chinese", value: "cn" },
        { text: "Thai", value: "th" },
        { text: "Lao", value: "La" }
      ],

      rightDrawer: false,
      menu: [
        {
          icon: "far fa-chart-bar fa-2x",
          title: "Live Stock",
          to: "/livestock"
        },
        {
          icon: "fa fa-gamepad fa-2x",
          title: "Game Mode",
          to: "/gameMode"
        },
        {
          icon: "fa fa-gift fa-2x",
          title: "Promotions",
          to: "promotions"
        }
      ]
    };
  }
};
</script>
<style lang="scss">
@font-face {
  font-family: "Impact";
  src: url("/fonts/Impact.eot");
  src: url("/fonts/Impact.eot?#iefix") format("embedded-opentype"),
    url("/fonts/Impact.woff2") format("woff2"),
    url("/fonts/Impact.woff") format("woff"),
    url("/fonts/Impact.ttf") format("truetype"),
    url("/fonts/Impact.svg#Impact") format("svg");
  font-weight: normal;
  font-style: normal;
}
div.display-3 {
  // font-family: Impact;
}
.theme--dark.v-sheet {
  background-color: transparent !important;
}
#page {
  // font-family: Impact;
  background-image: url("/logo/banner-background.png");
  background-repeat: no-repeat, repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;

  .v-application--wrap {
    header.theme--dark.v-sheet {
      background-color: transparent !important;
    }
  }
}
.tnk-logo {
  position: relative;
  bottom: 4px;
}
.languageChange {
  cursor: pointer;
}
.v-toolbar__content {
  padding: 0;
}
.tnk-app-bar {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.tnk-app-bar-item {
  font-weight: 600;
  height: 100%;
  padding: 0 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: flex-end;
}
.tnk-app-bar-item-active {
  background: linear-gradient(50deg, #38aab8 0%, #38ab55 100%);
  color: #fff;
}
.button-login {
  color: #ff0167 !important;
  border: 1px solid #ff0167;
  padding: 15px 30px !important;
}
.button-register {
  background: linear-gradient(50deg, #ff0167 0%, #ff0167 100%);
  padding: 15px 30px !important;
}
</style>
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
