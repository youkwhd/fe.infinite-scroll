<script lang="ts">
    import { onMount } from "svelte";
    import Movie from "./lib/Movie.svelte";
    import { createInfiniteObserver } from "./module/observer";
    import { type TMDBDiscoverMovieParams, tmdbDiscoverMovie } from "./module/tmdb-api-client";

    let movies: Array<any> = []
    let __page_counter: number = 1

    let isLoading = false
    
    let lastMovieElement: HTMLElement = null

    const fetchMovies = async () => { 
        isLoading = true
        const data = await tmdbDiscoverMovie(<TMDBDiscoverMovieParams>{ apiKey: import.meta.env.VITE_TMDB_API_KEY, page: __page_counter++ })
        isLoading = false
        movies = movies.concat(data.results)
    }

    onMount(async () => { await fetchMovies() })

    /**
     * a wrapper for createInfiniteObserver in order to validate parameter element
     * since it has to wait for lastMovieElement to get it's value assigned
     */
    const __createInfiniteObserver = (element: HTMLElement, callback: Function) => {
        if (element !== null)
            createInfiniteObserver(element, callback)
    }

    $: lastMovieElement, __createInfiniteObserver(lastMovieElement, fetchMovies)
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