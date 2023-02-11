<script lang="ts">
  import { habitsData } from "@data/habits";
  import { habits, toggleModal } from "@stores/habits";

  $: filteredHabits = habitsData.filter(
    (habitData) => !$habits.some((habit) => habitData.id === habit.id)
  );
</script>

<section class="grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
  {#each filteredHabits as habit}
    <button
      class={`btn h-24 flex-col border-none normal-case`}
     
      data-cy={habit.name}
      on:click={() => toggleModal(habit)}
    >
      <span class="flex grow items-center text-lg">{habit.icon}</span>
      <h2 class="flex grow items-start text-center">{habit.name}</h2>
    </button>
  {/each}
</section>
