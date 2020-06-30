<template>
  <div class="localForm">
    <v-row justify="center" class="sm-12">
      <v-row class="headline1">
        <h4 class="text-uppercase display-0 pl-4">
          Local Transfer
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

    <v-form class="mt-5" ref="form" v-model="valid" lazy-validation>
      <label>Account<span class="imp">*</span></label>
      <v-text-field
        class="inputClasswire"
        height="30"
        v-model="localForm.account"
        outlined
        rounded
        dense
        required
        autofocus
        placeholder="EC Game/WhiteLabel - 12346 USD 2000.80"
        :rules="[v => !!v || 'Bank Name is required']"
      ></v-text-field>
      <label
        >Withdrawable Amount
        <v-icon size="14">fa fa-question-circle</v-icon></label
      >
      <v-text-field
        class="inputClasswire"
        height="30"
        v-model="localForm.withdrawAmount"
        outlined
        rounded
        dense
        readonly
      ></v-text-field>
      <label>Amount<span class="imp">*</span></label>
      <v-text-field
        class="inputClasswire"
        height="30"
        v-model="localForm.amount"
        outlined
        rounded
        dense
        required
        placeholder="Please enter Amount"
        :rules="[v => !!v || 'Amount is required']"
      ></v-text-field>
      <label>Note</label>
      <v-text-field
        class="inputClasswire"
        height="30"
        v-model="localForm.note"
        outlined
        rounded
        dense
        placeholder="Please enter Note"
      ></v-text-field>

      <v-row justify="center">
        <v-col xs="9" sm="9">
          <v-btn class="closeButton" :disabled="!valid" height="30">
            PREVIOUS STEP
          </v-btn>
        </v-col>
        <v-col xs="3" sm="3">
          <v-btn class="saveButton " :disabled="!valid" height="30">
            NEXT STEP &nbsp;<v-progress-circular
              v-if="loadingImage"
              indeterminate
              color="#FFF"
              size="15"
            ></v-progress-circular>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import config from "../../../config/config.global";

export default {
  layout: "mobile",
  data() {
    return {
      loadingImage: false,
      //   errorMessage: "",
      //   sucessMessage: "",
      valid: false,
      localForm: {
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
.localForm {
  position: sticky;
  padding: 0px 20px 20px 20px;
  background-size: cover;
  width: 100%;
  height: auto;
  background-color: #ffffff;
  background-blend-mode: multiply;
}
.localForm .icon {
  color: #ff0167;
}
.localForm h2 {
  text-transform: uppercase;
  color: #ff0167;
  margin-bottom: 20px;
}
.localForm p {
  color: #000;
}
.localForm p span {
  color: #000;
  cursor: pointer;
  font-weight: 600;
}
.localForm .inputClasswire {
  width: 100%;
  font-size: 13px;
}
.localForm .inputClass {
  width: 100%;
  padding: 3px 10px;
  margin: 5px 0px;
}
.localForm label {
  color: #000;
  width: 100%;
  font-weight: 700;
  font-size: 13px;
}
.localForm .inputClass .input {
  border: 1px solid #d2d1d2;
  width: 100%;
  border-radius: 30px;
  padding: 10px 20px;
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
  color: #fff !important;
  text-transform: uppercase;
  max-width: 130px;
  cursor: pointer;
  position: inherit;
  z-index: 999;
  bottom: 10px;
  left: 0;
  right: 0;
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
</style>
