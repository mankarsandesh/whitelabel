<template>
  <div class="wireForm  header">
    <h4 class="headline">
      {{ $t("menu.orderHistory") }}
    </h4>
    <v-row class="topupDiv">
      <v-col cols="12" class="py-0">
        <div v-if="userOrderData.length > 0">
          <v-list-item
            three-line
            v-for="item in userOrderData"
            :key="item.name"
          >
            <v-list-item-content style="border-bottom:1px solid #dddddd;">
              <v-list-item-title
                >{{ item.ac_bank_name }}, {{ item.ac_holder_name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <b>
                  <span v-if="item.type == 2"> {{ $t("menu.withdrawal")}} </span>
                  <span v-if="item.type == 3"> {{ $t("deposit.topUp") }} </span>
                  {{ $t("orderHistory.request") }} :</b
                >
                ${{ item.amount }} {{ $t("withdrawal.localBank") }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <span class="orderPendingMobile" v-if="item.status == 1">
                  {{ $t("orderHistory.inProgress") }}
                </span>
                <span class="orderSuccessMobile" v-if="item.status == 2">
                  {{ $t("orderHistory.done") }}
                </span>
                <span class="orderCancelMobile" v-if="item.status == 3">
                  {{ $t("orderHistory.cancel") }}
                </span>
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <b>#{{ $t("orderHistory.orderID") }} : </b> {{ item.bank_account_uuid }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                {{ item.created_at }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
        <div v-if="userOrderData.length == 0">
          <h2>{{ $t('orderHistory.noOrder') }}</h2>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import config from "../../../config/config.global";
import axios from "axios";
export default {
  layout: "mobile",
  data() {
    return {
      valid: true,
      loadingImage: false,
      userOrderData: []
    };
  },
  mounted() {
    this.userOrderHistory();
  },
  computed: {
    ...mapGetters("login", ["GetUserData"])
  },
  methods: {
    // User Topuop Balance
    async userOrderHistory() {
      try {
        var reqBody = {
          user_uuid: this.GetUserData.uuid,
          type: 1
        };
        var { data } = await axios.post(
          config.userTransactionHistory.url,
          reqBody,
          {
            headers: config.header
          }
        );
        this.userOrderData = data.data;
      } catch (ex) {
        this.errorMessage = data.message[0];
      }
    }
  }
};
</script>
<style scoped>
.header h4 {
  font-size: 16px !important;
}
.orderView {
  border-radius: 15px;
  background-color: #dddddd;
  color: #333;
}
.userInfo label {
  font-weight: 400;
}
.listTopupType {
  text-transform: capitalize;
}
.inputClassRegi {
  width: 250px;
}
h1 {
  margin: 10px 0px !important;
}
.wireForm .icon {
  color: #dddddd;
}
.wireForm h2 {
  text-transform: uppercase;
  color: #ff0167;
  margin-bottom: 20px;
}
.wireForm p {
  color: #000;
}
.wireForm p span {
  color: #000;
  cursor: pointer;
  font-weight: 600;
}
.wireForm .inputClasswire {
  width: 100%;
  font-size: 13px;
}
.wireForm .inputClass {
  width: 100%;
  padding: 3px 10px;
  margin: 5px 0px;
}
.wireForm label {
  color: #000;
  width: 100%;
  font-weight: 700;
  font-size: 13px;
}
.wireForm .inputClass .input {
  border: 1px solid #d2d1d2;
  width: 100%;
  border-radius: 30px;
  padding: 20px 20px;
  color: #ffffff;
}
.pendingOrder {
  background-color: #dbbb04;
  border-radius: 10px;
  padding: 1px 4px;
  color: #fff;
}
.successOrder {
  background-color: #04db04;
  border-radius: 15px;
  padding: 4px 8px;
  color: #fff;
}
.cancelOrder {
  background-color: #db041d;
  border-radius: 15px;
  padding: 4px 8px;
  color: #fff;
}
</style>
