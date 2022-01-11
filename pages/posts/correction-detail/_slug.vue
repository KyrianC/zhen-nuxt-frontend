<template>
  <div id="correction-detail" class="min-h-screen">
    <div class="relative flex">
      <PostContent :class="postStyle" :post="post" />

      <transition name="popup">
        <div
          id="correction"
          class="z-10 w-full relative"
          v-if="selectedCorrection"
          :class="showCorrections && 'md:w-2/3 md:pr-8'"
        >
          <!-- TODO icon + better placement -->
          <span
            class="absolute left-5 top-4 text-2xl cursor-pointer"
            title="close"
            @click="selectedCorrection = null"
          >x</span>
          <PostContent key="correction" :diff="diff" :post="selectedCorrection" />
          <div class="flex p-4 bg-secondaryBackground justify-center">
            <CommonButton class="mx-2" scheme="primary" name="validate this Correction" />
            <CommonButton
              class="mx-2"
              scheme="secondary"
              name="Cancel"
              @handleClick="selectedCorrection = null"
            />
          </div>
        </div>
      </transition>

      <CorrectionListPopup
        :showCorrections="showCorrections"
        :corrections="corrections"
        :selectCorrection="selectCorrection"
        :selectedCorrection="selectedCorrection"
        :closeCorrections="closeCorrections"
      />
    </div>

    <transition name="fade">
      <button
        @click="showCorrections = true"
        v-show="!showCorrections && showButton"
        class="rounded-md fixed bottom-16 left-1/2 bg-secondary text-black p-2 transform -translate-x-1/2 z-20"
      >show Corrections</button>
    </transition>
  </div>
</template>

<script>
import PostContent from "~/components/PostContent.vue";
import CorrectionListPopup from "~/components/CorrectionListPopup.vue";
import diffMatchPatch from "diff-match-patch";
export default {
  components: {
    PostContent,
    CorrectionListPopup,
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
      showButton: true,
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
    selectCorrection(correction, screenSize) {
      this.selectedCorrection = correction;
      this.getDiff(correction);
      if (screenSize == "sm") {
        this.showCorrections = false;
      }
    },
    closeCorrections() {
      this.showCorrections = false;
    },
  },
  computed: {
    postStyle() {
      let result = "";
      if (this.showCorrections) {
        result += "md:w-2/3 md:pr-8 ";
      }
      if (this.selectedCorrection) {
        // make transition smoother when selecting correction
        result += "absolute z-0";
      }
      return result;
    },
  },
  created() {
    this.fetchData();
  },
  mounted() {
    let prevScrollpos = window.pageYOffset;
    window.onscroll = () => {
      let currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        this.showButton = true;
      } else {
        this.showButton = false;
      }
      prevScrollpos = currentScrollPos;
    };
  },
};
</script>

<style scoped>
#correction-detail {
  overflow: hidden;
}

#correction {
  transition: width 0.3s ease-in-out, transform 0.5s ease-in-out,
    opacity 0.5s ease-in-out;
}

.popup-enter-active,
.popup-leave-active {
  position: absolute;
}

.popup-enter,
.popup-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -30px);
}
.fade-enter {
  opacity: 0;
}
</style>
