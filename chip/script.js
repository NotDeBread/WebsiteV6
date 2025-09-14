function setRandomChip() {
    let randomChipRarity = DeBread.randomNum(1,100)
    if(randomChipRarity <= 3) {
        doge('chip').src = '../media/chips/chip4.svg'
    } else if(randomChipRarity <= 10) {
        doge('chip').src = '../media/chips/chip3.svg'
    } else if(randomChipRarity <= 25) {
        doge('chip').src = '../media/chips/chip2.svg'
    } else if(randomChipRarity <= 50) {
        doge('chip').src = '../media/chips/chip1.svg'
    } else {
        doge('chip').src = '../media/chips/chip0.svg'
    }
    console.log(randomChipRarity)
} setRandomChip()