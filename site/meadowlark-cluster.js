const cluster = require('cluster')

function startWorker() {
    const worker = cluster.fork()
    console.log(`CLUSTER: worker ${worker.id} started` + Date.now())
}

if (cluster.isMaster) {
    //console.log(`Master ${process.pid} is running`)
    //console.log('isMaster' + Date.now())
    require('os').cpus().forEach(startWorker)
    cluster.on('disconnect', worker => console.log(
        `CLUSTER: worker ${worker.id} disconnected from the cluster.`
    ))
    cluster.on('exit', (worker, code, signal) => {
        console.log(
            `CLUSTER: worker ${worker.id} died with exit `+
            `code ${code} (${signal})`
        )
        startWorker()
    })
} else {
    //console.log('else ' + Date.now())
    const port = process.env.PORT || 3000
    require('./meadowlark.js')(port)
    //console.log(`worker ${process.pid} started`)
}