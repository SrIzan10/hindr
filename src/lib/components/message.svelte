<script lang="ts">
    import type { Message } from "#lib/game.svelte.ts";
    import authorSrc from "#lib/assets/bubble-author.png";
    import receivedSrc from "#lib/assets/bubble-received.png";

    let { text, from, loading }: Message & { loading?: boolean } = $props();

    const mine = $derived(from === "user");
</script>

<div class="row" class:mine>
    <p class="bubble" class:mine style:--bubble={`url(${mine ? authorSrc : receivedSrc})`}>
        {#if loading}
            <span class="dot-typing">Loading...</span>
        {:else}
            {text}
        {/if}
    </p>
</div>

<style>
    .row {
        display: flex;
        min-width: 0;
        justify-content: flex-start;
    }

    .row.mine {
        justify-content: flex-end;
    }

    .bubble {
        --slice: 120 150 140 170;

        --edge: 18px 22px 21px 26px;

        max-width: 80%;
        margin: 0;
        padding: 0.15rem 0.35rem;
        border-style: solid;
        border-color: transparent;
        border-width: var(--edge);
        border-image-source: var(--bubble);
        border-image-slice: var(--slice) fill;
        border-image-width: var(--edge);
        border-image-repeat: stretch;
        background: transparent;
        color: #000;
        --dot: rgb(0 0 0 / 0.4);
        line-height: 1.3;
        overflow-wrap: anywhere;
    }

    /* The author bubble's tail is bottom-right, so its wide slice is on the right. */
    .bubble.mine {
        --slice: 120 170 140 150;
        --edge: 18px 26px 21px 22px;
        color: #fff;
        --dot: rgb(255 255 255 / 0.7);
    }


    /* animation from https://github.com/nzbin/three-dots/blob/master/scss/_dot-typing.scss */
    .dot-typing {
      position: relative;
      left: -9999px;
      display: inline-block;
      vertical-align: middle;
      /* The shadows reach 15px left and right of the box; reserve that space. */
      margin: 0 15px;
      /* Keep the "Loading..." text for screen readers without letting it take up width. */
      font-size: 0;

      width: 10px;
      height: 10px;
      border-radius: 5px;
      background-color: var(--dot);
      color: var(--dot);
    
      box-shadow:
        9984px 0 0 0 var(--dot),
        9999px 0 0 0 var(--dot),
        10014px 0 0 0 var(--dot);
    
      animation: dot-typing 1.5s infinite linear;
    }
    
    @keyframes dot-typing {
      0% {
        box-shadow:
          9984px 0 0 0 var(--dot),
          9999px 0 0 0 var(--dot),
          10014px 0 0 0 var(--dot);
      }
    
      16.667% {
        box-shadow:
          9984px -10px 0 0 var(--dot),
          9999px 0 0 0 var(--dot),
          10014px 0 0 0 var(--dot);
      }
    
      33.333% {
        box-shadow:
          9984px 0 0 0 var(--dot),
          9999px 0 0 0 var(--dot),
          10014px 0 0 0 var(--dot);
      }
    
      50% {
        box-shadow:
          9984px 0 0 0 var(--dot),
          9999px -10px 0 0 var(--dot),
          10014px 0 0 0 var(--dot);
      }
    
      66.667% {
        box-shadow:
          9984px 0 0 0 var(--dot),
          9999px 0 0 0 var(--dot),
          10014px 0 0 0 var(--dot);
      }
    
      83.333% {
        box-shadow:
          9984px 0 0 0 var(--dot),
          9999px 0 0 0 var(--dot),
          10014px -10px 0 0 var(--dot);
      }
    
      100% {
        box-shadow:
          9984px 0 0 0 var(--dot),
          9999px 0 0 0 var(--dot),
          10014px 0 0 0 var(--dot);
      }
    }
</style>
