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
}

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "twilio-paste-intellisense" is now active!'
  );

  const hoverProvider = vscode.languages.registerHoverProvider(
    ["javascript", "typescript", "javascriptreact", "typescriptreact"],
    {
      provideHover(document, position, token) {
        const word = document.getText(
          document.getWordRangeAtPosition(position)
        );
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
    }
  );

  const completionProvider = vscode.languages.registerCompletionItemProvider(
    "javascript",
    {
      provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position
      ) {
        const linePrefix = document
          .lineAt(position)
          .text.substr(0, position.character);
        if (!linePrefix.endsWith("console.")) {
          return undefined;
        }

        const label = {
          label: "label",
          description: "description"
        } as vscode.CompletionItemLabel;

        return [
          new vscode.CompletionItem("myLog", vscode.CompletionItemKind.Method),
          new vscode.CompletionItem("myWarn", vscode.CompletionItemKind.Constant),
          new vscode.CompletionItem(
            label, vscode.CompletionItemKind.Method),
        ];
      },
    },
    "." // triggered whenever a '.' is being typed
  );

  context.subscriptions.push(hoverProvider);
  context.subscriptions.push(completionProvider);
}

export function deactivate() {}
