import * as g from "@akashic/akashic-engine";
import { XHRLoader } from "@akashic/pdi-browser/lib/full/utils/XHRLoader"; // TODO: 個別インポートを可能に?
import { ExceptionFactory } from "@akashic/pdi-common-impl";
import { TextDataLoaderFunction } from "../AssetLoaderFunctions";
import { Asset } from "./Asset";

/**
 * g.TextAsset#data の型が akashic-engine (string) と pdi-browser (string | undefined) で不一致のため独自に実装。
 * TODO: pdi-browser 側の修正
 */
export class TextAsset extends Asset implements g.TextAsset {
	type: "text" = "text";
	data: string = "";
	onDestroyed: g.Trigger<g.Asset> = new g.Trigger();

	constructor(id: string, path: string) {
		super(id, path);
	}

	_load(handler: g.AssetLoadHandler): void {
		const loader = new XHRLoader();
		loader.get(this.path, (error, responseText) => {
			if (error) {
				handler._onAssetError(this, error);
				return;
			}
			this.data = responseText + "\n";
			handler._onAssetLoad(this);
		});
	}

	// NOTE: 独自実装
	_overrideLoadFunc(callback: TextDataLoaderFunction): void {
		this._load = handler => {
			callback(this.id, this.path, (error, data) => {
				if (error) {
					handler._onAssetError(this, ExceptionFactory.createAssetLoadError(error.message, false));
					return;
				}
				if (!data) {
					handler._onAssetError(this, ExceptionFactory.createAssetLoadError("no data received", false));
					return;
				}
				this.data = data;
				handler._onAssetLoad(this);
			});
		};
	}
}
