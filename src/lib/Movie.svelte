<script lang="ts">
    export let movieData: {[key: string ]: any}
    export let element: HTMLElement = null
</script>

<div bind:this={element}>
    <h1>{movieData.title}</h1>
    <p>{movieData.desc}</p>
</div>