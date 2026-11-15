<script lang="ts">
    import { onMount, onDestroy } from 'svelte'
    import HorseProfile from '#lib/assets/horse_profile.jpg'
    import frameSrc from '#lib/assets/frame-horizontal.png'
    import maskSrc from '#lib/assets/frame-mask-horizontal.png'
    import Button from '#lib/components/button.svelte'
    import { profilePhoto } from '#lib/profilePhoto.svelte.ts'
    import { goto } from '$app/navigation';


    const STRETCH_X = 3.18
    const STRETCH_Y = 2.29
    const EXPORT_HEIGHT = 600

    let video: HTMLVideoElement | undefined = $state()
    let face: HTMLDivElement | undefined = $state()
    let stream: MediaStream | undefined
    let error = $state('')

    onMount(async () => {
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user' },
                audio: false
            })
            if (video) video.srcObject = stream
        } catch (e) {
            error = 'Camera unavailable. Please allow camera access.'
        }
    })

    onDestroy(() => {
        stream?.getTracks().forEach((t) => t.stop())
    })

    async function submit() {
        if (!video || !video.videoWidth || !face) return

        const { width: w, height: h } = face.getBoundingClientRect()
        const border = parseFloat(getComputedStyle(face).borderTopWidth)
        const scale = EXPORT_HEIGHT / h

        const canvas = document.createElement('canvas')
        canvas.width = Math.round(w * scale)
        canvas.height = Math.round(h * scale)

        const ctx = canvas.getContext('2d')
        if (!ctx) return
        ctx.scale(scale, scale)

        ctx.beginPath()
        ctx.ellipse(w / 2, h / 2, w / 2, h / 2, 0, 0, Math.PI * 2)
        ctx.fillStyle = '#000'
        ctx.fill()

        const iw = w - border * 2
        const ih = h - border * 2
        ctx.beginPath()
        ctx.ellipse(w / 2, h / 2, iw / 2, ih / 2, 0, 0, Math.PI * 2)
        ctx.clip()

        ctx.fillStyle = '#fff'
        ctx.fillRect(border, border, iw, ih)

        ctx.translate(w / 2, h / 2)
        ctx.scale(-STRETCH_X, STRETCH_Y)
        ctx.drawImage(video, -iw / 2, -ih / 2, iw, ih)

        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'))
        if (!blob) return

        profilePhoto.set(blob)
        goto("/start-cutscene")
    }
</script>

<div class="profile">
    <h1>Welcome to Hindr: The Game!</h1>

    <div class="framed" style:--mask={`url(${maskSrc})`}>
        <img class="photo" src={HorseProfile} alt="Horse" />

        <div class="face" bind:this={face}>
            <video
                bind:this={video}
                autoplay
                playsinline
                muted
                style:transform="scale({-STRETCH_X}, {STRETCH_Y})"
            ></video>
            {#if error}<span class="error text-red-400">{error}</span>{/if}
        </div>

        <img class="frame" src={frameSrc} alt="" aria-hidden="true" draggable="false" />
    </div>

    <Button onclick={submit}>Start!</Button>

</div>

<style>
    h1 {
        font-size: 500%;
        text-align: center;
    }

    .profile {
      position: fixed;
      inset: 0;
      z-index: 20;
      display: grid;
      place-items: center;
      animation: dim-in 0.4s ease-out both;
    }

    .framed {
      position: relative;
      width: min(70vmin, 90vw);
      aspect-ratio: 4 / 3;
      animation: zoom-in 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) both;
    }

    .photo,
    .frame {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }

    .photo {
      object-fit: cover;
      -webkit-mask-image: var(--mask);
      mask-image: var(--mask);
      -webkit-mask-size: 100% 100%;
      mask-size: 100% 100%;
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
    }

    .frame {
      object-fit: fill;
      pointer-events: none;
    }

    .face {
      position: absolute;
      left: 41.0%;
      top: 14.8%;
      width: 16.4%;
      height: 54.4%;
      border: 0.5vmin solid #000;
      border-radius: 50%;
      overflow: hidden;
      background: #fff;
      display: grid;
      place-items: center;
    }

    .face video {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }

    .error {
      position: absolute;
      padding: 0.5rem;
      text-align: center;
      font-size: 0.8rem;
    }
</style>
