<template>
  <div class="mainLogin">
    <div class="triangle-topleft"></div>
    <div class="loginForm">
      <v-icon class="closeButton" @click="closePopup()" right size="20">
        fas fa-times
      </v-icon>
      <h2>
        <v-icon class="icon" left size="20">
          fas fa-user
        </v-icon>
        Add bank
      </h2>
      <p
        v-bind:class="{
          sucessMessage: sucessMessage,
          errorMessage: errorMessage
        }"
      >
        {{ this.errorMessage }} {{ this.sucessMessage }}
      </p>

      <v-form ref="form" v-model="valid" lazy-validation>
        <label>Bank name </label>
        <v-text-field
          class="inputClassRegi"
          height="46"
          light
          v-model="form.bankName"
          outlined
          rounded
          dense
          required
          :rules="[v => !!v || 'Bank Name is required']"
        ></v-text-field>

        <label>Account Holder Name</label>
        <v-text-field
          class="inputClassRegi"
          height="46"
          light
          v-model="form.accountName"
          outlined
          rounded
          dense
          required
          :rules="[v => !!v || 'Account Holder Name is required']"
        ></v-text-field>

        <label>Account Number</label>
        <v-text-field
          class="inputClassRegi"
          height="46"
          light
          v-model="form.accountNumber"
          outlined
          rounded
          dense
          required
          :rules="[v => !!v || 'Account Number is required']"
        ></v-text-field>

        <label>Account IFSC Code</label>
        <v-text-field
          class="inputClassRegi"
          height="46"
          light
          v-model="form.accountIFSC"
          outlined
          rounded
          dense
          required
          :rules="[v => !!v || 'Account IFSC Code is required']"
        ></v-text-field>

        <label>Account Swift Code</label>
        <v-text-field
          class="inputClassRegi"
          height="46"
          light
          v-model="form.accountSWIFT"
          outlined
          rounded
          dense
          required
          :rules="[v => !!v || 'Account Swift Code is required']"
        ></v-text-field>

        <v-btn
          class="saveButton"
          @click="validate"
          :disabled="!valid"
          height="38"
        >
          Save &nbsp;
          <v-icon size="22">
            fas fa-angle-double-right
          </v-icon>
          <v-icon class="iconArrow" size="22">
            fas fa-angle-double-right
          </v-icon>
          &nbsp;<v-progress-circular
            v-if="loadingImage"
            indeterminate
            color="#FFF"
            size="22"
          ></v-progress-circular>
        </v-btn>
        <v-btn class="cancelButton" height="38">
          Cancel
        </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import axios from "axios";
import config from "../config/config.global";
export default {
  data() {
    return {
      form: [
        {
          bankName: "",
          accountName: "",
          accountNumber: "",
          accountIFSC: "",
          accountSWIFT: ""
        }
      ],
      loadingImage: false,
      showPassword: false,
      errorMessage: "",
      sucessMessage: "",
      valid: false
    };
  },
  computed: {
    ...mapGetters("login", ["GetUserData"])
  },
  methods: {
    ...mapMutations("login", ["SET_USER_UUID", "SET_USER_DATA"]),
    // Validate Login Empty Filed
    validate() {
      this.$refs.form.validate();
      if (
        this.form.bankName &&
        this.form.accountName &&
        this.form.accountNumber &&
        this.form.accountIFSC &&
        this.form.accountSWIFT
      ) {
        this.addBank();
      }
    },
    // Close Login Popup
    async closePopup() {
      this.$emit("bankClose");
    },
    // User Login Request to API
    async addBank() {
      this.loadingImage = true;
      try {
        var reqBody = {
          user_uuid: this.GetUserData.uuid,
          account_bank_name: this.form.bankName,
          account_holder_name: this.form.accountName,
          account_number: this.form.accountNumber,
          account_ifsc_code: this.form.accountIFSC,
          account_swift_code: this.form.accountSWIFT,
          account_type: 1,
          is_default: true
        };
        var { data } = await axios.post(
          config.registerBankDetail.url,
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
        console.log(ex);
      }
    }
  }
};
</script>
<style scoped>
.errorMessage {
  color: #f17272 !important;
}
.sucessMessage {
  color: green !important;
}
.errors {
  color: #f17272 !important;
}
.inputClass .radio {
  padding: 8px 15px;
  cursor: pointer;
}
input[type="radio"]:checked + label {
  color: #ff0066 !important;
}
.label-text span {
  color: #ff0066 !important;
}
.mainLogin {
  width: 450px;
  height: 700px;
  margin: 0 auto;
  position: relative;
}
.triangle-topleft {
  width: 0;
  height: 0;
  border-top: 250px solid #ff0066;
  border-right: 250px solid transparent;
}
.forgotPassword a {
  color: #ff0167;
  text-decoration: none;
}
.remberberme {
  color: #333 !important;
}
.loginForm {
  width: 100% !important;
  position: absolute;
  top: 15px;
  left: 15px;
  background-color: #fff;
  padding: 30px 20px 65px 20px;
}
.loginForm .icon {
  color: #ff0167;
}
.loginForm .iconArrow {
  color: #fff;
  margin-top: 0px;
  opacity: 0.4;
}
.loginForm h2 {
  text-transform: uppercase;
  color: #ff0167;
  margin-bottom: 20px;
}
.loginForm p {
  color: #c1c0c1;
}
.loginForm p span {
  color: #ff0167;
  cursor: pointer;
  font-weight: 600;
}
.loginForm .inputClassRegi {
  /* border:1px solid red; */
  width: 100%;
}
.loginForm .inputClass {
  width: 100%;
  padding: 3px 10px;
  margin: 5px 0px;
}
.loginForm label {
  color: #333;
  width: 100%;
  font-weight: 600;
}
.loginForm .inputClass .input {
  border: 1px solid #d2d1d2;
  width: 100%;
  border-radius: 30px;
  padding: 10px 20px;
  color: #333;
}

.footerLogin {
  position: absolute;
  text-align: center;
  margin: 0 auto;
  bottom: 0;
}
.loginButton {
  text-align: center;
  background: linear-gradient(50deg, #ff0167 0%, #ff0167 100%);
  border-radius: 50px;
  font-size: 27px;
  padding: 10px 40px;
  font-weight: 800;
  margin: 0 auto !important;
  width: 250px;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  position: absolute;
  z-index: 999;
  bottom: -20px;
  left: 0;
  right: 0;
}

input[type="radio"]:checked + label {
  color: #0b4db7;
}

label .label-text {
  color: #333;
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
.registerButton .icon {
  color: #fff;
  margin-top: 0px;
}
.registerButton .icon:last-child {
  opacity: 0.4;
  margin-left: -10px;
  color: #fff;
}

.loginButton .icon {
  color: #fff;
  opacity: 0.4;
  margin-top: 0px;
}

input:focus {
  outline: none;
}
.closeButton {
  top: -15px;
  right: -15px;
  position: absolute;
  background-color: #ff0167;
  color: #fff;
  border-radius: 50%;
  height: 35px;
  width: 35px;
}
</style>
