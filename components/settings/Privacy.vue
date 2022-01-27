<template>
  <div>
    <h2 class="py-4 text-xl font-bold">{{ $t('privacy') }}</h2>
    <div class="px-4">
      <ExpandableItem
        :label="$t('policy')"
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</ExpandableItem>
    </div>
  </div>
</template>

<script>
import ExpandableItem from "~/components/common/ExpandableItem.vue";
export default {
  components: {
    ExpandableItem,
  },
};
</script>

<i18n lang="yaml">
  en:
    privacy: "Privacy"
    policy: "Privacy Policy"
  zh:
    privacy: "隐私"
    policy: "隐私政策"
</i18n>
