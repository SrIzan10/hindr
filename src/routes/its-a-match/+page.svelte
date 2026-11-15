<script>
    import ChatArea from "#lib/components/chat-area.svelte";
    const { horse } = $props();
</script>
<ChatArea horseId={horse} />