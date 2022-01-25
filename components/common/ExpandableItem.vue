<template>
  <!-- HACK transition is hacky -->
  <div id="expandable-item" class="py-4 overflow-hidden" :class="show ? 'show' : 'unshow'">
    <section
      @click="show = !show"
      class="h-full flex cursor-pointer justify-between items-center"
      id="header"
    >
      <p>{{ label }}</p>
      <img src="/chevron.svg" id="chevron" :class="show && 'show'" />
    </section>
    <section class="pt-4 px-4 text-justify" id="body">
      <slot></slot>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
  },
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style>
#expandable-item {
  transition: max-height 0.5s ease-out;
}

#expandable-item.unshow {
  max-height: 3.5rem;
}

#expandable-item.show {
  max-height: 24rem;
}

#chevron {
  transition: all 0.3s ease-in-out;
}

#chevron.show {
  transform: rotate(180deg);
}
</style>
