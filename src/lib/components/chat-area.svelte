<script lang="ts">
    import { goto } from "$app/navigation";
    import { applyEffects, brokenDealbreaker, messages, resetMeter, type Card } from "#lib/game.svelte.ts";
    import { interactions, pickReply, type ReplyOption } from "#lib/interaction.svelte.ts";
    import Button from "./button.svelte";
    import Message from "./message.svelte";

    let { horseId = 1 }: { horseId?: Card["id"] } = $props();

    const colors = ["#FF0076", "#FF0076", "#FF0076"];

    const lastStep = interactions.length - 1;

    let step = $state(0);
    let waiting = $state(false);
    let unmatched = $state(false);

    const current = $derived(unmatched ? undefined : interactions[step]);

    let chatEl: HTMLDivElement | undefined = $state();

    $effect(() => {
        $messages.length;
        chatEl?.scrollTo({ top: chatEl.scrollHeight, behavior: "smooth" });
    });

    resetMeter(horseId);
    async function choose(option: ReplyOption) {
        if (waiting || unmatched) return;

        const stepIndex = interactions.findIndex((i) => i === current);
        if (stepIndex !== step) return;

        messages.update((msgs) => [...msgs, { text: option.text, from: "user" as const }]);
        waiting = true;

        if (stepIndex === lastStep) {
          await new Promise((resolve) => setTimeout(resolve, 700));
          goto(`/date`, { persistState: true });
          return;
        }


        const meter = applyEffects(horseId, option.effects);
        const dealbreaker = brokenDealbreaker(horseId, meter);
        const reply = dealbreaker ? dealbreaker.message : pickReply(option, meter);

        setTimeout(() => {
            messages.update((msgs) => [...msgs, { text: reply, from: "system" as const }]);
            if (dealbreaker) {
                waiting = false;
                unmatched = true;
                setTimeout(() => goto("/give-up"), 1800);
                return;
            }

            const prompt = interactions[step + 1]?.prompt;
            if (!prompt) {
                step += 1;
                waiting = false;
                return;
            }
            setTimeout(() => {
                messages.update((msgs) => [...msgs, { text: prompt, from: "system" as const }]);
                step += 1;
                waiting = false;
            }, 900);
        }, 600);
    }
    let buttonsHeight = $state(0);
 </script>

 <div class="relative h-dvh">
     <div
         bind:this={chatEl}
         class="absolute inset-0 flex flex-col gap-2 overflow-y-auto"
         style:padding-bottom="{buttonsHeight}px"
     >
         {#each $messages as message, i (i)}
             <Message {...message} />
         {/each}
         {#if waiting && step !== lastStep}
             <Message text="meow" from="system" loading />
         {/if}
     </div>

     {#if current}
         <div
             bind:clientHeight={buttonsHeight}
             class="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-row gap-2 bg-transparent"
         >
             {#each current.options as option, index (option.text)}
                 <Button
                     disabled={waiting}
                     onclick={() => choose(option)}
                     color={colors[index]}
                     width="auto"
                     class="pointer-events-auto flex-1"
                 >
                     {option.text}
                 </Button>
             {/each}
         </div>
     {/if}
 </div>
