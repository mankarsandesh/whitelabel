<template>
  <div class="wireForm">
    <v-row justify="center" class="sm-12">
      <v-row class="headline1">
        <h4 class="text-uppercase display-0 pl-4">
          Local bank transfer-Add card
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
      <label>Name<span class="imp">*</span></label>
      <v-text-field
        class="inputClasswire"
        height="30"
        v-model="wireForm.name"
        outlined
        rounded
        dense
        required
        autofocus
        placeholder="Please enter name"
        :rules="[v => !!v || 'Bank Name is required']"
      ></v-text-field>

      <label>Account Number<span class="imp">*</span></label>
      <v-text-field
        class="inputClasswire"
        height="30"
        v-model="wireForm.account"
        outlined
        rounded
        dense
        required
        autofocus
        placeholder="EC Game/WhiteLabel - 12346 USD 2000.80"
        :rules="[v => !!v || 'Account number is required']"
      ></v-text-field>

      <label>Bank<span class="imp">*</span></label>
      <v-select
        height="30"
        class="inputClassRegi"
        outlined
        rounded
        dense
        required
        v-model="wireForm.bank"
        :items="bank"
        item-text="name"
        item-value="id"
        placeholder="Please select bank"
        :rules="[v => !!v || 'Country is required']"
      ></v-select>

      <label>Area<span class="imp">*</span></label>
      <v-select
        height="30"
        class="inputClassRegi"
        outlined
        rounded
        dense
        required
        v-model="wireForm.area"
        :items="area"
        item-text="name"
        item-value="id"
        placeholder="Please select area"
        :rules="[v => !!v || 'Country is required']"
      ></v-select>

      <label>Branch<span class="imp">*</span></label>
      <v-text-field
        class="inputClasswire"
        height="30"
        v-model="wireForm.branch"
        outlined
        rounded
        dense
        required
        placeholder="Please enter branch"
        :rules="[v => !!v || 'Branch is required']"
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
      //   errorMessage: "",
      //   sucessMessage: "",
      valid: false,
      wireForm: {
        name: "",
        account: "",
        bank: "US Bank",
        area: "California",
        branch: ""
      },
      bank: [
        {
          id: 1,
          name: "China bank"
        },
        {
          id: 2,
          name: "Laos bank"
        },
        {
          id: 3,
          name: "Thailand bank"
        },
        {
          id: 4,
          name: "USA bank"
        }
      ],
      area: [
        {
          id: 1,
          name: "east"
        },
        {
          id: 2,
          name: "west"
        },
        {
          id: 3,
          name: "north"
        },
        {
          id: 4,
          name: "south"
        }
      ]
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
  color: #ff0167;
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
