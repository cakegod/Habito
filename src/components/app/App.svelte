<script lang="ts">
  import { habits, isModalOpen } from "@stores/habits";
  import HabitsList from "./HabitsList.svelte";
  import HabitsDrawer from "./HabitsDrawer.svelte";
  import HabitsGrid from "./HabitsGrid.svelte";
  import Modal from "@components/modal/Modal.svelte";

  function handleNext() {
    index = 1;
  }

  function handleBack() {
    index = 0;
  }

  let index: 0 | 1 = 0;
  let year = 1;
</script>

<div class="w-full max-w-xl grow">
  <main class="flex w-full max-w-3xl flex-col items-center">
    {#if index === 0}
      <HabitsList />
      <div class="mt-10 flex w-full justify-center">
        <button
          class="btn-success btn-lg btn"
          on:click={handleNext}
          disabled={!$habits.length}
          data-cy="btn-calculate"
        >
          Calculate my habits!
          <span class="m-1 text-xl">😎</span>
        </button>
      </div>
      <HabitsDrawer />
    {:else}
      <h2 class="mb-4 flex items-center self-start text-lg">
        In
        <input
          type="number"
          bind:value={year}
          min={1}
          max={99}
          class="input mx-2 w-20 bg-neutral text-center font-bold"
        />
        year{year > 1 && "s"}, you will achieve:
      </h2>
      <HabitsGrid {year} />
      <div class="mt-10 flex w-full items-center justify-center">
        <button
          class="btn-info btn-lg btn text-center"
          on:click={handleBack}
          data-cy="btn-info"
        >
          <span class="mx-1 rotate-180">➤</span>
          Back to habit selection
        </button>
      </div>
    {/if}

    {#if $isModalOpen}
      <Modal />
    {/if}
  </main>
</div>
