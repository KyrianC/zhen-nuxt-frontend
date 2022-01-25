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
      <p class="text-xl opacity-70 m-3">{{ $t('sub_title') }}</p>
      <div class="text-2xl flex flex-col md:flex-row my-3">
        <Button class="m-3" :name="$t('primary_btn')" scheme="primary" :linkTo="'posts'" />
        <Button class="m-3" :name="$t('secondary_btn')" scheme="secondary" />
      </div>
    </div>
    <section class="bg-primary h-96">hello</section>
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

</i18n>
