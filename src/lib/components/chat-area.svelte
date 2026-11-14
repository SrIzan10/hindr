<script lang="ts">
    import { goto } from "$app/navigation";
    import { applyEffects, brokenDealbreaker, messages, resetMeter } from "#lib/game.svelte.ts";
    import { horseProfiles, interactions, pickReply, type ReplyOption } from "#lib/interaction.svelte.ts";

    let { horseId = "andrew" }: { horseId?: string } = $props();

    let step = $state(0);
    let waiting = $state(false);
    let unmatched = $state(false);

    const current = $derived(unmatched ? undefined : interactions[step]);

    resetMeter(horseId);
    function choose(option: ReplyOption) {
        if (waiting || unmatched) return;
        messages.update((msgs) => [...msgs, { text: option.text, from: "user" as const }]);
        waiting = true;

        const meter = applyEffects(horseId, option.effects);
        const dealbreaker = brokenDealbreaker(horseProfiles[horseId], meter);
        const reply = dealbreaker ? dealbreaker.message : pickReply(option, meter);

        setTimeout(() => {
            messages.update((msgs) => [...msgs, { text: reply, from: "system" as const }]);
            if (dealbreaker) {
                waiting = false;
                unmatched = true;
                setTimeout(() => goto("/give-up-scene"), 1800);
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

<div>
    <div class="flex flex-col">
        {#each $messages as message, i (i)}
            <div class={message.from === "user" ? "flex min-w-0 justify-end" : "min-w-0"}>
                <p class="max-w-full break-words [overflow-wrap:anywhere]">{message.text}</p>
            </div>
        {/each}
    </div>

    {#if current}
        <div class="flex flex-col gap-2">
            {#each current.options as option (option.text)}
                <button type="button" disabled={waiting} onclick={() => choose(option)}>
                    {option.text}
                </button>
            {/each}
        </div>
    {/if}
</div>
