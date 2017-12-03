App = function()
{
	// this is where the WADE app is initialized
	this.init = function()
	{
		// load a scene
		wade.loadScene('scene1.wsc', true, function()
				{
	var sand = 
	{
		baseColor: [202,177,50,255], 
		noise: 
		[
			{
				color: [235, 221, 61, 1024], 
				attenuation: 1.5, 
				roughness: 2,
				numOctaves: 4,
				startingOctave: 2
			},
			{
				color: [255, 255, 255, 255], 
				attenuation: 1.5, 
				roughness: 6,
				numOctaves: 3,
				startingOctave: 5
			}			
		]
	};
				});
	};
};

