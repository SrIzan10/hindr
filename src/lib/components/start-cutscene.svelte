<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { track, type Key } from '#lib/tracks/tracks-start.ts';
  import { profilePhoto } from '#lib/profilePhoto.svelte.ts';
  import { introLines } from '#lib/cutscene-dialogue.svelte.ts';
  import introSrc from '#lib/assets/animation_start.mp4';
  import horseTalkSrc from '#lib/assets/horse_talks.mp4';
  import donkeyTalkSrc from '#lib/assets/donkey_talks.mp4';

  type Phase = 'intro' | 'talking';

  let phase = $state<Phase>('intro');
  let lineIndex = $state(0);
  let ready = $state(false);
  let pose = $state<Key>(track[0]);

  let introVideo: HTMLVideoElement | undefined = $state();
  let horseVideo: HTMLVideoElement | undefined = $state();
  let donkeyVideo: HTMLVideoElement | undefined = $state();

  const line = $derived(introLines[lineIndex] ?? introLines[0]);
  const narrating = $derived(line.speaker === 'narrator');

  function sample(t: number): Key {
    if (t <= track[0].t) return track[0];
    const last = track[track.length - 1];
    if (t >= last.t) return last;

    let i = track.findIndex((k) => k.t > t) - 1;
    const a = track[i], b = track[i + 1];
    const f = (t - a.t) / (b.t - a.t);
    const lerp = (p: number, q: number) => p + (q - p) * f;
    return { t, x: lerp(a.x, b.x), y: lerp(a.y, b.y), w: lerp(a.w, b.w), h: lerp(a.h, b.h) };
  }

  $effect(() => {
    if (phase !== 'intro') return;
    const video = introVideo;
    if (!video) return;

    let handle: number;
    const onFrame: VideoFrameRequestCallback = (_now, meta) => {
      pose = sample(meta.mediaTime);
      handle = video.requestVideoFrameCallback(onFrame);
    };

    const start = () => {
      ready = true;
      handle = video.requestVideoFrameCallback(onFrame);
    };

    if (video.readyState >= 2) start();
    else video.addEventListener('loadeddata', start, { once: true });

    return () => {
      video.removeEventListener('loadeddata', start);
      video.cancelVideoFrameCallback(handle);
    };
  });

  function nextLine() {
    if (lineIndex + 1 >= introLines.length) goto(resolve('/javi'));
    else lineIndex += 1;
  }

  function advance() {
    if (phase === 'intro') {
      ready = true;
      phase = 'talking';
      return;
    }
    nextLine();
  }

  $effect(() => {
    if (phase !== 'talking') return;
    const current = introLines[lineIndex];
    if (!current) {
      goto(resolve('/javi'));
      return;
    }
    const seconds = current.duration ?? Math.max(1.6, 0.4 * current.text.split(/\s+/).length + 0.6);
    const timer = setTimeout(nextLine, seconds * 1000);
    return () => clearTimeout(timer);
  });

  $effect(() => {
    if (phase !== 'talking') return;
    if (narrating) {
      for (const video of [horseVideo, donkeyVideo]) {
        if (!video) continue;
        video.pause();
        video.currentTime = 0;
      }
      return;
    }
    horseVideo?.play().catch(() => {});
    donkeyVideo?.play().catch(() => {});
  });

  $effect(() => {
    const onPointerDown = () => advance();
    window.addEventListener('pointerdown', onPointerDown);
    return () => window.removeEventListener('pointerdown', onPointerDown);
  });
</script>

<div class="fixed inset-0 overflow-hidden">
  {#if phase === 'intro'}
    <video
      bind:this={introVideo}
      src={introSrc}
      autoplay
      muted
      playsinline
      preload="auto"
      onended={() => (phase = 'talking')}
      class="block h-full w-full object-fill"
    ></video>
  {/if}

  {#if ready}
    <img
        src={profilePhoto.url}
        alt="User avatar"
        class="pointer-events-none absolute object-fill will-change-transform"
        style:left={`${pose.x}%`}
        style:top={`${pose.y}%`}
        style:width={`${pose.w}%`}
        style:height={`${pose.h}%`}
        style:transform="translate(-50%, -50%)"
      />
  {/if}

  <video
    bind:this={horseVideo}
    src={horseTalkSrc}
    loop
    muted
    autoplay
    playsinline
    preload="auto"
    style:display={phase === 'talking' && line.speaker !== 'donkey' ? 'block' : 'none'}
    class="h-full w-full object-fill"
  ></video>
  <video
    bind:this={donkeyVideo}
    src={donkeyTalkSrc}
    loop
    muted
    autoplay
    playsinline
    preload="auto"
    style:display={phase === 'talking' && line.speaker === 'donkey' ? 'block' : 'none'}
    class="h-full w-full object-fill"
  ></video>

  {#if phase === 'talking'}
    <div class="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center px-4 pb-6 sm:pb-10">
      {#key lineIndex}
        <p class="caption" class:narrator={narrating}>{line.text}</p>
      {/key}
    </div>
  {/if}
</div>

<style>
  .caption {
    max-width: min(92%, 56rem);
    text-align: center;
    font-size: clamp(1.4rem, 4.5vmin, 2.6rem);
    line-height: 1.3;
    color: #fff;
    text-shadow:
      0 0 6px rgb(0 0 0 / 0.9),
      0 2px 4px rgb(0 0 0 / 0.8);
    animation: caption-in 0.25s ease-out both;
  }

  .caption.narrator {
    font-style: italic;
    color: #d4d4d4;
  }

  @keyframes caption-in {
    from {
      opacity: 0;
      transform: translateY(0.4em);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
</style>
