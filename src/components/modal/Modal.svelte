<script lang="ts">
  import ModalForm from "./ModalForm.svelte";
  import { currentHabit, modal } from "src/stores";
  import { fade } from "svelte/transition";
</script>

<div out:fade={{duration: 200}}>
  <div class="modal modal-open">
    <div class="modal-box flex max-w-md flex-col gap-2">
      <button
        class="btn-sm btn-circle btn absolute right-2 top-2 border-none bg-transparent text-lg"
        on:click={modal.toggleOpen}
      >
        ✕
      </button>
      <h2 class="flex items-center text-xl font-bold" data-cy="modal-title">
        <span class="pr-2 text-2xl">{$currentHabit.icon}</span>
        {$currentHabit.name}
      </h2>
      <ModalForm habit={$currentHabit} />
    </div>
  </div>
</div>
