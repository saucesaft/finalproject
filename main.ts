let start = 0
let target_x = 0
let target_y = 0
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
        if (start != 0) {
            basic.clearScreen()
            for (let index = 0; index <= 2; index++) {
                target_x = randint(0, 4)
                target_y = randint(0, 4)
                led.plot(target_x, target_y)
                led.plot(target_x - 1, target_y - 1)
                led.plot(target_x + 1, target_y + 1)
            }
        }
    }
})
