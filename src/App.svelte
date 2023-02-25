<script lang="ts">
    import { onMount } from "svelte";
    import Movie from "./lib/Movie.svelte";
    import { type TMDBDiscoverMovieParams, tmdbDiscoverMovie } from "./module/tmdb-api-client";

    onMount(async () => {
        const data = await tmdbDiscoverMovie(<TMDBDiscoverMovieParams>{ apiKey: import.meta.env.VITE_TMDB_API_KEY, page: 2 })
        console.log(data)
    })
</script>

<main>
    <Movie movieData={{ title: "this", desc: "thuse" }}/>
</main>