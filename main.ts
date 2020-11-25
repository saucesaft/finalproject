let target_x = 0
let target_y = 0
let FinalPoints = 0
let newx = 0
let newy = 0
let dart: game.LedSprite = null
let shouldLoopNext = 0
let roundPoint = 0
// formula to get the distance between the dart and the center of target
input.onButtonPressed(Button.AB, function () {
    music.playMelody("E D G F B A C5 - ", 120)
    basic.showLeds(`
        # # # . .
        # . . # #
        # # # # .
        . . # . #
        # # # # #
        `)
    basic.pause(500)
    while (true) {
        basic.clearScreen()
        for (let index = 0; index < 3; index++) {
            basic.clearScreen()
            target_x = randint(0, 4)
            target_y = randint(0, 4)
            basic.showString("Ready?")
            basic.clearScreen()
            plotTarget(target_x, target_y)
            plotTarget(target_x, target_y)
            basic.pause(2000)
            basic.clearScreen()
            gameStart(target_x, target_y)
        }
        music.playMelody("E F - - - - - - ", 120)
        basic.showString("Total poinsts:")
        basic.showNumber(FinalPoints)
        break;
    }
})
function plotTarget (x: number, y: number) {
    led.plot(x, y)
    newx = x
    newy = y
    for (let yfor = 0; yfor <= 2; yfor++) {
        for (let xfor = 0; xfor <= 2; xfor++) {
            if (xfor == 0) {
                newy += -1
            } else if (xfor == 2) {
                newy += 1
            }
            if (yfor == 0) {
                newx += -1
            } else if (yfor == 2) {
                newx += 1
            }
            led.plot(newx, newy)
            newx = x
            newy = y
        }
    }
}
function gameStart (currentX: number, currentY: number) {
    basic.clearScreen()
    dart = game.createSprite(0, 0)
    game.resume()
    while (true) {
        if (input.buttonIsPressed(Button.B) && !(input.buttonIsPressed(Button.A))) {
            dart.change(LedSpriteProperty.X, 1)
            if (shouldLoopNext == 1) {
                dart.set(LedSpriteProperty.X, 0)
                shouldLoopNext = 0
            }
            if (dart.get(LedSpriteProperty.X) == 4) {
                shouldLoopNext = 1
            }
            basic.pause(200)
        } else if (input.buttonIsPressed(Button.A) && !(input.buttonIsPressed(Button.B))) {
            dart.change(LedSpriteProperty.Y, 1)
            if (shouldLoopNext == 1) {
                dart.set(LedSpriteProperty.Y, 0)
                shouldLoopNext = 0
            }
            if (dart.get(LedSpriteProperty.Y) == 4) {
                shouldLoopNext = 1
            }
            basic.pause(200)
        }
        if (input.buttonIsPressed(Button.AB) || input.acceleration(Dimension.Z) > 1000) {
            basic.clearScreen()
            music.playTone(262, music.beat(BeatFraction.Half))
            music.playTone(247, music.beat(BeatFraction.Half))
            roundPoint = Math.sqrt((dart.get(LedSpriteProperty.X) - currentX) ** 2 + (dart.get(LedSpriteProperty.Y) - currentY) ** 2)
            game.pause()
            dart.delete()
            if (roundPoint == 0) {
                basic.showString("5 points")
                FinalPoints += 5
            } else if (roundPoint >= 1 && roundPoint < 2) {
                basic.showString("4 points")
                FinalPoints += 4
            } else if (roundPoint >= 2 && roundPoint < 3) {
                basic.showString("3 points")
                FinalPoints += 3
            } else if (roundPoint >= 3 && roundPoint < 4) {
                basic.showString("2 points")
                FinalPoints += 2
            } else if (roundPoint >= 4) {
                basic.showString("1 point")
                FinalPoints += 1
            }
            break;
        }
    }
}
