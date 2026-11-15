<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import frameSrc from '#lib/assets/frame.png';
  import maskSrc from '#lib/assets/frame-mask.png';
  import Button from '#lib/components/button.svelte';
  import { horseCards, type Card } from '#lib/game.svelte.ts';
  import matchFound from '#lib/assets/matchfound.png'


  let {
    cards = horseCards,
    threshold = 110,
    onswipe,
    onempty
  }: {
    cards?: Card[];
    threshold?: number;
    onswipe?: (card: Card, direction: 'left' | 'right') => void;
    onempty?: () => void;
  } = $props();

  let index = $state(0);
  let x = $state(0);
  let y = $state(0);
  let dragging = $state(false);
  let leaving = $state<0 | -1 | 1>(0);
  let showMatch = $state(false);

  let originX = 0;
  let originY = 0;

  const visible = $derived(cards.slice(index, index + 3));
  const progress = $derived(Math.min(Math.abs(x) / threshold, 1));
  const done = $derived(index >= cards.length);
  const tint = $derived(x > 0 ? '#FF0076' : x < 0 ? '#000' : null);

  function giveUp() {
    goto(resolve('/give-up'));
  }

  function swipe(dir: 1 | -1) {
    if (leaving || done) return;
    leaving = dir;
    x = dir * (window.innerWidth + 200);

    setTimeout(() => {
      const card = cards[index];
      if (dir === 1) {
        showMatch = true;

        setTimeout(() => {
          goto(resolve(`/its-a-match?horse=${card.id}`), { persistState: true });
        }, 2000);
      }
      onswipe?.(card, dir === 1 ? 'right' : 'left');
      index += 1;
      x = 0;
      y = 0;
      leaving = 0;
      if (index >= cards.length) onempty?.();
    }, 280);
  }

  function onpointerdown(e: PointerEvent) {
    if (leaving || e.button !== 0) return;
    dragging = true;
    originX = e.clientX;
    originY = e.clientY;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onpointermove(e: PointerEvent) {
    if (!dragging) return;
    x = e.clientX - originX;
    y = (e.clientY - originY) * 0.4;
  }

  function onpointerup() {
    if (!dragging) return;
    dragging = false;
    if (Math.abs(x) >= threshold) {
      swipe(x > 0 ? 1 : -1);
    } else {
      x = 0;
      y = 0;
    }
  }

  function onkeydown(e: KeyboardEvent) {
    const t = e.target as HTMLElement | null;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    if (e.repeat) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      swipe(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      swipe(-1);
    }
  }

  function cardStyle(i: number) {
    let transform: string;
    let opacity = 1;
    if (i === 0) {
      transform = `translate(${x}px, ${y}px) rotate(${x / 18}deg)`;
    } else {
      const lift = i === 1 ? progress : 0;
      const scale = 1 - i * 0.05 + lift * 0.05;
      const shift = i * 14 - lift * 14;
      transform = `translateY(${shift}px) scale(${scale})`;
      opacity = i === 1 ? progress : 0;
    }
    return `transform: ${transform}; opacity: ${opacity}; z-index: ${10 - i};`;
  }
</script>

<svelte:window {onkeydown} />

<section
  class="deck"
  style:--mask={`url(${maskSrc})`}
  style:--frame={`url(${frameSrc})`}
  aria-label="Swipe deck. Use the left and right arrow keys, or drag a card."
>
  <div class="stack">
    {#if showMatch}
      <div class="match">
        <img src={matchFound} alt="It's a match!" draggable="false" />
      </div>
    {/if}

    {#if done}
      <div class="empty">
        <p>No one else's interested in you :(</p>
        <Button onclick={giveUp}>Give up</Button>
      </div>
    {/if}

    {#each visible as card, i (card.id)}
      <article
        class="card"
        class:top={i === 0}
        class:dragging={i === 0 && dragging}
        style={cardStyle(i)}
        onpointerdown={i === 0 ? onpointerdown : undefined}
        onpointermove={i === 0 ? onpointermove : undefined}
        onpointerup={i === 0 ? onpointerup : undefined}
        onpointercancel={i === 0 ? onpointerup : undefined}
      >
        <div
          class="photo"
          style:background-image={card.image ? `url('${card.image}')` : undefined}
        ></div>
        <img class="frame" src={frameSrc} alt="" aria-hidden="true" draggable="false" />
        {#if i === 0 && tint}
          <div class="frame-tint" style:background={tint} style:opacity={progress}></div>
        {/if}

        <div class="caption">
          <h2>{card.name}</h2>
          {#if card.description}<p>{card.description}</p>{/if}
        </div>
      </article>
    {/each}
  </div>
  <p class="hint">Swipe or use the arrow keys.</p>
</section>

<style>
  .deck {
    --radius: 22px;

    --pad-top: 7%;
    --pad-right: 6.5%;
    --pad-bottom: 6%;
    --pad-left: 9%;

    display: grid;
    justify-items: center;
    gap: 1.25rem;
    width: min(100%, 32rem, 62dvh);
    margin-inline: auto;
  }

  .stack {
    position: relative;
    width: 100%;
    aspect-ratio: 705 / 885;
  }

  .card {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: flex-start;
    color: #fff;
    user-select: none;
    -webkit-user-select: none;
    transition:
      transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1),
      opacity 0.28s;
    will-change: transform;
  }

  .card.top {
    cursor: grab;
    touch-action: none;
  }

  .card.dragging {
    cursor: grabbing;
    transition: none;
  }

  .photo {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    -webkit-mask-image: var(--mask);
    mask-image: var(--mask);
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
  }

  .frame {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: fill;
    pointer-events: none;
  }

  .frame-tint {
    position: absolute;
    inset: 0;
    pointer-events: none;
    -webkit-mask-image: var(--frame);
    mask-image: var(--frame);
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
  }

  .caption {
    position: relative;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: calc(var(--pad-top) + 1rem) calc(var(--pad-right) + 1rem) calc(var(--pad-bottom) + 1rem) calc(var(--pad-left) + 1rem);
    pointer-events: none;
  }

  .caption h2 {
    margin: 0;
    font-size: 2.25rem;
    line-height: 1.1;
  }

  .caption p {
    margin: 0 0 5% 5%;
    font-size: 1.25rem;
    opacity: 0.9;
  }

  .empty {
    position: absolute;
    inset: 0;
    display: grid;
    place-content: center;
    justify-items: center;
    gap: 0.75rem;
  }

  .empty p {
    margin: 0;
    text-align: center;
    font-size: 1.25rem;
  }

  .hint {
    font-size: 0.85rem;
  }

  .match {
    position: fixed;
    inset: 0;
    z-index: 20;
    display: grid;
    place-items: center;
    background: rgb(0 0 0 / 0.75);
    animation: dim-in 0.4s ease-out both;
  }

  .match img {
    max-width: 40vmin;
    max-height: 40vmin;
    object-fit: contain;
    animation: zoom-in 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  }

  @keyframes dim-in {
    from {
      background: rgb(0 0 0 / 0);
    }
    to {
      background: rgb(0 0 0 / 0.75);
    }
  }

  @keyframes zoom-in {
    from {
      transform: scale(0.2);
      opacity: 0;
    }
    to {
      transform: scale(2.2);
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .card {
      transition: none;
    }

    .match,
    .match img {
      animation: none;
    }
  }
</style>
