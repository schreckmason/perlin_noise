Flame generator using perlin noise

The perlin.js is from a tutorial online, that is where I got most of the calculations



You must first run the command 'python -m SimpleHTTPServer XXXX' to spin up a local server and get access to the wade game engine.
Once that has ran, noise.js contains the shader data necessary for the construction of the alpha, red, and green channels -- we can experiment on those later.

Note: I used the b.png as an alpha mask as described in the tutorial however and used that image they had.


Once we have all of the four channels make sure you have imagemagick installed.
Note: if the texture was generated with color imagemagick can grayscale via 'convert name.png -channel RGBA -matte -colorspace gray name.png'

To combine the four channels of the texture we can utilize the following command:
	'convert r.png g.png b.png a.png -channel RGBA -combine test_flame.png'



