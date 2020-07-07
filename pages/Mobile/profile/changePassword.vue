<template>
  <div class="passwordForm header">
    <h4 class="headline">
      Change password
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
        <label>Old Password<span class="imp">*</span></label>
        <v-text-field
          class="inputClasswire"
          height="30"
          v-model="oldPassword"
          outlined
          rounded
          dense
          required
          autofocus
          type="password"
          :rules="[v => !!v || 'Old password is required']"
        ></v-text-field>
        <label>New Password<span class="imp">*</span></label>
        <v-text-field
          class="inputClasswire"
          height="30"
          v-model="newPassword"
          outlined
          rounded
          dense
          required
          type="password"
          :rules="[v => !!v || 'New password is required']"
        ></v-text-field>
        <label>Confirm password<span class="imp">*</span></label>
        <v-text-field
          class="inputClasswire"
          height="30"
          v-model="repeatNewPassword"
          outlined
          rounded
          dense
          required
          type="password"
          :rules="[v => !!v || 'Please re-enter new password']"
        ></v-text-field>

        <v-row justify="center">
          <v-col xs="3" sm="3">
            <v-btn
              rounded
              class="saveButtonMobile"
              @click="validate"
              :disabled="!valid"
            >
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
         
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import config from "../../../config/config.global";
import { mapGetters, mapActions, mapMutations } from "vuex";
import axios from "axios";
export default {
  layout: "mobile",
  data() {
    return {
      errorMessage: "",
      sucessMessage: "",
      valid: true,
      loadingImage: false,
      oldPassword: "",
      newPassword: "",
      repeatNewPassword: ""
    };
  },
  computed: {
    ...mapGetters("login", ["GetUserData"])
  },
  methods: {
    // Validation Password Change Form
    validate() {
      this.$refs.form.validate();
      if (this.oldPassword && this.newPassword && this.repeatNewPassword) {
        if (this.newPassword == this.repeatNewPassword) {
          this.loadingImage = true;
          this.userChangePassword();
        } else {
          this.errorMessage = "New Password Does't Match.";
        }
      }
    },
    // User Password Change
    async userChangePassword() {
      try {
        var reqBody = {
          username: this.GetUserData.username,
          old_password: this.oldPassword,
          new_password: this.newPassword,
          confirm_new_password: this.repeatNewPassword
        };
        var { data } = await axios.post(
          config.userChangePassword.url,
          reqBody,
          {
            headers: config.header
          }
        );
        if (data.code == 200) {
          this.sucessMessage = data.message[0];
          this.errorMessage = "";
          this.oldPassword = "";
          this.newPassword = "";
          this.repeatNewPassword = "";
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
.passwordForm h2 {
  text-transform: uppercase;
  color: #ff0167;
  margin-bottom: 20px;
}
.passwordForm p {
  color: #000;
}
.passwordForm p span {
  color: #000;
  cursor: pointer;
  font-weight: 600;
}
.passwordForm .inputClasswire {
  width: 100%;
  font-size: 13px;
}
.passwordForm .inputClass {
  width: 100%;
  padding: 3px 10px;
  margin: 5px 0px;
}
.passwordForm label {
  color: #000;
  width: 100%;
  font-weight: 700;
  font-size: 13px;
}
.passwordForm .inputClass .input {
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
