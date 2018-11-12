import { createLogger, format, transports } from 'winston'

const { combine, colorize, timestamp, align, printf } = format

export default createLogger({
  level: 'info',
  format: combine(
    colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    align(),
    printf(info => {
      const { timestamp, level, message, ...extra } = info
      return `📓 ${timestamp} [${level}]: ${message} ${
        Object.keys(extra).length ? JSON.stringify(extra, null, 2) : ''
      }\n______________________\n`
    })
  ),
  transports: [new transports.Console()],
})
