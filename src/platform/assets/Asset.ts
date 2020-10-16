import * as g from "@akashic/akashic-engine";

/**
 * ScriptAsset および TextAsset の基底クラス。
 */
export abstract class Asset implements g.Asset {
	type: string = "";
	id: string;
	path: string;
	originalPath: string;
	onDestroyed: g.Trigger<g.Asset> = new g.Trigger();

	constructor(id: string, path: string) {
		this.id = id;
		this.path = path;
		this.originalPath = path;
	}

	inUse(): boolean {
		return false;
	}

	destroy(): void {
		this.onDestroyed.destroy();
		this.onDestroyed = undefined!;
	}

	destroyed(): boolean {
		return this.onDestroyed === undefined;
	}

	_assetPathFilter(path: string): string {
		return path;
	}

	abstract _load(loader: g.AssetLoadHandler): void;
}
