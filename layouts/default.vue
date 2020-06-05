<template>
  <v-app>
    <v-app-bar clipped-left fixed app dark>
      <div class="tnk-app-bar">    
        <div class="tnk-app-bar-item" left>
          <v-img width="130" src="/logo/logo.png"></v-img>
        </div>

        <v-toolbar-items class="hidden-xs-only text-s1 " >
          <v-btn
            flat
            v-for="item in menu"
            :key="item.title"
            :to="item.to"
            class="menuItem"
          >
            <i :class="item.icon" />
            <span>&nbsp;{{ item.title }}</span>
          </v-btn>

          <div class="tnk-app-bar-item-right">
            <v-btn dark rounded class="button-login">
              <v-icon left size="18">
                fas fa-user
              </v-icon>
              login
            </v-btn>
          </div>
          <div class="tnk-app-bar-item-right">
            <v-btn dark rounded color="success" class="button-register">
              <v-icon left size="22">
                fas fa-user-plus
              </v-icon>
              register
            </v-btn>
          </div>

          <div class="tnk-app-bar-item-right">
            <v-icon left size="22" class="languageChange">
              fas fa-globe
            </v-icon>
          </div>
        </v-toolbar-items>

        <div class="tnk-app-bar-item" right> 
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
      languages: ["English", "Chinese", "Thai", "Lao"],
      rightDrawer: false,
      menu: [
        {
          icon: "fa fa-trophy fa-2x",
          title: "Live Stock",
          to: "/modern/desktop/gamerule"
        },
        {
          icon: "fa fa-trophy fa-2x",
          title: "Game Mode",
          to: "/modern/desktop/leaderboard"
        },
        {
          icon: "fa fa-trophy fa-2x",
          title: "Promotions",
          to: "/modern/desktop/Promotions"
        }
      ]
    };
  }
};
</script>
<style>
.languageChange{
  cursor: pointer;
}
.v-toolbar__content {
  padding: 0;
}
.tnk-app-bar {
  width: 100%;
  height: 100%;
  color: black;
  display: flex;
  align-items: center;
}
.tnk-app-bar-item {
  color: #7e847f;
  font-weight: 600;
  height: 100%;
  padding: 0 25px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.tnk-app-bar-item:first-child {
  padding: 0 10px;
}
.tnk-app-bar-item-active {
  background: linear-gradient(50deg, #38aab8 0%, #38ab55 100%);
  color: #fff;
}
.tnk-app-bar-item-right {
  height: 100%;
  padding: 0 10px;
  display: flex;
  align-items: center;
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
