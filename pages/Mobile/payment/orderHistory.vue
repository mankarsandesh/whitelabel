<template>
  <div class="wireForm  header">
    <h4 class="headline">
      Order History
    </h4>

    <v-divider></v-divider>
    <v-row class="topupDiv">
      <v-col cols="12" class="py-0">
        <v-simple-table fixed-header>
          <template v-slot:default>
            <thead>
              <tr class="tableHead">
                <th class="text-left">#ORDER ID</th>
                <th>ACCOUNT NAME</th>
                <th class="text-center">TYPE</th>
                <th class="text-center">METHOD</th>
                <th class="text-left">AMOUNT</th>
                <th class="text-center">SUBMIT TIME</th>
                <th class="text-center">STATUS</th>
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
                <td class="text-center">{{ item.created_at }}</td>
                <td class="text-center">
                  <span class="pendingOrder" v-if="item.status == 1">
                    pending
                  </span>
                  <span class="successOrder" v-if="item.status == 2">
                    Done
                  </span>
                  <span class="cancelOrder" v-if="item.status == 3">
                    Cancel
                  </span>
                </td>
              </tr>
            </tbody>
            <tbody v-if="userOrderData.length == 0">
              <tr>
                <td colspan="7" style="text-align:center;padding:150px 0px;">
                  <h2>There are no user Order History.</h2>
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
.topupDiv {
  padding: 20px 0px;
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
