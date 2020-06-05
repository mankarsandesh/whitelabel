<template>
  <v-layout column justify-center align-center>
    <div>
      <v-btn color="danger" @click="error()">Throw error</v-btn>
    </div>
  </v-layout>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  methods: {
    error() {
      throw new Error();
    }
  },
  mounted() {
    // alert(process.env.NODE_ENV)
  }
};
</script>
