<template>
  <div>
    <h2 class="py-4 text-xl font-bold">{{ $t('settings') }}</h2>
    <div class="px-4 divide-y-2 divide-secondaryBackground divide-opacity-50">
      <SettingBool
        :choices="languages"
        @handleChange="changeLanguage"
        :value="$i18n.getLocaleCookie()"
        :label="$t('language')"
      />
      <!-- <SettingBool :choices="theme" label="Theme" /> -->
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
      languages: { zh: "中文", en: "English" },
      theme: { dark: "Dark", light: "Light" },
    };
  },
  methods: {
    changeLanguage(value) {
      this.$i18n.setLocale(value);
    },
  },
};
</script>

<i18n lang="yaml">
  en:
    settings: "Settings"
    language: "Language"
  zh:
    settings: "设置"
    language: "语言"

</i18n>
