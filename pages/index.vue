<template>
  <v-layout v-model="model">
    <v-carousel v-model="model" :height="850"  hide-delimiters> 
      <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src">
        <v-sheet height="100%" tile>
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-3 banner">
              <h5>Get</h5>
              <h1>$2000</h1>
              <h5>Get a WELCOME 200% Bonus up to $2000</h5>
              <p class="bonusCode">
                <span> Use bonus code:</span>
                <span> ecwelcome </span>
              </p>
              <div class="steps">
                <ul>
                  <li>Register Account Today</li>
                  <li>Register Account Today</li>
                  <li>Register Account Today</li>
                </ul>
              </div>

              <div>
                <span class="joinButton">
                  <span s> JOIN NOW</span>
                  <v-icon class="icon" size="35">
                    fas fa-angle-double-right
                  </v-icon>
                  <v-icon class="icon" size="35">
                    fas fa-angle-double-right
                  </v-icon>
                </span>
              </div>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </v-layout>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";

export default {
  data() {
    return {
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg"
        }
      ],
      colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
      model: 0
    };
  },
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
<style scoped>
.banner h5 {
  font-size: 25px;
}
.banner h1 {
  font-size: 65px;
  color: #ff0167 !important;
}
.bonusCode span:first-child {
  font-size: 18px;
}
.bonusCode span:last-child {
  font-size: 18px;
  border: 1px solid #dddddd;
  border-radius: 15px;
  padding: 4px 12px;
  background-color: #2c0c18;
}
.steps ul {
  float: left;
  padding: 0px;
}
.steps ul li {
  list-style: none;
  font-size: 15px;
  float: left;
  padding: 0px 8px;
  text-transform: uppercase;
}
.joinButton {
  background: linear-gradient(50deg, #ff0167 0%, #ff0167 100%);
  border-radius: 50px;
  font-size: 30px;
  padding: 10px 40px;
  font-weight: 800;
}

.joinButton .icon {
  margin-top: -5px;
}
.joinButton .icon:last-child {
  opacity: 0.4;
  margin-left: -10px;
}
</style>
