<template>
  <div>
    <h2 class="py-4 text-xl font-bold">FAQ</h2>
    <div class="px-4 divide-secondaryBackground divide-y-2">
      <ExpandableItem label="Question 1">Response 1</ExpandableItem>
      <ExpandableItem label="Question 2">Response 2</ExpandableItem>
      <ExpandableItem label="Question 3">Response 3</ExpandableItem>
      <ExpandableItem label="Question 4">Response 4</ExpandableItem>
      <ExpandableItem label="Question 5">Response 5</ExpandableItem>
    </div>
  </div>
</template>

<script>
import ExpandableItem from "~/components/common/ExpandableItem.vue";
export default {
  components: {
    ExpandableItem,
  },
};
</script>

<style>
</style>
