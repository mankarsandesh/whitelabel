<template>
  <div>
    <h1>Withdrawal</h1>
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
              &nbsp;Local Bank Transfer</v-tab
            >
            <v-tab class="text-capitalize" href="#tab-2">
              <v-icon size="20">
                fas fa-exchange
              </v-icon>
              &nbsp; Wire Transfer</v-tab
            >
            <v-tab class="text-capitalize" href="#tab-3">
              <v-icon size="20">
                fas fa-university
              </v-icon>
              &nbsp; CryptoCurrency</v-tab
            >
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item :value="'tab-1'"> <localBankTransfer/> </v-tab-item>
            <v-tab-item :value="'tab-2'">
              <div class="wrapperDiv">
                <label>Coming Soon</label>
              </div>
            </v-tab-item>
            <v-tab-item :value="'tab-3'">
              <div class="wrapperDiv">
                <label>Coming Soon</label>
              </div>
            </v-tab-item>
          </v-tabs-items>
        </div>

        <div class="wrapperDiv">
          <h4>
            <v-icon size="22" color="#fdc84f">
              fas fa-info-circle
            </v-icon>
            Wire TransferPrompt
          </h4>
          <p>
            Wire transfer, bank transfer or credit transfer, is a method of
            Electronic Funds Transfer from one person or entity to another.
          </p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import localBankTransfer from "../../components/withdrawal/localBankTransfer";
export default {
  data() {
    return {
      tab: 0
    };
  },
  components: {
    localBankTransfer
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
.wrapperDiv {
  padding: 30px 0px;
}
</style>
