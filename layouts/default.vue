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
      selectedLanguage: "us",
      rightDrawer: false,
      menu: json.menu
    };
  }
};
</script>
