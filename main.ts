let start = 0
let intro = 0
let dart: game.LedSprite = null
let target_x = 0
let target_y = 0
let newx = 0
let newy = 0
let shouldLoopNext = 0
input.onButtonPressed(Button.AB, function () {
    start = 1
})
input.onButtonPressed(Button.B, function () {
	
})
input.onGesture(Gesture.Shake, function () {
    intro = 1
    basic.showLeds(`
        # # # . .
        # . . # #
        # # # # .
        . . # . #
        # # # # #
        `)
    dart = game.createSprite(0, 0)
    while (true) {
        basic.clearScreen()
        if (start == 1) {
            for (let round = 0; round <= 2; round++) {
                target_x = randint(0, 4)
                target_y = randint(0, 4)
                basic.showString("Ready?")
                basic.clearScreen()
                plotTarget(target_x, target_y)
                basic.pause(2000)
                basic.clearScreen()
                gameStart(target_x, target_y)
            }
            basic.showString("End")
            break;
        }
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
            break;
        }
    }
}
