import { XHRScriptAsset } from "@akashic/pdi-browser/lib/full/asset/XHRScriptAsset";
import { ExceptionFactory } from "@akashic/pdi-common-impl";
import type { TextDataLoaderFunction } from "../AssetLoaderFunctions";

/**
 * g.ScriptAsset#script の型が akashic-engine (string) と pdi-browser (string | undefined) で不一致のため独自に実装。
 * TODO: pdi-browser 側の修正
 */
export class ScriptAsset extends XHRScriptAsset {
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
				this.script = data + "\n";
				handler._onAssetLoad(this);
			});
		};
	}
}
