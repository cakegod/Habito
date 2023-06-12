<script lang="ts">
  import { onMount } from "svelte";
  import HabitCard from "./HabitCard.svelte";
  import { habits } from "src/stores";
  import type { Habit } from "@data/habits";

  export let years: number;

  let cloneHabits = [...$habits];
  let habitList: Habit[] = [];

  let intervalID: NodeJS.Timeout;
  onMount(() => {
    intervalID = setInterval(() => {
      if (cloneHabits.length) {
        habitList.push(...cloneHabits.splice(0, 1));
      } else {
        clearInterval(intervalID);
      }
      habitList = habitList;
    }, 500);
  });
</script>

<section class="grid w-full grid-cols-[repeat(2,_minmax(150px,_300px))] gap-2">
  {#each habitList as habit, index (index)}
      <HabitCard {habit} {index} {years} />
  {/each}
</section>
