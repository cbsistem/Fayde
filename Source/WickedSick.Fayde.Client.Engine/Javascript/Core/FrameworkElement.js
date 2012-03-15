/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="UIElement.js"/>
/// <reference path="../Runtime/MulticastEvent.js"/>
/// <reference path="../Primitives/Rect.js"/>
/// <reference path="PropertyValueProviders/StylePropertyValueProvider.js"/>
/// <reference path="PropertyValueProviders/ImplicitStylePropertyValueProvider.js"/>
/// <reference path="FrameworkElementPropertyValueProvider.js"/>
/// <reference path="PropertyValueProviders/InheritedDataContextPropertyValueProvider.js"/>
/// CODE
/// <reference path="../Runtime/BError.js"/>
/// <reference path="Style.js"/>

//#region FrameworkElement
var FrameworkElement = Nullstone.Create("FrameworkElement", UIElement);

FrameworkElement.Instance.Init = function () {
    this.Init$UIElement();

    this.TemplatedApplied = new MulticastEvent();

    this._BoundsWithChildren = new Rect();
    this._GlobalBoundsWithChildren = new Rect();
    this._SurfaceBoundsWithChildren = new Rect();
    this._ExtentsWithChildren = new Rect();

    this._Providers[_PropertyPrecedence.LocalStyle] = new _StylePropertyValueProvider(this, _PropertyPrecedence.LocalStyle);
    this._Providers[_PropertyPrecedence.ImplicitStyle] = new _ImplicitStylePropertyValueProvider(this, _PropertyPrecedence.ImplicitStyle);
    this._Providers[_PropertyPrecedence.DynamicValue] = new FrameworkElementPropertyValueProvider(this, _PropertyPrecedence.DynamicValue);
    this._Providers[_PropertyPrecedence.InheritedDataContext] = new _InheritedDataContextPropertyValueProvider(this, _PropertyPrecedence.InheritedDataContext);
};

//#region DEPENDENCY PROPERTIES

FrameworkElement.HeightProperty = DependencyProperty.Register("Height", function () { return Number; }, FrameworkElement, NaN);
FrameworkElement.Instance.GetHeight = function () {
    return this.GetValue(FrameworkElement.HeightProperty);
};
FrameworkElement.Instance.SetHeight = function (value) {
    this.SetValue(FrameworkElement.HeightProperty, value);
};

FrameworkElement.WidthProperty = DependencyProperty.Register("Width", function () { return Number; }, FrameworkElement, NaN);
FrameworkElement.Instance.GetWidth = function () {
    return this.GetValue(FrameworkElement.WidthProperty);
};
FrameworkElement.Instance.SetWidth = function (value) {
    this.SetValue(FrameworkElement.WidthProperty, value);
};

FrameworkElement.ActualHeightProperty = DependencyProperty.Register("ActualHeight", function () { return Number; }, FrameworkElement);
FrameworkElement.Instance.GetActualHeight = function () {
    return this.GetValue(FrameworkElement.ActualHeightProperty);
};

FrameworkElement.ActualWidthProperty = DependencyProperty.Register("ActualWidth", function () { return Number; }, FrameworkElement);
FrameworkElement.Instance.GetActualWidth = function () {
    return this.GetValue(FrameworkElement.ActualWidthProperty);
};

FrameworkElement.DataContextProperty = DependencyProperty.Register("DataContext", function () { return Object; }, FrameworkElement);
FrameworkElement.Instance.GetDataContext = function () {
    return this.GetValue(FrameworkElement.DataContextProperty);
};
FrameworkElement.Instance.SetDataContext = function (value) {
    this.SetValue(FrameworkElement.DataContextProperty, value);
};

FrameworkElement.HorizontalAlignmentProperty = DependencyProperty.Register("HorizontalAlignment", function () { return Number; }, FrameworkElement, HorizontalAlignment.Stretch);
FrameworkElement.Instance.GetHorizontalAlignment = function () {
    return this.GetValue(FrameworkElement.HorizontalAlignmentProperty);
};
FrameworkElement.Instance.SetHorizontalAlignment = function (value) {
    this.SetValue(FrameworkElement.HorizontalAlignmentProperty, value);
};

FrameworkElement.LanguageProperty = DependencyProperty.Register("Language", function () { return String; }, FrameworkElement);
FrameworkElement.Instance.GetLanguage = function () {
    return this.GetValue(FrameworkElement.LanguageProperty);
};
FrameworkElement.Instance.SetLanguage = function (value) {
    this.SetValue(FrameworkElement.LanguageProperty, value);
};

FrameworkElement.MarginProperty = DependencyProperty.Register("Margin", function () { return Thickness; }, FrameworkElement, new Thickness());
FrameworkElement.Instance.GetMargin = function () {
    return this.GetValue(FrameworkElement.MarginProperty);
};
FrameworkElement.Instance.SetMargin = function (value) {
    this.SetValue(FrameworkElement.MarginProperty, value);
};

FrameworkElement.MaxHeightProperty = DependencyProperty.Register("MaxHeight", function () { return Number; }, FrameworkElement, Number.POSITIVE_INFINITY);
FrameworkElement.Instance.GetMaxHeight = function () {
    return this.GetValue(FrameworkElement.MaxHeightProperty);
};
FrameworkElement.Instance.SetMaxHeight = function (value) {
    this.SetValue(FrameworkElement.MaxHeightProperty, value);
};

FrameworkElement.MaxWidthProperty = DependencyProperty.Register("MaxWidth", function () { return Number; }, FrameworkElement, Number.POSITIVE_INFINITY);
FrameworkElement.Instance.GetMaxWidth = function () {
    return this.GetValue(FrameworkElement.MaxWidthProperty);
};
FrameworkElement.Instance.SetMaxWidth = function (value) {
    this.SetValue(FrameworkElement.MaxWidthProperty, value);
};

FrameworkElement.MinHeightProperty = DependencyProperty.Register("MinHeight", function () { return Number; }, FrameworkElement, 0.0);
FrameworkElement.Instance.GetMinHeight = function () {
    return this.GetValue(FrameworkElement.MinHeightProperty);
};
FrameworkElement.Instance.SetMinHeight = function (value) {
    this.SetValue(FrameworkElement.MinHeightProperty, value);
};

FrameworkElement.MinWidthProperty = DependencyProperty.Register("MinWidth", function () { return Number; }, FrameworkElement, 0.0);
FrameworkElement.Instance.GetMinWidth = function () {
    return this.GetValue(FrameworkElement.MinWidthProperty);
};
FrameworkElement.Instance.SetMinWidth = function (value) {
    this.SetValue(FrameworkElement.MinWidthProperty, value);
};

FrameworkElement.VerticalAlignmentProperty = DependencyProperty.Register("VerticalAlignment", function () { return Number; }, FrameworkElement, VerticalAlignment.Stretch);
FrameworkElement.Instance.GetVerticalAlignment = function () {
    return this.GetValue(FrameworkElement.VerticalAlignmentProperty);
};
FrameworkElement.Instance.SetVerticalAlignment = function (value) {
    this.SetValue(FrameworkElement.VerticalAlignmentProperty, value);
};

FrameworkElement.StyleProperty = DependencyProperty.Register("Style", function () { return Style; }, FrameworkElement);
FrameworkElement.Instance.GetStyle = function () {
    return this.GetValue(FrameworkElement.StyleProperty);
};
FrameworkElement.Instance.SetStyle = function (value) {
    this.SetValue(FrameworkElement.StyleProperty, value);
};

FrameworkElement.FlowDirectionProperty = DependencyProperty.Register("FlowDirection", function () { return Number; }, FrameworkElement);
FrameworkElement.Instance.GetFlowDirection = function () {
    return this.GetValue(FrameworkElement.FlowDirectionProperty);
};
FrameworkElement.Instance.SetFlowDirection = function (value) {
    this.SetValue(FrameworkElement.FlowDirectionProperty, value);
};

//#endregion

//#region INSTANCE METHODS

FrameworkElement.Instance.SetTemplateBinding = function (propd, tb) {
    /// <param name="propd" type="DependencyProperty"></param>
    /// <param name="tb" type="TemplateBindingExpression"></param>
    try {
        this.SetValue(propd, tb);
    } catch (err) {
    }
};
FrameworkElement.Instance.SetBinding = function (propd, binding) {
    /// <param name="propd" type="DependencyProperty"></param>
    /// <param name="binding" type="Binding"></param>
    /// <returns type="BindingExpressionBase" />
    return BindingOperations.SetBinding(this, propd, binding);
};

FrameworkElement.Instance._ApplySizeConstraints = function (size) {
    var specified = new Size(this.GetWidth(), this.GetHeight());
    var constrained = new Size(this.GetMinWidth(), this.GetMinHeight());

    constrained = constrained.Max(size);

    if (!isNaN(specified.Width))
        constrained.Width = specified.Width;

    if (!isNaN(specified.Height))
        constrained.Height = specified.Height;

    constrained = constrained.Min(new Size(this.GetMaxWidth(), this.GetMaxHeight()));
    constrained = constrained.Max(new Size(this.GetMinWidth(), this.GetMinHeight()));

    if (this.GetUseLayoutRounding()) {
        constrained.Width = Math.round(constrained.Width);
        constrained.Height = Math.round(constrained.Height);
    }

    return constrained;
};
FrameworkElement.Instance._GetSubtreeExtents = function () {
    if (this._GetSubtreeObject())
        return this._ExtentsWithChildren;
    return this._Extents;
};

FrameworkElement.Instance._ComputeActualSize = function () {
    var parent = this.GetVisualParent();
    if (this.GetVisibility() !== Visibility.Visible)
        return new Size(0.0, 0.0);

    if ((parent && !(parent instanceof Canvas)) || this.IsLayoutContainer())
        return this._GetRenderSize();

    var actual = new Size(0, 0);
    actual = this._ApplySizeConstraints(actual);
    return actual;
};
FrameworkElement.Instance._ComputeBounds = function () {
    var size = new Size(this.GetActualWidth(), this.GetActualHeight());
    size = this._ApplySizeConstraints(size);

    this._Extents = new Rect(0, 0, size.Width, size.Height);
    this._ExtentsWithChildren = this._Extents;

    var walker = new _VisualTreeWalker(this);
    var item;
    while (item = walker.Step()) {
        if (item._GetRenderVisible())
            this._ExtentsWithChildren = this._ExtentsWithChildren.Union(item._GetGlobalBounds());
    }

    this._Bounds = this._IntersectBoundsWithClipPath(this._Extents/*.GrowByThickness(this._EffectPadding)*/, false); //.Transform(this._AbsoluteXform);
    this._BoundsWithChildren = this._ExtentsWithChildren; //.GrowByThickness(this._EffectPadding).Transform(this._AbsoluteXform);

    this._ComputeGlobalBounds();
    this._ComputeSurfaceBounds();
};
FrameworkElement.Instance._ComputeGlobalBounds = function () {
    this._ComputeGlobalBounds$UIElement();
    this._GlobalBoundsWithChildren = this._ExtentsWithChildren; //.GrowByThickness(this._EffectPadding).Transform(this._LocalProjection);
};
FrameworkElement.Instance._ComputeSurfaceBounds = function () {
    this._ComputeSurfaceBounds$UIElement();
    this._SurfaceBoundsWithChildren = this._ExtentsWithChildren; //.GrowByThickness(this._EffectPadding).Transform(this._AbsoluteProjection);
};

FrameworkElement.Instance._GetGlobalBounds = function () {
    if (this._GetSubtreeObject())
        return this._GlobalBoundsWithChildren;
    return this._GlobalBounds;
};
FrameworkElement.Instance._GetSubtreeBounds = function () {
    if (this._GetSubtreeObject())
        return this._SurfaceBoundsWithChildren;
    return this._SurfaceBounds;
};

FrameworkElement.Instance._MeasureWithError = function (availableSize, error) {
    if (error.IsErrored())
        return;

    if (isNaN(availableSize.Width) || isNaN(availableSize.Height)) {
        error.SetErrored("Cannot call Measure using a size with NaN values");
        //LayoutInformation.SetLayoutExceptionElement(this);
        return;
    }

    var last = LayoutInformation.GetPreviousConstraint(this);
    var shouldMeasure = (this._DirtyFlags & _Dirty.Measure) > 0;
    shouldMeasure = shouldMeasure || (!last || last.Width !== availableSize.Width || last.Height !== availableSize.Height);

    if (this.GetVisibility() !== Visibility.Visible) {
        LayoutInformation.SetPreviousConstraint(this, availableSize);
        this._DesiredSize = new Size(0, 0);
        return;
    }

    this._ApplyTemplateWithError(error);

    var parent = this.GetVisualParent();

    if (!shouldMeasure)
        return;

    LayoutInformation.SetPreviousConstraint(this, availableSize);

    this._InvalidateArrange();
    this._UpdateBounds();

    var margin = this.GetMargin();
    var size = availableSize.GrowByThickness(margin.Negate());

    size = this._ApplySizeConstraints(size);

    if (this.MeasureOverride)
        size = this.MeasureOverride(size);
    else
        size = this._MeasureOverrideWithError(size, error);

    if (error.IsErrored())
        return;

    this._DirtyFlags &= ~_Dirty.Measure;
    this._HiddenDesire = size;

    if (!parent || parent instanceof Canvas) {
        if (this instanceof Canvas || !this.IsLayoutContainer()) {
            this._DesiredSize = new Size(0, 0);
            return;
        }
    }

    size = this._ApplySizeConstraints(size);

    size = size.GrowByThickness(margin);
    size = size.Min(availableSize);

    if (this.GetUseLayoutRounding()) {
        size.Width = Math.round(size.Width);
        size.Height = Math.round(size.Height);
    }

    this._DesiredSize = size;
};
FrameworkElement.Instance._MeasureOverrideWithError = function (availableSize, error) {
    var desired = new Size(0, 0);
    availableSize = availableSize.Max(desired);

    var walker = new _VisualTreeWalker(this);
    var child;
    while (child = walker.Step()) {
        child._MeasureWithError(availableSize, error);
        desired = child._DesiredSize;
    }

    return desired.Min(availableSize);
};
FrameworkElement.Instance._ArrangeWithError = function (finalRect, error) {
    if (error.IsErrored())
        return;

    var slot = this.ReadLocalValue(LayoutInformation.LayoutSlotProperty);

    var shouldArrange = (this._DirtyFlags & _Dirty.Arrange) > 0;

    if (this.GetUseLayoutRounding()) {
        finalRect = new Rect(Math.round(finalRect.X), Math.round(finalRect.Y), Math.round(finalRect.Width), Math.round(finalRect.Height));
    }

    shouldArrange = shouldArrange || (slot != null ? !Rect.Equals(slot, finalRect) : true);

    if (finalRect.Width < 0 || finalRect.Height < 0
            || !isFinite(finalRect.Width) || !isFinite(finalRect.Height)
            || isNaN(finalRect.Width) || isNaN(finalRect.Height)) {
        var desired = this._DesiredSize;
        Warn("Invalid arguments to Arrange. Desired = " + desired.toString());
        return;
    }

    var parent = this.GetVisualParent();

    if (this.GetVisibility() !== Visibility.Visible) {
        LayoutInformation.SetLayoutSlot(this, finalRect);
        return;
    }

    if (!shouldArrange)
        return;

    var measure = LayoutInformation.GetPreviousConstraint(this);
    if (this.IsContainer() && measure == null)
        this._MeasureWithError(new Size(finalRect.Width, finalRect.Height), error);
    measure = LayoutInformation.GetPreviousConstraint(this);

    this.ClearValue(LayoutInformation.LayoutClipProperty);

    var margin = this.GetMargin();
    var childRect = finalRect.GrowByThickness(margin.Negate());

    this._UpdateTransform();
    this._UpdateProjection();
    this._UpdateBounds();

    var offer = this._HiddenDesire;

    var stretched = this._ApplySizeConstraints(new Size(childRect.Width, childRect.Height));
    var framework = this._ApplySizeConstraints(new Size());

    var horiz = this.GetHorizontalAlignment();
    var vert = this.GetVerticalAlignment();

    if (horiz == HorizontalAlignment.Stretch)
        framework.Width = Math.max(framework.Width, stretched.Width);

    if (vert == VerticalAlignment.Stretch)
        framework.Height = Math.max(framework.Height, stretched.Height);

    offer = offer.Max(framework);

    LayoutInformation.SetLayoutSlot(this, finalRect);

    if (this.ArrangeOverride)
        response = this.ArrangeOverride(offer);
    else
        response = this._ArrangeOverrideWithError(offer, error);

    if (horiz == HorizontalAlignment.Stretch)
        response.Width = Math.max(response.Width, framework.Width);

    if (vert == VerticalAlignment.Stretch)
        response.Height = Math.max(response.Height, framework.Height);

    /*
    LAYOUT TRANSFORM NOT IMPLEMENTED YET
    FLOW DIRECTION NOT IMPLEMENTED YET

    var flipHoriz = false;
    if (parent)
    flipHoriz = parent.GetFlowDirection() != this.GetFlowDirection();
    else if (this.GetParent() && this.GetParent()._IsPopup())
    flipHoriz = this.GetParent().GetFlowDirection() != this.GetFlowDirection();
    else
    flipHoriz = this.GetFlowDirection() == FlowDirection.RightToLeft;

    var layoutXform = Matrix.BuildIdentity();
    layoutXform = layoutXform.Translate(childRect.X, childRect.Y);
    if (flipHoriz)  {
    layoutXform = layoutXform.Translate(offer.Width, 0);
    layoutXform = layoutXform.Scale(-1, 1);
    }
    */

    if (error.IsErrored())
        return;

    this._DirtyFlags &= ~_Dirty.Arrange;
    var visualOffset = new Point(childRect.X, childRect.Y);
    LayoutInformation.SetVisualOffset(this, visualOffset);

    var oldSize = this._RenderSize;

    if (this.GetUseLayoutRounding()) {
        response.Width = Math.round(response.Width);
        response.Height = Math.round(response.Height);
    }

    this._SetRenderSize(response);
    var constrainedResponse = response.Min(this._ApplySizeConstraints(response));

    if (parent == null || parent instanceof Canvas) {
        if (!this.IsLayoutContainer()) {
            this._SetRenderSize(new Size(0, 0));
            return;
        }
    }

    var surface = App.Instance.MainSurface;
    var isTopLevel = this._IsAttached && surface._IsTopLevel(this);
    if (!isTopLevel) {
        switch (horiz) {
            case HorizontalAlignment.Left:
                break;
            case HorizontalAlignment.Right:
                visualOffset.X += childRect.Width - constrainedResponse.Width;
                break;
            case HorizontalAlignment.Center:
                visualOffset.X += (childRect.Width - constrainedResponse.Width) * 0.5;
                break;
            default:
                visualOffset.X += Math.max((childRect.Width - constrainedResponse.Width) * 0.5, 0);
                break;
        }

        switch (vert) {
            case VerticalAlignment.Top:
                break;
            case VerticalAlignment.Bottom:
                visualOffset.Y += childRect.Height - constrainedResponse.Height;
                break;
            case VerticalAlignment.Center:
                visualOffset.Y += (childRect.Height - constrainedResponse.Height) * 0.5;
                break;
            default:
                visualOffset.Y += Math.max((childRect.Height - constrainedResponse.Height) * 0.5, 0);
                break;
        }
    }

    if (this.GetUseLayoutRounding()) {
        visualOffset.X = Math.round(visualOffset.X);
        visualOffset.Y = Math.round(visualOffset.Y);
    }

    /* 
    LAYOUT TRANSFORM NOT IMPLEMENTED YET
    layoutXform = new Matrix();
    layoutXform = layoutXform.Translate(visualOffset.X, visualOffset.Y);
    if (flipHoriz) {
    layoutXform = layoutXform.Translate(response.Width, 0);
    layoutXform = layoutXform.Scale(-1, 1);
    }
    */

    LayoutInformation.SetVisualOffset(this, visualOffset);

    var element = new Rect(0, 0, response.Width, response.Height);
    var layoutClip = childRect;
    layoutClip.X = Math.max(childRect.X - visualOffset.X, 0);
    layoutClip.Y = Math.max(childRect.Y - visualOffset.Y, 0);
    if (this.GetUseLayoutRounding()) {
        layoutClip.X = Math.round(layoutClip.X);
        layoutClip.Y = Math.round(layoutClip.Y);
    }

    if (((!isTopLevel && !Rect.Equals(element, element.Intersection(layoutClip))) || !Rect.Equals(constrainedResponse, response)) && !(this instanceof Canvas) && ((parent && !(parent instanceof Canvas)) || this.IsContainer())) {
        var frameworkClip = this._ApplySizeConstraints(new Size(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY));
        layoutClip = layoutClip.Intersection(new Rect(0, 0, frameworkClip.Width, frameworkClip.Height));
        var rectangle = new RectangleGeometry();
        rectangle.SetRect(layoutClip);
        LayoutInformation.SetLayoutClip(this, rectangle);
    }

    if (!Rect.Equals(oldSize, response)) {
        if (!LayoutInformation.GetLastRenderSize(this)) {
            LayoutInformation.SetLastRenderSize(this, oldSize);
            this._PropagateFlagUp(UIElementFlags.DirtySizeHint);
        }
    }
};
FrameworkElement.Instance._ArrangeOverrideWithError = function (finalSize, error) {
    var arranged = finalSize;

    var walker = new _VisualTreeWalker(this);
    var child;
    while (child = walker.Step()) {
        var childRect = new Rect(0, 0, finalSize.Width, finalSize.Height);
        child._ArrangeWithError(childRect, error);
        arranged = arranged.Max(finalSize);
    }

    return arranged;
};

FrameworkElement.Instance._HitTestPoint = function (ctx, p, uielist) {
    if (!this._GetRenderVisible())
        return;
    if (!this._GetIsHitTestVisible())
        return;

    if (!this._InsideClip(ctx, p.X, p.Y))
        return;

    var node = uielist.Prepend(new UIElementNode(this));
    var hit = false;
    var walker = new _VisualTreeWalker(this, _VisualTreeWalkerDirection.ZReverse, false);
    var child;
    while (child = walker.Step()) {
        child._HitTestPoint(ctx, p, uielist);
        if (!Nullstone.RefEquals(node, uielist.First())) {
            hit = true;
            break;
        }
    }

    if (!hit && !(this._CanFindElement() && this._InsideObject(ctx, p.X, p.Y)))
        uielist.Remove(node);
};
FrameworkElement.Instance._InsideObject = function (ctx, x, y) {
    var framework = new Size(this.GetActualWidth(), this.GetActualHeight());
    var np = new Point(x, y);
    this._TransformPoint(np);
    if (np.X < 0 || np.Y < 0 || np.X > framework.Width || np.Y > framework.Height)
        return false;

    if (!this._InsideLayoutClip(x, y))
        return false;

    return this._InsideObject$UIElement(ctx, x, y);
};

FrameworkElement.Instance._InsideLayoutClip = function (x, y) {
    //NotImplemented("FrameworkElement._InsideLayoutClip(x, y)");
    return true;
};
FrameworkElement.Instance._HasLayoutClip = function () {
    var element = this;
    while (element) {
        if (LayoutInformation.GetLayoutClip(element))
            return true;
        if (element instanceof Canvas || element instanceof UserControl)
            break;
        element = element.GetVisualParent();
    }
    return false;
};
FrameworkElement.Instance._RenderLayoutClip = function (ctx) {
    var element = this;
    var iX = 0;
    var iY = 0;

    while (element) {
        var geom = LayoutInformation.GetLayoutClip(element);
        if (geom)
            ctx.Clip(geom);

        if (element instanceof Canvas || element instanceof UserControl)
            break;
        var visualOffset = LayoutInformation.GetVisualOffset(element);
        if (visualOffset) {
            ctx.Transform(new TranslationMatrix(-visualOffset.X, -visualOffset.Y));
            iX += visualOffset.X;
            iY += visualOffset.Y;
        }

        element = element.GetVisualParent();
    }
    ctx.Transform(new TranslationMatrix(iX, iY));
};

FrameworkElement.Instance._ElementRemoved = function (value) {
    this._ElementRemoved$UIElement(value);
    if (this._GetSubtreeObject() == value)
        this._SetSubtreeObject(null);
};
FrameworkElement.Instance._UpdateLayer = function (pass, error) {
    var element = this;
    var parent;
    while (parent = element.GetVisualParent())
        element = parent;

    while (pass._Count < LayoutPass.MaxCount) {
        var node;
        while (node = pass._ArrangeList.First()) {
            node.UIElement._PropagateFlagUp(UIElementFlags.DirtyArrangeHint);
            pass._ArrangeList.Remove(node);
            Info("PropagateFlagUp DirtyArrangeHint");
        }
        while (node = pass._SizeList.First()) {
            node.UIElement._PropagateFlagUp(UIElementFlags.DirtySizeHint);
            pass._SizeList.Remove(node);
            Info("PropagateFlagUp DirtySizeHint");
        }
        pass._Count = pass._Count + 1;

        var flag = UIElementFlags.None;
        if (element.GetVisibility() === Visibility.Visible) {
            if (element._HasFlag(UIElementFlags.DirtyMeasureHint))
                flag = UIElementFlags.DirtyMeasureHint;
            else if (element._HasFlag(UIElementFlags.DirtyArrangeHint))
                flag = UIElementFlags.DirtyArrangeHint;
            else if (element._HasFlag(UIElementFlags.DirtySizeHint))
                flag = UIElementFlags.DirtySizeHint;
        }

        if (flag != UIElementFlags.None) {
            var measureWalker = new _DeepTreeWalker(element);
            var child;
            while (child = measureWalker.Step()) {
                if (child.GetVisibility() !== Visibility.Visible || !child._HasFlag(flag)) {
                    measureWalker.SkipBranch();
                    continue;
                }
                child._ClearFlag(flag);
                switch (flag) {
                    case UIElementFlags.DirtyMeasureHint:
                        if (child._DirtyFlags & _Dirty.Measure)
                            pass._MeasureList.Append(new UIElementNode(child));
                        break;
                    case UIElementFlags.DirtyArrangeHint:
                        if (child._DirtyFlags & _Dirty.Arrange)
                            pass._ArrangeList.Append(new UIElementNode(child));
                        break;
                    case UIElementFlags.DirtySizeHint:
                        if (child.ReadLocalValue(LayoutInformation.LastRenderSizeProperty))
                            pass._SizeList.Append(new UIElementNode(child));
                        break;
                    default:
                        break;
                }
            }
        }

        if (flag == UIElementFlags.DirtyMeasureHint) {
            Info("Starting _MeasureList Update: " + pass._MeasureList._Count);
            while (node = pass._MeasureList.First()) {
                pass._MeasureList.Remove(node);
                node.UIElement._DoMeasureWithError(error);
                pass._Updated = true;
            }
        } else if (flag == UIElementFlags.DirtyArrangeHint) {
            Info("Starting _ArrangeList Update: " + pass._ArrangeList._Count);
            while (node = pass._ArrangeList.First()) {
                pass._ArrangeList.Remove(node);
                node.UIElement._DoArrangeWithError(error);
                pass._Updated = true;
                if (element._HasFlag(UIElementFlags.DirtyMeasureHint))
                    break;
            }
        } else if (flag == UIElementFlags.DirtySizeHint) {
            while (node = pass._SizeList.First()) {
                pass._SizeList.Remove(node);
                var fe = node.UIElement;
                pass._Updated = true;
                var last = LayoutInformation.GetLastRenderSize(fe);
                if (last) {
                    fe.ClearValue(LayoutInformation.LastRenderSizeProperty, false);
                    //TODO: SizeChanged Event 
                }
            }
            Info("Completed _SizeList Update");
        } else {
            break;
        }
    }
};

FrameworkElement.Instance._SetImplicitStyles = function (styleMask, styles) {
    var app = App.Instance;
    if (!app)
        return;

    if (styles == null)
        styles = app._GetImplicitStyles(this, styleMask);

    var error = new BError();

    if (styles) {
        for (var i = 0; i < _StyleIndex.Count; i++) {
            var style = styles[i];
            if (!style)
                continue;
            if (!Validators.StyleValidator(this, FrameworkElement.StyleProperty, style, error)) {
                Warn("Style validation failed.");
                return;
            }
        }
    }

    this._Providers[_PropertyPrecedence.ImplicitStyle].SetStyles(styleMask, styles, error);
};
FrameworkElement.Instance._ClearImplicitStyles = function (styleMask) {
    var error = new BError();
    this._Providers[_PropertyPrecedence.ImplicitStyle].ClearStyles(styleMask, error);
};

FrameworkElement.Instance.OnApplyTemplate = function () {
    this.TemplatedApplied.Raise(this, null);
};
FrameworkElement.Instance._ApplyTemplateWithError = function (error) {
    if (this._GetSubtreeObject())
        return false;

    var result = this._DoApplyTemplateWithError(error);
    if (result)
        this.OnApplyTemplate();
    return result;
};
FrameworkElement.Instance._DoApplyTemplateWithError = function (error) {
    var d = this._GetDefaultTemplate();
    if (d) {
        d._AddParent(this, true, error);
        if (error.IsErrored())
            return false;
        this._SetSubtreeObject(d);
        this._ElementAdded(d);
    }
    return d != null;
};
FrameworkElement.Instance._GetDefaultTemplate = function () {
    if (this._GetDefaultTemplateCallback)
        return this._GetDefaultTemplateCallback(this);
    return null;
};

FrameworkElement.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== FrameworkElement) {
        this._OnPropertyChanged$UIElement(args, error);
        return;
    }

    if (args.Property === FrameworkElement.WidthProperty
        || args.Property === FrameworkElement.MaxWidthProperty
        || args.Property === FrameworkElement.MinWidthProperty
        || args.Property === FrameworkElement.HeightProperty
        || args.Property === FrameworkElement.MaxHeightProperty
        || args.Property === FrameworkElement.MinHeightProperty
        || args.Property === FrameworkElement.MarginProperty
        || args.Property === FrameworkElement.FlowDirectionProperty) {
        //var p = this._GetRenderTransformOrigin();
        //this._FullInvalidate(p.X != 0.0 || p.Y != 0.0);
        this._FullInvalidate(false);

        var visualParent = this.GetVisualParent();
        if (visualParent)
            visualParent._InvalidateMeasure();

        this._InvalidateMeasure();
        this._InvalidateArrange();
        this._UpdateBounds();
    } else if (args.Property === FrameworkElement.StyleProperty) {
        var newStyle = args.NewValue;
        if (!error.IsErrored())
            this._Providers[_PropertyPrecedence.LocalStyle]._UpdateStyle(newStyle, error);
        if (error.IsErrored())
            return;
    } else if (args.Property === FrameworkElement.HorizontalAlignmentProperty
        || args.Property == FrameworkElement.VerticalAlignmentProperty) {
        this._InvalidateArrange();
        this._FullInvalidate(true);
    }
    this.PropertyChanged.Raise(this, args);
};
FrameworkElement.Instance._OnSubPropertyChanged = function (propd, sender, args) {
};

FrameworkElement.Instance.InvokeLoaded = function () {
};
FrameworkElement.Instance._OnIsLoadedChanged = function (loaded) {
    if (loaded)
        this._SetImplicitStyles(_StyleMask.All);
    else
        this._ClearImplicitStyles(_StyleMask.VisualTree);

    this._OnIsLoadedChanged$UIElement(loaded);
    if (loaded)
        this.InvokeLoaded();

    if (this._Providers[_PropertyPrecedence.InheritedDataContext])
        this._Providers[_PropertyPrecedence.InheritedDataContext].EmitChanged();
};

FrameworkElement.Instance.SetVisualParent = function (/* UIElement */value) {
    this.SetVisualParent$UIElement(value);

    if (!this._LogicalParent && (this._VisualParent == null || this._VisualParent instanceof FrameworkElement)) {
        this._Providers[_PropertyPrecedence.InheritedDataContext].SetDataSource(this._VisualParent);
        if (this._IsLoaded)
            this._Providers[_PropertyPrecedence.InheritedDataContext].EmitChanged();
    }
};
FrameworkElement.Instance._SetLogicalParent = function (value, error) {
    if (this._LogicalParent == value)
        return;

    if (false/* TODO: IsShuttingDown */) {
        this._LogicalParent = null;
        return;
    }

    if (value && this._LogicalParent && this._LogicalParent != value) {
        error.SetErrored(BError.InvalidOperation, "Element is a child of another element");
        return;
    }

    var oldParent = this._LogicalParent;
    this._LogicalParent = value;
    this._OnLogicalParentChanged(oldParent, value);
};
FrameworkElement.Instance._GetLogicalParent = function () {
    return this._LogicalParent;
};
FrameworkElement.Instance._OnLogicalParentChanged = function (oldParent, newParent) {
    if (false/* TODO: this._IsDisposing() */) {
    } else {
        var visualParent;
        if (newParent && newParent instanceof FrameworkElement)
            this._Providers[_PropertyPrecedence.InheritedDataContext].SetDataSource(newParent);
        else if ((visualParent = this.GetVisualParent()) && visualParent instanceof FrameworkElement)
            this._Providers[_PropertyPrecedence.InheritedDataContext].SetDataSource(visualParent);
        else
            this._Providers[_PropertyPrecedence.InheritedDataContext].SetDataSource(null);
        if (this._IsLoaded)
            this._Providers[_PropertyPrecedence.InheritedDataContext].EmitChanged();
    }
};

FrameworkElement.Instance.OnMouseLeftButtonDown = function (sender, args) { };

//#endregion

Nullstone.FinishCreate(FrameworkElement);
//#endregion