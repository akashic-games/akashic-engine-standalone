import * as g from "@akashic/akashic-engine";
import { Context2DSurface } from "./context2d/Context2DSurface";
import { PrimaryContext2DSurface } from "./context2d/PrimaryContext2DSurface";

export class SurfaceFactory {
	private canvas: HTMLCanvasElement;

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
	}

	createPrimarySurface(width: number, height: number): g.Surface {
		return new PrimaryContext2DSurface(width, height, this.canvas);
	}

	createSurface(width: number, height: number): g.Surface {
		return new Context2DSurface(width, height);
	}
}
