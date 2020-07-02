<template>
  <div>
    <h1>Topup</h1>
    <v-divider></v-divider>
    <v-row class="topupDiv">
      <v-col cols="8" class="py-0">
        <div class="userInfo">
          <label>Method</label>

          <v-tabs v-model="tab" color="#ff003b">
            <v-tab class="text-capitalize" href="#tab-1">
              <v-icon size="20">
                fas fa-university
              </v-icon>
              &nbsp;Manually Topup</v-tab
            >
            <v-tab class="text-capitalize" href="#tab-2">
              <v-icon size="20">
                fas fa-university
              </v-icon>
              &nbsp; Online Topup</v-tab
            >
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item :value="'tab-1'">
              <!-- Manyally Topup -->
              <manuallyTopup />
            </v-tab-item>
            <v-tab-item :value="'tab-2'">
              <div class="wrapperDiv">
                <!-- Online Topup -->
                <onlineTopup />
              </div>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import config from "../../config/config.global";
import addBank from "../../components/addBank";
import onlineTopup from "../../components/topup/onlineTopup";
import manuallyTopup from "../../components/topup/manuallyTopup";
import axios from "axios";
export default {
  data() {
    return {
      tab: 0
    };
  },
  components: {
    addBank,
    onlineTopup,
    manuallyTopup
  }
};
</script>
<style scoped>
h1 {
  margin: 10px 0px !important;
}
.topupDiv {
  padding: 20px 20px;
}
</style>
