<script lang="ts">
    import { goto } from "$app/navigation";
    import { profilePhoto } from "#lib/profilePhoto.svelte.ts";
    import { dateLines, dateEnd } from "#lib/cutscene-dialogue.svelte.ts";
    import frameSrc from "#lib/assets/frame-horizontal.png";
    import maskSrc from "#lib/assets/frame-mask-horizontal.png";
    import HorseImg from "#lib/assets/final.png";

    type Phase = "narration" | "fading" | "end";

    let phase = $state<Phase>("narration");
    let lineIndex = $state(0);

    const line = $derived(dateLines[lineIndex] ?? dateLines[0]);
    const isLastLine = $derived(lineIndex >= dateLines.length - 1);

    function nextLine() {
        if (lineIndex + 1 < dateLines.length) lineIndex += 1;
    }

    $effect(() => {
        if (phase !== "narration") return;
        const seconds = line.duration ?? Math.max(1.6, 0.4 * line.text.split(/\s+/).length + 0.6);
        const delay = seconds + (isLastLine ? 2 : 0);
        const timer = setTimeout(() => {
            if (isLastLine) phase = "fading";
            else nextLine();
        }, delay * 1000);
        return () => clearTimeout(timer);
    });

    $effect(() => {
        if (phase !== "fading") return;
        const timer = setTimeout(() => (phase = "end"), FADE_SECONDS * 1000);
        return () => clearTimeout(timer);
    });

    const FADE_SECONDS = 2;
</script>

<div class="profile">
    <div class="framed" style:--mask={`url(${maskSrc})`}>
        <img class="photo" src={HorseImg} alt="Horse" />

        <div class="face">
            {#if profilePhoto.url}
                <img src={profilePhoto.url} alt="Your profile" />
            {:else}
                <span class="error">Something broke. No photo found</span>
            {/if}
        </div>

        <img
            class="frame"
            src={frameSrc}
            alt=""
            aria-hidden="true"
            draggable="false"
        />
    </div>
</div>

<div class="narration">
    {#key lineIndex}
        <p class="caption">{line.text}</p>
    {/key}
</div>

{#if phase === "end"}
    <div class="ending">
        {#key phase}
            <p class="end-text">{dateEnd.text}</p>
            <button class="end-button" onclick={() => goto("/")}>Restart</button>
        {/key}
    </div>
{/if}

<div class="fade" class:active={phase !== "narration"}></div>

<style>
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
        width: min(95vw, calc(95vh * 4 / 3));
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
        left: 70%;
        top: 35%;
        width: 16.4%;
        height: 54.4%;
        display: grid;
        place-items: center;
    }

    .face img {
        width: 100%;
        height: 100%;
        object-fit: fill;
    }

    .error {
        padding: 0.5rem;
        text-align: center;
        font-size: 0.8rem;
        color: #fff;
        background: rgb(0 0 0 / 0.6);
        border-radius: 0.5rem;
    }

    .narration {
        position: fixed;
        top: 1.5rem;
        left: 1.5rem;
        z-index: 45;
        max-width: min(40%, 28rem);
        pointer-events: none;
    }

    .caption {
        text-align: left;
        white-space: nowrap;
        font-size: clamp(1.4rem, 4.5vmin, 2.6rem);
        line-height: 1.3;
        color: #FF0076;
        animation: caption-in 0.25s ease-out both;
    }

    @keyframes caption-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .fade {
        position: fixed;
        inset: 0;
        z-index: 40;
        background: #000;
        opacity: 0;
        pointer-events: none;
        transition: opacity 3s ease-in;
    }

    .fade.active {
        opacity: 1;
    }

    .ending {
        position: fixed;
        inset: 0;
        z-index: 50;
        display: grid;
        place-items: center;
        align-content: center;
        gap: 1.5rem;
        pointer-events: none;
    }

    .end-button {
        pointer-events: auto;
        padding: 0.75rem 1.5rem;
        font-size: clamp(1rem, 2.5vmin, 1.4rem);
        color: #fff;
        background: #FF0076;
        border: none;
        border-radius: 999px;
        cursor: pointer;
    }

    .end-text {
        text-align: center;
        font-size: clamp(1.4rem, 4.5vmin, 2.6rem);
        line-height: 1.3;
        color: #fff;
        text-shadow:
            0 0 6px rgb(0 0 0 / 0.9),
            0 2px 4px rgb(0 0 0 / 0.8);
    }
</style>
