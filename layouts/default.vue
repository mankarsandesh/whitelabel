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
            <v-btn dark rounded class="button-login" outlined>
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
  </v-app>
</template>

<script>
export default {
  data() {
    return {
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
          to: "/modern/desktop/gamerule"
        },
        {
          icon: "fa fa-gamepad fa-2x",
          title: "Game Mode",
          to: "/modern/desktop/leaderboard"
        },
        {
          icon: "fa fa-gift fa-2x",
          title: "Promotions",
          to: "/modern/desktop/Promotions"
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
  font-family: Impact;
}
.theme--dark.v-sheet {
  background-color: transparent !important;
}
#page {
  font-family: Impact;
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
