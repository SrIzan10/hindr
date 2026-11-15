<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	let isFullscreen = $state(false);

	function toggleFullscreen() {
		if (document.fullscreenElement) document.exitFullscreen();
		else document.documentElement.requestFullscreen?.().catch(() => {});
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<svelte:document onfullscreenchange={() => (isFullscreen = !!document.fullscreenElement)} />

{@render children()}

<button
	class="fullscreen-toggle"
	onclick={toggleFullscreen}
	aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
	title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
>
	{#if isFullscreen}
		<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" /></svg>
	{:else}
		<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
	{/if}
</button>

<style>
	.fullscreen-toggle {
		position: fixed;
		top: 12px;
		right: 12px;
		z-index: 9999;
		width: 44px;
		height: 44px;
		display: grid;
		place-items: center;
		border: none;
		border-radius: 10px;
		background: rgba(0, 0, 0, 0.55);
		color: #fff;
		cursor: pointer;
	}
	.fullscreen-toggle:hover {
		background: rgba(0, 0, 0, 0.75);
	}
</style>
