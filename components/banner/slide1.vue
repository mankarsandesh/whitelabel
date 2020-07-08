<template>
  <v-carousel-item src="/banner/banner-1.jpg">
    <v-sheet height="100%" tile>
      <v-container
        style="
    display: contents;
"
      >
        <v-row class="fill-height" align="center" justify="center">
          <v-col cols="6" align="center">
            <v-card flat>
              <v-card-title
                class="display-2 font-weight-bold text-capitalize"
                >{{ $t("banner.get") }}</v-card-title
              >

              <v-card-title class="flex display-4 font-weight-black color-pink "
                >$2000</v-card-title
              >
              <v-card-title
                class="display-2 font-weight-medium text-capitalize"
                >{{ $t("banner.getDescription") }}</v-card-title
              >

              <v-card-title class="headliner font-weight-light">
                {{ $t("banner.useBonus") }} :
                <v-chip outlined class="ma-2 ec-welcome white--text display-1">
                  ecwelcome
                </v-chip></v-card-title
              >
              <v-card-actions class=" d-block">
                <v-row class="container-list-icon mb-4">
                  <v-col
                    cols="4"
                    v-for="(item, index) in titleDetial"
                    :key="index"
                  >
                    <v-list-item two-line class="cover-icon px-0">
                      <v-list-item-avatar width="60">
                        <v-img :class="item.class" :src="item.src"></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title class="  text-uppercase">{{
                          $t("banner." + item.title)
                        }}</v-list-item-title>
                        <v-list-item-subtitle class="text-uppercase">{{
                          $t("banner." + item.desc)
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
                <Button :title="$t('button.joinNow')" />
              </v-card-actions>
            </v-card>
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
  data() {
    return {
      name: "JOin",
      titleDetial: json.slideItems
    };
  }
};
</script>

<style></style>
