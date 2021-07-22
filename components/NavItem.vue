<template>
  <li class="flex items-center mx-6 md:my-8 md:mx-0" :class="specialClasses">
    <NuxtLink class="flex items-center" :to="link"
      ><img class="w-8" :src="icon" :alt="name" /><span
        class="px-2 hidden md:block transition-all duration-500 font-bold"
        :class="`opacity-${expanded ? '1' : '0'}`"
        >{{ name }}</span
      ></NuxtLink
    >
  </li>
</template>

<script>
export default {
  props: {
    name: String,
    icon: String,
    specialClasses: String,
    link: String,
    expanded: Boolean
  }
};
</script>
