/*
* MovieClip by Grant Skinner. Dec 5, 2010
* Visit http://easeljs.com/ for documentation, updates and examples.
*
*
* Copyright (c) 2010 Grant Skinner
* 
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
* The Easel Javascript library provides a retained graphics mode for canvas 
* including a full, hierarchical display list, a core interaction model, and 
* helper classes to make working with Canvas much easier.
* @module EaselJS
**/

(function(window) {

/**
 * TODO: doc. Update params.
 * @class MovieClip
 * @extends Container
 * @constructor
 * @param String mode
 * @param Number startPosition
 **/
var MovieClip = function(mode, startPosition, loop, labels, useTicks) {
  this.initialize(mode, startPosition, loop, labels, useTicks);
}
var p = MovieClip.prototype = new Container();

	/**
	 * Read-only. The MovieClip will advance normally, even if its parent is paused. This does not apply
	 * if its parent or an ancestor has a mode other than INDEPENDENT, and isn't advancing.
	 * @property INDEPENDENT
	 * @static
	 * @type String
	 * @default "independent"
	 **/
	MovieClip.INDEPENDENT = "independent";
	
	/**
	 * Read-only. The MovieClip will only display a single frame (as determined by the startPosition property).
	 * Children will not be ticked after the first frame.
	 * @property SINGLE_FRAME
	 * @static
	 * @type String
	 * @default "single"
	 **/
	MovieClip.SINGLE_FRAME = "single";
	
	/**
	 * Read-only. The MovieClip will be advanced only when it's parent advances.
	 * Children will only be ticked / advanced when this instance advances.
	 * @property SYNCHED
	 * @static
	 * @type String
	 * @default "synched"
	 **/
	MovieClip.SYNCHED = "synched";

// public properties:
	
	/**
	 * Controls how this MovieClip advances it's time. Must be one of 0 (INDEPENDENT), 1 (SINGLE_FRAME), or 2 (SYNCHED).
	 * See each constant for a description of the behaviour.
	 * @property mode
	 * @type String
	 * @default null
	 **/
	p.mode;

	/**
	 * Specifies what the first frame to play in this movieclip, or the only frame to display if mode is SINGLE_FRAME.
	 * @property startPosition
	 * @type Number
	 * @default 0
	 */
	p.startPosition = 0;
	
	/**
	 * Indicates whether this timeline should loop.
	 * @property loop
	 * @type Boolean
	 */
	p.loop = true;

	/**
	 * The TweenJS Timeline that is associated with this MovieClip.
	 * @property timeline
	 * @type Timeline
	 */
	p.timeline = null;

	/**
	 * TODO: doc.
	 * @property paused
	 * @type Boolean
	 */
	p.paused = false;
	
// private properties:

	/**
	 * 
	 * @property _synchOffset
	 * @type Number
	 * @default 0
	 * @private
	 */
	p._synchOffset = 0;
	
	/**
	 * @property _prevPos
	 * @type Number
	 * @default -1
	 * @private
	 */
	p._prevPos = -1;
	
	/**
	 * @property _prevPosition
	 * @type Number
	 * @default 0
	 * @private
	 */
	p._prevPosition = 0;
	
	/**
	 * @property _managed
	 * @type Object
	 * @private
	 */
	p._managed;
	
// constructor:

	/**
	 * @property DisplayObject_initialize
	 * @type Function
    * @private
	 **/
	p.Container_initialize = p.initialize;

	/** 
	 * Initialization method.
	 * @method initialize
	 * @protected
	 **/
	p.initialize = function(mode, startPosition, loop, labels, useTicks) {
		this.mode = mode||MovieClip.INDEPENDENT;
		this.startPosition = startPosition || 0;
		this.loop = loop;
		if (useTicks == null) { useTicks = true; }
		props = {paused:true, position:startPosition, useTicks:useTicks};
		this.Container_initialize();
		this.timeline = new Timeline(null, labels, props);
		this._managed = {};
	}
	
// public methods:
	/**
	 * Returns true or false indicating whether the display object would be visible if drawn to a canvas.
	 * This does not account for whether it would be visible within the boundaries of the stage.
	 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
	 * @method isVisible
	 * @return {Boolean} Boolean indicating whether the display object would be visible if drawn to a canvas
	 **/
	p.isVisible = function() {
		return this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0;
	}
	
	/**
	 * @property Container_draw
	 * @type Function
	 * @private
	 **/
	p.Container_draw = p.draw;
	
	/**
	 * Draws the display object into the specified context ignoring it's visible, alpha, shadow, and transform.
	 * Returns true if the draw was handled (useful for overriding functionality).
	 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
	 * @method draw
	 * @param {CanvasRenderingContext2D} ctx The canvas 2D context object to draw into.
	 * @param {Boolean} ignoreCache Indicates whether the draw operation should ignore any current cache.
	 * For example, used for drawing the cache (to prevent it from simply drawing an existing cache back
	 * into itself).
	 **/
	p.draw = function(ctx, ignoreCache, _mtx) {
		// draw to cache first:
		if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }
		this._updateTimeline();
		this.Container_draw(ctx, ignoreCache, _mtx);
	}
	
	
	/**
	 * TODO: Doc.
	 * @method play
	 **/
	p.play = function() {
		this.paused = false;
	}
	
	/**
	 * TODO: Doc.
	 * @method stop
	 **/
	p.stop = function() {
		this.paused = true;
	}
	
	/**
	 * TODO: Doc.
	 * @method gotoAndPlay
	 * @param position
	 **/
	p.gotoAndPlay = function(positionOrLabel) {
		this.paused = false;
		this._goto(positionOrLabel);
	}
	
	/**
	 * TODO: Doc.
	 * @method gotoAndStop
	 * @param position
	 **/
	p.gotoAndStop = function(positionOrLabel) {
		this.paused = true;
		this._goto(positionOrLabel);
	}
	
	/**
	 * MovieClip instances cannot currently be cloned.
	 * @method clone
	 * @return {MovieClip} a clone of the MovieClip instance.
	 **/
	p.clone = function() {
		// TODO: add support for this?? Need to clone the Timeline & retarget tweens.
		throw("MovieClip cannot be cloned.")
	}
	
	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[MovieClip (name="+  this.name +")]";
	}
	
// private methods:
	
	/**
	 * @property Container__tick
	 * @type Function
	 * @private
	 **/
	p.Container__tick = p._tick;
	
	p._goto = function(positionOrLabel) {
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos == null) { return; }
		this._prevPosition = pos;
		this._updateTimeline();
	}
	
	/**
	 * @method _tick
	 * @private
	 **/
	p._tick = function() {
		if (!this.paused && this.mode == MovieClip.INDEPENDENT) {
			this._prevPosition = (this._prevPos<0) ? 0 : this._prevPosition+1;
		}
		this.Container__tick();
	}
	
	/**
	 * @method _reset
	 * @private
	 **/
	p._reset = function() {
		this._prevPos = -1;
	}
	
	/**
	 * @method _updateTimeline
	 * @private
	 **/
	p._updateTimeline = function() {
		var tl = this.timeline;
		var tweens = tl._tweens;
		var kids = this.children;
		
		var synched = this.mode != MovieClip.INDEPENDENT;
		tl.loop = this.loop==null?true:this.loop;
		
		// update timeline position, ignoring actions if this is a graphic.
		if (synched) {
			// TODO: this would be far more ideal if the _synchOffset was somehow provided by the parent, so that reparenting wouldn't cause problems and we can direct draw. Ditto for _off (though less important).
			tl.setPosition(this.startPosition + (this.mode==MovieClip.SINGLE_FRAME?0:this._synchOffset), Tween.NONE);
		} else {
			tl.setPosition(this._prevPosition);
		}
		
		this._prevPosition = tl._prevPosition;
		if (this._prevPos == tl._prevPos) { return; }
		this._prevPos = tl._prevPos;
		
		for (var n in this._managed) { this._managed[n] = 1; }
		
		for (var i=tweens.length-1;i>=0;i--) {
			var tween = tweens[i];
			var target = tween._target;
			if (target == this) { continue; } // TODO: this assumes this is the actions tween. Valid?
			var offset = tween._stepPosition;
			
			if (target instanceof DisplayObject) {
				// motion tween.
				this._addManagedChild(target, offset);
			} else {
				// state tween.
				this._setState(target.state, offset);
			}
		}
		
		for (var i=kids.length-1; i>=0; i--) {
			var id = kids[i].id;
			if (this._managed[id] == 1) {
				this.removeChildAt(i);
				delete(this._managed[id]);
			}
		}
	}
	
	/**
	 * @method _setState
	 * @private
	 **/
	p._setState = function(state, offset) {
		if (!state) { return; }
		for (var i=0,l=state.length;i<l;i++) {
			var o = state[i];
			var target = o.t;
			var props = o.p;
			for (var n in props) { target[n] = props[n]; }
			this._addManagedChild(target, offset);
		}
	}
	
	/**
	 * @method _addManagedChild
	 * @private
	 **/
	p._addManagedChild = function(child, offset) {
		if (child._off) { return; }
		this.addChild(child);
		
		if (child instanceof MovieClip) {
			child._synchOffset = offset;
			if (child.mode == MovieClip.INDEPENDENT && (!this._managed[child.id] || this._prevPos == 0)) { child._reset(); }
		}
		this._managed[child.id] = 2;
	}
	

window.MovieClip = MovieClip;
}(window));

(function() {
	/**
	 * TODO: Doc.
	 * @private
	 * @class MovieClipPlugin
	 * @constructor
	 **/
	var MovieClipPlugin = function() {
	  throw("MovieClipPlugin cannot be instantiated.")
	}
	
	/**
	 * @method priority
	 * @private
	 **/
	MovieClipPlugin.priority = 100; // very high priority, should run first

	/**
	 * @method install
	 * @private
	 **/
	MovieClipPlugin.install = function() {
		Tween.installPlugin(MovieClipPlugin, ["startPosition"]);
	}
	
	/**
	 * @method init
	 * @private
	 **/
	MovieClipPlugin.init = function(tween, prop, value) {
		if (prop == "startPosition" || !(tween._target instanceof MovieClip)) { return value; }
	}
	
	/** 
	 * @method tween
	 * @private
	 **/
	MovieClipPlugin.tween = function(tween, prop, value, startValues, endValues, ratio, position, end) {
		if (!(tween._target instanceof MovieClip)) { return value; }
		return (ratio == 1 ? endValues[prop] : startValues[prop]);
	}

	MovieClipPlugin.install();
}());
