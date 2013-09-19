/// <reference path="../Runtime/TypeManagement.ts" />
/// CODE
/// <reference path="../Runtime/MulticastEvent.ts" />

module Fayde.Collections {
    export interface INotifyCollectionChanged {
        CollectionChanged: MulticastEvent<NotifyCollectionChangedEventArgs>;
    }
    export var INotifyCollectionChanged_ = Fayde.RegisterInterface("INotifyCollectionChanged");
}