<template>
  <section>
    <div v-if="$device.isDesktop">
      <banner />
    </div>
    <div v-else-if="$device.isTablet">
      Tablet
    </div>
    <div v-else>
      <mobile-banner />
    </div>
  </section>
</template>

<script>
import banner from "~/components/banner";
import MobileBanner from "~/components/Mobile/banner/banner";
export default {
  layout: ctx => (ctx.isMobile ? "mobile" : "default"),
  components: {
    banner,
    MobileBanner
  },
  data() {
    return {};
  }
};
</script>
