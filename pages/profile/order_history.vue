<template>
  <div>
    <h1>Order History</h1>
    <v-divider></v-divider>
    <v-row class="topupDiv">
      <v-col cols="12" class="py-0">
        <v-simple-table fixed-header>
          <template v-slot:default>
            <thead>
              <tr class="tableHead">
                <th class="text-left">#{{ $t("orderHistory.orderID") }}</th>
                <th>{{ $t("orderHistory.accName") }}</th>
                <th class="text-center">{{ $t("orderHistory.type") }}</th>
                <th class="text-center">{{ $t("deposit.method") }}</th>
                <th class="text-left">{{ $t("deposit.amount") }}</th>
                <th class="text-center">{{ $t("deposit.note") }}</th>
                <th class="text-center">{{ $t("orderHistory.submitTime") }}</th>
                <th class="text-center">{{ $t("orderHistory.status") }}</th>
              </tr>
            </thead>
            <tbody v-if="userOrderData.length > 0">
              <tr v-for="item in userOrderData" :key="item.name">
                <td>
                  <a href="#">{{ item.bank_account_uuid }}</a>
                </td>
                <td>{{ item.ac_bank_name }}, {{ item.ac_holder_name }}</td>
                <td class="text-center">
                  <span v-if="item.type == 2"> Withdraw </span>
                  <span v-if="item.type == 3"> Top-up </span>
                </td>
                <td class="text-center">Local Bank Transfer</td>
                <td class="text-left">${{ item.amount }}</td>
                <td class="text-center">{{ item.note }}</td>
                <td class="text-center">{{ item.created_at }}</td>
                <td class="text-center">
                  <span class="orderPending" v-if="item.status == 1">
                    {{ $t("orderHistory.inProgress") }}
                  </span>
                  <span class="orderSuccess" v-if="item.status == 2">
                    {{ $t("orderHistory.done") }}
                  </span>
                  <span class="orderCancel" v-if="item.status == 3">
                    {{ $t("orderHistory.inProgress") }}
                  </span>
                </td>
              </tr>
            </tbody>
            <tbody v-if="userOrderData.length == 0">
              <tr>
                <td colspan="7" style="text-align:center;padding:150px 0px;">
                  <h2>{{ $t('orderHistory.noOrder') }}</h2>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import config from "../../config/config.global";
import axios from "axios";
export default {
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
        this.userOrderData = data.data.reverse();
      } catch (ex) {
        this.errorMessage = data.message[0];
      }
    }
  }
};
</script>
<style scoped>
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
.topupDiv {
  padding: 20px 0px;
}
</style>
