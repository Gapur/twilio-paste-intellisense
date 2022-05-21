// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

import { spacings } from "./tokens/spacings";
import { textColors } from './tokens/text-colors';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "twilio-paste-intellisense" is now active!'
  );

  const hover = vscode.languages.registerHoverProvider("javascript", {
    provideHover(document, position, token) {
      const word = document.getText(document.getWordRangeAtPosition(position));
      if (word && textColors[word]) {
        const currentTextColor = textColors[word];
        const hoverMessage = new vscode.MarkdownString();
        hoverMessage.appendMarkdown(`${currentTextColor.label} - \`${currentTextColor.value}\`\n___\n`);
        hoverMessage.appendMarkdown(`${currentTextColor.description}\n`);

        hoverMessage.isTrusted = true;

        return new vscode.Hover(hoverMessage);
      }
      return null;
    },
  });

  context.subscriptions.push(hover);
}

// this method is called when your extension is deactivated
export function deactivate() {}
