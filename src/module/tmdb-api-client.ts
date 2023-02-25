import { camelToSnakeCase } from "./case-converter"

export type TMDBDiscoverMovieParams = {
    apiKey: string
    page: number
}

const tmdbBuildURLParams = (baseUrl: string, params: { [key: string]: any }): string => {
    baseUrl = baseUrl.concat("?")

    const __params = Object.entries(params)
    __params.forEach(([key, val], i) => {
        if (val === undefined || val === null)
            return

        baseUrl = baseUrl.concat(camelToSnakeCase(key), "=", val, i + 1 < __params.length ? "&" : "")
    })

    return baseUrl
}

export const tmdbDiscoverMovie = async (params: TMDBDiscoverMovieParams): Promise<any> => {
    const apiUrl = tmdbBuildURLParams("https://api.themoviedb.org/3/discover/movie", params)

    const rawData = await fetch(apiUrl)
    return await rawData.json()
}