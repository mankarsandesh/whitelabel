<template>
  <section>
    <v-container class="py-0">
      <v-row justify="center" align="center">
        <v-col cols="10" class="py-0">
          <v-tabs background-color="transparent" dark color="#ff0167" left>
            <v-tab
              class="profile-item-link"
              v-for="(item, index) in TabsProfiles"
              :key="index"
              :to="item.path"
              >  {{   $t('menu.'+item.title)  }}</v-tab
            >
          </v-tabs>
        </v-col>
      </v-row>
    </v-container>

    <section class="profile-content">
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="10">
            <nuxt-child />
          </v-col>
        </v-row>
      </v-container>
    </section>
  </section>
</template>

<script>
import json from "~/json/items";
export default {
  data() {
    return {
      TabsProfiles: json.TabsProfiles,
      userUUID: this.$cookies.get("userUUID")
    };
  }
};
</script>

<style></style>
