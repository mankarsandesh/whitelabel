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
            <v-card flat class="ml-20">
              <v-card-title class="display-2 font-weight-bold text-capitalize">{{
                $t("banner2.text1")
              }}</v-card-title>
              <v-card-title
                class="flex display-4 font-weight-black color-pink text-capitalize"
                >{{ $t("banner2.chooseGame") }}</v-card-title
              >
            </v-card>
            <v-row>
              <v-col class="mb-8" lg="3" xs="6" sm="6">
                <v-card dark flat class="banner-2" max-width="344">
                  <v-img
                    src="/banner/banner2/Business.png"
                    class=" align-center opcity-images"
                  >
                    <v-card-title
                      class=" text-uppercase justify-center text-center display-1 font-weight-bold"
                      >{{ $t("banner2.business") }}</v-card-title
                    >
                  </v-img>
                </v-card>
              </v-col>

              <v-col class="mb-8" lg="3" xs="6" sm="6">
                <v-card dark flat class="banner-2" max-width="344">
                  <v-img
                    src="/banner/banner2/Gaming.png"
                    class=" align-center opcity-images"
                  >
                    <v-card-title
                      class=" text-uppercase justify-center text-center display-1 font-weight-bold"
                      >{{ $t("banner2.gaming") }}</v-card-title
                    >
                  </v-img>
                </v-card>
              </v-col>

              <v-col class="mb-8" lg="3" xs="6" sm="6">
                <v-card dark flat class="banner-2" max-width="344">
                  <v-img
                    src="/banner/banner2/Casino.png"
                    class=" align-center opcity-images"
                  >
                    <v-card-title
                      class=" text-uppercase justify-center text-center display-1 font-weight-bold"
                      >{{ $t("banner2.casino") }}</v-card-title
                    >
                  </v-img>
                </v-card>
              </v-col>

              <v-col class="mb-8" lg="3" xs="6" sm="6">
                <v-card dark flat class="banner-2" max-width="344">
                  <v-img
                    src="/banner/banner2/Classic.png"
                    class=" align-center opcity-images"
                  >
                    <v-card-title
                      class=" text-uppercase justify-center text-center display-1 font-weight-bold"
                      >{{ $t("banner2.classic") }}</v-card-title
                    >
                  </v-img>
                </v-card>
              </v-col>

              <Button title="bet now" />
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
