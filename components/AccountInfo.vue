<template>
  <div class="ml-auto">
    <div v-if="!$auth.loggedIn" class="flex items-center">
      <Button :linkTo="'/login'" :name="$t('login')" class="mx-1" size="xs" scheme="secondary" />
      <Button :linkTo="'/register'" :name="$t('register')" class="mx-1" size="xs" scheme="primary" />
    </div>
    <div v-else class="relative">
      <button @click="show = !show" class="flex items-center">
        <span>{{ $auth.user.username }}</span>
        <img
          src="/chevron.svg"
          alt="account"
          class="h-4 inline transition-all transform ml-1"
          :class="show && 'rotate-180'"
        />
      </button>
      <transition name="popup">
        <div
          id="account-links"
          v-show="show"
          class="absolute shadow-xl right-0 my-2 p-4 rounded-md z-50"
          :class="`bg-${background ? 'secondaryBackground' : 'primary'}`"
        >
          <NuxtLink
            :to="localePath('/users/profile')"
            class="popup-item block my-1 p-2"
            @click="show = false"
          >{{ $t('profile') }}</NuxtLink>
          <NuxtLink
            @click="show = false"
            :to="localePath('/settings')"
            class="popup-item block my-1 p-2"
          >{{ $t('settings') }}</NuxtLink>
          <button @click="logout" class="popup-item block my-1 p-2">{{ $t('logout') }}</button>
        </div>
      </transition>
    </div>
    <div @click="show = false" v-show="show" class="fixed z-40 top-0 left-0 h-screen w-screen" />
  </div>
</template>

<script>
import Button from "~/components/common/Button.vue";
export default {
  props: {
    background: Boolean,
  },
  components: {
    Button,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.show = false;
    },
  },
};
</script>

<style>
.popup-item {
  word-break: keep-all;
}
#account-links > *:hover {
  text-decoration: underline;
}

.popup-enter-active,
.popup-leave-active {
  transition: all 0.3s;
  transform-origin: top right;
}

.popup-enter,
.popup-leave-to {
  opacity: 0;
  transform: scale(30%);
}
</style>

<i18n lang="yaml">
  en:
    profile: "Profile"
    settings: "Settings"
    logout: "Logout"
    login: "Login"
    register: "Register"
  zh:
    profile: "账号"
    settings: "设置"
    logout: "登出"
    login: "登录"
    register: "注册"

</i18n>
