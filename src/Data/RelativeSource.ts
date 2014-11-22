module Fayde.Data {
    export class RelativeSource implements nullstone.markup.IMarkupExtension, ICloneable {
        Mode: RelativeSourceMode;
        AncestorLevel: number;
        AncestorType: Function = null;

        constructor ();
        constructor (rs: RelativeSource);
        constructor (obj?: any) {
            if (obj instanceof RelativeSource) {
                var rs = <RelativeSource>obj;
                this.Mode = rs.Mode;
                this.AncestorLevel = rs.AncestorLevel;
                this.AncestorType = rs.AncestorType;
                Object.freeze(this);
            }
        }

        init (val: string) {
            this.Mode = RelativeSourceMode[val];
        }

        transmute (os: any[]): any {
            this.Mode = <RelativeSourceMode><any>RelativeSourceMode[this.Mode] || RelativeSourceMode.TemplatedParent;
            this.AncestorLevel = parseInt(<any>this.AncestorLevel) || 1;
            Object.freeze(this);
            return this;
        }

        Clone () {
            return new RelativeSource(this);
        }

        Find (target: XamlObject) {
            switch (this.Mode) {
                case RelativeSourceMode.Self:
                    return target;
                case RelativeSourceMode.TemplatedParent:
                    return target.TemplateOwner;
                case RelativeSourceMode.FindAncestor:
                    return findAncestor(target, this);
                case RelativeSourceMode.ItemsControlParent:
                    return findItemsControlAncestor(target, this);
            }
        }
    }
    Fayde.RegisterType(RelativeSource, Fayde.XMLNS);

    function findAncestor (target: XamlObject, relSource: Data.RelativeSource): XamlObject {
        if (!(target instanceof DependencyObject))
            return;
        var ancestorType = relSource.AncestorType;
        if (typeof ancestorType !== "function") {
            console.warn("RelativeSourceMode.FindAncestor with no AncestorType specified.");
            return;
        }
        var ancestorLevel = relSource.AncestorLevel;
        if (isNaN(ancestorLevel)) {
            console.warn("RelativeSourceMode.FindAncestor with no AncestorLevel specified.");
            return;
        }
        for (var parent = VisualTreeHelper.GetParent(<DependencyObject>target); parent != null; parent = VisualTreeHelper.GetParent(parent)) {
            if (parent instanceof ancestorType && --ancestorLevel < 1)
                return parent;
        }
    }

    function findItemsControlAncestor (target: XamlObject, relSource: Data.RelativeSource): XamlObject {
        if (!(target instanceof DependencyObject))
            return;
        var ancestorLevel = relSource.AncestorLevel;
        ancestorLevel = ancestorLevel || 1; //NOTE: Will coerce 0 to 1 also
        for (var parent = VisualTreeHelper.GetParent(<DependencyObject>target); parent != null; parent = VisualTreeHelper.GetParent(parent)) {
            if (!!(<UIElement>parent).IsItemsControl && --ancestorLevel < 1)
                return parent;
        }
    }
}