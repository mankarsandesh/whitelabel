<template>
  <div class="wireForm header">
    <h4 class="headline">
      Deposit - Manual Topup
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
      <label
        >Beneficiary Account Number/IBAN<span class="required">*</span></label
      >
      <v-row>
        <v-col>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-select
              v-if="this.userBankList.length > 0"
              placeholder="Select Bank"
              class="inputClasswire"
              height="42"
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

            <div id="wireNextStep" v-if="lastStepWire">
              <label>Enter Amount <span class="required">*</span></label>
              <v-text-field
                type="number"
                height="42"
                width="130"
                light
                v-model="userAmount"
                outlined
                rounded
                dense
                required
                prefix="$"
                :rules="amountRule"
                placeholder="Please enter Amount"
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

              <label
                >Provider Bank Details <span class="required">*</span></label
              >
              <v-select
                placeholder="Select Bank"
                height="42"
                outlined
                rounded
                dense
                required
                autofocus
                v-model="providerBank"
                :items="providerBanks"
                item-text="ac_bank_name"
                item-value="bank_account_uuid"
                :rules="[v => !!v || 'Provider Bank is required']"
              ></v-select>

              <div id="myBank" v-if="this.providerBankList.length > 0">
                <v-flex
                  v-for="(data, index) in providerBankList"
                  :key="index"
                  class="listBank"
                >
                  <div class="bankName">
                    {{ data.ac_bank_name }}
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
                      <v-col class="text-right">{{ data.ac_number }}</v-col>
                    </v-row>
                    <v-row>
                      <v-col>IFSC Code</v-col>
                      <v-col class="text-right">{{ data.ac_ifsc_code }}</v-col>
                    </v-row>
                    <v-row>
                      <v-col bold>Bank Address</v-col>
                      <v-col class="text-right">{{
                        data.ac_bank_address
                      }}</v-col>
                    </v-row>
                  </div>
                </v-flex>
              </div>

              <v-btn rounded class="closeButtonMobile" @click="previousStep()">
                Previous Step
              </v-btn>

              <v-btn
                rounded
                class="saveButtonMobile"
                @click="wireTransfter"
                :disabled="!valid"
              >
                Finsh &nbsp;<v-progress-circular
                  v-if="loadingImage"
                  indeterminate
                  color="#FFF"
                  size="20"
                ></v-progress-circular>
              </v-btn>
            </div>
          </v-form>
        </v-col>
        <v-col v-if="firstStepWire">
          <v-btn
            fab
            width="42"
            height="42"
            color="white"
            class="addBank"           
            to="/mobile/payment/localTransferAddBank"
            v-if="this.userBankList.length > 0 && firstStepWire"
          >
            <v-icon size="20" color="#ff0167">
              fas fa-university
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
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
                    <v-icon
                      class="icon"
                      size="18"
                      @click="
                        openEditBankForm(
                          data.bank_account_uuid,
                          data.ac_bank_name,
                          data.ac_holder_name,
                          data.ac_ifsc_code,
                          data.ac_number,
                          data.ac_swift_code,
                          data.ac_bank_address,
                          data.country_id
                        )
                      "
                    >
                      fas fa-pencil
                    </v-icon>
                    <v-icon
                      class="icon"
                      size="18"
                      @click="deleteBankData(data.bank_account_uuid)"
                    >
                      fas fa-trash
                    </v-icon>
                  </span>
                </div>
                <div class="banInfo">
                  <v-row>
                    <v-col>Account Holder name </v-col>
                    <v-col class="text-right">{{ data.ac_holder_name }}</v-col>
                  </v-row>
                  <v-row>
                    <v-col>Account Number</v-col>
                    <v-col class="text-right">{{ data.ac_number }}</v-col>
                  </v-row>
                  <v-row>
                    <v-col>IFSC Code</v-col>
                    <v-col class="text-right">{{ data.ac_ifsc_code }}</v-col>
                  </v-row>
                  <v-row>
                    <v-col>Bank Address</v-col>
                    <v-col class="text-right">{{ data.ac_bank_address }}</v-col>
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
                <div class="noBank" @click="addBank()">
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
      firstStepWire: true,
      lastStepWire: false,
      bankDialog: false,
      // User Bank List Variable
      bank: "",
      banks: [],
      userBankList: "",
      // Provider bank variable
      providerBank: "",
      providerBanks: [],
      providerBankList: "",
      // Next Step
      userAccountDetails: "",
      accountName: "",
      userBalance: 5000,
      userNote: "",
      userAmount: "",
      // Amount Validation
      amountRule: [
        v => !!v || "Amount is required",
        v => v >= 10 || "Amount should be above $10",
        v => v <= 50000000 || "Amount should not be greater than $50000000"
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
    addBank() {
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
    wireTransfter() {
      if (this.bank && this.userAmount) {
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
        this.fetchProviderBankList();
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
          user_bank_account_uuid: this.accountName,
          provider_bank_account_uuid: this.providerBank,
          transaction_type: 2,
          amount: this.userAmount,
          note: this.userNote
        };
        var { data } = await axios.post(
          config.userTransactionRequest.url,
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
    },
    // User FETCH BANK lIST
    async fetchProviderBankList() {
      try {
        var reqBody = {
          user_uuid: this.GetUserData.uuid
        };
        var { data } = await axios.post(
          config.getProviderBankDetail.url,
          reqBody,
          {
            headers: config.header
          }
        );
        if (data.code == 200) {
          this.providerBankList = data.data;
          for (var i = 0; i < data.data.length; i++) {
            this.providerBanks.push(data.data[i]);
          }
          this.errorMessage = "";
        } else {
          this.loadingImage = false;
        }
      } catch (ex) {
        console.log(ex);
      }
    }
  }
};
</script>

<style scoped>
.header h4 {
  font-size: 16px !important;
}
label {
  font-size: 14px;
}
.label-text span {
  color: #000 !important;
}
.providerBank {
  max-width: 277px !important;
}
.wireForm .icon {
  color: #dddddd;
}
.wireForm h2 {
  text-transform: uppercase;
  color: #ff0167;
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
.listBank {
  margin: 10px 0px;
}
.inputClasswire {
  width: 100%;
  min-width: 280px;
  font-size: 13px;
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
.bankName {
  border: 1px solid #dddddd;
  padding: 0px 10px;
  font-weight: 600;
  font-size: 14px;
  height: 40px;
}
.banInfo {
  border: 1px solid #dddddd;
  padding: 5px 10px;
  font-size: 14px;
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

#providerBank::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}
#providerBank::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}
#providerBank::-webkit-scrollbar-thumb {
  background-color: #ff0167;
}
#providerBank {
  padding: 0px 10px;
  overflow-y: scroll;
  height: 300px;
  width: 277px;
  overflow-x: hidden;
  margin-bottom: 20px;
  overflow-y: auto;
}
</style>
