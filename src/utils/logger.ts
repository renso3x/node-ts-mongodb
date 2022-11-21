import dayjs from 'dayjs'
import logger from 'pino'

const log = logger({
    base: {
        pid: false
    },
    timeStamp: () => `,"time": "${dayjs().format()}"`,
})

export default log