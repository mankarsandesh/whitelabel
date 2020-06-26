<template>
  <div class="wireForm">
    <v-row justify="center" class="sm-12">
      <v-row class="headline1">
        <h4 class="text-uppercase display-0">
          Withdrawal
        </h4>
      </v-row>
    </v-row>

    <!-- <p
      v-bind:class="{
        sucessMessage: sucessMessage,
        errorMessage: errorMessage
      }"
    >
      {{ this.errorMessage }} {{ this.sucessMessage }}
    </p> -->

    <v-row align="center" justify="center">
      <v-col cols="11">
        <v-expansion-panels rounded v-model="panel">
          <v-expansion-panel class="account">
            <v-expansion-panel-header class="font-weight-bold"
              ><span
                ><v-icon size="15"> fas fa-university </v-icon>&nbsp; Local Bank
                Transfer</span
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

              <span style="font-size:12px;"
                >Beneficiary Account Number/IBAN<span class="imp">*</span></span
              >
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
              <div class="mt-2">
                <v-btn
                  class="saveButton"
                  small
                  height="30"
                  max-width="120"
                  :disabled="!valid"
                >
                  Next Step &nbsp;<v-progress-circular
                    v-if="loadingImage"
                    indeterminate
                    color="#FFF"
                    size="20"
                  ></v-progress-circular>
                </v-btn>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-expansion-panels>
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
              <p
                v-bind:class="{
                  sucessMessage: sucessMessage,
                  errorMessage: errorMessage
                }"
              >
                {{ this.errorMessage }} {{ this.sucessMessage }}
              </p>

              <span style="font-size:12px;"
                >Beneficiary Account Number/IBAN<span class="imp">*</span>
              </span>
              <p>Coming Soon</p>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-expansion-panels>
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
              <p
                v-bind:class="{
                  sucessMessage: sucessMessage,
                  errorMessage: errorMessage
                }"
              >
                {{ this.errorMessage }} {{ this.sucessMessage }}
              </p>

              <span style="font-size:12px;"
                >Beneficiary Account Number/IBAN<span class="imp">*</span></span
              >
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
              <div class="mt-2">
                <v-btn
                  class="saveButton"
                  small
                  height="30"
                  max-width="120"
                  :disabled="!valid"
                >
                  Next Step &nbsp;<v-progress-circular
                    v-if="loadingImage"
                    indeterminate
                    color="#FFF"
                    size="20"
                  ></v-progress-circular>
                </v-btn>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import config from "../../../config/config.global";

export default {
  layout: "mobile",
  data() {
    return {
      panel: 0,
      loadingImage: false,
      errorMessage: "",
      sucessMessage: "",
      valid: false,
      wireForm: {
        account: "",
        withdrawAmount: "2000.80 USD",
        amount: "",
        note: ""
      }
    };
  }
};
</script>
<style scoped>
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
.wireForm {
  position: sticky;
  padding: 0px 20px 20px 20px;
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
.imp {
  color: #ff0167;
}
.saveButton {
  background: linear-gradient(50deg, #ff0167 0%, #ff0167 100%);
  border-radius: 50px;
  font-size: 13px;
  /* text-align: center; */
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
</style>
