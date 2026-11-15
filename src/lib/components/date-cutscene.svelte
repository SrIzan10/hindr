<script lang="ts">
  import { goto } from '$app/navigation';
  import { track, type Key } from '#lib/tracks/tracks-start.ts';
  import { profilePhoto } from '#lib/profilePhoto.svelte.ts';
  import videoSrc from '#lib/assets/test.mp4';

  let video: HTMLVideoElement;
  let ready = $state(false);
  let pose = $state<Key>(track[0]);

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
    let handle: number;
    let finished = false;
    const endTime = track[track.length - 1].t;

    const onFrame: VideoFrameRequestCallback = (_now, meta) => {
      if (!finished && meta.mediaTime >= endTime) {
        finished = true;
        return;
      }
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
</script>

<div class="fixed inset-0 overflow-hidden">
  <video bind:this={video} src={videoSrc} autoplay muted playsinline preload="auto" class="block h-full w-full object-fill"></video>

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
</div>
