<script lang="ts">
  import type { Habit } from "@data/habits";

  // Check if the current item exists in the added habits
  export let habit: Habit;
  let state = habit;
</script>

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
          {#each input.options as [value, name] (name)}
            <option {value}>
              {name}
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
          {#each input.options as [value, name] (name)}
            <option {value}>
              {name}
            </option>
          {/each}
        </select>
      {/if}
    </label>
  </div>
{/each}
