<script lang="ts">
  import HabitCard from "./HabitCard.svelte";
  import { habits } from "@stores/habits";
  export let year: number;
</script>

<section class="grid w-full grid-cols-[repeat(2,_minmax(150px,_300px))] gap-2">
  {#each $habits as habit, index}
    <HabitCard {habit} {index} {year} />
  {/each}
</section>
