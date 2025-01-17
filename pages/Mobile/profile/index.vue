<template>
  <v-layout>
    <v-flex class="profileForm ">
      <v-row justify="center" class="profileWrap">
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
                  <v-list-item-content class="title">
                    <v-list-item-title
                      class="display-0"
                      v-if="!GetUserData.first_name"
                    >
                      {{ GetUserData.username }}
                    </v-list-item-title>
                    <v-list-item-title
                      class="display-0"
                      v-if="GetUserData.first_name"
                    >
                      {{ GetUserData.first_name }} {{ GetUserData.last_name }}
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
            height="80"
            align="center"
            justify="center"
            class="mt-2 pt-3 account"
            style="font-size: 18px;"
            light
            rounded="true"
          >
            <span class="font-weight-light" align="center" justify="center"
              >{{ $t("profile.accountBalance") }}</span
            >
            <div class="display-0 balance font-weight-black">
              <animated-number
                :value="GetUserData.balance"
                :formatValue="formatToPrice"
                class="userBalance"
              />
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="11">
          <v-expansion-panels rounded v-model="panel">
            <v-expansion-panel class="account">
              <v-expansion-panel-header class="balance font-weight-bold"
                >{{ $t("myAccount.personalInfo") }}
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

                <v-form ref="form" v-model="valid" lazy-validation>
                  <label class="labelFont">{{ $t("myAccount.firstName") }}</label>
                  <v-text-field
                    class="inputClass"
                    height="30"
                    v-model="form.firstName"
                    outlined
                    rounded
                    dense
                  ></v-text-field>
                  <label class="labelFont">{{ $t("myAccount.lastName") }}</label>
                  <v-text-field
                    class="inputClass"
                    height="30"
                    v-model="form.lastName"
                    outlined
                    rounded
                    dense
                  ></v-text-field>
                  <label class="labelFont">{{ $t("myAccount.username") }}</label>
                  <v-text-field
                    class="inputClass"
                    height="30"
                    v-model="form.username"
                    outlined
                    rounded
                    dense
                  ></v-text-field>
                  <label class="labelFont"
                    >{{ $t("myAccount.email") }}<span class="balance">*</span></label
                  >
                  <v-text-field
                    class="inputClass"
                    height="30"
                    v-model="form.email"
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
                    >{{ $t("myAccount.country") }}<span class="balance">*</span></label
                  >
                  <v-select
                    height="30"
                    class="inputClass"
                    outlined
                    rounded
                    dense
                    required
                    v-model="form.country"
                    :items="form.countrys"
                    item-text="name"
                    item-value="id"
                    :rules="[v => !!v || 'Country is required']"
                  ></v-select>

                  <v-btn @click="updateProfile" class="loginButton" height="40">
                    {{ $t("deposit.save") }}&nbsp;
                    <v-icon class="icon" size="20">
                      fas fa-chevron-double-right
                    </v-icon>
                    <v-icon class="icon" size="20">
                      fas fa-chevron-double-right
                    </v-icon>
                    &nbsp;<v-progress-circular
                      v-if="loadingImage"
                      indeterminate
                      color="#FFF"
                      size="20"
                    ></v-progress-circular>
                  </v-btn>
                </v-form>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <v-btn @click="userLogout" class="loginButton" height="40">
            {{ $t("menu.logout") }} &nbsp;<v-progress-circular
              v-if="loadingImage"
              indeterminate
              color="#FFF"
              size="20"
            ></v-progress-circular>
          </v-btn>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import Validate from "~/validation/profile";
import axios from "axios";
import config from "../../../config/config.global";
import AnimatedNumber from "animated-number-vue";
import Cookies from "../../../plugins/js-cookie";
export default {
  layout: ctx => (ctx.isMobile ? "mobile" : "default"),
  components: {
    AnimatedNumber
  },
  data() {
    return {
      loadingImage: false,
      defaultImage: "../../default.jpg",
      panel: 0,
      errorMessage: "",
      sucessMessage: "",
      valid: false,
      form: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        country: 45,
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
      },
      selectedLanguage: "us",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  async mounted() {
    await this.usersData();
    this.updateUserData();
  },
  computed: {
    ...mapGetters("login", ["GetUserData"])
  },
  methods: {
    ...mapActions("login", ["setUserData", "usersData"]),
    ...mapMutations("login", ["CLEAR_USER_DATA"]),
    // Logout Users
    async userLogout() {
      this.CLEAR_USER_DATA();
      Cookies.remove("userUUID", { path: "" }); // removed! UserUUID Cookies
      this.$router.push("/");
    },
    // Format User balance
    formatToPrice(value) {
      return `$ ${Number(value)
        .toFixed(2)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
    },
    // Set All User Exiting Value
    updateUserData() {
      this.form.username = this.GetUserData.username;
      this.form.email = this.GetUserData.email;
      this.form.country = this.GetUserData.country_id;
      this.form.firstName = this.GetUserData.first_name;
      this.form.lastName = this.GetUserData.last_name;
    },
    //update Profile
    async updateProfile() {
      this.loadingImage = true;
      try {
        var reqBody = {
          user_uuid: this.GetUserData.uuid,
          first_name: this.form.firstName,
          last_name: this.form.lastName,
          username: this.form.username,
          country_id: this.form.country
        };
        var { data } = await axios.post(config.userUpdateDetails.url, reqBody, {
          headers: config.header
        });
        if (data.code == 200) {
          this.sucessMessage = data.message[0];
          this.errorMessage = "";
          this.loadingImage = false;
          this.setUserData(data.data[0]);
          this.updateUserData();
        } else {
          this.errorMessage = data.message[0];
          this.sucessMessage = "";
          this.loadingImage = false;
        }
      } catch (ex) {
        console.log(ex);
      }
    }
  }
};
</script>

<style scoped>
.loginButton {
  text-align: center;
  background: linear-gradient(50deg, #ff0167 0%, #ff0167 100%);
  border-radius: 50px;
  font-size: 20px;
  padding: 10px 20px;
  font-weight: 800;
  margin: 10px auto !important;
  width: 100%;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
}
.loginButton .icon {
  color: #fff;
  margin-right: 10px;
  margin-top: 0px;
}
.loginButton .icon:last-child {
  opacity: 0.4;
  margin-left: -10px;
  color: #fff;
}
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
.profileWrap{
  padding: 0px 20px;
}
.profileForm .inputClass {
  width: 100%;
}
.labelFont {
  font-size: 13px !important;
}
</style>
