<script lang="ts">
  import type { Habit } from "@data/habits";
  import { currentHabit, modal } from "src/stores";
  import {
    formatGenericPerYear,
    formatLiquidPerYear,
    formatTimePerYear,
  } from "@util/calculate";
  import { generateFunComparaison } from "@util/funComparaison";
  import { transformToObj } from "@util/transform";

  const gradients = [
    "bg-gradient-to-r from-sky-400 to-blue-500",
    "bg-gradient-to-r from-emerald-500 to-lime-600",
    "bg-gradient-to-r from-red-500 to-red-800",
    "bg-gradient-to-r from-orange-600 to-orange-500",
  ];

  export let year: number;
  export let index: number;
  export let habit: Habit;
  let inputs = transformToObj(habit.inputs);
  let { time, frequency, liquid, generic } = inputs;
  $: inputs = transformToObj(habit.inputs);
  $: {
    ({ time, frequency, liquid, generic } = inputs);
  }
</script>

<button
  class="card cursor-pointer gap-1 p-4 {gradients[index % 4]} w-full"
  on:click={() => {
    currentHabit.set(habit), modal.toggleOpen();
  }}
  data-cy="{habit.name}-grid-card"
>
  <div class="flex items-center gap-2 text-xl font-bold uppercase">
    <span class="text-base">{habit.icon}</span>
    <p class="text-sm text-base-300/80">{habit.name}</p>
  </div>

  <p class="text-3xl font-bold text-base-300">
    {#if time && frequency}
      {formatTimePerYear({
        frequency: frequency.selectedOption,
        dailyValue: Number(time.value),
        unit: time.selectedOption,
        year,
      })}
    {:else if liquid}
      {formatLiquidPerYear({
        dailyValue: Number(liquid.value),
        unit: liquid.selectedOption,
        year,
      })}
    {:else if generic}
      {formatGenericPerYear({
        dailyValue: Number(generic.value),
        year,
      })}
      {generic.options[0] && generic.options[0][1]}
    {/if}
  </p>

  <p class="text-start text-sm text-base-300">
    {generateFunComparaison(habit, inputs, year)}
  </p>
</button>
