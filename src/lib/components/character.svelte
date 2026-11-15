
<script>
    import HorseProfile from '#lib/assets/horse_profile.jpg'
    import frameSrc from '#lib/assets/frame-horizontal.png'
    import maskSrc from '#lib/assets/frame-mask-horizontal.png'
</script>

<div class="profile">
    <div class="framed" style:--mask={`url(${maskSrc})`}>
        <img class="photo" src={HorseProfile} alt="Horse" />
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
      background: rgb(0 0 0 / 0.75);
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
</style>
