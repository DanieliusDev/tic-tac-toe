<script lang="ts">
  import "../app.css";
</script>

<svelte:head>
  <title>Tic-Tac-Toe</title>
</svelte:head>

<div class="flex items-center justify-center h-screen bg-gray-900 text-white">
  <div>
    <slot />
  </div>
</div>
