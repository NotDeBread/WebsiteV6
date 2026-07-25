applyFlowText(doge('menuTitle1'))
applyFlowText(doge('menuTitle2'))

const upgradeList = []
for(let i = 0; i < 5; i++) {
    for(const upgrade of Object.keys(upgrades[i])) {
        upgradeList.push({...upgrades[i][upgrade],...{url:upgrade,rarity:i}})
    }
}

function changeExamples() {
    const randomUpgrade = upgradeList[DeBread.randomNum(0,upgradeList.length-1)]
    doge('exampleItemImg').src = `../games/GooberShooter2/graphics/upgrades/${randomUpgrade.url}.png`
    doge('exampleItemName').innerHTML = randomUpgrade.name
    doge('exampleItemRarity').innerText = rarities[randomUpgrade.rarity].name
    doge('exampleItemRarity').style.background = rarities[randomUpgrade.rarity].color
    doge('exampleItemDescription').innerHTML = randomUpgrade.desc

    const randomCharacter = Object.keys(characters)[DeBread.randomNum(0,Object.keys(characters).length-1)]
    doge('exmapleCharacter').src = `../games/GooberShooter2/graphics/characters/${randomCharacter}Portrait.png`
    doge('exmapleCharacterLarge').src = `../games/GooberShooter2/graphics/characters/${randomCharacter}PortraitLarge.png`
} setInterval(changeExamples, 1500)
changeExampleItem()