<script lang="ts">
    import { onMount } from "svelte";
    import Movie from "./lib/Movie.svelte";
    import Loading from "./lib/Loading.svelte";
    import { createInfiniteObserver } from "./module/observer";
    import { type TMDBDiscoverMovieParams, tmdbDiscoverMovie } from "./module/tmdb-api-client";

    let movies: Array<any> = []
    let __page_counter: number = 1
    let lastMovieElementRef: HTMLElement = null
    let isLoading = false

    const fetchMovies = async () => { 
        isLoading = true
        const data = await tmdbDiscoverMovie(<TMDBDiscoverMovieParams>{ apiKey: import.meta.env.VITE_TMDB_API_KEY, page: __page_counter++ })
        movies = movies.concat(data.results)
        isLoading = false
    }

    /**
     * listen for lastMovieElementRef to get it's value assigned
     */
    $: lastMovieElementRef, (() => {
        if (lastMovieElementRef === null)
            return

        createInfiniteObserver(lastMovieElementRef, fetchMovies)
    })()

    onMount(async () => await fetchMovies())
</script>

<main>
    <h1>Trending Movies</h1>
    {#each movies as movie, i}
        {#if i + 1 === movies.length}
            <Movie data={{ title: movie.title, desc: movie.overview }} bind:elementRef={lastMovieElementRef} />
        {:else}
            <Movie data={{ title: movie.title, desc: movie.overview }} />
        {/if}
    {/each}

    {#if isLoading}
        <Loading />
    {/if}
</main>