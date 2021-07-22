<template>
  <ul
    class="nav transition-all duration-300 text-black flex md:flex-col justify-center items-center md:items-start w-screen h-14 md:h-screen md:w-14 px-4 fixed bottom-0 bg-secondary overflow-hidden"
    @mouseenter="expanded = true"
    @mouseleave="expanded = false"
    :class="expanded && 'md:w-32'"
  >
    <NavItem :expanded="expanded" name="Home" link="/" icon="/home-black.svg" />
    <NavItem
      :expanded="expanded"
      name="Posts"
      link="/posts"
      icon="/post-black.svg"
    />
    <NavItem
      name="Add"
      link="/posts/create"
      icon="/add-black.svg"
      :expanded="expanded"
    />
    <NavItem
      :expanded="expanded"
      name="Profile"
      link="/login"
      icon="/user-black.svg"
    />
    <NavItem :expanded="expanded" name="More" link="#" icon="/more-black.svg" />
  </ul>
</template>

<script>
import NavItem from "./NavItem.vue";
export default {
  component: {
    NavItem
  },
  data() {
    return {
      expanded: false
    };
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      // redirect if not already at index page
      this.$route.path !== "/" && this.$router.replace("");
    }
  }
};
</script>
