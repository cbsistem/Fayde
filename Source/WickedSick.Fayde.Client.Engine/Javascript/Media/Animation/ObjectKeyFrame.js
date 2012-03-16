﻿/// <reference path="KeyFrame.js"/>
/// <reference path="../../Primitives/KeyTime.js"/>
/// CODE

//#region ObjectKeyFrame
var ObjectKeyFrame = Nullstone.Create("ObjectKeyFrame", KeyFrame);

//#region DEPENDENCY PROPERTIES

ObjectKeyFrame.KeyTimeProperty = DependencyProperty.RegisterFull("KeyTime", function () { return KeyTime; }, ObjectKeyFrame, KeyTime.CreateUniform(), null, { GetValue: function () { NotImplemented("KeyTime Coercer"); } });

ObjectKeyFrame.ValueProperty = DependencyProperty.Register("Value", function () { return Object; }, ObjectKeyFrame);

ObjectKeyFrame.ConvertedValueProperty = DependencyProperty.Register("ConvertedValue", function () { return Object; }, ObjectKeyFrame);

//#endregion

Nullstone.FinishCreate(ObjectKeyFrame);
//#endregion