<template>
  <v-row>
    <v-col cols="4">
      <v-card class="mx-auto text-center" flat>
        <v-row align="end" class="fill-height">
          <v-col align-self="start" cols="12">
            <v-badge
              color="pink"
              avatar
              bordered
              overlap
              bottom
              offset-x="39"
              offset-y="39"
            >
              <template v-slot:badge>
                <v-avatar width="100">
                  <v-icon>fas fa-pen</v-icon>
                </v-avatar>
              </template>
              <v-avatar class="profile" color="grey" size="200">
                <v-img :src="this.defaultImage"></v-img>
              </v-avatar>
            </v-badge>
          </v-col>
          <v-col class="py-0">
            <v-list-item color="rgba(0, 0, 0, .4)" light>
              <v-list-item-content>
                <v-list-item-title class="title" v-if="!GetUserData.first_name"
                  >{{ GetUserData.username }}
                </v-list-item-title>
                <v-list-item-title class="title" v-if="GetUserData.first_name"
                  >{{ GetUserData.first_name }} {{ GetUserData.last_name }}
                </v-list-item-title>

                <v-list-item-subtitle>Laos,Vientaine</v-list-item-subtitle>

                <v-list-item-subtitle>
                  <!-- <v-icon class="userWallet" left size="20">fas fa-wallet</v-icon> -->
                  <!-- <span class="userBalance">{{GetUserData.balance}}</span> -->
                  <animated-number
                    :value="GetUserData.balance"
                    :formatValue="formatToPrice"
                    class="userBalance"
                  />
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="6">
      <p
        v-bind:class="{
          sucessMessage: sucessMessage,
          errorMessage: errorMessage
        }"
      >
        {{ this.errorMessage }} {{ this.sucessMessage }}
      </p>

      <subheader
        class=" font-weight-bold text-capitalize "
        title="personal information"
      />
      <v-row>
        <v-col cols="6">
          <subheader :title="$t('myAccount.firstName')" />
          <v-text-field
            :error-messages="firstNameErrors"
            @input="$v.form.firstName.$touch()"
            @blur="$v.form.firstName.$touch()"
            v-model="form.firstName"
            class="text-filed"
            height="42"
            light
            outlined
            rounded
            dense
            required
            :hide-details="firstNameErrors.length ? false : true"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <subheader :title="$t('myAccount.lastName')" />
          <v-text-field
            :error-messages="lastNameErrors"
            @input="$v.form.lastName.$touch()"
            @blur="$v.form.lastName.$touch()"
            v-model="form.lastName"
            class="text-filed"
            height="42"
            light
            outlined
            rounded
            dense
            required
            :hide-details="lastNameErrors.length ? false : true"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <subheader :title="$t('myAccount.username')" />
          <v-text-field
            :error-messages="usernameErrors"
            @input="$v.form.username.$touch()"
            @blur="$v.form.username.$touch()"
            v-model="form.username"
            class="text-filed"
            height="42"
            light
            outlined
            rounded
            dense
            required
            :hide-details="usernameErrors.length ? false : true"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <subheader :title="$t('myAccount.email')" />
          <v-text-field
            :error-messages="emailErrors"
            @input="$v.form.email.$touch()"
            @blur="$v.form.email.$touch()"
            :hide-details="emailErrors.length ? false : true"
            v-model="form.email"
            class="text-filed"
            height="42"
            light
            outlined
            rounded
            dense
            required
          >
            <template slot="append">
              <v-icon size="20" color="pink">fas fa-pen</v-icon>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <subheader :title="$t('myAccount.country')" />
          <v-select
            height="42"
            dense
            rounded
            outlined
            light
            v-model="form.country"
            :items="form.countrys"
            item-text="name"
            item-value="id"
            required
            :rules="[v => !!v || 'Country is required']"
          ></v-select>
        </v-col>       
      </v-row>

      <v-divider></v-divider>

      <v-row class="my-4">
        <subheader
          class=" font-weight-bold text-capitalize "
          title="address information"
        />
        <v-spacer></v-spacer>
        <v-btn
          outlined
          small
          rounded
          color="pink"
          @click="editProfile"
          :class="editable ? 'edit-active' : ''"
        >
          <v-icon class="active" left>fas fa-pen</v-icon>{{ $t('myAccount.editInfo') }}
        </v-btn>
      </v-row>
      <v-row>
        <v-col cols="6" class="py-0">
          <div class="userInfo">
            <label>{{ $t('myAccount.province') }}</label>
            <p v-if="editable == false">{{ this.form.province }}</p>

            <v-text-field
              v-if="editable"
              class="inputClassRegi"
              height="42"
              light
              v-model="form.province"
              outlined
              rounded
              dense
              required
              :rules="[v => !!v || 'Province is required']"
            ></v-text-field>
          </div>
        </v-col>
        <v-col cols="6" class="py-0">
          <div class="userInfo">
            <label>{{ $t('myAccount.city') }}</label>
            <p v-if="editable == false">{{ form.city }}</p>

            <v-text-field
              v-if="editable"
              class="inputClassRegi"
              height="42"
              light
              v-model="form.city"
              outlined
              rounded
              dense
              required
              :rules="[v => !!v || 'City is required']"
            ></v-text-field>
          </div>
        </v-col>
        <v-col cols="6" class="py-0">
          <div class="userInfo">
            <label>{{ $t('myAccount.address') }}</label>
            <p v-if="editable == false">{{ this.form.address }}</p>

            <v-text-field
              v-if="editable"
              class="inputClassRegi"
              height="42"
              light
              v-model="form.address"
              outlined
              rounded
              dense
              required
              :rules="[v => !!v || 'Address is required']"
            ></v-text-field>
          </div> </v-col
        ><v-col cols="6" class="py-0">
          <div class="userInfo">
            <label>{{ $t('myAccount.gender') }}</label>
            <p v-if="editable == false" class="genderClass">
              {{ this.form.gender }}
            </p>
            <v-radio-group
              v-model="form.gender"
              :mandatory="false"
              row
              v-if="editable"
            >
              <v-radio
                height="42"
                class="genderClass"
                color="#ff0167"
                light
                v-for="data in genders"
                :key="data"
                :label="`${data}`"
                :value="data"
              ></v-radio>
            </v-radio-group>
          </div> </v-col
        ><v-col cols="6" class="py-0">
          <div class="userInfo">
            <label>{{ $t('myAccount.dob') }}</label>
            <p v-if="editable == false">{{ this.form.birthdate }}</p>

            <v-menu
              v-if="editable"
              v-model="birthday"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="form.birthdate"
                  light
                  height="42"
                  outlined
                  rounded
                  dense
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :rules="[v => !!v || 'Birthday is required']"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="form.birthdate"
                @input="birthday = false"
              ></v-date-picker>
            </v-menu>
          </div>
        </v-col>
        <v-col cols="6" class="py-0">
          <div class="userInfo">
            <label>{{ $t('myAccount.personalID') }}</label>
            <p v-if="editable == false">{{ this.form.personalID }}</p>

            <v-text-field
              v-if="editable"
              class="inputClassRegi"
              height="42"
              light
              v-model="form.personalID"
              outlined
              rounded
              dense
              required
              :rules="[v => !!v || 'Personal ID is required']"
            ></v-text-field>
          </div>
        </v-col>

        <v-btn class="justify-center text-center my-btn" @click="updateProfile"
          >{{ $t('myAccount.saveChanges') }}
          <span class=" ml-3">
            <v-icon size="15"> fas fa-chevron-double-right</v-icon
            ><v-icon size="15" class=" opacity-1">
              fas fa-chevron-double-right</v-icon
            >
            <v-progress-circular
              v-if="loadingImage"
              indeterminate
              color="#FFF"
              size="22"
            ></v-progress-circular>
          </span>
        </v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import Button from "~/components/Button";
import subheader from "~/components/profile/subheader";
import Validate from "~/validation/profile";
import axios from "axios";
import config from "../../config/config.global";
import AnimatedNumber from "animated-number-vue";
export default {
  mixins: [Validate],
  components: {
    Button,
    subheader,
    AnimatedNumber
  },
  data: () => ({
    errorMessage: "",
    sucessMessage: "",
    loadingImage: false, // Loading Loader Bar in Button
    birthday: false,
    editable: false,
    genders: ["male", "female", "other"],
    defaultImage: "../default.jpg",
    showPassword: false,
    form: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
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
      ],
      phone: null,
      province: "Vientaine",
      city: "Laos",
      address: "12s1a2sa bhjsaghsgahsbhav hbhsaghsgbas",
      gender: "male",
      birthdate: new Date().toISOString().substr(0, 10),
      personalID: "GUGHSG:BAHSG:SVBAHSGH:HJH"
    },
    editInfo: {}
  }),
  async mounted() {
    await this.usersData();
    this.updateUserData();      
  },
  computed: {
    ...mapGetters("login", ["GetUserData"])
  },
  methods: {
    ...mapActions("login",["setUserData","usersData"]),
    // Set All User Exiting Value
    updateUserData() {
      this.form.username = this.GetUserData.username;
      this.form.email = this.GetUserData.email;
      this.form.country = this.GetUserData.country_id;
      this.form.firstName = this.GetUserData.first_name;
      this.form.lastName = this.GetUserData.last_name;
    },
    // Format User balance
    formatToPrice(value) {
      return `$ ${Number(value)
        .toFixed(2)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
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
    },
    // Edit Info Toggle
    editProfile() {
      this.editable = !this.editable;
    }
  }
};
</script>

<style scoped>
.userBalance {
  color: #e91e63;
  font-size: 25px;
  align-items: center;
  justify-content: center;
}
.title {
  text-transform: capitalize;
}
.edit-active {
  background-color: #e91e63;
  color: #fff !important;
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
</style>
