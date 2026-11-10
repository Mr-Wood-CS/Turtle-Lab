import turtle

turtle.penup()
turtle.backward(250)
turtle.pendown()

for square in range(4):
    for side in range(4):
        turtle.forward(100)
        turtle.right(90)

    turtle.penup()
    turtle.forward(150)
    turtle.pendown()

turtle.done()