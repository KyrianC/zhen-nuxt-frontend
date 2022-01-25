<template>
  <div class="min-h-screen bg-primary">
    <section id="user-info" class="p-4 flex flex-row justify-center bg-primary sticky top-0 z-20">
      <!-- TODO avatar img -->
      <div class="flex flex-col items-center mx-4">
        <div id="user-img" class="w-20 h-20 rounded-full bg-gray-400"></div>
        <p class="text-lg font-bold my-2">{{ $auth.user.username }}</p>
      </div>
      <div class="flex flex-col justify-center mx-4">
        <p>
          <span class="font-bold">{{ $t('learning') }}:</span>
          <span></span>
          {{ $auth.user.get_learning_language_display }}
        </p>
        <p>
          <span class="font-bold">{{ $t('level') }}:</span>
          <span :class="`text-difficulty${$auth.user.level}-400`">{{ $auth.user.get_level_display }}</span>
        </p>
        <div class="mt-4 flex justify-evenly">
          <Button :name="$t('edit')" size="xs" scheme="primary" linkTo="/users/edit" />
          <Button :name="$t('delete')" size="xs" scheme="danger" linkTo="#" />
        </div>
      </div>
    </section>
    <section id="user-texts" class="flex flex-col md:flex-row">
      <div class="md:w-1/6 relative flex justify-center z-10 w-full">
        <ul
          id="user-texts-nav"
          class="bg-primary flex justify-center flex-row justify-evenly w-full md:w-auto md:flex-col fixed py-2"
        >
          <li
            class="flex items-center my-2 cursor-pointer"
            v-for="texts, name in result"
            @click="show = name"
            :key="name"
            :class="show == name && 'font-bold'"
          >
            <span :class="show == name && 'bg-white'" class="w-4 h-1 inline-block mr-2" />
            {{ $t('your') + name }}
            <span
              v-if="name == 'Posts' && showNotification"
              class="w-2 h-2 bg-red-400 rounded-full transform -translate-y-1"
            />
          </li>
        </ul>
      </div>
      <div class="w-full mt-12 md:mt-0">
        <PostList v-for="texts, name in result" :key="name" v-show="name == show" :posts="texts" />
      </div>
    </section>
  </div>
</template>

<script>
import PostList from "~/components/PostList.vue";
import Button from "~/components/common/Button.vue";
export default {
  components: {
    PostList,
    Button,
  },
  middleware: "auth",
  data() {
    return {
      show: "Posts",
    };
  },
  async asyncData({ $axios, $auth }) {
    const username = $auth.user.username;
    const posts = await $axios.$get(`users/${username}/posts/`);
    const corrections = await $axios.$get(`users/${username}/corrections/`);
    return {
      result: { Posts: posts, Corrections: corrections },
    };
  },
  computed: {
    showNotification() {
      return this.result.Posts.results.some(
        (x) => x.has_new_corrections == true
      );
    },
  },
  methods: {
    async unshowNotifcation() {
      await this.$axios.$post(`users/unshow-notifications/`);
      this.$auth.fetchUser();
    },
  },
  created() {
    this.unshowNotifcation();
  },
};
</script>

<i18n lang="yaml">
  en:
    learning: "Learning"
    level: "Level"
    edit: "Edit"
    delete: "Delete"
    your: Your
  zh:
    learning: "目前在学习"
    level: "水平"
    edit: "编辑"
    delete: "删除"
    your: "您的"

</i18n>
