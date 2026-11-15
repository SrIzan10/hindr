<script lang="ts">
    import type { Message } from "#lib/game.svelte.ts";
    import authorSrc from "#lib/assets/bubble-author.png";
    import receivedSrc from "#lib/assets/bubble-received.png";

    let { text, from }: Message = $props();

    const mine = $derived(from === "user");
</script>

<div class="row" class:mine>
    <p class="bubble" class:mine style:--bubble={`url(${mine ? authorSrc : receivedSrc})`}>
        {text}
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
        /* Slice insets in image pixels (760×404) — the tail lives in the bottom corner. */
        --slice: 120 150 140 170;
        /* How thick those slices render on screen. */
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
        line-height: 1.3;
        overflow-wrap: anywhere;
    }

    /* The author bubble's tail is bottom-right, so its wide slice is on the right. */
    .bubble.mine {
        --slice: 120 170 140 150;
        --edge: 18px 26px 21px 22px;
        color: #fff;
    }
</style>
