/// <reference path="../Core/FrameworkElement.ts" />

module Fayde.Controls {
    export class MediaElement extends FrameworkElement {
        CreateLayoutUpdater(node: UINode) { return new MediaElementLayoutUpdater(node); }
    }
    Fayde.RegisterType(MediaElement, {
    	Name: "MediaElement",
    	Namespace: "Fayde.Controls",
    	XmlNamespace: Fayde.XMLNS
    });
    
    export class MediaElementLayoutUpdater extends LayoutUpdater {
        InsideObject(ctx: RenderContextEx, x: number, y: number) {
            return false;
        }

        MeasureOverride(availableSize: size, error: BError): size {
            return availableSize;
        }
        ArrangeOverride(finalSize: size, error: BError): size {
            return finalSize;
        }
    }
}