<template>
  <div>
    <h1>Topup</h1>
    <v-divider></v-divider>
    <v-row class="topupDiv">
      <v-col cols="8" class="py-0">
        <div class="userInfo">
          <label>Method</label>

          <v-tabs v-model="tab" color="#ff003b">
            <v-tab class="text-capitalize" href="#tab-1">
              <v-icon size="20">
                fas fa-university
              </v-icon>
              &nbsp;Manually Topup</v-tab
            >
            <v-tab class="text-capitalize" href="#tab-2">
              <v-icon size="20">
                fas fa-university
              </v-icon>
              &nbsp; Online Topup</v-tab
            >
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item :value="'tab-1'">
              <div class="wrapperDiv">
                <p
                  v-bind:class="{
                    sucessMessage: sucessMessage,
                    errorMessage: errorMessage
                  }"
                >
                  {{ this.errorMessage }} {{ this.sucessMessage }}
                </p>
                <label>Beneficiary Account Number/BAN</label>
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
                    </v-form>
                  </v-col>
                  <v-col>
                    <div
                      class="addBank"
                      @click="openBankForm()"
                      v-if="this.userBankList.length > 0 && firstStepWire"
                    >
                      <v-icon size="20" color="#ff0167">
                        fas fa-university
                      </v-icon>
                      Add bank
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
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
                          <div class="noBank" @click="openBankForm()">
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
                  <v-col></v-col>
                </v-row>
              </div>
            </v-tab-item>
            <v-tab-item :value="'tab-2'">
              <div class="wrapperDiv">
                <v-form ref="form" v-model="validOnline" lazy-validation>
                  <div class="userInfo">
                    <label>Amount</label>
                    <v-text-field
                      type="number"
                      class="inputClassRegi"
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
                    @click="validateOnline"
                    :disabled="!validOnline"
                  >
                    Confirm &nbsp;<v-progress-circular
                      v-if="loadingImage"
                      indeterminate
                      color="#FFF"
                      size="20"
                    ></v-progress-circular>
                  </v-btn>
                </v-form>
              </div>
            </v-tab-item>
          </v-tabs-items>
        </div>

        <div class="wrapperDiv">
          <h4>
            <v-icon size="22" color="#fdc84f">
              fas fa-info-circle
            </v-icon>
            Wire TransferPrompt
          </h4>
          <p>
            Wire transfer, bank transfer or credit transfer, is a method of
            Electronic Funds Transfer from one person or entity to another.
          </p>
        </div>
      </v-col>
    </v-row>

    <!-- Add Bank Form -->
    <v-dialog content-class="addBankBox" v-model="bankDialog" max-width="550px">
      <addBank
        v-if="renderComponent"
        @bankClose="closeBank"
        :bankUUID="this.editUserUUID"
        :bankName="this.editUserBankName"
        :AccountName="this.editUserName"
        :IFSCCode="this.editUserIFSC"
        :ACNumber="this.editUserNumber"
        :SWIFTCode="this.editUserSwiftCode"
        :bankAddress="this.editBankAddress"
        :bankCountry="this.editBankCountry"
      />
    </v-dialog>
    <!-- Ending Bank Form -->
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import config from "../../config/config.global";
import addBank from "../../components/addBank";
import axios from "axios";
export default {
  data() {
    return {
      renderComponent: true,
      //Edit Bank Form
      editUserUUID: "",
      editUserBankName: "",
      editUserName: "",
      editUserIFSC: "",
      editUserNumber: "",
      editUserType: "",
      editUserSwiftCode: "",
      editBankAddress: "",
      editBankCountry: "",

      sucessMessage: "",
      errorMessage: "",
      firstStepWire: true,
      lastStepWire: false,
      bankDialog: false,
      tab: 0,
      valid: true,
      loadingImage: false,
      bank: "",
      banks: [],
      userBankList: "",

      // Next Step
      userAccountDetails: "",
      accountName: "",
      userNote: "",
      withdrawableAmount: "",
      // Amount Validation
      amountRule: [
        v => !!v || "Amount is required",
        v => v >= 10 || "Amount should be above $10",
        v => v <= 50000000 || "Amount should not be greater than $50000000"
      ],
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
  components: {
    addBank
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
    // Open Bank
    openEditBankForm(
      UUID,
      bankName,
      ACNAME,
      IFSCCode,
      ACNumber,
      SWIFTCode,
      bankAdress,
      bankCountry
    ) {
      this.editUserUUID = UUID;
      this.editUserBankName = bankName;
      this.editUserName = ACNAME;
      this.editUserIFSC = IFSCCode;
      this.editUserNumber = ACNumber;
      this.editUserSwiftCode = SWIFTCode;
      this.editBankAddress = bankAdress;
      this.editBankCountry = bankCountry;

      this.bankDialog = true;
      this.forceRerender();
    },
    // Open Bank
    openBankForm() {
      this.bankDialog = true;
      this.forceRerender();
      this.editUserUUID = "";
      this.editUserBankName = "";
      this.editUserName = "";
      this.editUserIFSC = "";
      this.editUserNumber = "";
      this.editUserSwiftCode = "";
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
      if (this.bank && this.userBalance && this.withdrawableAmount) {
        this.userwithdrawalRequest();
      } else {
        this.errorMessage = "Please Fill All fileds";
      }
    },
    // Validation Users Topup form
    validateOnline() {
      this.$refs.form.validateOnline();
      if (this.bank) {
        this.firstStepWire = false;
        this.lastStepWire = true;
        this.accountName = this.bank;
      }
    },
    // Validation Users Topup form
    validate() {
      if (this.bank) {
        this.firstStepWire = false;
        this.lastStepWire = true;
        this.accountName = this.bank;
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
    // User withdrawal Request
    async userwithdrawalRequest() {
      this.loadingImage = true;
      try {
        var reqBody = {
          user_uuid: this.GetUserData.uuid,
          bank_account_uuid: this.accountName,
          amount: this.withdrawableAmount,
          note: this.userNote
        };
        var { data } = await axios.post(
          config.userWithdrawalRequest.url,
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
          this.sucessMessage = "";
        }
        this.loadingImage = false;
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
    }
  }
};
</script>
<style scoped>
#wireNextStep {
  margin-top: 20px;
}
.wireNextFiled {
  padding: 0px 20px;
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
.v-text-field.v-text-field--solo .v-input__control {
  min-height: 10px;
}
.listBank {
  margin: 10px 0px;
}
.v-label {
  font-size: 10px;
}
.addBankBox {
  box-shadow: none !important;
  border: 1px solid red;
}
.noBank {
  height: 200px;
  padding-top: 50px;
  text-align: center;
}
.noBank .icon {
  text-align: center;
  color: #dddddd;
}
.noBank h3 {
  color: #dddddd !important;
}
.bankName {
  border: 1px solid #dddddd;
  padding: 5px 10px;
  font-weight: 600;
  font-size: 16px;
  height: 35px;
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
