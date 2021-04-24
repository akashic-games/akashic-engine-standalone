import * as g from "@akashic/akashic-engine";
// TODO: 個別インポートを可能に?
import { CanvasSurfaceContext } from "@akashic/pdi-browser/lib/full/canvas/context2d/CanvasSurfaceContext";
import { Context2DRenderer } from "@akashic/pdi-browser/lib/full/canvas/context2d/Context2DRenderer";
import { Surface } from "@akashic/pdi-browser/lib/full/Surface";

/**
 * プライマリサーフェス用の Context2DSurface 実装。
 * pdi-browser の CanvasSurface では外部から HTMLCanvasElement を渡すことができないため独自に実装 (変更点はその部分のみ)。
 */
export class PrimaryContext2DSurface extends Surface {
	canvas: HTMLCanvasElement;
	_renderer: g.Renderer | undefined;
	_context: CanvasSurfaceContext;

	constructor(width: number, height: number, canvas: HTMLCanvasElement) {
		super(width, height, canvas);
		const context = canvas.getContext("2d");
		if (context == null) {
			throw new Error("PrimaryContext2DSurface#constructor: cannot get context");
		}
		this._context = new CanvasSurfaceContext(context);
		canvas.width = width;
		canvas.height = height;
		this.canvas = canvas;
		this._renderer = undefined;
	}

	context(): CanvasSurfaceContext {
		return this._context;
	}

	renderer(): g.Renderer {
		if (!this._renderer) {
			this._renderer = new Context2DRenderer(this as any);
		}
		return this._renderer;
	}

	changeVisualScale(xScale: number, yScale: number): void {
		/*
		 Canvas要素のリサイズをCSS transformで行う。
		 CSSのwidth/height styleによるリサイズはおかしくなるケースが存在するので、可能な限りtransformを使う。
		 - https://twitter.com/uupaa/status/639002317576998912
		 - http://havelog.ayumusato.com/develop/performance/e554-paint_gpu_acceleration_problems.html
		 - http://buccchi.jp/blog/2013/03/android_canvas_deathpoint/
		 */
		var canvasStyle = <any>this.canvas.style;
		if ("transform" in canvasStyle) {
			canvasStyle.transformOrigin = "0 0";
			canvasStyle.transform = "scale(" + xScale + "," + yScale + ")";
		} else if ("webkitTransform" in canvasStyle) {
			canvasStyle.webkitTransformOrigin = "0 0";
			canvasStyle.webkitTransform = "scale(" + xScale + "," + yScale + ")";
		} else {
			canvasStyle.width = Math.floor(xScale * this.width) + "px";
			canvasStyle.height = Math.floor(yScale * this.width) + "px";
		}
	}

	changePhysicalScale(xScale: number, yScale: number): void {
		if (this._context) this.canvas.width = this.width * xScale;
		this.canvas.height = this.height * yScale;
		this._context.scale(xScale, yScale);
	}

	isPlaying(): boolean {
		return false;
	}

	getHTMLElement(): HTMLElement {
		return this.canvas;
	}

	destroy(): void {
		this.canvas.width = 1;
		this.canvas.height = 1;
		this.canvas = undefined!;
		this._renderer = undefined!;
		super.destroy();
	}
}
