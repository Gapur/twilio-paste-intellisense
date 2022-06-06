import * as assert from "assert";
import * as vscode from "vscode";

import * as myExtension from "../../extension";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("when we find twilio paste token", () => {
    const colorBackgroundWord = "colorBackground";
    const colorBackgroundToken =
      myExtension.findPasteToken(colorBackgroundWord);

    assert.strictEqual(colorBackgroundToken?.label, "color-background");
    assert.strictEqual(colorBackgroundToken?.value, "rgb(244, 244, 246)");
    assert.strictEqual(
      colorBackgroundToken?.description,
      "Background color used for containers."
    );

    const fontSize10Word = "fontSize10";
    const fontSize10Token = myExtension.findPasteToken(fontSize10Word);

    assert.strictEqual(fontSize10Token?.label, "font-size-10");
    assert.strictEqual(fontSize10Token?.value, "0.625rem (10px)");
    assert.strictEqual(
      fontSize10Token?.description,
      "Constant typography token for font size 10"
    );

    const colorTextWord = "colorText";
    const colorTextToken = myExtension.findPasteToken(colorTextWord);

    assert.strictEqual(colorTextToken?.label, "color-text");
    assert.strictEqual(colorTextToken?.value, "rgb(18, 28, 45)");
    assert.strictEqual(colorTextToken?.description, "Body text color");
  });

  test("when we don`t find twilio paste token", () => {
    const borderWidth0Word = "borderWidth0";
    const borderWidth0Token = myExtension.findPasteToken(borderWidth0Word);

    assert.strictEqual(borderWidth0Token?.label, "border-width-0");
    assert.strictEqual(borderWidth0Token?.value, "0");
    assert.strictEqual(borderWidth0Token?.description, "Border width reset");

    const notFoundWord = "notFoundWord";
    const notFoundToken = myExtension.findPasteToken(notFoundWord);

    assert.strictEqual(notFoundToken, null);
  });

  test("when word is undefined", () => {
    const nullToken = myExtension.findPasteToken(undefined);

    assert.strictEqual(nullToken, null);
  });

  test("when attribute name is correct", () => {
    const marginLeftPrefix = '<div marginTop=`space20` marginLeft="';
    const marginLeftAttribute = myExtension.getAttributeName(marginLeftPrefix);

    assert.strictEqual(marginLeftAttribute, "marginLeft");

    const colorPrefix = '<div marginTop=`space20` marginLeft=`space40` color="';
    const colorAttribute = myExtension.getAttributeName(colorPrefix);

    assert.strictEqual(colorAttribute, "color");

    const fontSizeWithoutQuote = '<div marginTop=`space20` fontSize=';
    const fontSizeAttribute = myExtension.getAttributeName(fontSizeWithoutQuote);

    assert.strictEqual(fontSizeAttribute, "fontSize");
  });

  test("when attribute name is not correct", () => {
    const marginLeftPrefix = '<div marginTop=`space20` marginLet="';
    const marginLeftAttribute = myExtension.getAttributeName(marginLeftPrefix);

    assert.strictEqual(marginLeftAttribute, "marginLet");

    const colorPrefix = '<div marginTop=`space20` marginLeft=`space40` color"';
    const colorAttribute = myExtension.getAttributeName(colorPrefix);

    assert.strictEqual(colorAttribute, "color");

		const fontSizeWithoutQuote = '<div marginTop=`space20` font-size="';
    const fontSizeAttribute = myExtension.getAttributeName(fontSizeWithoutQuote);

    assert.strictEqual(fontSizeAttribute, "font-size");
  });
});
