<template>
  <div class="ml-auto">
    <div v-if="!$auth.loggedIn" class="flex items-center">
      <Button linkTo="/login" name="Login" class="mx-1" size="xs" scheme="secondary" />
      <Button linkTo="/register" name="Register" class="mx-1" size="xs" scheme="primary" />
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
          <NuxtLink to="/users/profile" class="block my-1 p-2">Profile</NuxtLink>
          <NuxtLink to="/settings" class="block my-1 p-2">Settings</NuxtLink>
          <button @click="logout" class="block my-1 p-2">Logout</button>
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
      this.$router.push("/login");
    },
  },
};
</script>

<style>
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
