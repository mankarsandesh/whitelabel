<template>
  <v-dialog v-model="dialog" max-width="400" style="background-color:#fff!important;">
    <v-card class="pa-3">
      <v-card-title class="headline">
        Choose language
      </v-card-title>
      <v-layout>
        <v-flex xs6 class="d-block card-flag" v-for="(item, index) in lang" :key="index">
          <country-flag :country="item.country" size="big" />
          <v-radio-group v-model="value" row>
            <v-radio :value="item.value" @click="changeLanguage(item.value)"></v-radio>
          </v-radio-group>
        </v-flex>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import countryFlag from "vue-country-flag";

export default {
  components: {
    countryFlag
  },
  data() {
    return {
      dialog: false,
      lang: [
        {
          country: "cn",
          value: "cn"
        },
        {
          country: "us",
          value: "us"
        },
        {
          country: "th",
          value: "th"
        },
        {
          country: "la",
          value: "la"
        }
      ]
    };
  },
  created() {},
  computed: {
    ...mapGetters("login", ["getLocale"]),
    value() {
      return this.getLocale;
    }
  },
  methods: {
    ...mapActions("login", ["setLanguage"]),
    showDialog() {
      this.dialog = true;
    },
    changeLanguage(value) {
      this.setLanguage(value);
      this.dialog = false;
      this.$i18n.locale = this.getLocale;
    }
  }
};
</script>
<style scoped>
.headline {
    text-align: center;
    justify-content: center;
}
</style>
