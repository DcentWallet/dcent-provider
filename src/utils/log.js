const isDebug = process.env.NODE_ENV !== 'production'
const isTest = process.env.NODE_ENV === 'test'

let info = console.log.bind(window.console, '[INFO] ')  // eslint-disable-line no-console
if (isTest) {
    info = () => { }
}

let debug = console.log.bind(window.console, '[DEBUG] ')  // eslint-disable-line no-console
if (!isDebug) {
    debug = () => { }
}

const warn = console.warn.bind(window.console, '[WARN] ') // eslint-disable-line no-console
const error = console.error.bind(window.console, '[ERROR] ') // eslint-disable-line no-console
const test = console.warn.bind(window.console, '[TEST] ') // eslint-disable-line no-console

module.exports = {
    test,
    info,
    debug,
    warn,
    error,
}
