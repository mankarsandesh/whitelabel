<template>
  <v-container>
    <v-card flat>
      <v-tabs background-color="white" color="red" left>
        <v-tab>my account</v-tab>
        <v-tab>deposit</v-tab>
        <v-tab>withdrawal</v-tab>

        <v-tab-item>
          <v-container fluid>
            <v-row justify="center" align="center">
              <v-col cols="10">
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
                              <v-list-item-subtitle
                                >Network Engineer</v-list-item-subtitle
                              >
                            </v-list-item-content>
                          </v-list-item>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                  <v-col cols="8">
                    <v-subheader class=" font-weight-bold text-capitalize "
                      >personal information</v-subheader
                    >
                    <v-row>
                      <v-col cols="6">
                        <v-subheader class=" high-0">username</v-subheader>
                        <v-text-field
                          outlined
                          hide-details
                          rounded
                          label="Regular"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-subheader class=" high-0">email</v-subheader>
                        <v-text-field
                          outlined
                          hide-details
                          rounded
                          label="Regular"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-subheader class=" high-0">password</v-subheader>
                        <v-text-field
                          outlined
                          hide-details
                          rounded
                          label="password"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-subheader class=" high-0">country</v-subheader>
                        <v-text-field
                          outlined
                          hide-details
                          rounded
                          label="Regular"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-subheader class=" high-0">phone</v-subheader>
                        <v-text-field
                          outlined
                          hide-details
                          rounded
                          label="Regular"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-divider></v-divider>

                    <v-row class="my-4">
                      <v-subheader class=" font-weight-bold text-capitalize "
                        >address information</v-subheader
                      >
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
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script>
import ListItem from "~/components/listItems";
export default {
  components: {
    ListItem
  }
};
</script>

<style></style>
