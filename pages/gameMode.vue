<template>
  <v-container
    style="
    display: contents;
"
  >
    <v-row class="fill-height" align="center" justify="center">
      <v-col cols="8">
        <v-card flat class="ml-20" color=" transparent" dark>
          <v-card-title class="display-2 font-weight-bold"
            >Your mood or Game</v-card-title
          >
          <v-card-title class="flex display-4 font-weight-black color-pink"
            >Choose game</v-card-title
          >
        </v-card>
        <v-row>
          <v-col
            class="mb-8"
            lg="4"
            xs="6"
            sm="6"
            v-for="(item, index) in items"
            :key="index"
          >
            <v-card
              dark
              flat
              class="banner-2 justify-center text-center"
              max-width="344"
            >
              <v-img :src="item.src" class=" align-center opcity-images">
                <v-card-title
                  class=" text-uppercase justify-center text-center flex display-3 font-weight-black"
                  >{{ item.title }}</v-card-title
                >
                <Button :title="item.buttonName" :link="item.status" />
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Button from "~/components/Button";
import json from "~/json/items";
export default {
  components: {
    Button
  },
  data() {
    return {
      items: json.gameMode
    };
  }
};
</script>
