<template>
  <v-container>
    <div class="text-center d-flex justify-center align-center mb-12 flex-wrap">
      <v-btn class="mx-12 my-4" @click="loading = !loading">
        Toggle
      </v-btn>
    </div>

    <v-row justify="center">
      <v-col class="mb-12" cols="12" md="3">
        <v-skeleton-loader :loading="loading" type="card-avatar, article">
          <v-card class="my-shadow">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/plane.jpg"
            ></v-img>
            <v-card-text class="text--primary">
              <div>Whitehaven Beach</div>
              <div>Whitsunday Island, Whitsunday Islands</div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="orange" text>
                Share
              </v-btn>
              <v-btn color="orange" text>
                Explore
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    loading: true,
    transition: "fade-transition"
  })
};
</script>
