<template>
  <div>
    <div
      class="h-screen py-4 flex justify-center items-center flex-col text-center text-opacity-100 bg-secondaryBackground"
    >
      <h1 class="font-bold text-5xl m-2">{{ $t('title') }}</h1>
      <transition name="fade" mode="out-in">
        <h1
          class="text-5xl overflow-hidden mb-3"
          :class="`text-difficulty${index + 1}-400`"
          :key="words[index]"
        >{{ words[index] }}</h1>
      </transition>
      <p class="text-xl opacity-90 m-3">{{ $t('sub_title') }}</p>
      <div class="text-2xl flex flex-col md:flex-row my-3">
        <Button class="m-3" :name="$t('primary_btn')" scheme="primary" :linkTo="'posts'" />
        <Button class="m-3" :name="$t('secondary_btn')" scheme="secondary" />
      </div>
    </div>
    <section id="parallax" class="w-full flex flex-col items-center justify-center h-80 bg-white">
      <h2 class="text-3xl text-center p-6">{{ $t('register_txt') }}</h2>
      <NuxtLink
        :to="localePath('/register')"
        class="p-2 text-lg border-2 border-white rounded-md hover:bg-white hover:text-black"
      >{{ $t('register_btn') }}</NuxtLink>
    </section>
    <section id="list" class="flex flex-col items-center my-12 mx-4">
      <div class="flex flex-col md:flex-row items-center max-w-screen-md">
        <div>
          <h3 class="text-3xl pb-3 font-bold">{{ $t('read_h') }}</h3>
          <p class="text-lg opacity-90">{{ $t('read_p') }}</p>
        </div>
        <img class="md:w-80 my-4 md:my-0" src="/check.svg" alt="write image" />
      </div>
      <div class="flex flex-col md:flex-row-reverse items-center max-w-screen-md my-12">
        <div class="md:ml-8">
          <h3 class="text-3xl pb-3 font-bold">{{ $t('correct_h') }}</h3>
          <p class="text-lg opacity-90">{{ $t('correct_p') }}</p>
        </div>
        <img class="w-80 my-4 md:my-0" src="/to-do-list.svg" alt="correct image" />
      </div>
      <div class="flex flex-col md:flex-row items-center max-w-screen-md">
        <div>
          <h3 class="text-3xl pb-3 font-bold">{{ $t('translate_h') }}</h3>
          <p class="text-lg opacity-90">{{ $t('translate_p') }}</p>
        </div>
        <img class="w-80 my-4 md:my-0" src="/support-team.svg" alt="translate image" />
      </div>
    </section>
    <div class="w-full flex justify-center">
      <Button scheme="primary" :name="$t('secondary_btn')" />
    </div>
  </div>
</template>

<script>
import Button from "~/components/common/Button.vue";
export default {
  components: {
    Button,
  },
  data() {
    return {
      words: [
        this.$t("practice"),
        this.$t("read"),
        this.$t("write"),
        this.$t("correct"),
        this.$t("translate"),
      ],
      index: 0,
    };
  },
  mounted() {
    setInterval(() => {
      if (this.index == this.words.length - 1) {
        this.index = 0;
      } else {
        this.index++;
      }
    }, 2000);
  },
};
</script>

<style scoped>
#parallax {
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url("/zhen-hero.jpeg");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  /* position: absolute; */
}
</style>

<i18n lang="yaml">
  en:
    title: "The Best Way to Learn is to"
    sub_title: "Read, Write and help the community improve"
    practice: 'Practice'
    read: 'Read'
    write: 'Write'
    correct: 'Correct'
    translate: "Translate"
    primary_btn: "Practice Reading"
    secondary_btn: "Learn More"
    register_txt: "Register Now to be able to Write your own text and correct others"
    register_btn: "Register Now"
    read_h: "Read & Write"
    read_p: "Practice your reading writing skills by writing text in foreign language and reading texts made by others"
    correct_h: "Correct & Get Corrected"
    correct_p: "Get a detailed correctection by native speakers to help you improve"
    translate_h: "Translate & Help others Learn a language"
    translate_p: "Translate Texts to help other learners practice their reading skills"

  zh:
    title: "最好的学习方法是"
    sub_title: "阅读、写作并帮助社区改善"
    practice: '练习'
    read: '阅读'
    write: '写作'
    correct: '纠正'
    translate: "翻译"
    primary_btn: "练习阅读"
    secondary_btn: "学到更多"
    register_txt: "立即注册，以便能够编写自己的文本并更正他人"
    register_btn: "现在注册"
    read_h: "读写"
    read_p: "通过用外语写文章和阅读别人的文章来练习你的阅读写作技巧"
    correct_h: "纠正并得到纠正"
    correct_p: "获得母语人士的详细纠正，以帮助您提高"
    translate_h: "翻译和帮助他人学习一门语言"
    translate_p: "翻译文本以帮助其他学习者练习阅读技巧"

</i18n>
