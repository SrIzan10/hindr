<script lang="ts">
    import { goto } from "$app/navigation";
    import { applyEffects, brokenDealbreaker, messages, resetMeter, type Card } from "#lib/game.svelte.ts";
    import { interactions, pickReply, type ReplyOption } from "#lib/interaction.svelte.ts";
    import Button from "./button.svelte";
    import Message from "./message.svelte";

    let { horseId = 1 }: { horseId?: Card["id"] } = $props();

    const colors = ["#FF0076", "#7C3AED", "#0A84FF"];

    let step = $state(0);
    let waiting = $state(false);
    let unmatched = $state(false);

    const current = $derived(unmatched ? undefined : interactions[step]);

    let chatEl: HTMLDivElement | undefined = $state();

    // Keep the newest message in view as the conversation grows.
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
        
        if (stepIndex === 9) {
          // wait for 1.8 seconds before going to the next page
          await new Promise((resolve) => setTimeout(resolve, 1000));
          goto(`/date`, { persistState: true });
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

            // The horse opens the next turn with a question before the options appear.
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
</script>

<div class="flex h-dvh flex-col">
    <div bind:this={chatEl} class="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
        {#each $messages as message, i (i)}
            <Message {...message} />
        {/each}
        {#if waiting && step !== 9}
            <Message text="meow" from="system" loading />
        {/if}
    </div>

    {#if current}
        <div class="flex w-full shrink-0 flex-row gap-2">
            {#each current.options as option, index (option.text)}
                <Button
                    disabled={waiting}
                    onclick={() => choose(option)}
                    color={colors[index]}
                    width="auto"
                    class="flex-1"
                >
                    {option.text}
                </Button>
            {/each}
        </div>
    {/if}
</div>