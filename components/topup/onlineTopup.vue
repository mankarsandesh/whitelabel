<template>
  <v-row>
    <v-col cols="12">
      <v-form ref="form" v-model="valid" lazy-validation>
        <div class="userInfo">
          <label>Amount</label>
          <v-text-field
            type="number"
            class="inputClass"
            height="42"
            width="100"
            light
            v-model="onlineAmount"
            outlined
            rounded
            dense
            required
            prefix="$"
            :rules="amountRule"
          ></v-text-field>
        </div>
        <div>
          <label>Select Payment Type</label>
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
          class="saveButton"
          small
          height="35"
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
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import config from "../../config/config.global";
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      loadingImage: false,
      // Online Topup Form
      validOnline: true,
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
      onlineAmount: ""
    };
  },
  methods: {
    // Validation Users Topup form
    validate() {
      this.$refs.form.validate();
      if (this.bank) {
        this.userTotpupBalance();
      }
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
};
</script>
<style>
.inputClass {
  width: 300px;
}
</style>
