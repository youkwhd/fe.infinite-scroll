<script lang="ts">
    import { onMount } from "svelte";
    import Movie from "./lib/Movie.svelte";
    import { createInfiniteObserver } from "./module/observer";
    import { type TMDBDiscoverMovieParams, tmdbDiscoverMovie } from "./module/tmdb-api-client";

    let movies: Array<any> = []
    let __page_counter: number = 1
    let lastMovieElement: HTMLElement = null
    let isLoading = false

    const fetchMovies = async () => { 
        isLoading = true
        const data = await tmdbDiscoverMovie(<TMDBDiscoverMovieParams>{ apiKey: import.meta.env.VITE_TMDB_API_KEY, page: __page_counter++ })
        isLoading = false
        movies = movies.concat(data.results)
    }

    /**
     * listen for lastMovieElement to get it's value assigned
     */
    $: lastMovieElement, (() => {
        if (lastMovieElement === null)
            return

        createInfiniteObserver(lastMovieElement, fetchMovies)
    })()

    onMount(async () => { await fetchMovies() })
</script>

<main>
    {#each movies as movie, i}
        {#if i + 1 === movies.length}
            <Movie movieData={{ title: movie.title, desc: movie.overview }} bind:element={lastMovieElement} />
        {:else}
            <Movie movieData={{ title: movie.title, desc: movie.overview }} />
        {/if}
    {/each}
    {#if isLoading}
        <h1>Loading....</h1>
    {/if}
</main>