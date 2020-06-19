<template>
  <v-layout>
    <v-flex class="profileForm mt-5">
      <v-row justify="center">
        <v-col cols="6">
          <v-card class="mx-auto text-center" flat>
            <v-row align="end" class="fill-height">
              <v-col align-self="start" cols="12">
                <v-badge
                  color="pink"
                  avatar
                  bordered
                  overlap
                  bottom
                  offset-x="23"
                  offset-y="23"
                >
                  <template v-slot:badge>
                    <v-avatar width="80">
                      <v-icon>fas fa-pen</v-icon>
                    </v-avatar>
                  </template>
                  <v-avatar class="profile" color="grey" size="80">
                    <v-img :src="this.defaultImage"></v-img>
                  </v-avatar>
                </v-badge>
                <v-list-item color="rgba(0, 0, 0, .4)" light>
                  <v-list-item-content>
                    <v-list-item-title class="display-0">
                      Ritesh Naik
                    </v-list-item-title>
                    <v-list-item-subtitle class="display-0"
                      >Vientiane,Laos
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="6" class="mt-5">
          <v-card
            height="60"
            align="center"
            justify="center"
            class="mt-2 account"
            style="font-size: 18px;"
            light
            rounded="true"
          >
            <span class="font-weight-light" align="center" justify="center"
              >Account Balance</span
            >
            <span class="display-0 balance font-weight-black">$2500.00</span>
          </v-card>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="11">
          <v-expansion-panels rounded v-model="panel">
            <v-expansion-panel class="account">
              <v-expansion-panel-header class="balance font-weight-bold"
                >Personal Information
                <template v-slot:actions>
                  <v-icon color="#e91e63">$expand</v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p class="errorMessage" v-if="this.errorMessage">
                  {{ this.errorMessage }}
                </p>

                <p class="sucessMessage" v-if="this.sucessMessage">
                  {{ this.sucessMessage }}
                </p>

                <v-form ref="form" v-model="valid" lazy-validation>
                  <label class="labelFont">Username</label>
                  <v-text-field
                    class="inputClass"
                    height="30"
                    v-model="username"
                    outlined
                    rounded
                    readonly
                    dense
                  ></v-text-field>
                  <label class="labelFont"
                    >Email<span class="balance">*</span></label
                  >
                  <v-text-field
                    class="inputClass"
                    height="30"
                    v-model="email"
                    outlined
                    rounded
                    dense
                    required
                    :rules="emailRules"
                    v-slot:activator="{ on }"
                    ><v-tooltip slot="append" bottom>
                      <v-icon v-on="on" color="#e91e63" dark size="18"
                        >fa fa-pencil</v-icon
                      >
                      <span>Tooltip</span>
                    </v-tooltip></v-text-field
                  >
                  <label class="labelFont"
                    >Password<span class="balance">*</span></label
                  >
                  <v-text-field
                    class="inputClass"
                    height="30"
                    type="password"
                    outlined
                    rounded
                    dense
                    required
                    :rules="[v => !!v || 'Password is required']"
                    v-slot:ativator="{ on }"
                    ><v-tooltip slot="append" bottom>
                      <v-icon v-on="on" color="#e91e63" dark size="18"
                        >fa fa-pencil</v-icon
                      >
                      <span>Tooltip</span>
                    </v-tooltip></v-text-field
                  >
                  <label class="labelFont"
                    >Phone<span class="balance">*</span></label
                  >
                  <v-text-field
                    class="inputClass"
                    height="30"
                    v-model="phone"
                    outlined
                    rounded
                    dense
                    required
                    v-slot:activator ="{ on }"
                    ><v-tooltip slot="append" bottom>
                      <v-icon v-on="on" color="#e91e63" dark size="18"
                        >fa fa-pencil</v-icon
                      >
                      <span>Tooltip</span>
                    </v-tooltip></v-text-field
                  >
                  <label class="labelFont"
                    >Country<span class="balance">*</span></label
                  >
                  <v-select
                    height="30"
                    class="inputClass"
                    outlined
                    rounded
                    dense
                    required
                    v-model="country"
                    :items="countries"
                    item-text="name"
                    item-value="id"
                    :rules="[v => !!v || 'Country is required']"
                  ></v-select>
                </v-form>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-expansion-panels>
            <v-expansion-panel class="mt-5 account">
              <v-expansion-panel-header class="balance font-weight-bold">
                Address Information
                <template v-slot:actions>
                  <v-icon color="#e91e63">$expand</v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                Address
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
import Validate from "~/validation/profile";
import axios from "axios";
import config from "../../../config/config.global";

export default {
  layout: ctx => (ctx.isMobile ? "mobile" : "default"),
  data() {
    return {
      defaultImage: "../../default.jpg",
      panel: 0,
      errorMessage: "",
      sucessMessage: "",
      valid: false,
      username: "",
      email: "",
      phone: "",
      password: "",
      country: 45,
      countries: [
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
      selectedLanguage: "us",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  }
};
</script>

<style scoped>
.title {
  text-transform: capitalize;
}
.edit-active {
  background-color: #e91e63;
  color: #fff !important;
}
.balance {
  color: #e91e63;
}
.account {
  outline-width: 0px;
  outline-color: #e91e63;
  outline-style: solid;
  box-shadow: 0 0 0 1px #e91e63;
}
.edit-active .active {
  color: #fff;
}
.userInfo {
  padding-left: 10px;
}
.userInfo label {
  padding-bottom: 10px;
  font-weight: 600;
}
.userInfo p {
  color: #333 !important;
}
.genderClass {
  text-transform: capitalize;
}
.profileForm {
  padding: 60px 20px 405px 20px;
}
.profileForm .inputClass {
  width: 100%;
}
.labelFont {
  font-size: 13px !important;
}
</style>
