<template>
  <div
    class="v-input inputClassRegi v-input--hide-details v-input--dense theme--light v-text-field v-text-field--is-booted v-text-field--enclosed v-text-field--outlined v-text-field--rounded"
  >
    <div class="v-input__control">
      <div class="v-input__slot" style="height: 48px;">
        <fieldset aria-hidden="true">
          <legend style="width: 0px;"><span>​</span></legend>
        </fieldset>
        <div class="v-text-field__slot">
          <input
            class="input"
            :type="type"
            :id="id"
            :placeholder="label"
            :value="value"
            :required="required"
            v-on:input="updateValue($event.target.value)"
          />
        </div>
        <div v-if="icon" class="v-input__append-inner">
          <div class="v-input__icon v-input__icon--append">
            <i
              aria-hidden="true"
              :class="'v-icon notranslate ' + icon + ' theme--light'"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String
    },
    label: {
      type: String,
      required: true
    },
    value: {
      type: String
    },
    required: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String
    },
    type: {
      type: String
    }
  },

  methods: {
    updateValue: function(value) {
      console.log("This is the value", value);
      this.$emit("input", value);
    }
  }
};
</script>
