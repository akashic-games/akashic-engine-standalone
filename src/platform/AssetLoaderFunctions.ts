export type TextDataLoaderFunction = (id: string, path: string, callback: (err: Error | null, data: string | undefined) => void) => void;

/**
 * 独自のアセットロード処理を行うための関数群。
 */
export interface AssetLoaderFunctions {
	/**
	 * スクリプトアセットを読み込む。
	 */
	loadScriptAsset?: TextDataLoaderFunction;
	/**
	 * テキストアセットを読み込む。
	 */
	loadTextAsset?: TextDataLoaderFunction;
}
