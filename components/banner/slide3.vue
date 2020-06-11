<template>
  <v-carousel-item src="/banner/banner-3.png">
    <v-sheet height="100%" tile>
      <v-container
        style="
    display: contents;
"
      >
        <v-row class="fill-height" align="center" justify="center">
          <v-col cols="8">
            <v-card flat class="ml-20">
              <v-card-title class="display-2 font-weight-bold"
                >Multiple Bet on</v-card-title
              >
              <v-card-title class="flex display-4 font-weight-black color-pink"
                >Stock & Digits</v-card-title
              >
            </v-card>

            <v-row class="my-8">
              <v-col cols="4" v-for="(item, index) in items" :key="index">
                <v-card max-width="344">
                  <v-img :src="item.src" class=" align-center">
                    <v-card-title
                      class=" text-uppercase justify-center text-center display-1 font-weight-bold"
                      >{{ item.title }}</v-card-title
                    >

                    <v-list-item-subtitle
                      class=" text-uppercase justify-center text-center "
                    >
                      <template v-for="(data, i) in item.itemsDesc">
                        <span :key="i">
                          {{ data }}
                          <span v-if="i + 1 < item.itemsDesc.length" :key="i"
                            >|</span
                          >
                        </span>
                      </template>
                    </v-list-item-subtitle>
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
            <v-btn x-large rounded color="pink" class="px-8 ml-4"
              >bet now
              <span class=" ml-3">
                <v-icon size="15"> fas fa-chevron-double-right</v-icon
                ><v-icon size="15" class=" opcity-1">
                  fas fa-chevron-double-right</v-icon
                >
              </span>
            </v-btn>
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
    items: json.mutiple_bet
  })
};
</script>

<style></style>
