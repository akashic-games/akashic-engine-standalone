require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionType = void 0;
var ActionType;
(function (ActionType) {
    ActionType[ActionType["Wait"] = 0] = "Wait";
    ActionType[ActionType["Call"] = 1] = "Call";
    ActionType[ActionType["TweenTo"] = 2] = "TweenTo";
    ActionType[ActionType["TweenBy"] = 3] = "TweenBy";
    ActionType[ActionType["TweenByMult"] = 4] = "TweenByMult";
    ActionType[ActionType["Cue"] = 5] = "Cue";
    ActionType[ActionType["Every"] = 6] = "Every";
})(ActionType = exports.ActionType || (exports.ActionType = {}));

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Easing = void 0;
/**
 * Easing関数群。
 * 参考: http://gizma.com/easing/
 */
var Easing;
(function (Easing) {
    /**
     * 入力値をlinearした結果の現在位置を返す。
     * @param t 経過時間
     * @param b 開始位置
     * @param c 終了位置
     * @param d 所要時間
     */
    function linear(t, b, c, d) {
        return c * t / d + b;
    }
    Easing.linear = linear;
    /**
     * 入力値をeaseInQuadした結果の現在位置を返す。
     * @param t 経過時間
     * @param b 開始位置
     * @param c 終了位置
     * @param d 所要時間
     */
    function easeInQuad(t, b, c, d) {
        t /= d;
        return c * t * t + b;
    }
    Easing.easeInQuad = easeInQuad;
    /**
     * 入力値をeaseOutQuadした結果の現在位置を返す。
     * @param t 経過時間
     * @param b 開始位置
     * @param c 終了位置
     * @param d 所要時間
     */
    function easeOutQuad(t, b, c, d) {
        t /= d;
        return -c * t * (t - 2) + b;
    }
    Easing.easeOutQuad = easeOutQuad;
    /**
     * 入力値をeaseInOutQuadした結果の現在位置を返す。
     * @param t 経過時間
     * @param b 開始位置
     * @param c 終了位置
     * @param d 所要時間
     */
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1)
            return c / 2 * t * t + b;
        --t;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    Easing.easeInOutQuad = easeInOutQuad;
    /**
     * 入力値をeaseInQubicした結果の現在位置を返す。
     * @param t 経過時間
     * @param b 開始位置
     * @param c 終了位置
     * @param d 所要時間
     */
    function easeInCubic(t, b, c, d) {
        t /= d;
        return c * t * t * t + b;
    }
    Easing.easeInCubic = easeInCubic;
    /**
     * @deprecated この関数は非推奨機能である。代わりに `easeInCubic` を用いるべきである。
     */
    Easing.easeInQubic = easeInCubic;
    /**
     * 入力値をeaseOutQubicした結果の現在位置を返す。
     * @param t 経過時間
     * @param b 開始位置
     * @param c 終了位置
     * @param d 所要時間
     */
    function easeOutCubic(t, b, c, d) {
        t /= d;
        --t;
        return c * (t * t * t + 1) + b;
    }
    Easing.easeOutCubic = easeOutCubic;
    /**
     * @deprecated この関数は非推奨機能である。代わりに `easeOutCubic` を用いるべきである。
     */
    Easing.easeOutQubic = easeOutCubic;
    /**
     * 入力値をeaseInOutQubicした結果の現在位置を返す。
     * @param t 経過時間
     * @param b 開始位置
     * @param c 終了位置
     * @param d 所要時間
     */
    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1)
            return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }
    Easing.easeInOutCubic = easeInOutCubic;
    /**
     * @deprecated この関数は非推奨機能である。代わりに `easeInOutCubic` を用いるべきである。
     */
    Easing.easeInOutQubic = easeInOutCubic;
    /**
     * 入力値をeaseInQuartした結果の現在位置を返す。
     * @param t 経過時間
     * @param b 開始位置
     * @param c 終了位置
     * @param d 所要時間
     */
    function easeInQuart(t, b, c, d) {
        t /= d;
        return c * t * t * t * t + b;
    }
    Easing.easeInQuart = easeInQuart;
    /**
     * 入力値をeaseOutQuartした結果の現在位置を返す。
     * @param t 経過時間
     * @param b 開始位置
     * @param c 終了位置
     * @param d 所要時間
     */
    function easeOutQuart(t, b, c, d) {
        t /= d;
        --t;
        return -c * (t * t * t * t - 1) + b;
    }
    Easing.easeOutQuart = easeOutQuart;
    /**
     * 入力値をeaseInQuintした結果の現在位置を返す。
     * @param t 経過時間
     * @param b 開始位置
     * @param c 終了位置
     * @param d 所要時間
     */
    function easeInQuint(t, b, c, d) {
        t /= d;
        return c * t * t * t * t * t + b;
    }
    Easing.easeInQuint = easeInQuint;
    /**
     * 入力値をeaseOutQuintした結果の現在位置を返す。
     * @param t 経過時間
     * @param b 開始位置
     * @param c 終了位置
     * @param d 所要時間
     */
    function easeOutQuint(t, b, c, d) {
        t /= d;
        --t;
        return c * (t * t * t * t * t + 1) + b;
    }
    Easing.easeOutQuint = easeOutQuint;
    /**
     * 入力値をeaseInOutQuintした結果の現在位置を返す。
     * @param t 経過時間
     * @param b 開始位置
     * @param c 終了位置
     * @param d 所要時間
     */
    function easeInOutQuint(t, b, c, d) {
        t /= d / 2;
        if (t < 1)
            return c / 2 * t * t * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t * t * t + 2) + b;
    }
    Easing.easeInOutQuint = easeInOutQuint;
    /**
     * 入力値をeaseInSineした結果の現在位置を返す。
     * @param t 経過時間
     * @param b 開始位置
     * @param c 終了位置
     * @param d 所要時間
     */
    function easeInSine(t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    }
    Easing.easeInSine = easeInSine;
    /**
     * 入力値をeaseOutSineした結果の現在位置を返す。
     * @param t 経過時間
     * @param b 開始位置
     * @param c 終了位置
     * @param d 所要時間
     */
    function easeOutSine(t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    }
    Easing.easeOutSine = easeOutSine;
    /**
     * 入力値をeaseInOutSineした結果の現在位置を返す。
     * @param t 経過時間
     * @param b 開始位置
     * @param c 終了位置
     * @param d 所要時間
     */
    function easeInOutSine(t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    }
    Easing.easeInOutSine = easeInOutSine;
    /**
     * 入力値をeaseInExpoした結果の現在位置を返す。
     * @param t 経過時間
     * @param b 開始位置
     * @param c 終了位置
     * @param d 所要時間
     */
    function easeInExpo(t, b, c, d) {
        return c * Math.pow(2, 10 * (t / d - 1)) + b;
    }
    Easing.easeInExpo = easeInExpo;
    /**
     * 入力値をeaseInOutExpoした結果の現在位置を返す。
     * @param t 経過時間
     * @param b 開始位置
     * @param c 終了位置
     * @param d 所要時間
     */
    function easeInOutExpo(t, b, c, d) {
        t /= d / 2;
        if (t < 1)
            return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        --t;
        return c / 2 * (-Math.pow(2, -10 * t) + 2) + b;
    }
    Easing.easeInOutExpo = easeInOutExpo;
    /**
     * 入力値をeaseInCircした結果の現在位置を返す。
     * @param t 経過時間
     * @param b 開始位置
     * @param c 終了位置
     * @param d 所要時間
     */
    function easeInCirc(t, b, c, d) {
        t /= d;
        return -c * (Math.sqrt(1 - t * t) - 1) + b;
    }
    Easing.easeInCirc = easeInCirc;
    /**
     * 入力値をeaseOutCircした結果の現在位置を返す。
     * @param t 経過時間
     * @param b 開始位置
     * @param c 終了位置
     * @param d 所要時間
     */
    function easeOutCirc(t, b, c, d) {
        t /= d;
        --t;
        return c * Math.sqrt(1 - t * t) + b;
    }
    Easing.easeOutCirc = easeOutCirc;
    /**
     * 入力値をeaseInOutCircした結果の現在位置を返す。
     * @param t 経過時間
     * @param b 開始位置
     * @param c 終了位置
     * @param d 所要時間
     */
    function easeInOutCirc(t, b, c, d) {
        t /= d / 2;
        if (t < 1)
            return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        t -= 2;
        return c / 2 * (Math.sqrt(1 - t * t) + 1) + b;
    }
    Easing.easeInOutCirc = easeInOutCirc;
    /**
     * 入力値を easeInOutBack した結果の現在位置を返す。
     * @param t 経過時間
     * @param b 開始位置
     * @param c 終了位置
     * @param d 所要時間
     */
    function easeInOutBack(t, b, c, d) {
        var x = t / d;
        var c1 = 1.70158;
        var c2 = c1 * 1.525;
        var v = x < 0.5
            ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
            : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
        return b + c * v;
    }
    Easing.easeInOutBack = easeInOutBack;
    /**
     * 入力値を easeOutBounce した結果の現在位置を返す。
     * @param t 経過時間
     * @param b 開始位置
     * @param c 終了位置
     * @param d 所要時間
     */
    function easeOutBounce(t, b, c, d) {
        var x = t / d;
        var n1 = 7.5625;
        var d1 = 2.75;
        var v;
        if (x < 1 / d1) {
            v = n1 * x * x;
        }
        else if (x < 2 / d1) {
            v = n1 * (x -= 1.5 / d1) * x + 0.75;
        }
        else if (x < 2.5 / d1) {
            v = n1 * (x -= 2.25 / d1) * x + 0.9375;
        }
        else {
            v = n1 * (x -= 2.625 / d1) * x + 0.984375;
        }
        return b + c * v;
    }
    Easing.easeOutBounce = easeOutBounce;
})(Easing = exports.Easing || (exports.Easing = {}));

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timeline = void 0;
var Tween_1 = require("./Tween");
/**
 * タイムライン機能を提供するクラス。
 */
var Timeline = /** @class */ (function () {
    /**
     * Timelineを生成する。
     * @param scene タイムラインを実行する `Scene`
     */
    function Timeline(scene) {
        this._scene = scene;
        this._tweens = [];
        this._tweensCreateQue = [];
        this._fps = this._scene.game.fps;
        this.paused = false;
        scene.onUpdate.add(this._handler, this);
    }
    /**
     * Timelineに紐付いたTweenを生成する。
     * @param target タイムライン処理の対象にするオブジェクト
     * @param option Tweenの生成オプション。省略された場合、 {modified: target.modified, destroyed: target.destroyed} が与えられた時と同様の処理を行う。
     */
    Timeline.prototype.create = function (target, option) {
        var t = new Tween_1.Tween(target, option);
        this._tweensCreateQue.push(t);
        return t;
    };
    /**
     * Timelineに紐付いたTweenを削除する。
     * @param tween 削除するTween。
     */
    Timeline.prototype.remove = function (tween) {
        var index = this._tweens.indexOf(tween);
        var queIndex = this._tweensCreateQue.indexOf(tween);
        if (index < 0 && queIndex < 0) {
            return;
        }
        tween.cancel(false);
    };
    /**
     * Timelineに紐付いた全Tweenのアクションを完了させる。詳細は `Tween#complete()`の説明を参照。
     */
    Timeline.prototype.completeAll = function () {
        for (var i = 0; i < this._tweens.length; ++i) {
            var tween = this._tweens[i];
            if (!tween.isFinished()) {
                tween.complete();
            }
        }
        for (var i = 0; i < this._tweensCreateQue.length; ++i) {
            var tween = this._tweensCreateQue[i];
            if (!tween.isFinished()) {
                tween.complete();
            }
        }
    };
    /**
     * Timelineに紐付いた全Tweenのアクションを取り消す。詳細は `Tween#cancel()`の説明を参照。
     * @param revert ターゲットのプロパティをアクション開始前に戻すかどうか (指定しない場合は `false`)
     */
    Timeline.prototype.cancelAll = function (revert) {
        if (revert === void 0) { revert = false; }
        for (var i = 0; i < this._tweens.length; ++i) {
            var tween = this._tweens[i];
            if (!tween.isFinished()) {
                tween.cancel(revert);
            }
        }
        for (var i = 0; i < this._tweensCreateQue.length; ++i) {
            var tween = this._tweensCreateQue[i];
            if (!tween.isFinished()) {
                tween.cancel(revert);
            }
        }
    };
    /**
     * Timelineに紐付いた全Tweenの紐付けを解除する。
     */
    Timeline.prototype.clear = function () {
        this.cancelAll(false);
    };
    /**
     * このTimelineを破棄する。
     */
    Timeline.prototype.destroy = function () {
        this.clear();
        if (!this._scene.destroyed()) {
            this._scene.onUpdate.remove(this._handler, this);
        }
        this._scene = undefined;
    };
    /**
     * このTimelineが破棄済みであるかを返す。
     */
    Timeline.prototype.destroyed = function () {
        return this._scene === undefined;
    };
    Timeline.prototype._handler = function () {
        if (this.paused || this._tweens.length + this._tweensCreateQue.length === 0) {
            return;
        }
        this._tweens = this._tweens.concat(this._tweensCreateQue);
        this._tweensCreateQue = [];
        var tmp = [];
        for (var i = 0; i < this._tweens.length; ++i) {
            var tween = this._tweens[i];
            if (!tween.shouldRemove()) {
                tween._fire(1000 / this._fps);
                tmp.push(tween);
            }
        }
        this._tweens = tmp;
    };
    return Timeline;
}());
exports.Timeline = Timeline;

},{"./Tween":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tween = void 0;
var ActionType_1 = require("./ActionType");
var Easing_1 = require("./Easing");
/**
 * オブジェクトの状態を変化させるアクションを定義するクラス。
 * 本クラスのインスタンス生成には`Timeline#create()`を利用する。
 */
var Tween = /** @class */ (function () {
    /**
     * Tweenを生成する。
     * @param target 対象となるオブジェクト
     * @param option オプション
     */
    function Tween(target, option) {
        this._target = target;
        this._stepIndex = 0;
        this._loop = !!option && !!option.loop;
        this._stale = false;
        this._modifiedHandler = undefined;
        if (option && option.modified) {
            this._modifiedHandler = option.modified;
        }
        else if (target && target.modified) {
            this._modifiedHandler = target.modified;
        }
        this._destroyedHandler = undefined;
        if (option && option.destroyed) {
            this._destroyedHandler = option.destroyed;
        }
        else if (target && target.destroyed) {
            this._destroyedHandler = target.destroyed;
        }
        this._steps = [];
        this._lastStep = undefined;
        this._pararel = false;
        this._initialProp = {};
        this.paused = false;
    }
    /**
     * オブジェクトの状態を変化させるアクションを追加する。
     * @param props 変化内容
     * @param duration 変化に要する時間（ミリ秒）
     * @param easing Easing関数（指定しない場合は`Easing.linear`）
     */
    Tween.prototype.to = function (props, duration, easing) {
        if (easing === void 0) { easing = Easing_1.Easing.linear; }
        var action = {
            input: props,
            duration: duration,
            easing: easing,
            type: ActionType_1.ActionType.TweenTo,
            initialized: false
        };
        this._push(action);
        return this;
    };
    /**
     * オブジェクトの状態を変化させるアクションを追加する。
     * 変化内容はアクション開始時を基準とした相対値で指定する。
     * @param props 変化内容
     * @param duration 変化に要する時間（ミリ秒）
     * @param easing Easing関数（指定しない場合は`Easing.linear`）
     * @param multiply `true`を指定すると`props`の値をアクション開始時の値に掛け合わせた値が終了値となる（指定しない場合は`false`）
     */
    Tween.prototype.by = function (props, duration, easing, multiply) {
        if (easing === void 0) { easing = Easing_1.Easing.linear; }
        if (multiply === void 0) { multiply = false; }
        var type = multiply ? ActionType_1.ActionType.TweenByMult : ActionType_1.ActionType.TweenBy;
        var action = {
            input: props,
            duration: duration,
            easing: easing,
            type: type,
            initialized: false
        };
        this._push(action);
        return this;
    };
    /**
     * 次に追加されるアクションを、このメソッド呼び出しの直前に追加されたアクションと並列に実行させる。
     * `Tween#con()`で並列実行を指定されたアクションが全て終了後、次の並列実行を指定されていないアクションを実行する。
     */
    Tween.prototype.con = function () {
        this._pararel = true;
        return this;
    };
    /**
     * オブジェクトの変化を停止するアクションを追加する。
     * @param duration 停止する時間（ミリ秒）
     */
    Tween.prototype.wait = function (duration) {
        var action = {
            duration: duration,
            type: ActionType_1.ActionType.Wait,
            initialized: false
        };
        this._push(action);
        return this;
    };
    /**
     * 関数を即座に実行するアクションを追加する。
     * @param func 実行する関数
     */
    Tween.prototype.call = function (func) {
        var action = {
            func: func,
            type: ActionType_1.ActionType.Call,
            duration: 0,
            initialized: false
        };
        this._push(action);
        return this;
    };
    /**
     * 一時停止するアクションを追加する。
     * 内部的には`Tween#call()`で`Tween#paused`に`true`をセットしている。
     */
    Tween.prototype.pause = function () {
        var _this = this;
        return this.call(function () {
            _this.paused = true;
        });
    };
    /**
     * 待機時間をキーとして実行したい関数を複数指定する。
     * @param actions 待機時間をキーとして実行したい関数を値としたオブジェクト
     */
    Tween.prototype.cue = function (funcs) {
        var keys = Object.keys(funcs);
        keys.sort(function (a, b) {
            return Number(a) > Number(b) ? 1 : -1;
        });
        var q = [];
        for (var i = 0; i < keys.length; ++i) {
            q.push({ time: Number(keys[i]), func: funcs[keys[i]] });
        }
        var action = {
            type: ActionType_1.ActionType.Cue,
            duration: Number(keys[keys.length - 1]),
            cue: q,
            initialized: false
        };
        this._push(action);
        return this;
    };
    /**
     * 指定した時間を経過するまで毎フレーム指定した関数を呼び出すアクションを追加する。
     * @param func 毎フレーム呼び出される関数。第一引数は経過時間、第二引数はEasingした結果の変化量（0-1）となる。
     * @param duration 変化に要する時間（ミリ秒）
     * @param easing Easing関数（指定しない場合は`Easing.linear`）
     */
    Tween.prototype.every = function (func, duration, easing) {
        if (easing === void 0) { easing = Easing_1.Easing.linear; }
        var action = {
            func: func,
            type: ActionType_1.ActionType.Every,
            easing: easing,
            duration: duration,
            initialized: false
        };
        this._push(action);
        return this;
    };
    /**
     * ターゲットをフェードインさせるアクションを追加する。
     * @param duration 変化に要する時間（ミリ秒）
     * @param easing Easing関数（指定しない場合は`Easing.linear`）
     */
    Tween.prototype.fadeIn = function (duration, easing) {
        if (easing === void 0) { easing = Easing_1.Easing.linear; }
        return this.to({ opacity: 1 }, duration, easing);
    };
    /**
     * ターゲットをフェードアウトさせるアクションを追加する。
     * @param duration 変化に要する時間（ミリ秒）
     * @param easing Easing関数（指定しない場合は`Easing.linear`）
     */
    Tween.prototype.fadeOut = function (duration, easing) {
        if (easing === void 0) { easing = Easing_1.Easing.linear; }
        return this.to({ opacity: 0 }, duration, easing);
    };
    /**
     * ターゲットを指定した座標に移動するアクションを追加する。
     * @param x x座標
     * @param y y座標
     * @param duration 変化に要する時間（ミリ秒）
     * @param easing Easing関数（指定しない場合は`Easing.linear`）
     */
    Tween.prototype.moveTo = function (x, y, duration, easing) {
        if (easing === void 0) { easing = Easing_1.Easing.linear; }
        return this.to({ x: x, y: y }, duration, easing);
    };
    /**
     * ターゲットを指定した相対座標に移動するアクションを追加する。相対座標の基準値はアクション開始時の座標となる。
     * @param x x座標
     * @param y y座標
     * @param duration 変化に要する時間（ミリ秒）
     * @param easing Easing関数（指定しない場合は`Easing.linear`）
     */
    Tween.prototype.moveBy = function (x, y, duration, easing) {
        if (easing === void 0) { easing = Easing_1.Easing.linear; }
        return this.by({ x: x, y: y }, duration, easing);
    };
    /**
     * ターゲットのX座標を指定した座標に移動するアクションを追加する。
     * @param x x座標
     * @param duration 変化に要する時間（ミリ秒）
     * @param easing Easing関数（指定しない場合は`Easing.linear`）
     */
    Tween.prototype.moveX = function (x, duration, easing) {
        if (easing === void 0) { easing = Easing_1.Easing.linear; }
        return this.to({ x: x }, duration, easing);
    };
    /**
     * ターゲットのY座標を指定した座標に移動するアクションを追加する。
     * @param y y座標
     * @param duration 変化に要する時間（ミリ秒）
     * @param easing Easing関数（指定しない場合は`Easing.linear`）
     */
    Tween.prototype.moveY = function (y, duration, easing) {
        if (easing === void 0) { easing = Easing_1.Easing.linear; }
        return this.to({ y: y }, duration, easing);
    };
    /**
     * ターゲットを指定した角度に回転するアクションを追加する。
     * @param angle 角度
     * @param duration 変化に要する時間（ミリ秒）
     * @param easing Easing関数（指定しない場合は`Easing.linear`）
     */
    Tween.prototype.rotateTo = function (angle, duration, easing) {
        if (easing === void 0) { easing = Easing_1.Easing.linear; }
        return this.to({ angle: angle }, duration, easing);
    };
    /**
     * ターゲットをアクション開始時の角度を基準とした相対角度に回転するアクションを追加する。
     * @param angle 角度
     * @param duration 変化に要する時間（ミリ秒）
     * @param easing Easing関数（指定しない場合は`Easing.linear`）
     */
    Tween.prototype.rotateBy = function (angle, duration, easing) {
        if (easing === void 0) { easing = Easing_1.Easing.linear; }
        return this.by({ angle: angle }, duration, easing);
    };
    /**
     * ターゲットを指定した倍率に拡縮するアクションを追加する。
     * @param scaleX X方向の倍率
     * @param scaleY Y方向の倍率
     * @param duration 変化に要する時間（ミリ秒）
     * @param easing Easing関数（指定しない場合は`Easing.linear`）
     */
    Tween.prototype.scaleTo = function (scaleX, scaleY, duration, easing) {
        if (easing === void 0) { easing = Easing_1.Easing.linear; }
        return this.to({ scaleX: scaleX, scaleY: scaleY }, duration, easing);
    };
    /**
     * ターゲットのアクション開始時の倍率に指定した倍率を掛け合わせた倍率に拡縮するアクションを追加する。
     * @param scaleX X方向の倍率
     * @param scaleY Y方向の倍率
     * @param duration 変化に要する時間（ミリ秒）
     * @param easing Easing関数（指定しない場合は`Easing.linear`）
     */
    Tween.prototype.scaleBy = function (scaleX, scaleY, duration, easing) {
        if (easing === void 0) { easing = Easing_1.Easing.linear; }
        return this.by({ scaleX: scaleX, scaleY: scaleY }, duration, easing, true);
    };
    /**
     * このTweenに追加されたすべてのアクションを即座に完了する。
     * `Tween#loop`が`true`の場合、ループの終端までのアクションがすべて実行される。
     */
    Tween.prototype.complete = function () {
        for (var i = this._stepIndex; i < this._steps.length; ++i) {
            for (var j = 0; j < this._steps[i].length; ++j) {
                var action = this._steps[i][j];
                if (!action.initialized) {
                    this._initAction(action);
                }
                var keys = Object.keys(action.goal);
                for (var k = 0; k < keys.length; ++k) {
                    var key = keys[k];
                    this._target[key] = action.goal[key];
                }
                if (action.type === ActionType_1.ActionType.Call && typeof action.func === "function") {
                    action.func.call(this._target);
                }
                else if (action.type === ActionType_1.ActionType.Cue && action.cue) {
                    for (var k = 0; k < action.cue.length; ++k) {
                        action.cue[k].func.call(this._target);
                    }
                }
                else if (action.type === ActionType_1.ActionType.Every && typeof action.func === "function") {
                    action.func.call(this._target, action.duration, 1);
                }
            }
        }
        this._stepIndex = this._steps.length;
        this._loop = false;
        this._lastStep = undefined;
        this._pararel = false;
        this.paused = false;
        if (this._modifiedHandler) {
            this._modifiedHandler.call(this._target);
        }
    };
    /**
     * このTweenに追加されたすべてのアクションを取り消す。
     * `revert`を`true` にした場合、ターゲットのプロパティをアクション開始前に戻す。
     * ただし`Tween#call()`や`Tween#every()`により変更されたプロパティは戻らない点に注意。
     * @param revert ターゲットのプロパティをアクション開始前に戻すかどうか (指定しない場合は `false`)
     */
    Tween.prototype.cancel = function (revert) {
        if (revert === void 0) { revert = false; }
        if (revert) {
            var keys = Object.keys(this._initialProp);
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                this._target[key] = this._initialProp[key];
            }
        }
        this._stepIndex = this._steps.length;
        this._loop = false;
        this._lastStep = undefined;
        this._pararel = false;
        this.paused = false;
        this._stale = true;
        if (this._modifiedHandler) {
            this._modifiedHandler.call(this._target);
        }
    };
    /**
     * アニメーションが終了しているかどうかを返す。
     * `_target`が破棄された場合又は、全アクションの実行が終了した場合に`true`を返す。
     */
    Tween.prototype.isFinished = function () {
        var ret = false;
        if (this._destroyedHandler) {
            ret = this._destroyedHandler.call(this._target);
        }
        if (!ret) {
            ret = this._stepIndex !== 0 && this._stepIndex >= this._steps.length && !this._loop;
        }
        return ret;
    };
    /**
     * アニメーションが削除可能かどうかを返す。
     * 通常、ゲーム開発者がこのメソッドを呼び出す必要はない。
     */
    Tween.prototype.shouldRemove = function () {
        return this._stale || this.isFinished();
    };
    /**
     * アニメーションを実行する。
     * @param delta 前フレームからの経過時間
     */
    Tween.prototype._fire = function (delta) {
        if (this._steps.length === 0 || this.isFinished() || this.paused) {
            return;
        }
        if (this._stepIndex >= this._steps.length) {
            if (this._loop) {
                this._stepIndex = 0;
            }
            else {
                return;
            }
        }
        var actions = this._steps[this._stepIndex];
        var remained = false;
        for (var i = 0; i < actions.length; ++i) {
            var action = actions[i];
            if (!action.initialized) {
                this._initAction(action);
            }
            if (action.finished) {
                continue;
            }
            action.elapsed += delta;
            switch (action.type) {
                case ActionType_1.ActionType.Call:
                    action.func.call(this._target);
                    break;
                case ActionType_1.ActionType.Every:
                    var progress = action.easing(action.elapsed, 0, 1, action.duration);
                    if (progress > 1) {
                        progress = 1;
                    }
                    action.func.call(this._target, action.elapsed, progress);
                    break;
                case ActionType_1.ActionType.TweenTo:
                case ActionType_1.ActionType.TweenBy:
                case ActionType_1.ActionType.TweenByMult:
                    var keys = Object.keys(action.goal);
                    for (var j = 0; j < keys.length; ++j) {
                        var key = keys[j];
                        // アクションにより undefined が指定されるケースと初期値を区別するため Object.prototype.hasOwnProperty() を利用
                        // (number以外が指定されるケースは存在しないが念の為)
                        if (!this._initialProp.hasOwnProperty(key)) {
                            this._initialProp[key] = this._target[key];
                        }
                        if (action.elapsed >= action.duration) {
                            this._target[key] = action.goal[key];
                        }
                        else {
                            this._target[key] = action.easing(action.elapsed, action.start[key], action.goal[key] - action.start[key], action.duration);
                        }
                    }
                    break;
                case ActionType_1.ActionType.Cue:
                    var cueAction = action.cue[action.cueIndex];
                    if (cueAction !== undefined && action.elapsed >= cueAction.time) {
                        cueAction.func.call(this._target);
                        ++action.cueIndex;
                    }
                    break;
            }
            if (this._modifiedHandler) {
                this._modifiedHandler.call(this._target);
            }
            if (action.elapsed >= action.duration) {
                action.finished = true;
            }
            else {
                remained = true;
            }
        }
        if (!remained) {
            for (var k = 0; k < actions.length; ++k) {
                actions[k].initialized = false;
            }
            ++this._stepIndex;
        }
    };
    /**
     * Tweenの実行状態をシリアライズして返す。
     */
    Tween.prototype.serializeState = function () {
        var tData = {
            _stepIndex: this._stepIndex,
            _initialProp: this._initialProp,
            _steps: []
        };
        for (var i = 0; i < this._steps.length; ++i) {
            tData._steps[i] = [];
            for (var j = 0; j < this._steps[i].length; ++j) {
                tData._steps[i][j] = {
                    input: this._steps[i][j].input,
                    start: this._steps[i][j].start,
                    goal: this._steps[i][j].goal,
                    duration: this._steps[i][j].duration,
                    elapsed: this._steps[i][j].elapsed,
                    type: this._steps[i][j].type,
                    cueIndex: this._steps[i][j].cueIndex,
                    initialized: this._steps[i][j].initialized,
                    finished: this._steps[i][j].finished
                };
            }
        }
        return tData;
    };
    /**
     * Tweenの実行状態を復元する。
     * @param serializedstate 復元に使う情報。
     */
    Tween.prototype.deserializeState = function (serializedState) {
        this._stepIndex = serializedState._stepIndex;
        this._initialProp = serializedState._initialProp;
        for (var i = 0; i < serializedState._steps.length; ++i) {
            for (var j = 0; j < serializedState._steps[i].length; ++j) {
                if (!serializedState._steps[i][j] || !this._steps[i][j])
                    continue;
                this._steps[i][j].input = serializedState._steps[i][j].input;
                this._steps[i][j].start = serializedState._steps[i][j].start;
                this._steps[i][j].goal = serializedState._steps[i][j].goal;
                this._steps[i][j].duration = serializedState._steps[i][j].duration;
                this._steps[i][j].elapsed = serializedState._steps[i][j].elapsed;
                this._steps[i][j].type = serializedState._steps[i][j].type;
                this._steps[i][j].cueIndex = serializedState._steps[i][j].cueIndex;
                this._steps[i][j].initialized = serializedState._steps[i][j].initialized;
                this._steps[i][j].finished = serializedState._steps[i][j].finished;
            }
        }
    };
    /**
     * `this._pararel`が`false`の場合は新規にステップを作成し、アクションを追加する。
     * `this._pararel`が`true`の場合は最後に作成したステップにアクションを追加する。
     */
    Tween.prototype._push = function (action) {
        if (this._pararel) {
            this._lastStep.push(action);
        }
        else {
            var index = this._steps.push([action]) - 1;
            this._lastStep = this._steps[index];
        }
        this._pararel = false;
    };
    Tween.prototype._initAction = function (action) {
        action.elapsed = 0;
        action.start = {};
        action.goal = {};
        action.cueIndex = 0;
        action.finished = false;
        action.initialized = true;
        if (action.type !== ActionType_1.ActionType.TweenTo
            && action.type !== ActionType_1.ActionType.TweenBy
            && action.type !== ActionType_1.ActionType.TweenByMult) {
            return;
        }
        var keys = Object.keys(action.input);
        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (this._target[key] !== undefined) {
                action.start[key] = this._target[key];
                if (action.type === ActionType_1.ActionType.TweenTo) {
                    action.goal[key] = action.input[key];
                }
                else if (action.type === ActionType_1.ActionType.TweenBy) {
                    action.goal[key] = action.start[key] + action.input[key];
                }
                else if (action.type === ActionType_1.ActionType.TweenByMult) {
                    action.goal[key] = action.start[key] * action.input[key];
                }
            }
        }
    };
    return Tween;
}());
exports.Tween = Tween;

},{"./ActionType":1,"./Easing":2}],"@akashic-extension/akashic-timeline":[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Easing = exports.Tween = exports.Timeline = void 0;
var Timeline_1 = require("./Timeline");
Object.defineProperty(exports, "Timeline", { enumerable: true, get: function () { return Timeline_1.Timeline; } });
var Tween_1 = require("./Tween");
Object.defineProperty(exports, "Tween", { enumerable: true, get: function () { return Tween_1.Tween; } });
var Easing_1 = require("./Easing");
Object.defineProperty(exports, "Easing", { enumerable: true, get: function () { return Easing_1.Easing; } });

},{"./Easing":2,"./Timeline":3,"./Tween":4}]},{},["@akashic-extension/akashic-timeline"]);
