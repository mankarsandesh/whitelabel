<template>
  <div class="wireForm header">
    <h4 class="headline">
      Withdrawal
    </h4>
    <div class="wrapperDiv">
      <v-row class="mt-1" align="center" justify="center">
        <v-col>
          <v-expansion-panels rounded v-model="panel">
            <v-expansion-panel class="account">
              <v-expansion-panel-header class="font-weight-bold"
                ><span
                  ><v-icon size="15"> fas fa-university </v-icon>&nbsp; Local
                  Bank Transfer</span
                >
                <template v-slot:actions>
                  <v-icon color="#e91e63">$expand</v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p
                  v-bind:class="{
                    sucessMessage: sucessMessage,
                    errorMessage: errorMessage
                  }"
                >
                  {{ this.errorMessage }} {{ this.sucessMessage }}
                </p>

                <span
                  >Beneficiary Account Number/IBAN<span class="imp"
                    >*</span
                  ></span
                >
                <div v-if="this.userBankList.length > 0">
                  <v-row>
                    <v-col>
                      <v-form ref="form" v-model="valid" lazy-validation>
                        <v-select
                          v-if="this.userBankList.length > 0 && firstStepWire"
                          placeholder="Select Bank"
                          class="inputClasswire"
                          height="30"
                          outlined
                          rounded
                          dense
                          required
                          autofocus
                          v-model="bank"
                          :items="banks"
                          item-text="ac_bank_name"
                          item-value="bank_account_uuid"
                          :rules="[v => !!v || 'Bank is required']"
                        ></v-select>
                      </v-form>
                    </v-col>
                    <v-col v-if="firstStepWire">
                      <v-btn
                        fab
                        width="42"
                        height="42"
                        color="white"
                        class="addBank"
                        @click="AddBank"
                        v-if="this.userBankList.length > 0 "
                      >
                        <v-icon size="18" color="#ff0167">
                          fas fa-university
                        </v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col
                      ><v-select
                        v-if="this.userBankList.length > 0 && lastStepWire"
                        placeholder="Select Bank"
                        class="inputClasswire"
                        height="30"
                        outlined
                        rounded
                        dense
                        required
                        autofocus
                        v-model="bank"
                        :items="banks"
                        item-text="ac_bank_name"
                        item-value="bank_account_uuid"
                        :rules="[v => !!v || 'Bank is required']"
                      ></v-select>

                      <div id="wireFirstStep" v-if="firstStepWire">
                        <div id="myBank" v-if="this.userBankList.length > 0">
                          <v-flex
                            v-for="(data, index) in userBankList"
                            :key="index"
                            class="listBank"
                          >
                            <div class="bankName">
                              {{ data.ac_bank_name }}
                              <span style="float:right;">
                                <v-icon class="icon" size="18">
                                  fas fa-pencil
                                </v-icon>
                                <v-icon
                                  class="icon"
                                  size="18"
                                  @click="
                                    deleteBankData(data.bank_account_uuid)
                                  "
                                >
                                  fas fa-trash
                                </v-icon>
                              </span>
                            </div>
                            <div class="banInfo">
                              <v-row>
                                <v-col>Account Holder name </v-col>
                                <v-col class="text-right">{{
                                  data.ac_holder_name
                                }}</v-col>
                              </v-row>
                              <v-row>
                                <v-col>Account Number</v-col>
                                <v-col class="text-right">{{
                                  data.ac_number
                                }}</v-col>
                              </v-row>
                              <v-row>
                                <v-col>IFSC Code</v-col>
                                <v-col class="text-right">{{
                                  data.ac_ifsc_code
                                }}</v-col>
                              </v-row>
                              <v-row>
                                <v-col>SWIFT Code</v-col>
                                <v-col class="text-right">{{
                                  data.ac_swift_code
                                }}</v-col>
                              </v-row>
                              <v-row>
                                <v-col>Bank Address</v-col>
                                <v-col class="text-right">{{
                                  data.ac_bank_address
                                }}</v-col>
                              </v-row>
                              <v-row>
                                <v-col>Country</v-col>
                                <v-col class="text-right">{{
                                  data.country_code
                                }}</v-col>
                              </v-row>
                            </div>
                          </v-flex>
                        </div>

                        <div id="myBank" v-if="this.userBankList.length == 0">
                          <div class="bankName">
                            <span style="float:right;">
                              <v-icon class="icon" size="18">
                                fas fa-id-card
                              </v-icon>
                            </span>
                          </div>
                          <div class="banInfo">
                            <div class="noBank">
                              <v-icon class="icon" size="100">
                                fa-plus-square
                              </v-icon>
                              <h3>Add Bank</h3>
                            </div>
                          </div>
                        </div>
                        <v-btn
                          v-if="this.userBankList.length > 0"
                          class="saveButton"
                          small
                          height="35"
                          @click="validate"
                          :disabled="!valid"
                        >
                          Next Step
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>

                  <div>
                    <v-row align="center" justify="center">
                      <div v-if="lastStepWire">
                        <label
                          >Your Balance
                          <v-icon size="18">
                            fas fa-info-circle
                          </v-icon>
                        </label>
                        <v-text-field
                          readonly=""
                          height="42"
                          width="130"
                          light
                          v-model="userBalance"
                          outlined
                          rounded
                          dense
                          required
                        ></v-text-field>

                        <label>Withdrawable Amount</label>
                        <v-text-field
                          type="number"
                          height="42"
                          width="130"
                          light
                          v-model="withdrawableAmount"
                          outlined
                          rounded
                          dense
                          required
                          prefix="$"
                          :rules="amountRule"
                          placeholder="Please enter Withdrawable Amount"
                        ></v-text-field>

                        <label>Note</label>
                        <v-text-field
                          height="42"
                          width="130"
                          light
                          v-model="userNote"
                          outlined
                          rounded
                          dense
                          required
                          placeholder="Please enter Note"
                        ></v-text-field>

                        <v-btn
                          class="cancelButton"
                          small
                          height="35"
                          @click="previousStep()"
                        >
                          Previous Step
                        </v-btn>

                        <v-btn
                          class="saveButton"
                          small
                          height="35"
                          @click="wireTransfter"
                        >
                          Finsh &nbsp;<v-progress-circular
                            v-if="loadingImage"
                            indeterminate
                            color="#FFF"
                            size="20"
                          ></v-progress-circular>
                        </v-btn>
                      </div>
                    </v-row>
                  </div>
                </div>
                <div v-else>
                  <div class="bankName">
                    <span style="float:right;">
                      <v-icon class="icon" size="18">
                        fas fa-id-card
                      </v-icon>
                    </span>
                  </div>
                  <div class="banInfo">
                    <div class="noBank" @click="AddBank()">
                      <v-icon class="icon" size="100">
                        fa-plus-square
                      </v-icon>
                      <h3>Add Bank</h3>
                    </div>
                  </div>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel class="mt-5 account">
              <v-expansion-panel-header class="balance font-weight-bold">
                <span
                  ><v-icon size="15"> fas fa-exchange </v-icon>&nbsp;Wire
                  Transfer</span
                >
                <template v-slot:actions>
                  <v-icon color="#e91e63">$expand</v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p>Coming Soon</p>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel class="mt-5 account">
              <v-expansion-panel-header class="balance font-weight-bold">
                <span
                  ><v-icon size="15"> fas fa-university </v-icon>&nbsp;Digital
                  Account</span
                >
                <template v-slot:actions>
                  <v-icon color="#e91e63">$expand</v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p>Coming Soon</p>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>

      <h4>
        <v-icon size="22" color="#fdc84f">
          fas fa-info-circle
        </v-icon>
        Wire Transfer Prompt
      </h4>
      <p>
        If you would like to have some demo content on your WordPress website,
        there are basically three different ways to do so. First, you could just
        quickly create some (sample) posts,
      </p>
    </div>
  </div>
</template>

<script>
import config from "../../../config/config.global";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  layout: "mobile",
  data() {
    return {
      renderComponent: true,
      panel: 0,

      loadingImage: false,
      errorMessage: "",
      sucessMessage: "",
      valid: false,
      userBankList: "",
      banks: [],
      bank: "",
      firstStepWire: true,
      lastStepWire: false,
      bankDialog: false,
      // Next Step
      userAccountDetails: "",
      accountName: "",
      userBalance: 5000,
      userNote: "",
      withdrawableAmount: "",
      // Amount Validation
      amountRule: [
        v => !!v || "Withdrawable amount is required",
        v => v >= 10 || "Withdrawable amount should be above $10",
        v =>
          v <= 50000000 ||
          "Withdrawable amount should not be greater than $50000000"
      ]
    };
  },

  mounted() {
    this.fetchUsersBankList();
  },
  computed: {
    ...mapGetters("login", ["GetUserData"])
  },
  methods: {
    // Forece Render
    forceRerender() {
      // Remove my-component from the DOM
      this.renderComponent = false;

      this.$nextTick(() => {
        // Add the component back in
        this.renderComponent = true;
      });
    },
    AddBank() {
      window.location.href = "/mobile/payment/localTransferAddBank";
    },

    // Close Bank Form
    closeBank() {
      this.bankDialog = false;
      this.fetchUsersBankList();
    },
    //previous Step
    previousStep() {
      this.firstStepWire = true;
      this.lastStepWire = false;
    },
    validateWireTransfer() {},
    wireTransfter() {
      if (this.bank && this.userBalance && this.withdrawableAmount) {
        this.userwithdrawalRequest();
      } else {
        this.errorMessage = "Please Fill All fileds";
      }
    },
    // Validation Users Topup form
    validate() {
      if (this.bank) {
        this.firstStepWire = false;
        this.lastStepWire = true;
        this.accountName = this.bank;
        this.userBalance = this.GetUserData.balance;
      }
    },
    // User Delete Bank Data
    async deleteBankData(bankUUID) {
      try {
        var reqBody = {
          user_uuid: this.GetUserData.uuid,
          bank_account_uuid: bankUUID
        };
        var { data } = await axios.post(
          config.deleteUserBankDetail.url,
          reqBody,
          {
            headers: config.header
          }
        );
        if (data.code == 200) {
          this.sucessMessage = data.message[0];
          this.errorMessage = "";
          this.fetchUsersBankList();
        } else {
          this.errorMessage = data.message[0];
          this.sucessMessage = "";
        }
      } catch (ex) {
        this.errorMessage = data.message[0];
      }
    },
    // User FETCH BANK lIST
    async fetchUsersBankList() {
      try {
        var reqBody = {
          user_uuid: this.GetUserData.uuid
        };
        console.log(reqBody);
        var { data } = await axios.post(
          config.getUserBankDetails.url,
          reqBody,
          {
            headers: config.header
          }
        );
        if (data.code == 200) {
          this.userBankList = data.data;
          for (var i = 0; i < data.data.length; i++) {
            this.banks.push(data.data[i]);
          }
          this.errorMessage = "";
        } else {
          this.loadingImage = false;
        }
      } catch (ex) {
        console.log(ex);
      }
    },
    // User withdrawal Request
    async userwithdrawalRequest() {
      this.loadingImage = true;
      try {
        var reqBody = {
          user_uuid: this.GetUserData.uuid,
          bank_account_uuid: this.accountName,
          amount: this.withdrawableAmount
        };
        var { data } = await axios.post(
          config.userWithdrawalRequest.url,
          reqBody,
          {
            headers: config.header
          }
        );
        if (data.code == 200) {
          this.sucessMessage = data.message[0];
          this.errorMessage = "";
        } else {
          this.errorMessage = data.message[0];
          this.sucessMessage = "";
        }
        this.loadingImage = false;
      } catch (ex) {
        this.errorMessage = data.message[0];
      }
    }
  }
};
</script>
<style scoped>
.inputClasswire {
  width: 100%;
  min-width: 280px;
  font-size: 13px;
}
.header h4 {
  font-size: 16px !important;
}
.account {
  outline-width: 0px;
  outline-color: #e91e63;
  outline-style: solid;
  box-shadow: 0 0 0 1px #e91e63;
}
.terms {
  color: #ff0167 !important;
}
.genderClass {
  text-transform: capitalize;
  color: #ffffff !important;
}
.errorMessage {
  color: red !important;
}
.sucessMessage {
  color: green !important;
}
.label-text span {
  color: #000 !important;
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
.wireForm .inputClass {
  width: 100%;
  padding: 3px 10px;
  margin: 5px 0px;
}
.wireForm .inputClass .input {
  border: 1px solid #d2d1d2;
  width: 100%;
  border-radius: 30px;
  padding: 20px 20px;
  color: #ffffff;
}
.imp {
  color: #ff0167;
}
.saveButton {
  background: linear-gradient(50deg, #ff0167 0%, #ff0167 100%);
  border-radius: 50px;
  font-size: 13px;
  font-weight: 400;
  margin: 0 auto !important;
  width: 170px;
  color: #ffffff !important;
  text-transform: uppercase;
  max-width: 130px;
  cursor: pointer;
  position: inherit;
  z-index: 999;
  bottom: 10px;
  left: 0;
  right: 0;
}
.theme--light.v-btn.v-btn--disabled {
  color: rgb(254, 251, 251) !important;
}
label .label-text {
  color: #ffffff;
}
label input.check:checked + .label-text,
.check {
  color: #ff0167;
  cursor: pointer;
}
label input.check:checked + .label-text,
.check {
  color: #ff0167;
  cursor: pointer;
}
.label-text {
  cursor: pointer;
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
input:focus {
  outline: none;
}
.closeButton {
  background-color: #ffffff;
  color: #000 !important;
  border-radius: 50px;
  font-size: 13px;
  max-width: 170px;
  text-align: center;
  font-weight: 400;
}

.headline1 {
  background-color: rgb(255, 16, 103);
  color: rgb(255, 255, 255);
  padding: 80px 0px 10px 10px;
}
.bankName {
  border: 1px solid #dddddd;
  padding: 5px 10px;
  font-weight: 600;
  font-size: 16px;
  height: 35px;
}
.banInfo {
  border: 1px solid #dddddd;
  padding: 5px 10px;
}
.icon {
  margin: 0px 5px;
  cursor: pointer;
  color: #757575 !important;
}
.icon :hover {
  color: #ff0167 !important;
}
.noBank {
  height: 200px;
  padding-top: 50px;
  text-align: center;
}
.noBank h3 {
  color: #dddddd !important;
}
.noBank .icon {
  text-align: center;
  color: #dddddd !important;
}

#myBank::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}
#myBank::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}
#myBank::-webkit-scrollbar-thumb {
  background-color: #ff0167;
}
#myBank {
  padding: 0px 10px;
  overflow-y: scroll;
  height: 300px;
  overflow-x: hidden;
  margin-bottom: 20px;
  overflow-y: auto;
}
</style>
