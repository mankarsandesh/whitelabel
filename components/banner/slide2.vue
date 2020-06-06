<template>
  <v-carousel-item src="/banner/banner-2.png">
    <v-sheet height="100%" tile>
      <v-container
        style="
    display: contents;
"
      >
        <v-row class="fill-height" align="center" justify="center">
          <v-col cols="8">
            <v-card flat>
              <v-card-title class="display-2 font-weight-bold"
                >Your mood or Game</v-card-title
              >
              <v-card-title class="flex display-4 font-weight-black color-pink"
                >Choose game</v-card-title
              >
            </v-card>
            <v-row>
              <v-col cols="3" v-for="(item, index) in items" :key="index">
                <v-card dark flat class="banner-2" max-width="344">
                  <v-img :src="item.src" class=" align-center">
                    <v-card-title
                      class=" text-uppercase justify-center text-center display-1 font-weight-bold"
                      >{{ item.title }}</v-card-title
                    >
                  </v-img>
                </v-card>
              </v-col>
              <v-btn x-large rounded color="pink" class="px-8"
                >bet now
                <span class=" ml-3">
                  <v-icon size="15"> fas fa-chevron-double-right</v-icon
                  ><v-icon size="15" class=" opcity-1">
                    fas fa-chevron-double-right</v-icon
                  >
                </span>
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-carousel-item>
</template>

<script>
import json from "~/json/items";
export default {
  data: () => ({
    items: json.banner2
  })
};
</script>

<style></style>
