/// <reference path="Shape.ts" />

module Fayde.Shapes {
    export class Polygon extends Shape {
        CreateLayoutUpdater(node: UINode) { return new PolygonLayoutUpdater(node); }
        
        private static _PointsCoercer(d: DependencyObject, propd: DependencyProperty, value: any): any {
            if (typeof value === "string")
                value = PointCollection.FromData(<string>value);
            if (value instanceof Array)
                value = PointCollection.FromArray(<Point[]>value);
            return value;
        }
        static FillRuleProperty: DependencyProperty = DependencyProperty.RegisterCore("FillRule", () => new Enum(FillRule), Polygon, FillRule.EvenOdd, (d, args) => (<Polygon>d)._FillRuleChanged(args));
        static PointsProperty: DependencyProperty = DependencyProperty.RegisterFull("Points", () => PointCollection, Polygon, undefined, (d, args) => (<Polygon>d)._PointsChanged(args), Polygon._PointsCoercer);
        FillRule: FillRule;
        Points: PointCollection;

        constructor() {
            super();
            this.Points = new PointCollection();
        }

        private _PointsChanged(args: IDependencyPropertyChangedEventArgs) {
            var lu = <PolygonLayoutUpdater>this.XamlNode.LayoutUpdater;

            var oldColl = args.OldValue;
            var newColl = args.NewValue;
            if (oldColl instanceof PointCollection)
                (<PointCollection>oldColl).OnChanged = null;
            if (newColl instanceof PointCollection)
                (<PointCollection>newColl).OnChanged = () => lu.InvalidateNaturalBounds();

            lu.Points = args.NewValue;
            lu.InvalidateNaturalBounds();
        }
        private _FillRuleChanged(args: IDependencyPropertyChangedEventArgs) {
            var lu = <PolygonLayoutUpdater>this.XamlNode.LayoutUpdater;
            lu.FillRule = args.NewValue;
            lu.Invalidate();
        }
    }
    Fayde.RegisterType(Polygon, "Fayde.Shapes", Fayde.XMLNS);

    export class PolygonLayoutUpdater extends ShapeLayoutUpdater {
        Points: PointCollection;

        BuildPath(): Fayde.Path.RawPath {
            var points = this.Points;
            var count;
            if (!points || (count = points.Count) < 2) {
                this.SFlags = ShapeFlags.Empty;
                return;
            }

            this.SFlags = ShapeFlags.Normal;

            var path = new Fayde.Path.RawPath();
            var enumerator = points.GetEnumerator();
            enumerator.moveNext();
            var p = enumerator.Current;
            if (count === 2) {
                enumerator.moveNext();
                var p2 = enumerator.Current;
                extendLine(p, p2, this.StrokeThickness);
                path.Move(p.X, p.Y);
                path.Line(p2.X, p2.Y);
            } else {
                path.Move(p.X, p.Y);
                while (enumerator.moveNext()) {
                    p = enumerator.Current;
                    path.Line(p.X, p.Y);
                }
            }
            path.Close();
            return path;
        }
    }
    function extendLine(p1: Point, p2: Point, thickness: number) {
        var t5 = thickness * 5.0;
        var dx = p1.X - p2.X;
        var dy = p1.Y - p2.Y;

        if (dy === 0.0) {
            t5 -= thickness / 2.0;
            if (dx > 0.0) {
                p1.X += t5;
                p2.X -= t5;
            } else {
                p1.X -= t5;
                p2.X += t5;
            }
        } else if (dx === 0.0) {
            t5 -= thickness / 2.0;
            if (dy > 0.0) {
                p1.Y += t5;
                p2.Y -= t5;
            } else {
                p1.Y -= t5;
                p2.Y += t5;
            }
        } else {
            var angle = Math.atan2(dy, dx);
            var ax = Math.abs(Math.sin(angle) * t5);
            if (dx > 0.0) {
                p1.X += ax;
                p2.X -= ax;
            } else {
                p1.X -= ax;
                p2.X += ax;
            }
            var ay = Math.abs(Math.sin(Math.PI / 2 - angle)) * t5;
            if (dy > 0.0) {
                p1.Y += ay;
                p2.Y -= ay;
            } else {
                p1.Y -= ay;
                p2.Y += ay;
            }
        }
    }
}