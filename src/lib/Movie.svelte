<script lang="ts">
    export let data: { [key: string]: any }
    export let elementRef: HTMLElement = null
</script>

<div bind:this={elementRef} class="movie-section">
    <h1>{data.title}</h1>
    <p>{data.desc}</p>
</div>

<style>
    .movie-section h1 {
        font-size: 22px;
        margin-top: 8px;
    }

    .movie-section {
        border-top: 1px solid black;
    }
</style>