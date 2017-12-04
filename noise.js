App = function()
 {
     // this is where the WADE app is initialized
 	this.init = function()
 	{
         // load a scene
 		wade.loadScene('scene1.wsc', true, function()
        {
             // the scene has been loaded, do something here
			var test =
			{
				baseColor: [202,177,50,255],
				noise:
					[
						{
							color: [235, 221, 61, 1024],
							attenuation: 1.5,
							roughness: 2,
							num_octs: 4,
							starting_oct: 2
						}
					]
			};
			wade.setImage('test',texture_factory(256,test));
			var obj = new SceneObject(new Sprite('test'))
			wade.addSceneObject(obj);
         });
 	};
 };
