from PIL import Image
import pillow_avif

img = Image.open('input.avif')
img.save('output.png')