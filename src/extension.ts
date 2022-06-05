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

export function getAttributeName(linePrefix: string) {
  let attributeName = "";
  for (let endIdx = linePrefix.length - 2; endIdx >= 0; endIdx -= 1) {
    if (linePrefix[endIdx] === " ") {
      break;
    }
    if (linePrefix[endIdx] === "=") {
      continue;
    }
    attributeName = linePrefix[endIdx] + attributeName;
  }

  return attributeName;
}

const PASTE_TOKEN_ATTRIBUTES: {
  name: string;
  token: keyof typeof pasteTokens;
}[] = [
  { name: "margin", token: "spacings" },
  { name: "marginTop", token: "spacings" },
  { name: "marginRight", token: "spacings" },
  { name: "marginBottom", token: "spacings" },
  { name: "marginLeft", token: "spacings" },
  { name: "marginX", token: "spacings" },
  { name: "marginY", token: "spacings" },
  { name: "padding", token: "spacings" },
  { name: "paddingTop", token: "spacings" },
  { name: "paddingRight", token: "spacings" },
  { name: "paddingBottom", token: "spacings" },
  { name: "paddingLeft", token: "spacings" },
  { name: "paddingX", token: "spacings" },
  { name: "paddingY", token: "spacings" },
  { name: "borderRadius", token: "radii" },
  { name: "borderTopLeftRadius", token: "radii" },
  { name: "borderTopRightRadius", token: "radii" },
  { name: "borderBottomRightRadius", token: "radii" },
  { name: "borderBottomLeftRadius", token: "radii" },
];

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
    ["javascript", "typescript", "javascriptreact", "typescriptreact"],
    {
      provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position
      ) {
        const linePrefix = document
          .lineAt(position)
          .text.slice(0, position.character);

        const items = [];
        const attributeName = getAttributeName(linePrefix);

        for (const pastTokenAttribute of PASTE_TOKEN_ATTRIBUTES) {
          const tokenName = pastTokenAttribute.token;
          if (pastTokenAttribute.name === attributeName) {
            for (const [key, value] of Object.entries(pasteTokens[tokenName])) {
              const completionItemLabel: vscode.CompletionItemLabel = {
                label: key,
                description: value.value,
              };

              items.push(
                new vscode.CompletionItem(
                  completionItemLabel,
                  vscode.CompletionItemKind.Constant
                )
              );
            }
          }
        }

        return { isIncomplete: false, items };
      },
    },
    '"' // triggered when we type '"'
  );

  context.subscriptions.push(hoverProvider);
  context.subscriptions.push(completionProvider);
}

export function deactivate() {}
