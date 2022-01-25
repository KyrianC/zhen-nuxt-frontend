<template>
  <div>
    <h2 class="py-4 text-xl font-bold">Settings</h2>
    <div class="px-4 divide-y-2 divide-secondaryBackground divide-opacity-50">
      <SettingBool :values="languages" label="Language" />
      <!-- <SettingBool :values="theme" label="Theme" /> -->
    </div>
  </div>
</template>

<script>
import SettingBool from "~/components/settings/SettingBool.vue";
export default {
  components: {
    SettingBool,
  },
  data() {
    return {
      languages: { zh: "Chinese", en: "English" },
      theme: { dark: "Dark", light: "Light" },
    };
  },
};
</script>

<style>
</style>
