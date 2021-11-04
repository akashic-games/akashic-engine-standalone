import * as g from "@akashic/akashic-engine";
import { Event } from "@akashic/playlog";
import { GameHandlerSet } from "./GameHandlerSet";
import { AssetLoaderFunctions } from "./platform/AssetLoaderFunctions";
import { ResourceFactory } from "./platform/ResourceFactory";

/**
 * ゲームの設定を表すインタフェース。
 * g.GameConfiguration から width と height を省略可能にしている。
 */
export interface GameConfiguration {
	width?: number;
	height?: number;
	fps?: number;
	main: string;
	audio?: g.AudioSystemConfigurationMap;
	assets: g.AssetConfigurationMap;
	operationPlugins?: g.OperationPluginInfo[];
	globalScripts?: string[];
	moduleMainScripts?: g.ModuleMainScriptsMap;
	defaultLoadingScene?: "default" | "compact" | "none";
}

export interface InitializeParameter {
	/**
	 * ゲームの描画に利用する HTMLCanvasElement。
	 */
	canvas: HTMLCanvasElement;
	/**
	 * ゲームの設定。
	 */
	configuration: GameConfiguration;
	/**
	 * アセットファイルのベースディレクトリ。
	 */
	assetBaseDir?: string;
	/**
	 * 独自のアセットロード処理を行うための関数群。
	 */
	assetLoaderFuncs?: AssetLoaderFunctions;
	/**
	 * エントリポイントとして実行する関数。
	 */
	mainFunc?: (akashicEngine: typeof g, args: g.GameMainParameterObject) => void;
}

let requestAnimationFrameId: number | null = null;

declare global {
	interface Window {
		g: typeof g;
	}
}

window.g = g; // 他のモジュールが g を参照するケースを考慮して require() 時点で g を参照できるようにする

/**
 * akashic-engine を初期化してゲームを実行する。
 * @param param 初期化パラメータ。
 * @returns ゲームを破棄する関数。
 */
export function initialize(param: InitializeParameter): () => void {
	const resourceFactory = new ResourceFactory({
		canvas: param.canvas,
		assetLoaderFuncs: param.assetLoaderFuncs,
		assetBaseDir: param.assetBaseDir
	});

	if (param.configuration.assets == null) {
		param.configuration.assets = {};
	}

	// virtual path を補完
	const assets = param.configuration.assets;
	const assetKeys = Object.keys(assets);
	for (let i = 0; i < assetKeys.length; i++) {
		assets[assetKeys[i]].virtualPath = assets[assetKeys[i]].path;
	}

	const game = new g.Game({
		engineModule: g,
		handlerSet: new GameHandlerSet({ isSnapshotSaver: true }),
		configuration: {
			...param.configuration,
			width: param.configuration.width ?? param.canvas.width,
			height: param.configuration.height ?? param.canvas.height
		},
		resourceFactory,
		operationPluginViewInfo: {
			view: param.canvas
		},
		mainFunc: param.mainFunc
	});

	// primary surface の設定
	const primarySurface = resourceFactory.createPrimarySurface(game.width, game.height);
	game.renderers.push(primarySurface.renderer());

	// NOTE: game._loadAndStart() のみを呼び出した場合 `g.game.random === undefined` となるため、事前に game.reset() で randSeed を与えている。
	// TODO: akashic-engine 側の `g.Game#_loadAndStart()` のコメントを修正
	game._reset({ randSeed: Date.now() });
	game._loadAndStart({});

	// ポイントイベントの処理
	const pointEvents: g.PlatformPointEvent[] = [];
	const element = param.canvas;

	const getScaleX = (): number => {
		return element.getBoundingClientRect().width / element.clientWidth;
	};
	const getScaleY = (): number => {
		return element.getBoundingClientRect().height / element.clientHeight;
	};

	const handleMouseDownEvent = (event: MouseEvent): void => {
		const rect = element.getBoundingClientRect();
		pointEvents.push({
			type: g.PlatformPointType.Down,
			identifier: 0,
			offset: {
				x: (event.clientX - rect.left) / getScaleX(),
				y: (event.clientY - rect.top) / getScaleY()
			}
		});
		window.addEventListener("mousemove", handleMouseMoveEvent, { passive: false });
		window.addEventListener("mouseup", handleMouseUpEvent, { passive: false });
	};

	const handleMouseMoveEvent = (event: MouseEvent): void => {
		const rect = element.getBoundingClientRect();
		pointEvents.push({
			type: g.PlatformPointType.Move,
			identifier: 0,
			offset: {
				x: (event.clientX - rect.left) / getScaleX(),
				y: (event.clientY - rect.top) / getScaleY()
			}
		});
		event.stopPropagation();
		event.returnValue = false;
	};

	const handleMouseUpEvent = (event: MouseEvent): void => {
		const rect = element.getBoundingClientRect();
		pointEvents.push({
			type: g.PlatformPointType.Up,
			identifier: 0,
			offset: {
				x: (event.clientX - rect.left) / getScaleX(),
				y: (event.clientY - rect.top) / getScaleY()
			}
		});
		window.removeEventListener("mousemove", handleMouseMoveEvent);
		window.removeEventListener("mouseup", handleMouseUpEvent);
	};

	const handleTouchStartEvent = (event: TouchEvent): void => {
		const touches = event.changedTouches;
		const rect = element.getBoundingClientRect();
		for (let i = 0; i < touches.length; i++) {
			const x = (touches[i].clientX - rect.left) / getScaleX();
			const y = (touches[i].clientY - rect.top) / getScaleY();
			const identifier = touches[i].identifier;
			pointEvents.push({
				type: g.PlatformPointType.Down,
				identifier,
				offset: { x, y }
			});
		}
		window.addEventListener("touchmove", handleTouchMoveEvent, { passive: false });
		window.addEventListener("touchend", handleTouchEndEvent, { passive: false });
		event.preventDefault();
	};

	const handleTouchMoveEvent = (event: TouchEvent): void => {
		const touches = event.changedTouches;
		const rect = element.getBoundingClientRect();
		for (let i = 0; i < touches.length; i++) {
			const x = (touches[i].clientX - rect.left) / getScaleX();
			const y = (touches[i].clientY - rect.top) / getScaleY();
			const identifier = touches[i].identifier;
			pointEvents.push({
				type: g.PlatformPointType.Move,
				identifier,
				offset: { x, y }
			});
		}
		if (event.cancelable) event.preventDefault();
	};

	const handleTouchEndEvent = (event: TouchEvent): void => {
		const touches = event.changedTouches;
		const rect = element.getBoundingClientRect();
		for (let i = 0; i < touches.length; i++) {
			const x = (touches[i].clientX - rect.left) / getScaleX();
			const y = (touches[i].clientY - rect.top) / getScaleY();
			const identifier = touches[i].identifier;
			pointEvents.push({
				type: g.PlatformPointType.Up,
				identifier,
				offset: { x, y }
			});
		}
		window.removeEventListener("touchmove", handleTouchMoveEvent);
		window.removeEventListener("touchend", handleTouchEndEvent);
	};

	const handlePointEvent = (): void => {
		element.addEventListener("mousedown", handleMouseDownEvent, { passive: false });
		element.addEventListener("touchstart", handleTouchStartEvent, { passive: false });
	};

	const unhandlePointEvent = (): void => {
		element.removeEventListener("mousedown", handleMouseDownEvent);
		element.removeEventListener("touchstart", handleTouchStartEvent);
	};

	handlePointEvent();

	// ゲームループ
	let before = Date.now();
	const frame = 1000 / game.fps;

	const tick = (): void => {
		if (requestAnimationFrameId === null) {
			return;
		}
		const now = Date.now();
		if (before + frame * 2 < now) {
			// NOTE: 別タブなどで長時間 (実フレームの2倍) tick() が呼ばれなかった場合は直前まで進める
			before = now - frame - 1;
		}
		if (before + frame < now) {
			if (pointEvents.length) {
				const events: Event[] = [];
				for (let i = 0; i < pointEvents.length; i++) {
					const event = game.resolvePointEvent(pointEvents[i]);
					if (event == null) continue;
					events.push(event);
				}
				pointEvents.length = 0;
				game.tick(true, undefined, events);
			} else {
				game.tick(true);
			}
			game.render();
			before += frame;
		}
		requestAnimationFrameId = window.requestAnimationFrame(tick);
	};
	requestAnimationFrameId = window.requestAnimationFrame(tick);

	return () => {
		if (requestAnimationFrameId !== null) {
			window.cancelAnimationFrame(requestAnimationFrameId);
			requestAnimationFrameId = null;
		}
		unhandlePointEvent();
		primarySurface.renderer().clear();
	};
}
