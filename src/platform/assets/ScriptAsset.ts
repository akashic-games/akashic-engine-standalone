import * as g from "@akashic/akashic-engine";
import { XHRLoader } from "@akashic/pdi-browser/lib/full/utils/XHRLoader"; // TODO: 個別インポートを可能に?
import { ExceptionFactory } from "@akashic/pdi-common-impl";
import { TextDataLoaderFunction } from "../AssetLoaderFunctions";
import { Asset } from "./Asset";

/**
 * g.ScriptAsset#script の型が akashic-engine (string) と pdi-browser (string | undefined) で不一致のため独自に実装。
 * TODO: pdi-browser 側の修正
 */
export class ScriptAsset extends Asset implements g.ScriptAsset {
	type: "script" = "script";
	script: string = "";

	constructor(id: string, path: string) {
		super(id, path);
		this.id = id;
		this.path = path;
	}

	_load(handler: g.AssetLoadHandler): void {
		const loader = new XHRLoader();
		loader.get(this.path, (error, responseText) => {
			if (error) {
				handler._onAssetError(this, error);
				return;
			}
			this.script = responseText + "\n";
			handler._onAssetLoad(this);
		});
	}

	execute(execEnv: g.ScriptAssetRuntimeValue): any {
		const func = this._wrap();
		func(execEnv);
		return execEnv.module.exports;
	}

	_wrap(): Function {
		const func = new Function(
			"g",
			"(function(exports, require, module, __filename, __dirname) {\n" +
				this.script +
				"})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);\n"
		);
		return func;
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
				this.script = data + "\n";
				handler._onAssetLoad(this);
			});
		};
	}
}
