<template>
  <div>
    <base-card>
      <section>
        <h2>Register as a Coach now!</h2>
        <coach-form @save-data="saveData"></coach-form>
      </section>
    </base-card>
  </div>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: {
    CoachForm,
  },
  methods: {
      saveData(formData) {
          this.$store.dispatch('coaches/registerCoach', formData);
          this.$router.replace('/coaches');  //Using replace instead of push so user cant navigate back to form with back button
      }
  }
};
</script>