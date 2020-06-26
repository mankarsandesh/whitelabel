<template>
  <div>
    <h1>Topup</h1>
    <v-divider></v-divider>
    <v-row class="topupDiv">
      <v-col cols="6" class="py-0">
        <v-form ref="form" v-model="valid" lazy-validation>
          <div class="userInfo">
            <label>Amount</label>
            <v-text-field
              type="number"
              class="inputClassRegi"
              height="42"
              width="100"
              light
              v-model="amount"
              outlined
              rounded
              dense
              required
              prefix="$"
              :rules="amountRule"
            ></v-text-field>
          </div>
          <div>
            <label>Gender</label>
            <v-radio-group v-model="Topuptype" :mandatory="false" row>
              <v-radio
                class="listTopupType"
                height="42"
                color="#ff0167"
                light
                v-for="data in TopupTypeList"
                :key="data.id"
                :label="`${data.name}`"
                :value="data.value"
              ></v-radio>
            </v-radio-group>
          </div>
          <v-btn
            class="saveButton "
            height="50"
            @click="validate"
            :disabled="!valid"
          >
            Confirm &nbsp;<v-progress-circular
              v-if="loadingImage"
              indeterminate
              color="#FFF"
              size="20"
            ></v-progress-circular>
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import config from "../../config/config.global";
import axios from "axios";
export default {
  data() {
    return {
      valid: true,
      loadingImage: false,
      amount: "",
      Topuptype: "alipay_qrcode",
      TopupTypeList: [
        {
          id: 1,
          name: "Alipay scan code",
          value: "alipay_qrcode"
        },
        {
          id: 2,
          name: "Alipay transfer",
          value: "alipay_trans"
        },
        {
          id: 3,
          name: "WeChat scan code",
          value: "wxpay_qrcode"
        },
        {
          id: 4,
          name: "WeChat transfer",
          value: "wxpay_trans"
        }
      ],
      amountRule: [
        v => !!v || "Topup amount is required",
        v => v >= 10 || "Topup amount should be above $10",
        v =>
          v <= 50000000 || "Topup amount should not be greater than $50000000"
      ]
    };
  },
  methods: {
    // Validation Users Topup form
    validate() {
      this.$refs.form.validate();
      if (this.amount && this.Topuptype) {
        this.loadingImage = true;
        this.userTotpupBalance();
      }
    },
    // User Topuop Balance
    async userTotpupBalance() {
      try {
        var reqBody = {
          amount: this.amount,
          topuptype: this.Topuptype
        };
        var { data } = await axios.post(config.userToPupBalance.url, reqBody, {
          headers: config.header
        });
        if (data.code == 200) {
          this.sucessMessage = data.message[0];
          this.errorMessage = "";
        } else {
          this.errorMessage = data.message[0];
          this.loadingImage = false;
        }
      } catch (ex) {
        this.errorMessage = data.message[0];
      }
    }
  }
};
</script>
<style scoped>
.listTopupType {
  text-transform: capitalize;
}
.inputClassRegi {
  width: 250px;
}
h1 {
  margin: 10px 0px !important;
}
.topupDiv {
  padding: 20px 20px;
}
</style>
