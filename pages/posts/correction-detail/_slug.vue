<template>
  <div class="min-h-screen">
    <div class="relative flex">
      <PostContent :class="postStyle" :post="post" />

      <!-- TODO fix scrollbar appearing during transition -->
      <transition name="popup-slow">
        <div class="z-10" v-if="selectedCorrection" :class="showCorrections && 'md:w-2/3 md:pr-8'">
          <!-- TODO icon + better placement -->
          <span class="absolute left-2 top-2 cursor-pointer" @click="selectedCorrection = null">x</span>
          <PostContent :diff="diff" :post="selectedCorrection" />
        </div>
      </transition>

      <!-- show on phone/small screens only -->
      <transition name="fade">
        <div
          @click="showCorrections = false"
          v-show="showCorrections"
          class="md:hidden fixed h-screen w-screen top-0 bg-black bg-opacity-50 z-20"
        />
      </transition>
      <transition name="popup">
        <section
          class="md:hidden fixed inset-x-0 top-16 min-h-screen bg-primary shadow-2xl rounded-3xl py-8 px-4 z-20"
          v-show="showCorrections"
          id="correction-list"
        >
          <div
            v-for="correction in corrections.results"
            :key="correction.id"
            @click="selectCorrectionSm(correction)"
            class="bg-primary shadow-2xl border-2 p-4 rounded-lg cursor-pointer"
            :class="(selectedCorrection && selectedCorrection.id == correction.id) ? 'border-white' : 'border-black'"
          >{{ correction.title }} - by {{ correction.author.username }}</div>
        </section>
      </transition>

      <!-- show on bigger screen -->
      <transition name="slide">
        <section
          v-show="showCorrections"
          class="hidden md:block fixed right-0 min-h-screen bg-primary w-1/3 p-4 z-20"
          id="correction-list"
        >
          <!-- TODO change to and Icon button -->
          <CommonButton
            @handleClick="showCorrections = false"
            size="xs"
            name="hide"
            scheme="secondary"
            class="mb-3"
          />
          <div
            v-for="correction in corrections.results"
            :key="correction.id"
            @click="selectCorrectionMd(correction)"
            class="bg-primary shadow-2xl border-2 p-4 rounded-lg cursor-pointer"
            :class="(selectedCorrection && selectedCorrection.id == correction.id) ? 'border-white' : 'border-black'"
          >{{ correction.title }} - by {{ correction.author.username }}</div>
        </section>
      </transition>
    </div>

    <button
      @click="showCorrections = true"
      v-show="!showCorrections"
      class="rounded-md fixed inset-x-0 bottom-16 left-1/2 bg-secondary text-black shadow p-2 transform -translate-x-1/2 z-20"
    >show Corrections</button>
  </div>
</template>

<script>
import PostContent from "~/components/PostContent.vue";
import diffMatchPatch from "diff-match-patch";
export default {
  components: {
    PostContent,
  },
  async asyncData({ params, $axios }) {
    try {
      const post = await $axios.$get(`/posts/${params.slug}/`);
      return { post };
    } catch (e) {
      console.log(e);
    }
  },
  data() {
    return {
      corrections: {},
      showCorrections: false,
      selectedCorrection: null,
      diff: [],
    };
  },
  methods: {
    async fetchData() {
      try {
        const slug = this.$route.params.slug;
        const corrections = await this.$axios.$get(
          `/posts/correction/list/${slug}`
        );
        console.log(corrections);
        this.corrections = corrections;
      } catch (e) {
        console.log(e);
      }
    },
    getDiff() {
      var dmp = new diffMatchPatch();
      var diff = dmp.diff_main(
        this.post.content,
        this.selectedCorrection.content
      );
      dmp.diff_cleanupSemantic(diff);
      this.diff = diff;
    },
    selectCorrectionMd(correction) {
      this.selectedCorrection = correction;
      this.getDiff();
    },
    selectCorrectionSm(correction) {
      this.selectCorrectionMd(correction);
      this.showCorrections = false;
    },
  },
  computed: {
    postStyle() {
      let result = "";
      if (this.showCorrections) {
        result += "md:w-2/3 md:pr-8 ";
        console.log("SHOW CORRECTION");
      }
      if (this.selectedCorrection) {
        console.log("ABSOLUTE");
        result += "absolute z-0";
      }
      return result;
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
.popup-enter-active,
.popup-leave-active {
  transition: all 0.3s ease-in-out;
}

.popup-enter,
.popup-leave-to {
  transform: translateY(100%);
  position: absolute;
}

.popup-slow-enter-active,
.popup-slow-leave-active {
  transition: all 0.5s ease-in-out;
}

.popup-slow-enter,
.popup-slow-leave-to {
  transform: translateY(100%);
  position: absolute;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-enter-actvie,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}

#original-post {
  transition: all 0.3s ease-in-out;
}
</style>
