let start = 0
let target_x = 0
let target_y = 0
let newx = 0
let newy = 0
let rangingX = 0
let rangingY = 0
input.onButtonPressed(Button.AB, function () {
    start = 1
})
input.onGesture(Gesture.Shake, function () {
    basic.showLeds(`
        # # # . .
        # . . # #
        # # # # .
        . . # . #
        # # # # #
        `)
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
        while (input.buttonIsPressed(Button.B)) {
            basic.clearScreen()
            led.plot(rangingX, rangingY)
            rangingX += 1
            if (rangingX > 4) {
                rangingX = 0
            }
            basic.pause(200)
        }
        while (input.buttonIsPressed(Button.A)) {
            basic.clearScreen()
            led.plot(rangingX, rangingY)
            rangingY += 1
            if (rangingY > 4) {
                rangingY = 0
            }
            basic.pause(200)
        }
    }
}
