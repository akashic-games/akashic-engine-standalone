AE.initialize({
	canvas: document.getElementById("canvas"),
	configuration: {
		fps: 60,
		assets: {
			aco: {
				type: "image",
				path: "./images/aco.png",
				width: 128,
				height: 288
			}
		}
	},
	mainFunc: function (g) {
		var game = g.game;
		var scene = new g.Scene({
			game: game,
			assetIds: ["aco"]
		});

		scene.onLoad.addOnce(function () {
			var bg = new g.FilledRect({
				scene: scene,
				width: game.width,
				height: game.height,
				cssColor: "black"
			});
			scene.append(bg);

			var center = [
				game.width / 2,
				game.height / 2,
				5.0
			];
			var origin = center.concat();

			scene.pointDownCapture.add(function (o) {
				origin[0] = center[2] * (o.point.x - center[0]);
				origin[1] = center[2] * (o.point.y - center[1]);
			});
			scene.pointMoveCapture.add(function (o) {
				origin[0] += center[2] * o.prevDelta.x;
				origin[1] += center[2] * o.prevDelta.y;
			});

			for (var i = 0; i < 1000; i++) {
				(function () {
					var object = new g.FrameSprite({
						scene: scene,
						src: scene.asset.getImageById("aco"),
						width: 32,
						height: 48,
						frames: [5, 6, 7, 6],
						compositeOperation: g.CompositeOperation.Lighter
					});
					scene.append(object);

					object.r = [];
					object.v = [];
					object.p = [];
					object.init = function () {
						object.time = 0;
						object.life = game.random.get(10, 100);

						object.r = origin.concat();
						object.v[0] = 0.0;
						object.v[1] = 0.0;
						object.v[2] = 0.0;
						object.p[0] = game.random.get(-100, 100) * 0.01;
						object.p[1] = game.random.get(-100, 100) * 0.01;
						object.p[2] = game.random.get(-100, 100) * 0.0001;
					};

					object.init();
					object.start();
					object.onUpdate.add(function () {
						if (++object.time > object.life) {
							object.init();
						}

						object.v[0] += object.p[0];
						object.v[1] += object.p[1];
						object.v[2] += object.p[2];
						object.r[0] += object.v[0];
						object.r[1] += object.v[1];
						object.r[2] += object.v[2];

						if (object.r[2] < 0.2) {
							object.init();
						}
						var w = 1.0 / object.r[2];

						object.width = 32 * w;
						object.height = 48 * w;
						object.x = object.r[0] * w - object.width * 0.5 + center[0];
						object.y = object.r[1] * w - object.height * 0.5 + center[1];
						object.invalidate();
					});
				})();
			}
		});
		game.pushScene(scene);
	}
});
