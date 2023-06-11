<script lang="ts">
  import { createFormatter } from "@util/calculate";
  import { currentHabit, habits, modal } from "src/stores";

	console.log($habits);
	
</script>

<div
  class="absolute bottom-0 left-0 z-10 grid max-h-[25%] w-full grid-cols-[repeat(auto-fill,_minmax(170px,_1fr))] gap-2 self-start overflow-auto bg-base-300 p-2"
>
  {#each $habits as habit (habit.id)}
    {@const { time, frequency, liquid, generic } = habit.inputNames}

    <button
      class="btn flex h-24 max-h-full grow flex-col gap-1 bg-base-100 p-2 normal-case hover:bg-base-300"
      on:click={() => {
        currentHabit.set(habit);
        modal.toggleOpen();
      }}
      data-cy={`${habit.name}-drawer-card`}
    >
      <div class="flex text-base">
        <span>{habit.icon}</span>
        <p data-cy={`${habit.name}-drawer-card-name`}>{habit.name}</p>
      </div>

      {#if time && frequency}
        <span class="badge-info badge badge-sm">
          {createFormatter({
            frequency: frequency.selectedOption,
            dailyValue: Number(time.value),
            unit: time.selectedOption,
          }).hoursPerWeek}
        </span>
        <span class="badge-info badge badge-sm">
          {frequency.selectedOption === 7
            ? "daily"
            : `${frequency.selectedOption} times / week`}
        </span>
      {:else if liquid}
        <span class="badge-info badge badge-sm">
          {createFormatter({
            dailyValue: Number(liquid.value),
            unit: liquid.selectedOption,
          }).liquidPerWeek}
        </span>
        <span class="badge-info badge badge-sm">daily</span>
      {:else if generic}
        <span class="badge-info badge badge-sm">
          {Number(generic.value) * 7}
          {generic.options[0] && generic.options[0][1]} / week`
        </span>
        <span class="badge-info badge badge-sm">daily</span>
      {/if}
    </button>
  {/each}
</div>
