<template>
  <div>
    <h1>
      Wire Transfer
    </h1>
    <v-divider></v-divider>

      <v-row>
        <v-col cols="6">
          <subheader title="First Name" />
          <v-text-field
            :error-messages="firstNameErrors"
            @input="$v.form.firstName.$touch()"
            @blur="$v.form.firstName.$touch()"
            v-model="form.firstName"
            class="text-filed"
            height="48"
            light
            outlined
            rounded
            dense
            required
            :hide-details="firstNameErrors.length ? false : true"
          ></v-text-field>
        </v-col>

      </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
