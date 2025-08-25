const capacity = 3,
    windowInSeconds = 5
let userData = {}

function rateLimiter(clientId) {
    let result = allowRequest(clientId)
    return result
}

function allowRequest(clientId) {
    if (userData.hasOwnProperty(clientId)) {
        let currentTime = new Date()
        let diffTime = currentTime - userData[clientId]["time"]
        console.log(diffTime)
        if (diffTime > (windowInSeconds * 1000)) {
            //console.log(clientId, " user exists and above window time thus reset capacity & time")
            userData[clientId] = {
                time: new Date(),
                capacity: 1
            };
            return true;
        } else if (userData[clientId].capacity < capacity) {
            //console.log(clientId, " user exists and capacity is not full and below window time thus allow")
            userData[clientId]["capacity"]++;
            return true;
        } else {
            //console.log(clientId ," user not allowed as capacity reached")
            return false
        }
    } else {
        //console.log(clientId, " user doesnt exists thus allow")
        userData[clientId] = {
            time: new Date(),
            capacity: 1
        };
        return true;
    }
}

// console.log(rateLimiter("client1"), "\n")
// console.log(rateLimiter("client1"), "\n")
// console.log(rateLimiter("client2"), "\n")
// console.log(rateLimiter("client1"), "\n")
// console.log(rateLimiter("client2"), "\n")
// console.log(rateLimiter("client1"), "\n")
// console.log(rateLimiter("client2"), "\n")
// console.log(rateLimiter("client2"), "\n")
// setTimeout(() => {
//     console.log(rateLimiter("client1"))
// }, 5000)
// setTimeout(() => {
//     console.log(rateLimiter("client2"))
// }, 7000)
