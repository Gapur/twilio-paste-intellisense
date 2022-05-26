import * as assert from 'assert';
import * as vscode from 'vscode';

import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('when we find twilio paste token', () => {
		const colorBackgroundWord = "colorBackground";
		const colorBackgroundToken = myExtension.findPasteToken(colorBackgroundWord);

		assert.strictEqual(colorBackgroundToken?.label, "color-background");
		assert.strictEqual(colorBackgroundToken?.value, "rgb(244, 244, 246)");
		assert.strictEqual(colorBackgroundToken?.description, "Background color used for containers.");

		const fontSize10Word = "fontSize10";
		const fontSize10Token = myExtension.findPasteToken(fontSize10Word);

		assert.strictEqual(fontSize10Token?.label, "font-size-10");
		assert.strictEqual(fontSize10Token?.value, "0.625rem (10px)");
		assert.strictEqual(fontSize10Token?.description, "Constant typography token for font size 10");

		const colorTextWord = "colorText";
		const colorTextToken = myExtension.findPasteToken(colorTextWord);

		assert.strictEqual(colorTextToken?.label, "color-text");
		assert.strictEqual(colorTextToken?.value, "rgb(18, 28, 45)");
		assert.strictEqual(colorTextToken?.description, "Body text color");
	});
});
