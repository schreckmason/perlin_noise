//Fahrenheit to celsius conversion similar to GLSL mix
var lin_interpolate = function(a,b,t){
	return (1-t)*a + t*b;
};

//ease curve
var fade = function(x){
	return x * x * x * ( x * ( x * 6-15)+10)
};

var grad3 = [
			[1,1,0],
			[-1,1,0],
			[0,-1,-1],
			[0,1,-1],
			[0,-1,1],
			[0,1,1],
			[-1,0,-1],
			[1,0,-1],
			[1,-1,0],
			[-1,-1,0],
			[1,0,1],
			[-1,0,1]
			];

var dot_function = function(grad,x,y,z){
	return grad[0]*x+grad[1]*y+grad[2]*z;
};

var NoiseGen = function(num_octs, attenuation, roughness, starting_oct){
	var look = [];
	for(var i=0;i<256;i++){
		look[i] = Math.floor(Math.random()*256);
	}
	var lookup = [];
	for(var i=0;i<512;i++){
		lookup[i] = look[i & 255];
	}

	var noise_val = function(x,y,z){
		var X = Math.floor(x);
		var Y = Math.floor(y);
		var Z = Math.floor(z);

		x = x-X;
		y = y-Y;
		z = z-Z;

		X &= 255;
		Y &= 255;
		Z &= 255;

		var grad_ind000 = lookup[X+lookup[Y+lookup[Z]]] % 12;
		var grad_ind001 = lookup[X+lookup[Y+lookup[Z+1]]] % 12;
		var grad_ind010 = lookup[X+lookup[Y+1+lookup[Z]]] % 12;
		var grad_ind011 = lookup[X+lookup[Y+1+lookup[Z+1]]] % 12;
		var grad_ind100 = lookup[X+1+lookup[Y+lookup[Z]]] % 12;
		var grad_ind101 = lookup[X+1+lookup[Y+lookup[Z+1]]] % 12;
		var grad_ind110 = lookup[X+1+lookup[Y+1+lookup[Z]]] % 12;
		var grad_ind111 = lookup[X+1+lookup[Y+1+lookup[Z+1]]] % 12;

		var noise_ind000 = dot_function(grad3[grad_ind000],x,y,z);
		var noise_ind001 = dot_function(grad3[grad_ind001],x,y,z-1);
		var noise_ind010 = dot_function(grad3[grad_ind010],x,y-1,z);
		var noise_ind011 = dot_function(grad3[grad_ind011],x,y-1,z-1);
		var noise_ind100 = dot_function(grad3[grad_ind100],x-1,y,z);
		var noise_ind101 = dot_function(grad3[grad_ind101],x-1,y,z-1);
		var noise_ind110 = dot_function(grad3[grad_ind110],x-1,y-1,z);
		var noise_ind111 = dot_function(grad3[grad_ind111],x-1,y-1,z-1);

		//Apply fade since linear interpolation does not look natural, and is choppy
		var u = fade(x);
		var v = fade(y);
		var w = fade(z);

		//Interpolate along x and apply fade
		var x_inter00 = lin_interpolate(noise_ind000,noise_ind100,u);
		var x_inter01 = lin_interpolate(noise_ind001,noise_ind101,u);
		var x_inter10 = lin_interpolate(noise_ind010,noise_ind110,u);
		var x_inter11 = lin_interpolate(noise_ind011,noise_ind111,u);

		//Interpolate along y and apply fade
		var y_inter0 = lin_interpolate(x_inter00,x_inter10,v);
		var y_inter1 = lin_interpolate(x_inter01,x_inter11,v);

		return lin_interpolate(y_inter0,y_inter1,w);
	};

	//This is the interesting part: octaves, attenuation, roughness and starting octave
	this.noise = function(x,y,z){
		var a = Math.pow(attenuation, -starting_oct);
		var r = Math.pow(roughness, starting_oct);
		var m = 0;
		for(var i=starting_oct;i<num_octs+starting_oct;i++){
			m += noise_val(x*r, y*r, z*r)*a;
			a /= attenuation;
			r *= roughness;
		}
		return m / num_octs;
	};
};

//This is a function to handle the actual construction of textures outsid of the maths
//Note: can view the structure of the data input within noise.js
var texture_factory = function(size,data){
	var canvas = document.createElement('canvas');
	//make a square canvase
	canvas.width = canvas.height = size;
	
	var context = canvas.getContext('2d');
	var imagedata_object = context.createImageData(size,size);
	var image_data = imagedata_object.data;

	//Fills the canvas with a base color
	for(var i=0;i<size*size*4;i+=4){
		image_data[i] = data.baseColor[0];
		image_data[i+1] = data.baseColor[1];
		image_data[i+2] = data.baseColor[2];
		image_data[i+3] = data.baseColor[3];
	}

	//Do the noise stuff here
	for(var i=0;i<data.noise.length;i++){
		var noisy_index = data.noise[i];
		var noise_gen = new NoiseGen(noisy_index.num_octs, noisy_index.attenuation, noisy_index.roughness, noisy_index.starting_oct);
		var point = 0;
		for(var y=0;y < size; y++){
			for(var x=0;x < size; x++){
				//generate noise at a given coordinate
				var nvector = Math.abs(noise_gen.noise(x/size,y/size,0));
				for(var c=0;c<3;c++, point++){
					//The image data at a given location, take each R,G,B, and A vlue and apply the noise algorithm, take the alpha value and divide by 255
					image_data[point] = Math.floor(image_data[point]+nvector*noisy_index.color[c] * noisy_index.color[3]/255);
				}
				point++;
			}
		}
	}
	//Load image to canvas
	context.putImageData(imagedata_object,0,0);
	return canvas;
};
