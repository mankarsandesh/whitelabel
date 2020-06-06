<template>
  <v-app>
    <v-app-bar clipped-left fixed app>
      <div class="tnk-app-bar">
        <div class="tnk-app-bar-item">
          <v-btn large icon @click.stop="rightDrawer = !rightDrawer">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </div>
        <v-divider vertical></v-divider>
        <div class="tnk-app-bar-item">
          <v-img width="130" src="/logo/tnk-logo.png"></v-img>
        </div>
        <v-divider vertical></v-divider>
        <div class="tnk-app-bar-item tnk-app-bar-item-active white--text">
          <v-icon color="white" left>
            far fa-users
          </v-icon>
          <span class="text-uppercase">
            recommend friends
          </span>
        </div>
        <v-divider vertical></v-divider>
        <div class="tnk-app-bar-item">
          <!-- <font-awesome-icon icon="times" /> -->
          <v-icon left>fas fa-gamepad</v-icon>
          <span class="text-uppercase">
            free trial
          </span>
        </div>
        <v-divider vertical></v-divider>
        <v-spacer></v-spacer>

        <div class="tnk-app-bar-item-right">
          <div class="select-language-container">
            <v-select
              rounded
              hide-details
              :items="languages"
              v-model="selectedLanguage"
              placeholder="Language"
              outlined
              dense
            >
              <template v-slot:prepend-inner>
                <country-flag
                  class="pa-0"
                  :country="selectedLanguage"
                  size="normal"
                />
              </template>
            </v-select>
          </div>
        </div>
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
      </div>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
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
      rightDrawer: false
    };
  }
};
</script>
<style>
.select-language-container {
  max-width: 220px;
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
  background: linear-gradient(50deg, #416acc 0%, #7d58d1 100%);
  padding: 0 25px !important;
}
.button-register {
  background: linear-gradient(50deg, #14b283 0%, #1bb33f 100%);
  padding: 0 30px !important;
}
</style>
