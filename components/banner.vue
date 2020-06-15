<template>
  <v-layout v-model="model">
    <v-carousel
      cycle
      height="100vh"
      v-model="model"
      hide-delimiter-background
      hide-delimiters
    >
      <slide1 />
      <slide2 />
      <slide3 />
    </v-carousel>
  </v-layout>
</template>

<script>
import slide1 from "~/components/banner/slide1";
import slide2 from "~/components/banner/slide2";
import slide3 from "~/components/banner/slide3";
export default {
  components: {
    slide1,
    slide2,
    slide3
  },
  data() {
    return {
      model: 0
    };
  }
};
</script>
