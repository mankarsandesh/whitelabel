<template>
  <v-list-item light>
    <v-list-item-content>
      <v-list-item-title class=" text-capitalize">{{ title }}</v-list-item-title>
      <v-list-item-subtitle>{{ desc }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: ["title", "desc"]
};
</script>

<style></style>
