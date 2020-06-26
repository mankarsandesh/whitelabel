<template>
  <div class="localForm">
    <v-row justify="center" class="sm-12">
      <v-row class="headline1">
        <h4 class="text-uppercase display-0 pl-4">
          Local Transfer - ADD BANK
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

    <v-form ref="form" class="mt-5" v-model="valid" lazy-validation>
      <label>Bank Name<span class="imp">*</span></label>
      <v-text-field
        class="inputClasswire"
        height="30"
        v-model="localForm.bankName"
        outlined
        rounded
        dense
        required
        autofocus
        placeholder="Please enter Bank Name"
        :rules="[v => !!v || 'Bank Name is required']"
      ></v-text-field>
      <label>Account Holder Name<span class="imp">*</span></label>
      <v-text-field
        class="inputClasswire"
        height="30"
        v-model="localForm.accountHolderName"
        outlined
        rounded
        dense
        required
        placeholder="Please enter Account Holder Name"
        :rules="[v => !!v || 'Account holder name is required']"
      ></v-text-field>
      <label>Account Number<span class="imp">*</span></label>
      <v-text-field
        class="inputClasswire"
        height="30"
        v-model="localForm.accountNumber"
        outlined
        rounded
        dense
        required
        placeholder="Please enter Account Number"
        :rules="[v => !!v || 'Account Number is required']"
      ></v-text-field>
      <label>IFSC Code<span class="imp">*</span></label>
      <v-text-field
        class="inputClasswire"
        height="30"
        v-model="localForm.accountIFSC"
        outlined
        rounded
        dense
        required
        placeholder="Please enter IFSC Code"
        :rules="[v => !!v || 'IFSC Code is required']"
      ></v-text-field>
      <label>SWIFT Code<span class="imp">*</span></label>
      <v-text-field
        class="inputClasswire"
        height="30"
        type="password"
        v-model="localForm.accountSWIFT"
        outlined
        rounded
        dense
        required
        placeholder="Please enter SWIFT Code"
        :rules="[v => !!v || 'SWIFT Code is required']"
      ></v-text-field>
      <v-row justify="center">
        <v-col xs="3" sm="3">
          <v-btn class="saveButton " :disabled="!valid" height="30">
            Save
            <v-icon class="icon" size="15">
              fas fa-chevron-double-right
            </v-icon>
            <v-icon class="icon" size="15">
              fas fa-chevron-double-right
            </v-icon>
            &nbsp;<v-progress-circular
              v-if="loadingImage"
              indeterminate
              color="#FFF"
              size="15"
            ></v-progress-circular>
          </v-btn>
        </v-col>
        <v-col xs="9" sm="9">
          <v-btn class="closeButton" :disabled="!valid" height="30">
            Cancel
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
      // errorMessage: "",
      // sucessMessage: "",
      valid: false,
      localForm: {
        bankName: "",
        accountHolderName: "",
        accountNumber: "",
        accountIFSC: "",
        accountSWIFT: ""
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
  font-size: 15px;
  /* text-align: center; */
  font-weight: 800;
  margin: 0 auto !important;
  width: 180px;
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
  font-size: 18px;
  max-width: 130px;
  text-align: center;
}
.headline1 {
  background-color: rgb(255, 16, 103);
  color: rgb(255, 255, 255);
  padding: 80px 0px 10px 10px;
}
</style>
