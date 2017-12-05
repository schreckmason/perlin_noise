App = function()
 {
     // this is where the WADE app is initialized
 	this.init = function()
 	{
         // load a scene
 		wade.loadScene('scene1.wsc', true, function()
        {
             // the scene has been loaded, do something here
			//This is the alpha channel
/*
			var test =
			{
				baseColor:[0,0,0,100],
				noise:
				[
					{
						color:[255,255,255,3750],
						attenuation: 1.2,
						roughness: 1.7,
						num_octs: 8,
						starting_oct: 2
					}
				]
			};
			wade.setImage('test',texture_factory(256,test));
			var obj = new SceneObject(new Sprite('test'))
			wade.addSceneObject(obj);
*/
			var g_channel = 
			{
				baseColor:[0,0,0,100],
				noise:
				[
					{
						color: [255,255,255,2550],
						attenuation: 1.3,
						roughness: 1.8,
						num_octs: 5,
						starting_oct: 2
					}
				]
			};
			wade.setImage('g_channel',texture_factory(256,g_channel));
			var obj = new SceneObject(new Sprite('g_channel'));
			wade.addSceneObject(obj);
/*
			var r_channel = 
			{
//				baseColor:[255,255,255,255],
				baseColor: [0,0,0,100],
				noise:
				[
					{
						color: [255,255,255,4096],
						attenuation: 1.2,
						roughness: 1.4,
						num_octs:6,
						starting_oct: 2
					}
				]
			};
			wade.setImage('r_channel',texture_factory(256,r_channel));
			var obj = new SceneObject(new Sprite('r_channel'));
			wade.addSceneObject(obj);
*/
         });
 	};
 };
