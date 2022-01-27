<template>
  <ul
    class="z-50 nav transition-all duration-300 text-black flex md:flex-col justify-evenly md:justify-center items-center md:items-start w-screen h-12 md:h-screen px-3 fixed bottom-0 bg-secondary overflow-hidden"
    @mouseenter="expanded = true"
    @mouseleave="expanded = false"
    :class="expanded ? 'md:w-32' : 'md:w-14'"
  >
    <NavItem :expanded="expanded" :name="$t('home')" link="/" icon="/home-black.svg" />
    <NavItem :expanded="expanded" :name="$t('posts')" link="/posts" icon="/post-black.svg" />
    <NavItem
      :name="$t('add')"
      link="/posts/create"
      icon="/add-black.svg"
      :expanded="expanded"
      :middle="true"
    />
    <div class="relative">
      <NavItem
        :expanded="expanded"
        :name="$t('profile')"
        link="/users/profile"
        icon="/user-black.svg"
      />
      <div
        id="user-notifcation-icon"
        v-if="$auth.loggedIn && $auth.user.show_notifications == true"
        class="absolute bottom-8 right-4 md:top-7 md:right-0 bg-red-400 rounded-full w-3 h-3"
      />
    </div>
    <NavItem :expanded="expanded" :name="$t('more')" link="/settings" icon="/more-black.svg" />
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

<i18n lang="yaml">
  en:
    home: "Home"
    posts: "Posts"
    add: "Add"
    profile: "Profile"
    more: "More"
  zh:
    home: "主页"
    posts: "文章"
    add: "添加"
    profile: "账号"
    more: "更多"
</i18n>
