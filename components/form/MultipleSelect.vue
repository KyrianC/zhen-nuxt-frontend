<template>
  <ul class="flex flex-row flex-wrap mx-4 flex-1">
    <li
      v-for="(choice, value) in choices"
      :key="value"
      class="bg-opacity-30 my-2 m-2 text-sm cursor-pointer"
      :class="
        `text-${value}-500 bg-${value}-200 ${$store.state.filters[
          name
        ].includes(value) && 'bg-opacity-100'}`
      "
      @click="handleSelect(value)"
    >
      <button class="flex items-center p-1">
        <svg
          aria-hidden="true"
          role="img"
          id="footer-sample-full"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1024 1024"
          class="mr-1"
        >
          <path
            v-show="$store.state.filters[name].includes(value)"
            d="M433.1 657.7a31.8 31.8 0 0 0 51.7 0l210.6-292c3.8-5.3 0-12.7-6.5-12.7H642c-10.2 0-19.9 4.9-25.9 13.3L459 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H315c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8z"
            fill="currentColor"
          ></path>
          <path
            d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"
            fill="currentColor"
          ></path>
        </svg>
        {{ choice }}
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    choices: Object,
    name: String
  },
  data() {
    return {
      selected: [...this.$store.state.filters[this.name]]
    };
  },
  methods: {
    handleSelect(value) {
      if (this.selected.includes(value)) {
        this.selected = this.selected.filter(x => {
          return x != value;
        });
      } else {
        this.selected.push(value);
      }
      this.$emit("select", this.selected);
    }
  }
};
</script>
