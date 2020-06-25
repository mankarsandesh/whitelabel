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
                        v-if="this.userBankList.length > 0"
                        class="bankList"
                        rounded
                        outlined
                        light
                        v-model="bank"
                        :items="banks"
                        item-text="name"
                        item-value="id"
                        required
                        height="5"
                        :rules="[v => !!v || 'Bank is required']"
                      ></v-select>

                      <div id="myBank" v-if="this.userBankList.length > 0">
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

                      <div id="myBank" v-if="this.userBankList.length == 0">
                        <div class="bankName">
                          <span style="float:right;">
                            <v-icon class="icon" size="18">
                              fas fa-id-card
                            </v-icon>
                          </span>
                        </div>
                        <div class="banInfo">
                          <div class="noBank" @click="bankDialog = true">
                            <v-icon class="icon" size="100">
                              fa-plus-square
                            </v-icon>
                            <h3>Add Bank</h3>
                          </div>
                        </div>
                      </div>
                    </v-col>
                    <v-col>
                      <div
                        class="addBank"
                        @click="bankDialog = true"
                        v-if="this.userBankList.length > 0"
                      >
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
                  <label>Coming Soon</label>
                </div>
              </v-tab-item>
              <v-tab-item :value="'tab-3'">
                <div class="wrapperDiv">
                  <label>Coming Soon</label>
                </div>
              </v-tab-item>
            </v-tabs-items>
          </div>

          <v-btn
            class="saveButton"
            small
            height="35"
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
    <v-dialog content-class="addBankBox" v-model="bankDialog" max-width="550px">
      <addBank @bankClose="closeBank" />
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
      bankDialog: false,
      tab: 0,
      valid: true,
      loadingImage: false,
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
      userBankList: ""
    };
  },
  components: {
    addBank
  },
  mounted() {
    this.fetchUsersBankList();
    console.log(this.userBankList);
  },
  computed: {
    ...mapGetters("login", ["GetUserData"])
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
        console.log(reqBody);
        console.log(data);
        if (data.code == 200) {
          this.userBankList = data.data[0];
          this.errorMessage = "";
        } else {
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
.v-text-field.v-text-field--solo .v-input__control {
  min-height: 10px;
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
