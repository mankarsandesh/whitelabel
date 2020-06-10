<template>
  <v-carousel-item src="/banner/banner-1.png">
    <v-sheet height="100%" tile>
      <v-row class="fill-height" align="center" justify="center">
        <v-card flat max-width="1000" class=" text-center">
          <v-card-title class="display-2 font-weight-bold">Get</v-card-title>
          <v-card-title class="flex display-4 font-weight-black color-pink"
            >$2000</v-card-title
          >
          <v-card-title class="display-3 .font-weight-medium"
            >Get a WELCOME 200% Bonus up to $2000</v-card-title
          >

          <v-card-title class="headline font-weight-light">
            Use bonus code :
            <v-chip outlined class="ma-2 ec-welcome white--text display-1">
              ecwelcome
            </v-chip></v-card-title
          >
          <v-card-actions class=" d-block">
            <v-row class="container-list-icon mb-4">
              <v-col cols="4" v-for="(item, index) in titleDetial" :key="index">
                <v-list-item two-line class="cover-icon px-0">
                  <v-list-item-avatar width="60">
                    <v-img :class="item.class" :src="item.src"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="  text-uppercase">{{
                      item.title
                    }}</v-list-item-title>
                    <v-list-item-subtitle class="text-uppercase">{{
                      item.desc
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
            <v-btn x-large rounded color="pink" class="px-8"
              >Join now
              <span class=" ml-3">
                <v-icon size="15"> fas fa-chevron-double-right</v-icon
                ><v-icon size="15" class=" opcity-1">
                  fas fa-chevron-double-right</v-icon
                >
              </span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-sheet>
  </v-carousel-item>
</template>

<script>
import json from "~/json/items";
export default {
  data() {
    return {
      titleDetial: json.slideItems
    };
  }
};
</script>

<style></style>
