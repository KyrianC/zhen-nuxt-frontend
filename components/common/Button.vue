<template>
  <div :class="`inline-block text-${size}`" @click="$emit('handleClick', $event)">
    <NuxtLink v-if="linkTo" :to="localePath(linkTo)">
      <button :class="scheme">{{ name }}</button>
    </NuxtLink>
    <button v-else :class="scheme">{{ name }}</button>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    linkTo: String,
    scheme: String,
    size: String,
  },
};
</script>

<style scoped>
button {
  padding: 0.5rem;
}

.primary {
  color: black;
  background-color: #bad7f2;
  border: 2px solid #bad7f2;
  transition: all 0.5s ease-in-out;
}

.primary:hover {
  color: white;
  background-color: transparent;
}

.secondary {
  color: white;
  border: 2px solid;
  border-color: transparent transparent #bad7f2;
  transition: all 0.5s ease-in-out;
}

.secondary:hover {
  color: black;
  border-color: #bad7f2;
  background-color: #bad7f2;
}

.danger {
  color: rgb(248, 113, 113);
  border: 2px solid rgb(248, 113, 113);
  background-color: transparent;
  transition: all 0.5s ease-in-out;
}

.danger:hover {
  background-color: rgb(248, 113, 113);
  color: white;
}
</style>
