import * as g from "@akashic/akashic-engine";
import type * as pl from "@akashic/playlog";

export interface GameEventFilterFuncs {
	addFilter: (filter: g.EventFilter, handleEmpty?: boolean) => void;
	removeFilter: (filter?: g.EventFilter) => void;
}

export interface GameHandlerSetParameterObject {
	isSnapshotSaver?: boolean;
}

// TODO: いくつかのメソッドは現状動作しない。要実装検討。
export class GameHandlerSet implements g.GameHandlerSet {
	raiseEventTrigger: g.Trigger<pl.Event> = new g.Trigger();
	raiseTickTrigger: g.Trigger<pl.Event[]> = new g.Trigger();
	changeSceneModeTrigger: g.Trigger<g.SceneMode> = new g.Trigger();
	snapshotTrigger: g.Trigger<any> = new g.Trigger();
	isSnapshotSaver: boolean;
	_eventFilterFuncs: GameEventFilterFuncs | null = null;
	_getCurrentTimeFunc: (() => number) | null = null;
	_local: g.LocalTickModeString | null = null;
	_tickGenerationMode: g.TickGenerationModeString | null = null;

	constructor(param: GameHandlerSetParameterObject) {
		this.isSnapshotSaver = !!param.isSnapshotSaver;
	}

	setCurrentTimeFunc(fun: () => number): void {
		this._getCurrentTimeFunc = fun;
	}

	setEventFilterFuncs(funcs: GameEventFilterFuncs): void {
		this._eventFilterFuncs = funcs;
	}

	removeAllEventFilters(): void {
		if (this._eventFilterFuncs) this._eventFilterFuncs.removeFilter();
	}

	changeSceneMode(mode: g.SceneMode): void {
		this._local = mode.local;
		this._tickGenerationMode = mode.tickGenerationMode;
		this.changeSceneModeTrigger.fire(mode);
	}

	getCurrentTime(): number {
		if (this._getCurrentTimeFunc == null) {
			return 0;
		}
		return Math.floor(this._getCurrentTimeFunc());
	}

	raiseEvent(event: pl.Event): void {
		this.raiseEventTrigger.fire(event);
	}

	raiseTick(events?: pl.Event[]): void {
		if (events) this.raiseTickTrigger.fire(events);
	}

	addEventFilter(filter: g.EventFilter, handleEmpty?: boolean): void {
		if (this._eventFilterFuncs) this._eventFilterFuncs.addFilter(filter, handleEmpty);
	}

	removeEventFilter(filter: g.EventFilter): void {
		if (this._eventFilterFuncs) this._eventFilterFuncs.removeFilter(filter);
	}

	shouldSaveSnapshot(): boolean {
		return this.isSnapshotSaver;
	}

	getInstanceType(): "active" | "passive" {
		// NOTE: Active かどうかは `shouldSaveSnapshot()` と等価なので、簡易対応としてこの実装を用いる。
		return this.shouldSaveSnapshot() ? "active" : "passive";
	}

	saveSnapshot(frame: number, gameSnapshot: any, randGenSer: any, timestamp?: number): void {
		if (!this.shouldSaveSnapshot()) return;
		this.snapshotTrigger.fire({
			frame,
			timestamp,
			data: {
				randGenSer,
				gameSnapshot
			}
		});
	}
}
