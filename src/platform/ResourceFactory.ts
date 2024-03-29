import type * as g from "@akashic/akashic-engine";
import urlJoin from "url-join";
import type { AssetLoaderFunctions } from "./AssetLoaderFunctions";
import { BinaryAsset } from "./assets/BinaryAsset";
import { GeneratedVectorImageAsset } from "./assets/GeneratedVectorImageAsset";
import { ImageAsset } from "./assets/ImageAsset";
import { ScriptAsset } from "./assets/ScriptAsset";
import { VectorImageAsset } from "./assets/SVGImageAsset";
import { TextAsset } from "./assets/TextAsset";
import { VideoAsset } from "./assets/VideoAsset";
import { AudioFactory } from "./audios/AudioFactory";
import { GlyphFactory } from "./graphics/GlyphFactory";
import { SurfaceFactory } from "./graphics/SurfaceFactory";

export interface ResourceFactoryParameter {
	/**
	 * プライマリサーフェスとして利用する HTMLCanvasElement。
	 */
	canvas: HTMLCanvasElement;

	assetLoaderFuncs?: AssetLoaderFunctions;
	assetBaseDir?: string;
}

export class ResourceFactory implements g.ResourceFactory {
	private surfaceFactory: SurfaceFactory;
	private audioFactory: AudioFactory;
	private assetLoaderFuncs: AssetLoaderFunctions | undefined;
	private assetBaseDir: string;

	constructor(param: ResourceFactoryParameter) {
		this.surfaceFactory = new SurfaceFactory(param.canvas);
		this.audioFactory = new AudioFactory();
		this.assetLoaderFuncs = param.assetLoaderFuncs;
		this.assetBaseDir = param.assetBaseDir || "";
	}

	createAudioAsset(
		id: string,
		path: string,
		duration: number,
		system: g.AudioSystem,
		loop: boolean,
		hint: g.AudioAssetHint
	): g.AudioAsset {
		return this.audioFactory.createAudioAsset(id, urlJoin(this.assetBaseDir, path), duration, system, loop, hint);
	}

	createAudioPlayer(system: g.AudioSystem): g.AudioPlayer {
		return this.audioFactory.createAudioPlayer(system);
	}

	createImageAsset(id: string, path: string, width: number, height: number): g.ImageAsset {
		return new ImageAsset(id, urlJoin(this.assetBaseDir, path), width, height);
	}

	createVectorImageAsset(id: string, path: string, width: number, height: number, hint?: g.VectorImageAssetHint): g.VectorImageAsset {
		return new VectorImageAsset(id, urlJoin(this.assetBaseDir, path), width, height, hint);
	}

	createVideoAsset(
		id: string,
		path: string,
		width: number,
		height: number,
		system: g.VideoSystem,
		loop: boolean,
		useRealSize: boolean
	): VideoAsset {
		return new VideoAsset(id, urlJoin(this.assetBaseDir, path), width, height, system, loop, useRealSize);
	}

	createTextAsset(id: string, path: string): g.TextAsset {
		const asset = new TextAsset(id, urlJoin(this.assetBaseDir, path));
		if (this.assetLoaderFuncs && this.assetLoaderFuncs.loadTextAsset) {
			asset._overrideLoadFunc(this.assetLoaderFuncs.loadTextAsset);
		}
		return asset;
	}

	createScriptAsset(id: string, path: string, exports?: string[]): g.ScriptAsset {
		const asset = new ScriptAsset(id, urlJoin(this.assetBaseDir, path), exports);
		if (this.assetLoaderFuncs && this.assetLoaderFuncs.loadScriptAsset) {
			asset._overrideLoadFunc(this.assetLoaderFuncs.loadScriptAsset);
		}
		return asset;
	}

	createBinaryAsset(id: string, path: string): g.BinaryAsset {
		return new BinaryAsset(id, urlJoin(this.assetBaseDir, path));
	}

	createPrimarySurface(width: number, height: number): g.Surface {
		return this.surfaceFactory.createPrimarySurface(width, height);
	}

	createSurface(width: number, height: number): g.Surface {
		return this.surfaceFactory.createSurface(width, height);
	}

	createGlyphFactory(
		fontFamily: string | string[],
		fontSize: number,
		baseline?: number,
		fontColor?: string,
		strokeWidth?: number,
		strokeColor?: string,
		strokeOnly?: boolean,
		fontWeight?: g.FontWeightString
	): g.GlyphFactory {
		return new GlyphFactory(fontFamily, fontSize, baseline, fontColor, strokeWidth, strokeColor, strokeOnly, fontWeight);
	}

	createVectorImageAssetFromString(id: string, path: string, data: string): VectorImageAsset {
		return new GeneratedVectorImageAsset(id, path, data);
	}
}
