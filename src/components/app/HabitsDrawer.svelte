<script lang="ts">
  import { habits, toggleModal } from "@stores/habits";
  import { formatLiquidPerWeek, formatTimePerWeek } from "@util/calculate";
  import { transformToObj } from "@util/transform";
</script>

<div
  class="absolute bottom-0 left-0 z-10 grid max-h-[25%] w-full grid-cols-[repeat(auto-fill,_minmax(170px,_1fr))] gap-2 self-start overflow-auto bg-base-300 p-2"
>
  {#each $habits as habit (habit.id)}
    {@const { time, frequency, liquid, generic } = transformToObj(habit.inputs)}

    <button
      class="btn flex h-24 max-h-full grow flex-col gap-1 bg-base-100 p-2 normal-case hover:bg-base-300"
      on:click={() => toggleModal(habit)}
      data-cy={`${habit.name}-drawer-card`}
    >
      <div class="flex text-base">
        <span>{habit.icon}</span>
        <p data-cy={`${habit.name}-drawer-card-name`}>{habit.name}</p>
      </div>

      {#if time && frequency}
        <span class="badge-info badge badge-sm ">
          {formatTimePerWeek({
            frequency: frequency.selectedOption,
            dailyValue: Number(time.value),
            unit: time.selectedOption,
          })}
        </span>
        <span class="badge-info badge badge-sm ">
          {frequency.selectedOption === "7"
            ? "daily"
            : `${frequency.selectedOption} times / week`}
        </span>
      {:else if liquid}
        <span class="badge-info badge badge-sm ">
          {formatLiquidPerWeek({
            dailyValue: Number(liquid.value),
            unit: liquid.selectedOption,
          })}
        </span>
        <span class="badge-info badge badge-sm ">daily</span>
      {:else if generic}
        <span class="badge-info badge badge-sm "
          >{`${Number(generic.value) * 7} ${
            generic.options[0] !== undefined && generic.options[0][1]
          } / week`}</span
        >
        <span class="badge-info badge badge-sm ">daily</span>
      {/if}
    </button>
  {/each}
</div>
