let start = 0
let target_x = 0
let target_y = 0
let newx = 0
let newy = 0
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
                basic.clearScreen()
                plotTarget(target_x, target_y)
                basic.pause(2000)
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
