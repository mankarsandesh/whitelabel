<template>
  <div>
    <v-btn class="justify-center text-center my-btn" @click="methodRuning"
      >{{ title }}
      <span class=" ml-3">
        <v-icon size="15"> fas fa-chevron-double-right</v-icon
        ><v-icon size="15" class=" opcity-1">
          fas fa-chevron-double-right</v-icon
        >
      </span>
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import config from "../config/config.global";
import userForms from "../components/userForms";
export default {
  data() {
    return {
    
    };
  },
  components: {
    config,
    userForms
  },
  props: ["title", "actions", "link"],
  computed: {
    ...mapGetters("login", ["GetUserData"])
  },
  methods: {
    async methodRuning() {
      try {
        if (this.GetUserData) {
          if (this.link == true) {
            window.location =
              config.mainServer.url +
              "?portalProviderUUID=" +
              config.portalProviderID.url +
              "&portalProviderUserID=" +
              this.GetUserData.username +
              "&balance=300";
          }
        } else {
         console.log("Please Login");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style></style>
