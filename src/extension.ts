// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

import tokens from "./tokens";
import { Token } from "./models/token";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "twilio-paste-intellisense" is now active!'
  );

  const findToken = (word?: string): Token | null => {
    if (!word) {
      return null;
    }
    for (const token of Object.values(tokens)) {
      if (token[word]) {
        return token[word];
      }
    }
    return null;
  };

  const hover = vscode.languages.registerHoverProvider("javascript", {
    provideHover(document, position, token) {
      const word = document.getText(document.getWordRangeAtPosition(position));
      const foundToken = findToken(word);
      if (foundToken) {
        const hoverMessage = new vscode.MarkdownString();
        hoverMessage.appendMarkdown(
          `${foundToken.label}: \`${foundToken.value}\`\n`
        );
        hoverMessage.appendMarkdown(`___\n`);
        if (foundToken.description) {
          hoverMessage.appendMarkdown(`${foundToken.description}\n`);
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
