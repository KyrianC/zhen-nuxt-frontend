<template>
  <div>
    <h1>{{ this.$auth.user.username }}'s Profile page</h1>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard.vue";
export default {
  middleware: "auth",
  async asyncData({ $axios, $auth }) {
    const userDetails = await $axios.$get(`users/${$auth.user.pk}/`);
    console.log(userDetails);
    return { userDetails };
  }
};
</script>
