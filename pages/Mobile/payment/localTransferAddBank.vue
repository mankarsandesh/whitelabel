<template>
  <div class="localForm header">
    <h4 class="headline">
      Local Transfer - ADD BANK
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

      <v-form ref="form" class="mt-5" v-model="valid" lazy-validation>
        <label>Bank Name<span class="imp">*</span></label>
        <v-text-field
          class="inputClasswire"
          height="30"
          v-model="form.bankName"
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
          v-model="form.accountName"
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
          v-model="form.accountNumber"
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
          v-model="form.accountIFSC"
          outlined
          rounded
          dense
          required
          placeholder="Please enter IFSC Code"
          :rules="[v => !!v || 'IFSC Code is required']"
        ></v-text-field>
        <label>SWIFT Code</label>
        <v-text-field
          class="inputClasswire"
          height="30"
          v-model="form.accountSWIFT"
          outlined
          rounded
          dense
          placeholder="Please enter SWIFT Code"
        ></v-text-field>
        <label>Bank Address<span class="imp">*</span></label>
        <v-text-field
          class="inputClasswire"
          height="30"
          v-model="form.bankAddress"
          outlined
          rounded
          dense
          required
          placeholder="Please enter Bank Address"
          :rules="[v => !!v || 'Bank Address is required']"
        ></v-text-field>
        <label>Country<span class="imp">*</span></label>
        <v-select
          height="42"
          dense
          rounded
          outlined
          light
          v-model="form.country"
          :items="countrys"
          item-text="name"
          item-value="id"
          required
          :rules="[v => !!v || 'Country is required']"
        ></v-select>
        <v-row justify="center">
          <v-col >
            <v-btn
              rounded
              class="saveButtonMobile"
              @click="validate"
              :disabled="!valid"
            >
              Save &nbsp;
              <v-icon size="15">
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
          <v-col >
            <v-btn rounded class="closeButtonMobile" :disabled="!valid" >
              Cancel
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import config from "../../../config/config.global";
import axios from "axios";

export default {
  layout: "mobile",
  data() {
    return {
      loadingImage: false,
      errorMessage: "",
      sucessMessage: "",
      valid: false,
      form: {
        bankName: "",
        accountName: "",
        accountNumber: "",
        accountIFSC: "",
        accountSWIFT: ""
      },
      countrys: [
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
      ]
    };
  },
  computed: {
    ...mapGetters("login", ["GetUserData"])
  },

  methods: {
    AddBank() {
      window.location.href = "/mobile/payment/withdrawal";
    },
    // Validate Login Empty Filed
    validate() {
      this.$refs.form.validate();
      if (
        this.form.bankName &&
        this.form.accountName &&
        this.form.accountNumber &&
        this.form.accountIFSC &&
        this.form.bankAddress &&
        this.form.country
      ) {
        this.addBank();
      }
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
          country_id: this.form.country,
          account_bank_address: this.form.bankAddress,
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

        if (data.code == 200) {
          this.sucessMessage = data.message[0];
          this.errorMessage = "";
          this.form.bankName = "";
          this.form.accountName = "";
          this.form.accountNumber = "";
          this.form.accountIFSC = "";
          this.form.accountSWIFT = "";
          this.AddBank();
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
label {
  font-size: 14px;
}
.header h4 {
  font-size: 16px !important;
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

.saveButton .icon:last-child {
  opacity: 0.4;
  color: #fff;
}
input:focus {
  outline: none;
}

.headline1 {
  background-color: rgb(255, 16, 103);
  color: rgb(255, 255, 255);
  padding: 80px 0px 10px 10px;
}
</style>
