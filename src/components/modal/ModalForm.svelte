<script lang="ts">
  import type { Habit } from "@data/habits";
  import { toggleModal, addHabit, deleteHabit, habits } from "@stores/habits";

  // Check if the current item exists in the added habits
  $: isPresent = $habits.some((habit) => habit.id === state.id);
  export let habit: Habit;
  let state = habit;
  function handleSubmit(habit: Habit) {
    // FIXME: Find a better way to handle this bug
    // Small timeout to prevent seeing the modal changing content
    setTimeout(() => addHabit({ ...habit, ...state }), 200);
    toggleModal();
  }
</script>

<form on:submit|preventDefault={() => handleSubmit(habit)}>
  {#each state.inputs as input}
    <div class="form-control">
      <div class="label">
        <span class="label-text">{input.label}</span>
      </div>
      <label class="input-group">
        {#if input.inputCategory === "inputSelect"}
          <select
            class="select w-full bg-base-200"
            bind:value={input.selectedOption}
            name="selectedOption"
            data-cy="input-dropdown"
          >
            {#each input.options as option (option[1])}
              <option value={option[0]}>
                {option[1]}
              </option>
            {/each}
          </select>
        {:else if input.inputCategory === "inputGroup"}
          <input
            type="number"
            required
            tabIndex={0}
            min="0"
            step="1"
            placeholder={input.placeholder}
            bind:value={input.value}
            class="input w-full bg-base-200 placeholder:text-base-content/50"
            name="value"
            data-cy="input"
          />
          <select
            class="select bg-base-300 uppercase"
            bind:value={input.selectedOption}
            name="selectedOption"
            data-cy="input-select"
          >
            {#each input.options as option (option[0])}
              <option value={option[0]}>
                {option[1]}
              </option>
            {/each}
          </select>
        {/if}
      </label>
    </div>
  {/each}
  <div class="modal-action">
    {#if isPresent}
      <button
        type="button"
        class="btn-ghost btn grow text-error"
        on:click={() => {
          toggleModal(), deleteHabit(habit);
        }}
        data-cy={"remove-btn"}
      >
        Remove
      </button>
      <button class="btn-success btn grow" type="submit" data-cy={"btn-update"}>
        Update
      </button>
    {:else}
      <button
        type="button"
        class="btn-ghost btn grow"
        on:click={() => toggleModal()}
        data-cy={"cancel-btn"}
      >
        Cancel
      </button>
      <button class="btn-primary btn grow" type="submit" data-cy={"btn-submit"}>
        Add Habit
      </button>
    {/if}
  </div>
</form>
