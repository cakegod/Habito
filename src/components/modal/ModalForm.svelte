<script lang="ts">
  import ModalInputs from "./ModalInputs.svelte";
  import type { Habit } from "@data/habits";
  import { modal, habits } from "src/stores";

  // Check if the current item exists in the added habits
  $: isPresent = $habits.some((h) => h.id === habit.id) && $modal;
  export let habit: Habit;
  function handleSubmit(habit: Habit) {
    modal.toggleOpen();
    habits.add(habit);
  }
</script>

<form on:submit|preventDefault={() => handleSubmit(habit)}>
  <ModalInputs {habit} />
  <div class="modal-action">
    {#if isPresent}
      <button
        type="button"
        class="btn-ghost btn grow text-error"
        on:click={() => {
          modal.toggleOpen();
          habits.delete(habit);
        }}
        data-cy="remove-btn"
      >
        Remove
      </button>
      <button class="btn-success btn grow" type="submit" data-cy="btn-update">
        Update
      </button>
    {:else}
      <button
        type="button"
        class="btn-ghost btn grow"
        on:click={modal.toggleOpen}
        data-cy="cancel-btn"
      >
        Cancel
      </button>
      <button class="btn-primary btn grow" type="submit" data-cy="btn-submit">
        Add Habit
      </button>
    {/if}
  </div>
</form>
