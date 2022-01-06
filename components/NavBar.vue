<template>
  <ul
    class="z-50 nav transition-all duration-300 text-black flex md:flex-col justify-evenly md:justify-center items-center md:items-start w-screen h-12 md:h-screen px-3 fixed bottom-0 bg-secondary overflow-hidden"
    @mouseenter="expanded = true"
    @mouseleave="expanded = false"
    :class="expanded ? 'md:w-32' : 'md:w-14'"
  >
    <NavItem :expanded="expanded" name="Home" link="/" icon="/home-black.svg" />
    <NavItem :expanded="expanded" name="Posts" link="/posts" icon="/post-black.svg" />
    <NavItem
      name="Add"
      link="/posts/create"
      icon="/add-black.svg"
      :expanded="expanded"
      :middle="true"
    />
    <NavItem :expanded="expanded" name="Profile" link="/users/profile" icon="/user-black.svg" />
    <NavItem :expanded="expanded" name="More" link="#" icon="/more-black.svg" />
  </ul>
</template>

<script>
import NavItem from "./NavItem.vue";
export default {
  component: {
    NavItem,
  },
  data() {
    return {
      expanded: false,
    };
  },
};
</script>
