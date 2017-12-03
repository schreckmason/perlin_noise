App = function()
{
    // this is where the WADE app is initialized
	this.init = function()
	{
        // load a scene
		wade.loadScene('scene1.wsc', true, function()
        {
            // the scene has been loaded, do something here
        	var grass = 
			{
				baseColor: [53,161,27,255], 
				noise: 
				[
					{
						color: [95, 235, 61, 180], 
						attenuation: 2, 
						roughness: 2,
						numOctaves: 3,
						startingOctave: 2
					},
					{
						color: [200, -60, 0, 2550], 
						attenuation: 2, 
						roughness: 2,
						numOctaves: 5,
						startingOctave: 2
					}
				]
			};
        	wade.setImage('grass', generateTexture(256, grass));
        	var obj = new SceneObject(new Sprite('grass'));
        	wade.addSceneObject(obj);
            
        });
	};
};

