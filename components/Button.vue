<template>
  <v-btn class="justify-center text-center my-btn" @click="methodRuning"
    >{{ title }}
    <span class=" ml-3">
      <v-icon size="15"> fas fa-chevron-double-right</v-icon
      ><v-icon size="15" class=" opcity-1"> fas fa-chevron-double-right</v-icon>
    </span>
  </v-btn>
</template>

<script>
export default {
  props: ["title", "actions", "link"],
  methods: {
    async methodRuning() {
      try {
        this.$emit("methodName", "from different component");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style></style>
