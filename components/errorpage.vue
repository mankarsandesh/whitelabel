<template>
  <div xs2>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-img
            src="\error\404-bg.png"
            class="mt-3 text-xs-center text-justify"
          >
            <b class="my-span">We can't seem to find the</b>
            <b class="my-span" style="bottom:230px;">
              page you are looking for.
            </b>

            <v-btn
              @click="window.location.href = 'http://www.w3schools.com'"
              style="text-align:center; margin-top:700px;"
              class="buttonGreen"
              >Back to home
            </v-btn>
          </v-img>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: "desktopModern",
  data() {
    return {
      linkto: ""
    };
  }
};
</script>

<style>
.my-span {
  position: absolute;
  bottom: 250px;
  font-size: 20px;
}
</style>
