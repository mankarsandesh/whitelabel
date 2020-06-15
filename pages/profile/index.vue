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
                <v-img
                  src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
                ></v-img>
              </v-avatar>
            </v-badge>
          </v-col>
          <v-col class="py-0">
            <v-list-item color="rgba(0, 0, 0, .4)" light>
              <v-list-item-content>
                <v-list-item-title class="title" v-if="!GetUserData.first_name"
                  >{{ GetUserData.username }}
                </v-list-item-title>
                 <v-list-item-title class="title" v-if=" GetUserData.first_name "
                  >{{ GetUserData.first_name }} {{ GetUserData.last_name }}
                </v-list-item-title>

                <v-list-item-subtitle>Network Engineer</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="8">
      <subheader
        class=" font-weight-bold text-capitalize "
        title="personal information"
      />
      <v-row>
        <v-col cols="6">
          <subheader title="username" />
          <v-text-field
            :error-messages="usernameErrors"
            @input="$v.form.username.$touch()"
            @blur="$v.form.username.$touch()"
            v-model="form.username"
            class="text-filed"
            height="48"
            light
            outlined
            rounded
            dense
            required
            :hide-details="usernameErrors.length ? false : true"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <subheader title="email" />
          <v-text-field
            :error-messages="emailErrors"
            @input="$v.form.email.$touch()"
            @blur="$v.form.email.$touch()"
            :hide-details="emailErrors.length ? false : true"
            v-model="form.email"
            class="text-filed"
            height="48"
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
          <subheader title="password" />
          <v-text-field
            :error-messages="passwordErrors"
            @input="$v.form.password.$touch()"
            @blur="$v.form.password.$touch()"
            :hide-details="passwordErrors.length ? false : true"
            v-model="form.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            class="text-filed"
            height="48"
            light
            outlined
            rounded
            required
            clearable
            @click:append="showPassword = !showPassword"
          >
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <subheader title="country" />
          <v-text-field
            :error-messages="countryErrors"
            @input="$v.form.country.$touch()"
            @blur="$v.form.country.$touch()"
            :hide-details="countryErrors.length ? false : true"
            v-model="form.country"
            class="text-filed"
            height="48"
            light
            outlined
            rounded
            dense
            required
          >
            <template slot="prepend-inner">
              <country-flag country="th" size="normal" />
            </template>
            <template slot="append">
              <v-icon size="20" color="pink">fas fa-pen</v-icon>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <subheader title="phone" />
          <v-text-field
            :error-messages="phoneErrors"
            @input="$v.form.phone.$touch()"
            @blur="$v.form.phone.$touch()"
            :hide-details="phoneErrors.length ? false : true"
            type="number"
            class="text-filed"
            height="48"
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
      </v-row>

      <v-divider></v-divider>

      <v-row class="my-4">
        <subheader
          class=" font-weight-bold text-capitalize "
          title="address information"
        />
        <v-spacer></v-spacer>
        <v-btn outlined small rounded color="pink">
          <v-icon left>fas fa-pen</v-icon> edit info
        </v-btn>
      </v-row>
      <v-row>
        <v-col cols="6" class="py-0">
          <ListItem title="Province/State" desc="Gujarat" />
        </v-col>
        <v-col cols="6" class="py-0">
          <ListItem title="City" desc="LAOS" />
        </v-col>
        <v-col cols="6" class="py-0">
          <ListItem title="Address" desc="Vientaine" /> </v-col
        ><v-col cols="6" class="py-0">
          <ListItem title="Sex" desc="male" /> </v-col
        ><v-col cols="6" class="py-0">
          <ListItem title="data of birth" desc="1987-Hune-06" />
        </v-col>
        <v-col cols="6" class="py-0">
          <ListItem title="ID" desc="(ID Card ) *******" />
        </v-col>
        <Button title="Join now" v-on:methodName="updateProfile" />
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import Button from "~/components/Button";
import ListItem from "~/components/listItems";
import subheader from "~/components/profile/subheader";
import Validate from "~/validation/profile";
export default {
  mixins: [Validate],
  components: {
    Button,
    ListItem,
    subheader
  },
  data: () => ({
    showPassword: false,
    form: {
      username: null,
      email: null,
      password: null,
      country: null,
      phone: null
    }
  }),
  computed: {
    ...mapGetters("login", ["GetUserData"])
  },
  methods: {
    async updateProfile(item) {
      try {
        console.log("This is the item", item);
        this.$v.form.$touch();
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style></style>
