import * as g from "@akashic/akashic-engine";
import { AudioPluginManager, WebAudioPlugin, HTMLAudioPlugin } from "@akashic/pdi-browser";
// TODO: 個別インポートを可能に?
import { AudioAsset } from "@akashic/pdi-browser/lib/full/asset/AudioAsset";
import { AudioManager } from "@akashic/pdi-browser/lib/full/AudioManager";

export class AudioFactory {
	private audioManager: AudioManager;
	private audioPluginManager: AudioPluginManager;

	constructor() {
		this.audioManager = new AudioManager();
		this.audioPluginManager = new AudioPluginManager();
		// TODO: どうすべきだよくわからないが一旦
		this.audioPluginManager.tryInstallPlugin([HTMLAudioPlugin, WebAudioPlugin]);
	}

	createAudioAsset(
		id: string,
		path: string,
		duration: number,
		system: g.AudioSystem,
		loop: boolean,
		hint: g.AudioAssetHint,
		offset?: number
	): g.AudioAsset {
		const activePlugin = this.audioPluginManager.getActivePlugin()!;
		const audioAsset = activePlugin.createAsset(id, path, duration, system, loop, hint, offset ?? 0);
		this.audioManager.registerAudioAsset(audioAsset);
		// TODO: g.AudioAsset#onDestroyed の引数は本来 g.AudioAsset のはず
		audioAsset.onDestroyed.addOnce(this.handleAudioAssetDestroyed as (asset: g.Asset) => void, this);
		return audioAsset;
	}

	createAudioPlayer(system: g.AudioSystem): g.AudioPlayer {
		const activePlugin = this.audioPluginManager.getActivePlugin()!;
		return activePlugin.createPlayer(system, this.audioManager);
	}

	private handleAudioAssetDestroyed(asset: AudioAsset): void {
		this.audioManager.removeAudioAsset(asset);
	}
}
