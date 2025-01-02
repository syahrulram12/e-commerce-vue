<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <b-card title="Dashboard" class="mb-3">
            <b-card-text> Welcome to the admin dashboard! </b-card-text>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="4">
          <b-card title="Card 1" class="mb-3">
            <b-card-text> Content for card 1. </b-card-text>
          </b-card>
        </b-col>
        <b-col md="4">
          <b-card title="Card 2" class="mb-3">
            <b-card-text> Content for card 2. </b-card-text>
          </b-card>
        </b-col>
        <b-col md="4">
          <b-card title="Card 3" class="mb-3">
            <b-card-text> Content for card 3. </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
};
</script>

<style scoped>
.mb-3 {
  margin-bottom: 1rem;
}
</style>
