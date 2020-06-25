<template>
  <div>
    <h1>Change Password</h1>
    <v-divider></v-divider>
    <v-row class="topupDiv">
      <v-col cols="3" class="py-0">
        <v-form ref="form" v-model="valid" lazy-validation>
          <p
            v-bind:class="{
              sucessMessage: sucessMessage,
              errorMessage: errorMessage
            }"
          >
            {{ this.errorMessage }} {{ this.sucessMessage }}
          </p>
          <div class="userInfo">
            <label>Current Password <label class="required">*</label></label>
            <v-text-field
              light
              v-model="oldPassword"
              outlined
              rounded
              dense
              required
              :rules="[v => !!v || 'Old Password is required']"
            ></v-text-field>
          </div>
          <div class="userInfo">
            <label>New Password <label class="required">*</label></label>
            <v-text-field
              light
              v-model="newPassword"
              outlined
              rounded
              dense
              required
              :rules="[v => !!v || 'New Password is required']"
            ></v-text-field>
          </div>
          <div class="userInfo">
            <label
              >Confirm New Password <label class="required">*</label></label
            >
            <v-text-field
              light
              v-model="repeatNewPassword"
              outlined
              rounded
              dense
              required
              :rules="[v => !!v || 'Confirm New Password is required']"
            ></v-text-field>
          </div>

          <v-btn
            class="saveButton"
            height="45"
            @click="validate"
            :disabled="!valid"
          >
            Confirm &nbsp;<v-progress-circular
              v-if="loadingImage"
              indeterminate
              color="#FFF"
              size="18"
            ></v-progress-circular>
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import config from "../../config/config.global";
import axios from "axios";
export default {
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
    // Validation Users Topup form
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
    // User Topuop Balance
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
        console.log(data);
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
    }
  }
};
</script>
<style scoped>
.userInfo label {
  font-weight: 400;
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
  padding: 20px 0px;
}
</style>
