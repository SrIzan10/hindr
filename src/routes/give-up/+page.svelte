<script lang="ts">
    import { profilePhoto } from '#lib/profilePhoto.svelte.ts'
    import frameSrc from '#lib/assets/frame-horizontal.png'
    import maskSrc from '#lib/assets/frame-mask-horizontal.png'
    import HorseProfile from '#lib/assets/give-up.png'

</script>

<div class="profile">
    <div class="framed" style:--mask={`url(${maskSrc})`}>
        <img class="photo" src={HorseProfile} alt="Horse" />

        <div class="face">
            {#if profilePhoto.url}
                <img src={profilePhoto.url} alt="Your profile" />
            {:else}
                <span class="error">Something broke. No photo found</span>
            {/if}
        </div>

        <img class="frame" src={frameSrc} alt="" aria-hidden="true" draggable="false" />
    </div>
</div>

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
      left: 54%;
      top: 52%;
      width: 16.4%;
      height: 54.4%;
      display: grid;
      place-items: center;
    }

    .face img {
      width: 45%;
      height: 45%;
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
</style>
