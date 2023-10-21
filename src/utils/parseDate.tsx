export const formattedDate = (date: string | number) => {
    return new Date(date).toISOString().split("T")[0]
}
