const EventEmitter = require('events').EventEmitter

class Countdown extends EventEmitter {
    constructor(seconds, superstitous) {
        super()
        this.seconds = seconds
        this.superstitous = !!superstitous
    }
    go() {
        const countdown = this
        const timeoutIds = []
        return new Promise(function(resolve, reject) {
            for (let i=countdown.seconds; i>=0; i--) {
                timeoutIds.push(setTimeout(function() {
                    if(countdown.superstitous && i===13) { 
                        timeoutIds.forEach(clearTimeout)
                        return reject(new Error('Definitely not counting that'))
                    }
                    countdown.emit('tick', i)
                    if(i===0) resolve()
                }, (countdown.seconds-i)*1000))
            }
        })
    }
}
function launch() {
    return new Promise(function(resolve, reject) {
        console.log('Lift Off!')
        setTimeout(function() {
            resolve('In orbit!')
        }, 4*1000)
    })
}

const c = new Countdown(5, true)
c.on('tick', function(i) {
    if(i>=0) console.log(i + '...')
})

c.go()
    .then(launch)
    .then(function() {
        console.log('GO!')
    })
    .catch(function(err) {
        console.log(err.message)
    })