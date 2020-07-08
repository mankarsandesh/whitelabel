<template>
  <v-carousel-item src="/banner/banner-2.jpg">
    <v-sheet height="100%" tile>
      <v-container
        style="
    display: contents;
"
      >
        <v-row class="fill-height" align="center" justify="center">
          <v-col cols="8">
            <v-card flat class="ml-20">
              <v-card-title
                class="display-2 font-weight-bold text-capitalize"
                >{{ $t("banner2.text1") }}</v-card-title
              >
              <v-card-title
                class="flex display-4 font-weight-black color-pink text-capitalize"
                >{{ $t("banner2.chooseGame") }}</v-card-title
              >
            </v-card>
            <v-row>
              <v-col
                class="mb-8"
                lg="3"
                xs="6"
                sm="6"
                v-for="(item, index) in items"
                :key="index"
              >
                <v-card dark flat class="banner-2" max-width="344">
                  <v-img :src="item.src" class=" align-center opcity-images">
                    <v-card-title
                      class=" text-uppercase justify-center text-center display-1 font-weight-bold"
                    >
                      {{ $t("banner2." + item.title) }}
                    </v-card-title>
                  </v-img>
                </v-card>
              </v-col>

              <Button :title="$t('button.betNow')" />
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-carousel-item>
</template>

<script>
import Button from "~/components/Button";
import json from "~/json/items";
export default {
  components: {
    Button
  },
  data: () => ({
    items: json.banner2
  })
};
</script>

<style></style>
