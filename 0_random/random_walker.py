from PIL import Image
import random

width = 750
height = 750

image = Image.new('RGB', [750, 750], (255, 255, 255))
data = image.load()

x = width / 2
y = height / 2
for i in range(200000):
    dx = random.randint(-1, 1)
    dy = random.randint(-1, 1)
    x += dx
    y += dy
    data[x % width, y % height] = (0, 0, 0)

image.show();