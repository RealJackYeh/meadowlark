const fortunesCookies = [
    "Conquer your fears or they will conquer you.",
    "rivers need springs",
    "don't fear what you don't know",
    "you will have a pleasant surprise"
]
exports.getFortune = () => {
    const idx = Math.floor(Math.random()*fortunesCookies.length)
    return fortunesCookies[idx]
}