﻿/// <reference path="Primitives.js" />
/// <reference path="DependencyObject.js" />
/// <reference path="DependencyProperty.js" />
/// <reference path="Canvas.js" />
/// <reference path="Dirty.js"/>
/// <reference path="App.js"/>

UIElement.prototype = new DependencyObject;
UIElement.prototype.constructor = UIElement;
function UIElement() {
    DependencyObject.call(this);

    this._Providers[_PropertyPrecedence.Inherited] = new _InheritedPropertyValueProvider(this, _PropertyPrecedence.Inherited);
    
    this._Flags = UIElementFlags.RenderVisible | UIElementFlags.HitTestVisible;

    this._HiddenDesire = new Size(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
    this._Bounds = new Rect();
    this._GlobalBounds = new Rect();
    this._SurfaceBounds = new Rect();

    this._DirtyFlags = _Dirty.Measure;
    this._PropagateFlagUp(UIElementFlags.DirtyMeasureHint);
    this._UpDirtyNode = this._DownDirtyNode = null;
    this._ForceInvalidateOfNewBounds = false;
    this._DirtyRegion = new Rect();
    this._DesiredSize = new Size();
    this._RenderSize = new Size();

    this._ComputeLocalTransform();
    this._ComputeLocalProjection();
    this._ComputeTotalRenderVisibility();
    this._ComputeTotalHitTestVisibility();
}

//////////////////////////////////////////
// DEPENDENCY PROPERTIES
//////////////////////////////////////////
UIElement.ClipProperty = DependencyProperty.Register("Clip", UIElement);
UIElement.prototype.GetClip = function () {
    return this.GetValue(UIElement.ClipProperty);
};
UIElement.prototype.SetClip = function (value) {
    this.SetValue(UIElement.ClipProperty, value);
};

//UIElement.CacheModeProperty;
//UIElement.EffectProperty;
//UIElement.ProjectionProperty;
//UIElement.IsHitTestVisibleProperty;
//UIElement.OpacityMaskProperty;

UIElement.OpacityProperty = DependencyProperty.Register("Opacity", UIElement);
UIElement.prototype.GetOpacity = function () {
    return this.GetValue(UIElement.OpacityProperty);
};
UIElement.prototype.SetOpacity = function (value) {
    this.SetValue(UIElement.OpacityProperty, value);
};

//UIElement.RenderTransformOriginProperty;
//UIElement.AllowDropProperty;
//UIElement.CursorProperty = DependencyProperty.Register("Cursor", UIElement, CursorType.Default, null, UIElement._CoerceCursor);
//UIElement.ResourcesProperty;
//UIElement.TriggersProperty;

UIElement.UseLayoutRoundingProperty = DependencyProperty.Register("UseLayoutRounding", UIElement);
UIElement.prototype.GetUseLayoutRounding = function () {
    return this.GetValue(UIElement.UseLayoutRoundingProperty);
};
UIElement.prototype.SetUseLayoutRounding = function (value) {
    this.SetValue(UIElement.UseLayoutRoundingProperty, value);
};

UIElement.VisibilityProperty = DependencyProperty.Register("Visibility", UIElement, Visibility.Visible);
UIElement.prototype.GetVisibility = function () {
    return this.GetValue(UIElement.VisibilityProperty);
};
UIElement.prototype.SetVisibility = function (value) {
    this.SetValue(UIElement.VisibilityProperty, value);
};

UIElement.TagProperty = DependencyProperty.Register("Tag", UIElement);
UIElement.prototype.GetTag = function () {
    return this.GetValue(UIElement.TagProperty);
};
UIElement.prototype.SetTag = function (value) {
    this.SetValue(UIElement.TagProperty, value);
};

//////////////////////////////////////////
// INSTANCE METHODS
//////////////////////////////////////////
UIElement.prototype.SetVisualParent = function (/* UIElement */value) {
    this._VisualParent = value;
};
UIElement.prototype.GetVisualParent = function () {
    return this._VisualParent; //UIElement
};
UIElement.prototype.IsLayoutContainer = function () { return false; };
UIElement.prototype.IsContainer = function () { return this.IsLayoutContainer(); };
UIElement.prototype._CacheInvalidateHint = function () {
};

UIElement.prototype._FullInvalidate = function (renderTransform) {
    this._Invalidate();
    if (renderTransform) {
        this._UpdateTransform();
        this._UpdateProjection();
    }
    this._UpdateBounds(true);
};
UIElement.prototype._Invalidate = function (rect) {
    if (!rect)
        rect = this._SurfaceBounds;
    if (!this._GetRenderVisible() /* || opacity causes invisible */)
        return;

    if (this._IsAttached) {
        App.Instance.MainSurface._AddDirtyElement(this, _Dirty.Invalidate);
        //WTF: Invalidate bitmap cache
        //TODO: Render Intermediate not implemented
        this._DirtyRegion = this._DirtyRegion.Union(rect);
        //TODO: Alert needs redraw
        this._OnInvalidated();
    }
};
UIElement.prototype._InvalidateMeasure = function () {
    this._DirtyFlags |= _Dirty.Measure;
    this._PropagateFlagUp(UIElementFlags.DirtyMeasureHint);
    //TODO: Alert redraw necessary
};
UIElement.prototype._InvalidateArrange = function () {
    this._DirtyFlags |= _Dirty.Arrange;
    this._PropagateFlagUp(UIElementFlags.DirtyArrangeHint);
    //TODO: Alert redraw necessary
};
UIElement.prototype._InvalidateSubtreePaint = function () {
    this._Invalidate(this._GetSubtreeBounds());
};

UIElement.prototype._UpdateBounds = function (forceRedraw) {
    if (this._IsAttached)
        App.Instance.MainSurface._AddDirtyElement(this, _Dirty.Bounds);
    this._ForceInvalidateOfNewBounds |= forceRedraw;
};
UIElement.prototype._UpdateTransform = function () {
    //NotImplemented("UIElement._UpdateTransform()");
};
UIElement.prototype._UpdateProjection = function () {
    //NotImplemented("UIElement._UpdateProjection()");
};
UIElement.prototype._ComputeBounds = function () {
    AbstractMethod("UIElement._ComputeBounds()");
};
UIElement.prototype._ComputeGlobalBounds = function () {
    this._GlobalBounds = this._IntersectBoundsWithClipPath(this._Extents/*.GrowByThickness(this._EffectPadding)*/, false); //.Transform(this._LocalProjection);
};
UIElement.prototype._ComputeSurfaceBounds = function () {
    this._SurfaceBounds = this._IntersectBoundsWithClipPath(this._Extents/*.GrowByThickness(this._EffectPadding)*/, false); //.Transform(this._AbsoluteProjection);
};
UIElement.prototype._ComputeLocalTransform = function () {
    //NotImplemented("UIElement._ComputeLocalTransform");
};
UIElement.prototype._ComputeLocalProjection = function () {
    //NotImplemented("UIElement._ComputeLocalProjection");
};

UIElement.prototype._ComputeTotalRenderVisibility = function () {
    if (this._GetActualTotalRenderVisibility())
        this._Flags |= UIElementFlags.TotalRenderVisible;
    else
        this._Flags &= ~UIElementFlags.TotalRenderVisible;
};
UIElement.prototype._UpdateTotalRenderVisibility = function () {
    if (this._IsAttached)
        App.Instance.MainSurface._AddDirtyElement(this, _Dirty.RenderVisibility);
};
UIElement.prototype._GetActualTotalRenderVisibility = function () {
    var visible = (this._Flags & UIElementFlags.RenderVisible) != 0;
    var parentVisible = true;
    this._TotalOpacity = this.GetOpacity();

    var visualParent = this.GetVisualParent();
    if (visualParent) {
        visualParent._ComputeTotalRenderVisibility();
        parentVisible = visible && visualParent._GetRenderVisible();
        this._TotalOpacity = visualParent._TotalOpacity;
    }
    visible = visible && parentVisible;
    return visible;
};
UIElement.prototype._GetRenderVisible = function () {
    return (this._Flags & UIElementFlags.TotalRenderVisible) != 0;
};

UIElement.prototype._ComputeTotalHitTestVisibility = function () {
    if (this._GetActualTotalHitTestVisibility())
        this._Flags |= UIElementFlags.TotalHitTestVisible;
    else
        this._Flags &= ~UIElementFlags.TotalHitTestVisible;
};
UIElement.prototype._UpdateTotalHitTestVisibility = function () {
    if (this._IsAttached)
        App.Instance.MainSurface._AddDirtyElement(this, _Dirty.HitTestVisibility);
};
UIElement.prototype._GetActualTotalHitTestVisibility = function () {
    var visible = (this._Flags & UIElementFlags.HitTestVisible) != 0;
    var visualParent;
    if (visible && (visualParent = this.GetVisualParent())) {
        visualParent._ComputeTotalRenderVisibility();
        visible = visible && visualParent._GetHitTestVisible();
    }
    return visible;
};
UIElement.prototype._GetHitTestVisible = function () {
    return (this._Flags & UIElementFlags.TotalHitTestVisible) != 0;
};

UIElement.prototype._GetGlobalBounds = function () {
    return this._GlobalBounds;
};
UIElement.prototype._GetSubtreeObject = function () {
    return this._SubtreeObject;
};
UIElement.prototype._SetSubtreeObject = function (value) {
    this._SubtreeObject = value;
};
UIElement.prototype._GetSubtreeExtents = function () {
    AbstractMethod("UIElement._GetSubtreeExtents()");
};
UIElement.prototype._GetSubtreeBounds = function () {
    return this._SurfaceBounds;
};
UIElement.prototype._SetRenderSize = function (value) {
    this._RenderSize = value;
};
UIElement.prototype._GetRenderSize = function () {
    return this._RenderSize;
};
UIElement.prototype._DoMeasureWithError = function (error) {
    var last = LayoutInformation.GetPreviousConstraint(this);
    var parent = this.GetVisualParent();
    var infinite = new Size(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);

    if (!this._IsAttached && !last && !parent && this.IsLayoutContainer()) {
        last = infinite;
    }

    if (last) {
        var previousDesired = this._DesiredSize;
        this._MeasureWithError(last, error);
        if (previousDesired.Equals(this._DesiredSize))
            return;
    }

    if (parent)
        parent._InvalidateMeasure();

    this._DirtyFlags &= ~_Dirty.Measure;
};
UIElement.prototype._MeasureWithError = function (availableSize, error) { };
UIElement.prototype._DoArrangeWithError = function (error) {
    var last = this._ReadLocalValue(LayoutInformation.LayoutSlotProperty);
    var previousRenderSize = new Size();
    var parent = this.GetVisualParent();

    if (!parent) {
        var desired = new Size();
        var available = new Size();
        var surface = App.Instance.MainSurface;

        if (this.IsLayoutContainer()) {
            desired = this._DesiredSize;
            if (this._IsAttached && surface._IsTopLevel(this) && !this._GetParent()) {
                var measure = LayoutInformation.GetPreviousConstraint(this);
                if (measure)
                    desired = desired.Max(measure);
                else
                    desired = new Size(surface.GetWidth(), surface.GetHeight());
            }
        } else {
            desired = new Size(this.GetActualWidth(), this.GetActualHeight());
        }

        viewport = new Rect(Canvas.GetLeft(this), Canvas.GetTop(this), desired.Width, desired.Height)

        last = viewport;
    }

    if (last) {
        this._ArrangeWithError(last, error);
    } else {
        if (parent)
            parent._InvalidateArrange();
    }
};
UIElement.prototype._ArrangeWithError = function (finalRect, error) { };
UIElement.prototype._ShiftPosition = function (point) {
    this._Bounds.X = point.X;
    this._Bounds.Y = point.Y;
};
UIElement.prototype._InsideObject = function (x, y) {
    NotImplemented("UIElement._InsideObject(x, y)");
};
UIElement.prototype._DoRender = function (ctx, parentRegion) {
    var region = this._GetSubtreeExtents();
    //region = region.Transform(this._RenderTransform);
    region = region.RoundOut();
    region = region.Intersection(parentRegion);
    if (!this._GetRenderVisible() || region.IsEmpty()) //TODO: Check opacity
        return;

    //TODO: render to intermediate not implemented
    this._Render(ctx, region);
    this._PostRender(ctx, region);
};
UIElement.prototype._Render = function (ctx, region) {
    AbstractMethod("UIElement._Render(ctx, region)");
};
UIElement.prototype._PostRender = function (ctx, region) {
    var walker = new _VisualTreeWalker(this, _VisualTreeWalkerDirection.ZForward);
    var child;
    while (child = walker.Step()) {
        child._DoRender(ctx, region);
    }
};
UIElement.prototype._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== UIElement) {
        DependencyObject.prototype._OnPropertyChanged.call(this, args, error);
        return;
    }
    if (args.Property == UIElement.VisibilityProperty) {
        if (args.NewValue == Visibility.Visible)
            this._Flags |= UIElementFlags.RenderVisible;
        else
            this._Flags &= ~UIElementFlags.RenderVisible;
        this._InvalidateVisibility();
        this._InvalidateMeasure();
        var parent = this.GetVisualParent();
        if (parent)
            parent._InvalidateMeasure();
        //TODO: change focus
    }
    //TODO: Check invalidation of some properties
    this.PropertyChanged.Raise(this, args);
};
UIElement.prototype._IntersectBoundsWithClipPath = function (unclipped, transform) {
    var clip = this.GetClip();
    var layoutClip = transform ? null : LayoutInformation.GetLayoutClip(this);
    var box;

    if (!clip && !layoutClip)
        return unclipped;
    if (clip)
        box = clip.GetBounds();
    else
        box = layoutClip.GetBounds();

    if (layoutClip)
        box = box.Intersection(layoutClip.GetBounds());

    if (!this._GetRenderVisible())
        box = new Rect(0, 0, 0, 0);

    //if (transform)
    //    box = box.Transform(this._AbsoluteTransform);

    return box.Intersection(unclipped);
};
UIElement.prototype._ElementRemoved = function (item) {
    this._Invalidate(item._GetSubtreeBounds());
    item.SetVisualParent(null);
    item._SetIsLoaded(false);
    item._IsAttached = false;
    item._SetMentor(null);

    var emptySlot = new Rect();
    LayoutInformation.SetLayoutSlot(item, emptySlot);
    item.ClearValue(LayoutInformation.LayoutClipProperty);

    this._InvalidateMeasure();

    this._Providers[_PropertyPrecedence.Inherited].ClearInheritedPropertiesOnRemovingFromTree(item);
}
UIElement.prototype._ElementAdded = function (item) {
    item.SetVisualParent(this);
    item._UpdateTotalRenderVisibility();
    item._UpdateTotalHitTestVisibility();
    item._Invalidate();

    this._Providers[_PropertyPrecedence.Inherited].PropagateInheritedPropertiesOnAddingToTree(item);
    item._SetIsAttached(this._IsAttached);
    item._SetIsLoaded(this._IsLoaded);
    var o = this;
    while (o && !(o instanceof FrameworkElement))
        o = o._GetMentor();
    item._SetMentor(o);

    this._UpdateBounds(true);

    this._InvalidateMeasure();
    this.ClearValue(LayoutInformation.LayoutClipProperty);
    this.ClearValue(LayoutInformation.PreviousConstraintProperty);
    item._RenderSize = new Size(0, 0);
    item._UpdateTransform();
    item._UpdateProjection();
    item._InvalidateMeasure();
    item._InvalidateArrange();
    if (item._HasFlag(UIElementFlags.DirtySizeHint) || item.ReadLocalValue(LayoutInformation.LastRenderSizeProperty))
        item._PropagateFlagUp(UIElementFlags.DirtySizeHint);
}
UIElement.prototype._UpdateLayer = function (pass, error) {
};

UIElement.prototype._SetIsLoaded = function (value) {
    if (this._IsLoaded != value) {
        this._IsLoaded = value;
        this._OnIsLoadedChanged(value);
    }
};
UIElement.prototype._OnIsLoadedChanged = function (loaded) {
    if (!this._IsLoaded) {
        //TODO: Unloaded Event
        //TODO: SetIsLoaded for all FrameworkElements in GetResources()
    }

    var walker = new _VisualTreeWalker(this);
    var element;
    while (element = walker.Step()) {
        element._SetIsLoaded(loaded);
    }

    if (this._IsLoaded) {
        //TODO: SetIsLoaded for all FrameworkElements in GetResources()
        this.Loaded.Raise(this, null);
    }
};
UIElement.prototype.Loaded = new MulticastEvent();

UIElement.prototype._OnIsAttachedChanged = function (value) {
    if (this._SubtreeObject)
        this._SubtreeObject._SetIsAttached(value);

    DependencyObject.prototype._OnIsAttachedChanged.call(this, value);

    if (!value) {
        this._CacheInvalidateHint();

        var surface = App.Instance.MainSurface;
        if (surface) {
            surface._RemoveDirtyElement(this);
            //TODO: Focus Element
            //if (surface.GetFocusedElement() === this)
            //    surface.FocusElement(null);
        }
    }
};

UIElement.prototype.Invalidated = new MulticastEvent();
UIElement.prototype._OnInvalidated = function () {
    this.Invalidated.Raise(this, null);
};

UIElement.prototype._HasFlag = function (flag) { return (this._Flags & flag) == flag; };
UIElement.prototype._ClearFlag = function (flag) { this._Flags &= ~flag; };
UIElement.prototype._SetFlag = function (flag) { this._Flags |= flag; };
UIElement.prototype._PropagateFlagUp = function (flag) {
    this._SetFlag(flag);
    var el = this.GetVisualParent();
    while (el && !el._HasFlag(flag)) {
        el._SetFlag(flag);
        el = el.GetVisualParent();
    }
};

// STATICS
UIElement.ZIndexComparer = function (uie1, uie2) {
    var zi1 = Canvas.GetZIndex(uie1);
    var zi2 = Canvas.GetZIndex(uie2);
    if (zi1 == zi2) {
        var z1 = Canvas.GetZ(uie1);
        var z2 = Canvas.GetZ(uie2);
        if (isNaN(z1) || isNaN(z2))
            return 0;
        return z1 > z2 ? 1 : (z1 < z2 ? -1 : 0);
    }
    return zi1 - zi2;
};

var UIElementFlags = {
    None: 0,
    
    RenderVisible: 0x02,
    HitTestVisible: 0x04,
    TotalRenderVisible: 0x08,
    TotalHitTestVisible: 0x10,

    DirtyArrangeHint: 0x800,
    DirtyMeasureHint: 0x1000,
    DirtySizeHint: 0x2000
};