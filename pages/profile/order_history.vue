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
                <th class="text-left">#ORDER ID</th>
                <th class="text-center">ACCOUNT NAME</th>
                <th class="text-center">TYPE</th>
                <th class="text-center">METHOD</th>
                <th class="text-left">AMOUNT</th>
                <th class="text-center">SUBMIT TIME</th>
                <th class="text-center">STATUS</th>
              </tr>
            </thead>
            <tbody v-if="userOrderData.length > 0">
              <tr v-for="item in userOrderData" :key="item.name">
                <td><a href="#">{{ item.uuid }}</a></td>
                <td class="text-center">{{ item.type }}</td>
                <td class="text-center">{{ item.bank_account_id }}</td>
                <td class="text-center">Local Bank Transfer</td>
                <td class="text-left">${{ item.amount }}</td>
                <td class="text-center">{{ item.created_at }}</td>
                <td class="text-center">
                  <span class="orderPending" v-if="item.status == 1">
                    Pending
                  </span>
                  <span class="orderSuccess" v-if="item.status == 2">
                    Approved
                  </span>
                  <span class="orderCancel" v-if="item.status == 3">
                    Error
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
        console.log(reqBody);
        console.log(data);
        this.userOrderData = data.data;
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
