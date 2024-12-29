import { Context, Schema } from 'koishi'

export const name = 'event-client'

export const inject = ['http']

export interface Config {
  baseUrl: string
}

export const Config: Schema<Config> = Schema.object({
  baseUrl: Schema.string().required(),
})

export function apply(ctx: Context, config: Config) {
  const socket = ctx.http.ws(config.baseUrl)

  socket.addEventListener('message', (event) => {
    const { name, args } = JSON.parse(event.data)
    ctx.emit(name, ...args)
  })
}
