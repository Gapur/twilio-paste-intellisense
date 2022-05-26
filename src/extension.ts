// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

import pasteTokens from "./tokens";
import { PasteToken } from "./models/paste-token";

export function findPasteToken(word?: string): PasteToken | null {
  if (!word) {
    return null;
  }
  for (const pasteToken of Object.values(pasteTokens)) {
    if (pasteToken[word]) {
      return pasteToken[word];
    }
  }
  return null;
};

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "twilio-paste-intellisense" is now active!'
  );

  const hover = vscode.languages.registerHoverProvider("javascript", {
    provideHover(document, position, token) {
      const word = document.getText(document.getWordRangeAtPosition(position));
      const foundPasteToken = findPasteToken(word);
      if (foundPasteToken) {
        const hoverMessage = new vscode.MarkdownString();
        
        hoverMessage.appendMarkdown(
          `${foundPasteToken.label}: \`${foundPasteToken.value}\`\n`
        );
        hoverMessage.appendMarkdown(`___\n`);
        if (foundPasteToken.description) {
          hoverMessage.appendMarkdown(`${foundPasteToken.description}\n`);
        }
        hoverMessage.isTrusted = true;

        return new vscode.Hover(hoverMessage);
      }
      return null;
    },
  });

  context.subscriptions.push(hover);
}

export function deactivate() {}
