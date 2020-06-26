<template>
  <div class="wireForm mt-5">
    <!-- <v-row justify="center" class="sm-12">
      <v-row class="headline1">
        <h4 class="text-uppercase display-0">
          Withdrawal
        </h4>
      </v-row>
    </v-row> -->
    <h2>Order History</h2>
    <v-divider></v-divider>
    <v-row class="topupDiv">
      <v-col cols="12" class="py-0">
        <v-simple-table fixed-header>
          <template v-slot:default>
            <thead>
              <tr class="tableHead">
                <th class="text-left">ORDER</th>
                <th class="text-center">TYPE</th>
                <th class="text-center">METHOD</th>
                <th class="text-center">AMOUNT</th>
                <th class="text-center">SUBMIT TIME</th>
                <th class="text-center">STATUS</th>
                <th class="text-center">Operation</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in desserts" :key="item.name">
                <td>{{ item.name }}</td>
                <td class="text-center">{{ item.calories }}</td>
                <td class="text-center">Wire Transfer</td>
                <td class="text-center">$2500.00</td>
                <td class="text-center">25-06-2020 10:06:16</td>
                <td class="text-center">
                  <span class="orderSuccess"> Done</span>
                </td>
                <td class="text-center">
                  <v-btn class="orderView" small>View Order</v-btn>
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
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159
        },
        {
          name: "Ice cream sandwich",
          calories: 237
        },
        {
          name: "Eclair",
          calories: 262
        },
        {
          name: "Cupcake",
          calories: 305
        },
        {
          name: "Gingerbread",
          calories: 356
        },
        {
          name: "Jelly bean",
          calories: 375
        },
        {
          name: "Lollipop",
          calories: 392
        },
        {
          name: "Honeycomb",
          calories: 408
        },
        {
          name: "Donut",
          calories: 452
        },
        {
          name: "KitKat",
          calories: 518
        }
      ]
    };
  },
  computed: {
    ...mapGetters("login", ["GetUserData"])
  },
  methods: {
    // User Topuop Balance
    async userChangePassword() {
      try {
        var reqBody = {
          username: this.GetUserData.username,
          old_password: this.oldPassword,
          new_password: this.newPassword,
          confirm_new_password: this.repeatNewPassword
        };
        var { data } = await axios.post(
          config.userChangePassword.url,
          reqBody,
          {
            headers: config.header
          }
        );
        console.log(data);
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
.wireForm {
  position: sticky;
  padding: 50px 20px 20px 20px;
  background-size: cover;
  width: 100%;
  height: auto;
  background-color: #ffffff;
  background-blend-mode: multiply;
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
</style>
