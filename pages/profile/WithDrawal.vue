<template>
  <div>
    <h1>Withdrawal</h1>
    <v-divider></v-divider>
    <v-row class="topupDiv">
      <v-col cols="8" class="py-0">
        <v-form ref="form" v-model="valid" lazy-validation>
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
              <v-tab-item :value="'tab-1'">
                <div class="wrapperDiv">
                  <label>Beneficiary Account Number/BAN</label>
                  <v-row>
                    <v-col>
                      <v-select
                        class="bankList"
                        rounded
                        outlined
                        light
                        v-model="bank"
                        :items="banks"
                        item-text="name"
                        item-value="id"
                        required
                        :rules="[v => !!v || 'Bank is required']"
                      ></v-select>

                      <div id="myBank">
                        <div class="bankName">
                          Sandesh Mankar
                          <span style="float:right;">
                            <v-icon class="icon" size="18">
                              fas fa-pencil
                            </v-icon>
                            <v-icon class="icon" size="18">
                              fas fa-trash
                            </v-icon>
                          </span>
                        </div>
                        <div class="banInfo">
                          <v-row>
                            <v-col>Bank Name</v-col>
                            <v-col class="text-right">HDFC Name</v-col>
                          </v-row>
                          <v-row>
                            <v-col>Bank Address</v-col>
                            <v-col class="text-right"
                              >Mumbai Ghatkopar West</v-col
                            >
                          </v-row>
                          <v-row>
                            <v-col>SWIFT</v-col>
                            <v-col class="text-right">GUGUD54524242</v-col>
                          </v-row>
                          <v-row>
                            <v-col>Beneficiary name</v-col>
                            <v-col class="text-right">Sandesh Mankar</v-col>
                          </v-row>
                        </div>
                      </div>
                    </v-col>
                    <v-col>
                      <div class="addBank" @click="bankDialog = true">
                        <v-icon size="20" color="#ff0167">
                          fas fa-university
                        </v-icon>
                        Add bank
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </v-tab-item>
              <v-tab-item :value="'tab-2'">
                <div class="wrapperDiv">
                  <label>Beneficiary Account Number/BAN</label>
                </div>
              </v-tab-item>
              <v-tab-item :value="'tab-3'">
                <div class="wrapperDiv">
                  <label>Beneficiary Account Number/BAN</label>
                </div>
              </v-tab-item>
            </v-tabs-items>
          </div>

          <v-btn
            class="saveButton"
            height="50"
            @click="validate"
            :disabled="!valid"
          >
            Next Step &nbsp;<v-progress-circular
              v-if="loadingImage"
              indeterminate
              color="#FFF"
              size="20"
            ></v-progress-circular>
          </v-btn>
        </v-form>
        <div class="wrapperDiv">
          <h4>
            <v-icon size="22" color="#fdc84f">
              fas fa-info-circle
            </v-icon>
            Wire TransferPrompt
          </h4>
          <p>
            if you would like to have some demo content on your WordPress
            website, there are basically three different ways to do so. First,
            you could just quickly create some (sample) posts,
          </p>
        </div>
      </v-col>
    </v-row>

    <!-- Add Bank Form -->
    <v-dialog
      content-class="addBankBox"
      v-model="bankDialog"
       max-width="550px"
    >
      <addBank @bankClose="closeBank" />
    </v-dialog>
    <!-- Ending Bank Form -->
  </div>
</template>
<script>
import config from "../../config/config.global";
import addBank from "../../components/addBank";
import axios from "axios";
export default {
  data() {
    return {
      bankDialog: false,
      tab: 0,
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
      bank: 45,
      banks: [
        {
          id: 45,
          name: "China"
        },
        {
          id: 122,
          name: "Laos"
        },
        {
          id: 220,
          name: "Thailand"
        },
        {
          id: 236,
          name: "USA"
        }
      ],
      amountRule: [
        v => !!v || "Amount should be Required",
        v => v >= 10 || "Amount should be above $10",
        v => v <= 50000000 || "Max should not be above $50000000"
      ]
    };
  },
  components: {
    addBank
  },
  methods: {
    closeBank() {
      this.bankDialog = false;
    },
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
.addBankBox{
  box-shadow: none !important;
  border:1px solid red;
}
.bankName {
  border: 1px solid #dddddd;
  padding: 5px 10px;
  font-weight: 600;
  font-size: 16px;
}
.icon {
  margin: 0px 5px;
  cursor: pointer;
}
.icon :hover {
  color: #ff0167 !important;
}
.banInfo {
  border: 1px solid #dddddd;
  padding: 5px 10px;
  font-size: 14px;
}
.addBank {
  cursor: pointer;
  border-radius: 50px;
  border: 1px solid #ff0167;
  color: #ff0167;
  width: 150px;
  text-align: center;
  padding: 6px 8px;
}
.wrapperDiv {
  padding: 30px 0px;
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
  padding: 20px 20px;
}
</style>
