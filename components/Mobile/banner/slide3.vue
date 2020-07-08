<template>
  <v-carousel-item src="/banner/banner-3.jpg">
    <v-sheet height="100%" tile>
      <v-container
        style="
    display: contents;
"
      >
        <v-row class="fill-height" align="center">
          <v-col cols="12" align="center">
            <v-card flat>
              <v-card-title
                class="display-0 font-weight-bold justify-center"
               
                >{{ $t("banner3.multipleBetOn") }}</v-card-title
              >
              <v-card-title
                flat
                class="display-2 font-weight-bold color-pink justify-center"
                style="white-space:nowrap;"
                >{{ $t("banner3.stockAndDigit") }}</v-card-title
              >
            </v-card>
            <v-row>
              <v-col
                lg="3"
                xs="6"
                sm="6"
                v-for="(item, index) in items"
                :key="index"
              >
                <v-card
                  dark
                  flat
                  class="stockImg"
                  max-width="270"
                  max-height="235"
                  style="border-width: 1px;"
                >
                  <v-img :src="item.src" class="align-center opcity-images">
                    <v-card class="text-center stockName font-weight-bold"
                      >{{ item.title }}
                    </v-card>
                    <p class="text-center stockDesc display-0">
                      {{ item.desc }}
                    </p>
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
            <v-btn x-large rounded color="pink" class="px-8 ml-4 mt-4 btnShadow"
              >{{ $t("button.betNow") }}
              <span class="ml-3">
                <v-icon size="15"> fas fa-chevron-double-right</v-icon
                ><v-icon size="15" class=" opacity-1">
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
    items: json.stockImg
  })
};
</script>

<style>
.stockName {
  color: #a59dbd !important;
  white-space: nowrap;
  font-size: 30px;
}
.stockDesc {
  font-size: 14px !important;
}
.btnShadow {
  box-shadow: 2px 11px 35px 13px #6e0221;
}
</style>
