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
                <v-list-item-title class="title"
                  >Marcus Obrien</v-list-item-title
                >
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
            class="inputClassRegi"
            height="48"
            light
            outlined
            rounded
            dense
            required
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <subheader title="email" />
          <v-text-field
            class="inputClassRegi"
            height="48"
            light
            outlined
            rounded
            dense
            required
            hide-details
            append-icon="fas fa-pen"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <subheader title="password" />
          <v-text-field
            class="inputClassRegi"
            height="48"
            light
            hide-details
            outlined
            rounded
            dense
            required
            append-icon="fas fa-pen"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <subheader title="country" />
          <v-text-field
            class="inputClassRegi"
            height="48"
            light
            outlined
            rounded
            dense
            required
            append-icon="fas fa-pen"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <subheader title="phone" />
          <v-text-field
            class="inputClassRegi"
            height="48"
            light
            outlined
            rounded
            dense
            required
            hide-details
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
        <v-btn rounded color="pink" dark class="px-8 my-5"
          >Join now
          <span class=" ml-3">
            <v-icon size="15"> fas fa-chevron-double-right</v-icon
            ><v-icon size="15" class=" opcity-1">
              fas fa-chevron-double-right</v-icon
            >
          </span>
        </v-btn>
         <Button title="Join now" />
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import ListItem from "~/components/listItems";
import subheader from "~/components/profile/subheader";
export default {
  components: {
    ListItem,
    subheader
  },
  computed:{
     ...mapGetters("login", ["GetUserData"])
  },
  data: () => ({
    form: {
      username: null,
      email: null,
      phone: null,
      country: null
    }
  })
};
</script>

<style></style>
