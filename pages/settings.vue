<template>
  <div class="flex flex-col mx-auto items-center max-w-screen-md">
    <div class="bg-primary p-8 rounded-md w-full md:mt-8 shadow">
      <SettingInputs />
      <Faq />
      <Privacy />
    </div>
  </div>
</template>

<script>
import Privacy from "~/components/settings/Privacy.vue";
import SettingInputs from "~/components/settings/SettingInputs.vue";
import Faq from "~/components/settings/Faq.vue";
export default {
  components: {
    SettingInputs,
    Privacy,
    Faq,
  },
};
</script>

<style>
</style>
