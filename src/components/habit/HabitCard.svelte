<script lang="ts">
  import type { Habit } from "@data/habits";
  import { currentHabit, modal } from "src/stores";
  import { generateFunComparaison, createFormatter } from "@util/index";
  import { slide } from "svelte/transition";

  const gradients = [
    "bg-gradient-to-r from-sky-400 to-blue-500",
    "bg-gradient-to-r from-emerald-500 to-lime-600",
    "bg-gradient-to-r from-red-500 to-red-800",
    "bg-gradient-to-r from-orange-600 to-orange-500",
  ];

  export let years: number;
  export let index: number;
  export let habit: Habit;
  let inputs = habit.inputNames;
  let { time, frequency, liquid, generic } = inputs;
  $: inputs = habit.inputNames;
  $: {
    ({ time, frequency, liquid, generic } = inputs);
  }
</script>

<button
  class="card no-animation cursor-pointer gap-1 p-4 {gradients[
    index % 4
  ]} w-full"
  on:click={() => {
    currentHabit.set(habit), modal.toggleOpen();
  }}
  in:slide={{ duration: 200 }}
  data-cy="{habit.name}-grid-card"
>
  <div class="flex items-center gap-2 text-xl font-bold uppercase">
    <span class="text-base">{habit.icon}</span>
    <p class="text-sm text-base-300/80">{habit.name}</p>
  </div>

  <p class="text-3xl font-bold text-base-300">
    {#if time && frequency}
      {createFormatter({
        frequency: frequency.selectedOption,
        dailyValue: Number(time.value),
        unit: time.selectedOption,
        years,
      }).hoursPerYear}
    {:else if liquid}
      {createFormatter({
        dailyValue: Number(liquid.value),
        unit: liquid.selectedOption,
        years,
      }).liquidPerYear}
    {:else if generic}
      {createFormatter({
        dailyValue: Number(generic.value),
        years,
      }).hoursPerYear}
      {generic.options[0] && generic.options[0][1]}
    {/if}
  </p>

  <p class="text-start text-sm text-base-300">
    {generateFunComparaison({habit, inputs, years})}
  </p>
</button>
