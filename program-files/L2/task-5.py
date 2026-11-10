import turtle

turtle.penup()
turtle.backward(250)
turtle.pendown()

for star in range(4):
    for side in range(5):
        turtle.forward(100)
        turtle.right(144)

    turtle.penup()
    turtle.forward(150)
    turtle.pendown()

turtle.done()