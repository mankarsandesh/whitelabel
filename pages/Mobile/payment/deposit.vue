<template>
  <div class="depositForm header">
    <h4 class="headline">
      {{ $t("menu.deposit") }} - {{ $t("deposit.onlineTopUp") }}
    </h4>
     <div class="wrapperDiv">
    <p
      v-bind:class="{
        sucessMessage: sucessMessage,
        errorMessage: errorMessage
      }"
    >
      {{ this.errorMessage }} {{ this.sucessMessage }}
    </p>

    <v-form ref="form" class="mt-5" v-model="valid" lazy-validation>
      <label>{{ $t("deposit.topUp") }} {{ $t("deposit.amount") }}<span class="imp">*</span></label>
      <v-text-field
        class="inputClasswire"
        height="30"
        v-model="amount"
        outlined
        rounded
        dense
        required
        autofocus
        prefix="$"
        :rules="amountRule"
      ></v-text-field>
      <div>
        <label>{{ $t("deposit.topUp") }} {{ $t("orderHistory.type") }} Type</label>
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

      <v-row justify="center">
        <v-col xs="3" sm="3">
          <v-btn class="saveButton" :disabled="!valid" height="35">
            {{ $t("deposit.confirm") }} &nbsp;<v-progress-circular
              v-if="loadingImage"
              indeterminate
              color="#FFF"
              size="15"
            ></v-progress-circular>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
     </div>
  </div>
</template>
<script>
import config from "../../../config/config.global";

export default {
  layout: "mobile",
  data() {
    return {
      loadingImage: false,
      errorMessage: "",
      sucessMessage: "",
      valid: false,
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
  }
};
</script>
<style scoped>
.header h4 {
  font-size: 16px !important;
}
.depositForm .icon {
  color: #ff0167;
}
.depositForm h2 {
  text-transform: uppercase;
  color: #ff0167;
  margin-bottom: 20px;
}
.depositForm p {
  color: #000;
}
.depositForm p span {
  color: #000;
  cursor: pointer;
  font-weight: 600;
}
.depositForm .inputClasswire {
  width: 100%;
  font-size: 13px;
}
.depositForm .inputClass {
  width: 100%;
  padding: 3px 10px;
  margin: 5px 0px;
}
.depositForm label {
  color: #000;
  width: 100%;
  font-weight: 700;
  font-size: 13px;
}
.depositForm .inputClass .input {
  border: 1px solid #d2d1d2;
  width: 100%;
  border-radius: 30px;
  padding: 10px 20px;
  color: #ffffff;
}
.imp {
  color: #ff0167;
}
.headline1 {
  background-color: rgb(255, 16, 103);
  color: rgb(255, 255, 255);
  padding: 80px 0px 10px 10px;
}
.saveButton {
  background: linear-gradient(50deg, #ff0167 0%, #ff0167 100%);
  border-radius: 50px;
  font-size: 15px;
  /* text-align: center; */
  font-weight: 800;
  margin: 0 auto !important;
  width: 180px;
  color: #fff !important;
  text-transform: uppercase;
  max-width: 130px;
  cursor: pointer;
  position: inherit;
  z-index: 999;
  bottom: 10px;
  left: 0;
  right: 0;
}
.saveButton .icon {
  color: #fff;
  margin-top: 0px;
}
.saveButton .icon:last-child {
  opacity: 0.4;
  margin-left: -10px;
  color: #fff;
}
</style>
