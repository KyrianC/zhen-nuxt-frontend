<template>
  <li class="flex mx-5 md:my-8 md:mx-0">
    <NuxtLink
      id="nav-link"
      class="w-6 md:w-8 flex flex-col md:flex-row items-center"
      :class="middle && 'w-10 md:w-8'"
      :to="link"
      :exact="link == '/' ? true : false"
    >
      <img :src="icon" :alt="name" />
      <span
        class="text-xs md:text-base px-2 block transition-all duration-500"
        :class="
          `md:opacity-${expanded ? '1' : '0'} ${middle && 'hidden md:block'}`
        "
      >{{ name }}</span>
    </NuxtLink>
  </li>
</template>

<script>
export default {
  props: {
    name: String,
    icon: String,
    middle: Boolean,
    link: String,
    expanded: Boolean,
  },
};
</script>

<style>
#nav-link.nuxt-link-active {
  font-weight: bold;
}
</style>
