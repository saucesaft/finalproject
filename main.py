def on_forever():
    if input.is_gesture(Gesture.SHAKE):
        basic.show_leds("""
            # # # . .
            # . . # #
            . # # # .
            . . # . #
            # # # # #
            """)
basic.forever(on_forever)
