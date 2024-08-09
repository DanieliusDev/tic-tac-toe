<script lang="ts">
  import { Game } from "$lib";
  import { twMerge } from "tailwind-merge";
  import { scale } from "svelte/transition";
  import { X, Circle } from "lucide-svelte";

  const game = new Game();
</script>

{#snippet score(title: string, score: number, winner: boolean, turn = false)}
  <div
    class={twMerge(
      "flex flex-col items-center gap-2 opacity-60",
      winner && "text-green-500",
      (turn || game.winner) && "opacity-100",
    )}
  >
    <span class="text-xl text-gray-200">{title}</span>
    <span class="text-4xl">{score}</span>
  </div>
{/snippet}

<div class="space-y-5">
  <div class="grid grid-cols-3 gap-4">
    {#each game.board as state, position}
      <button
        onclick={() => game.inset(position)}
        class={twMerge(
          "size-24 sm:size-32 bg-gray-800 rounded-lg opacity-60",
          (game.winningLine?.includes(position) || !game.winner) &&
            "opacity-100",
        )}
      >
        {#if state}
          <span
            transition:scale={{ duration: 200 }}
            class="flex justify-center items-center h-full"
          >
            {#if state === "X"}
              <X class="size-24 sm:size-32" />
            {:else}
              <Circle class="size-16 sm:size-24 stroke-[2.5]" />
            {/if}
          </span>
        {/if}
      </button>
    {/each}
  </div>

  <div class="flex justify-evenly">
    {@render score(
      "Player 1 (X)",
      game.scores.X,
      game.winner === "X",
      game.turn === "X",
    )}
    {@render score("Tie", game.scores.tie, game.winner === "tie")}
    {@render score(
      "Player 2 (O)",
      game.scores.O,
      game.winner === "O",
      game.turn === "O",
    )}
  </div>
</div>
