rangingX = 0
alreadyStarted = 0
start = 0
rangingY = 0
intro = 0
target_x = 0
target_y = 0
newx = 0
newy = 0

def on_button_pressed_a():
    global rangingX, alreadyStarted
    rangingX += 1
    if rangingX == 5:
        rangingX = 0
    basic.pause(200)
    alreadyStarted = 1
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    global start
    start = 1
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    global rangingY, alreadyStarted
    rangingY += 1
    if rangingY == 5:
        rangingY = 0
    basic.pause(200)
    alreadyStarted = 1
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_gesture_shake():
    global intro, target_x, target_y
    intro = 1
    basic.show_leds("""
        # # # . .
        # . . # #
        # # # # .
        . . # . #
        # # # # #
        """)
    while True:
        basic.clear_screen()
        if start == 1:
            for round2 in range(3):
                target_x = randint(0, 4)
                target_y = randint(0, 4)
                basic.show_string("Ready?")
                basic.clear_screen()
                plotTarget(target_x, target_y)
                basic.pause(2000)
                basic.clear_screen()
                gameStart(target_x, target_y)
            basic.show_string("End")
            break
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

def plotTarget(x: number, y: number):
    global newx, newy
    led.plot(x, y)
    newx = x
    newy = y
    for yfor in range(3):
        for xfor in range(3):
            if xfor == 0:
                newy += -1
            elif xfor == 2:
                newy += 1
            if yfor == 0:
                newx += -1
            elif yfor == 2:
                newx += 1
            led.plot(newx, newy)
            newx = x
            newy = y
def gameStart(currentX: number, currentY: number):
    while True:
        if alreadyStarted == 0:
            led.plot(0, 0)
        else:
            pass
        led.plot(rangingX, rangingY)
        if input.button_is_pressed(Button.AB) or input.acceleration(Dimension.Z) > 1000:
            basic.clear_screen()
            basic.show_number(rangingX)
            basic.show_number(rangingY)
            break