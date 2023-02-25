export const camelToSnakeCase = (camelCase: string): string => {
    let snakeCase: string[] = camelCase.split("")

    for (let i = 1; i < snakeCase.length; i++) {
        if (snakeCase[i] === snakeCase[i].toUpperCase()) {
            snakeCase[i] = snakeCase[i].toLowerCase()
            snakeCase.splice(i, 0, "_")
        }
    }

    return snakeCase.join("")
}
