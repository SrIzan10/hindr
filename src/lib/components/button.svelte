<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import buttonSrc from '#lib/assets/button.png';

  let {
    children,
    image = buttonSrc,
    width = '20%',
    color,
    type = 'button',
    class: className = '',
    ...rest
  }: HTMLButtonAttributes & {
    children?: Snippet;
    image?: string;
    width?: string;
    color?: string;
  } = $props();

  const uid = $props.id();
  const filterId = `button-tint-${uid}`;
</script>

<button {type} class="button {className}" style:width {...rest}>
  {#if color}
    <svg class="defs" aria-hidden="true">
      <filter id={filterId} color-interpolation-filters="sRGB">
        <!-- Alpha = red channel (boosted so the pink anti-aliased edge is covered too): fill opaque, black outline transparent. -->
        <!-- thanks claude -->
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  2 0 0 0 -0.4"
          result="lum"
        />
        <feComposite in="lum" in2="SourceAlpha" operator="in" result="fill" />
        <feFlood flood-color={color} />
        <feComposite in2="fill" operator="in" result="tint" />
        <feMerge>
          <feMergeNode in="SourceGraphic" />
          <feMergeNode in="tint" />
        </feMerge>
      </filter>
    </svg>
  {/if}
  <img
    src={image}
    alt=""
    draggable="false"
    style:filter={color ? `url(#${filterId})` : undefined}
  />
  {#if children}<span>{@render children()}</span>{/if}
</button>

<style>
  .button {
    position: relative;
    display: block;
    border: 0;
    padding: 0;
    background: none;
    cursor: pointer;
    font: inherit;
    line-height: 0;
  }

  .button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .defs {
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
  }

  /* The image stretches to fit the label, so long text grows the button instead of spilling over the outline. */
  .button img {
    position: absolute;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: fill;
    pointer-events: none;
  }

  .button span {
    position: relative;
    display: grid;
    place-items: center;
    aspect-ratio: 839 / 296;
    padding: 6% 12%;
    text-align: center;
    overflow-wrap: anywhere;
    line-height: 1.15;
    font-size: 1.25rem;
    font-weight: 700;
    color: #fff;
    pointer-events: none;
  }
</style>
