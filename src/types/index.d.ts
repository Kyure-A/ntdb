type TimeTable = {
    name: string
    value: string
    inline: boolean
}

type Embeds = {
    title: string
    fields: TimeTable[]
}

type DiscordMessage = {
    embeds: Embeds[]
}
