<template>
  <div id="correction-detail" class="min-h-screen">
    <div class="relative flex">
      <PostContent :class="postStyle" :post="post" />

      <template v-if="$auth.loggedIn && $auth.user.pk == post.author.pk">
        <transition name="popup">
          <div
            id="correction"
            class="w-full relative"
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
              <ValidateCorrectionModal :correction="selectedCorrection" />

              <Button
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
      </template>
    </div>

    <transition v-if="$auth.loggedIn && $auth.user.posts.includes(post.id)" name="fade">
      <button
        @click="showCorrections = true"
        v-show="!showCorrections && showButton"
        class="rounded-md fixed bottom-16 left-1/2 bg-secondary text-black p-2 transform -translate-x-1/2"
      >show Corrections</button>
    </transition>
  </div>
</template>

<script>
import PostContent from "~/components/PostContent.vue";
import CorrectionListPopup from "~/components/CorrectionListPopup.vue";
import Button from "~/components/common/Button.vue";
import ValidateCorrectionModal from "~/components/correction/ValidateCorrectionModal.vue";
import diffMatchPatch from "diff-match-patch";
export default {
  components: {
    PostContent,
    CorrectionListPopup,
    Button,
    ValidateCorrectionModal,
  },
  async asyncData({ params, $axios, $auth }) {
    try {
      let post = await $axios.$get(`/posts/${params.slug}/`);
      const corrections = await $axios.$get(
        `/posts/correction/list/${params.slug}/`
      );
      const valid = corrections.results.find((x) => x.is_valid == true);
      // don't show valid correction if user is original post author
      if (
        (($auth.loggedIn && $auth.user.pk != post.author.pk) ||
          !$auth.loggedIn) &&
        valid
      ) {
        post = valid;
      }
      return {
        post,
        corrections,
      };
    } catch (e) {
      console.log(e);
    }
  },
  data() {
    return {
      showCorrections: false,
      selectedCorrection: null,
      diff: [],
      showButton: true,
    };
  },
  methods: {
    async validateCorrection() {
      try {
        await this.$axios.$post(
          `posts/correction/validate/${this.selectedCorrection.id}/`
        );
        this.$toast.success(
          `Validated Correction by ${this.selectedCorrection.author.username}`
        );
        this.$router.push(`/posts/correction-detail/${this.post.slug}`);
      } catch (e) {
        this.$toast.error("something went wrong.");
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
    async setCorrectionSeen(correction) {
      this.$axios.$post(`posts/correction/mark-seen/${correction.id}/`);
      correction.seen_by_author = true;
    },
    selectCorrection(correction, screenSize) {
      this.selectedCorrection = correction;
      this.getDiff(correction);
      if (!correction.seen_by_author) {
        this.setCorrectionSeen(correction);
      }

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
        result += "absolute";
      }
      return result;
    },
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
  /* scroll-behavior: smooth; */
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
