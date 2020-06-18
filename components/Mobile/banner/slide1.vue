<template>
  <v-carousel-item src="/banner/banner-1.png">
    <v-sheet height="100%" tile>
      <v-row class="fill-height" align="center" justify="center">
        <v-card
          flat
          max-width="1000"
          class="text-center mb-5"
          style="margin-top:60px;"
        >
          <v-card
            class="display-0 font-weight-bold justify-center mt-3 bonusLine"
            >Get</v-card
          >
          <v-row
            class="flex display-2 font-weight-black color-pink justify-center"
            >$2000
          </v-row>
          <v-card-title class="display-0 font-weight-bold bonusLine"
            >Get a WELCOME 200% Bonus up to $2000</v-card-title
          >
          <v-card class="font-weight-thin text-center text-center">
            Use bonus code :
          </v-card>
          <v-chip
            outlined
            pill
            solo
            color="#252747"
            class="ma-2 ec-welcome white--text display-1 "
          >
            ecwelcome
          </v-chip>
          <v-card-actions class="d-block">
            <v-card class="container-list-icon">
              <v-card v-for="(item, index) in titleDetail" :key="index">
                <v-list-item two-line class="cover-icon justify-center">
                  <v-list-item-avatar width="60">
                    <v-img
                      :class="item.class"
                      style="height: 45px;"
                      :src="item.src"
                    ></v-img>
                  </v-list-item-avatar>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-uppercase">
                      {{ item.title }} {{ item.desc }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-card>
            <v-btn x-large rounded color="pink" class="px-8 mb-5 btnShadow"
              >Bet now
              <span class=" ml-3">
                <v-icon size="15"> fas fa-chevron-double-right</v-icon
                ><v-icon size="15" class=" opacity-1">
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
      titleDetail: json.slideItems
    };
  }
};
</script>

<style>
.bonusLine {
  font-size: 18px !important;
  word-break: keep-all;
}
.btnShadow {
  box-shadow: 2px 11px 35px 13px #6e0221;
}
</style>
