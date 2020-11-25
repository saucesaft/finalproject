target_x = 0
target_y = 0
newx = 0
newy = 0
dart: game.LedSprite = None
shouldLoopNext = 0
roundPoint = 0
"""

formula to get the distance between the dart and the center of target

"""

def on_button_pressed_ab():
    global target_x, target_y
    music.play_melody("E D G F B A C5 - ", 120)
    basic.show_leds("""
        # # # . .
        # . . # #
        # # # # .
        . . # . #
        # # # # #
        """)
    basic.pause(500)
    while True:
        basic.clear_screen()
        for round2 in range(3):
            basic.clear_screen()
            target_x = randint(0, 4)
            target_y = randint(0, 4)
            basic.show_string("Ready?")
            basic.clear_screen()
            plotTarget(target_x, target_y)
            plotTarget(target_x, target_y)
            basic.pause(2000)
            basic.clear_screen()
            gameStart(target_x, target_y)
        basic.show_string("End")
        break
input.on_button_pressed(Button.AB, on_button_pressed_ab)

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
    global dart, shouldLoopNext, roundPoint
    dart = game.create_sprite(0, 0)
    while True:
        if input.button_is_pressed(Button.B) and not (input.button_is_pressed(Button.A)):
            dart.change(LedSpriteProperty.X, 1)
            if shouldLoopNext == 1:
                dart.set(LedSpriteProperty.X, 0)
                shouldLoopNext = 0
            if dart.get(LedSpriteProperty.X) == 4:
                shouldLoopNext = 1
            basic.pause(200)
        elif input.button_is_pressed(Button.A) and not (input.button_is_pressed(Button.B)):
            dart.change(LedSpriteProperty.Y, 1)
            if shouldLoopNext == 1:
                dart.set(LedSpriteProperty.Y, 0)
                shouldLoopNext = 0
            if dart.get(LedSpriteProperty.Y) == 4:
                shouldLoopNext = 1
            basic.pause(200)
        if input.button_is_pressed(Button.AB) or input.acceleration(Dimension.Z) > 1000:
            basic.clear_screen()
            music.play_tone(262, music.beat(BeatFraction.HALF))
            music.play_tone(247, music.beat(BeatFraction.HALF))
            roundPoint = Math.sqrt((dart.get(LedSpriteProperty.X) - currentX) ** 2 + (dart.get(LedSpriteProperty.Y) - currentY) ** 2)
            dart = None
            if roundPoint == 0:
                basic.show_string("5 points")
            elif roundPoint >= 1 and roundPoint < 2:
                basic.show_string("4 points")
            elif roundPoint >= 2 and roundPoint < 3:
                basic.show_string("3 points")
            elif roundPoint >= 3 and roundPoint < 4:
                basic.show_string("2 points")
            elif roundPoint >= 4:
                basic.show_string("1 point")
            break