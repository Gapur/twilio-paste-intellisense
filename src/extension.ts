// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

import { spacings } from './tokens/spacings';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "twilio-paste-intellisense" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "twilio-paste-intellisense.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage(
        "Hello World from twilio-paste-intellisense!"
      );
    }
  );

  const hover = vscode.languages.registerHoverProvider("javascript", {
    provideHover(document, position, token) {
      const word = document.getText(document.getWordRangeAtPosition(position));
      if (word && spacings[word]) {
        const content = new vscode.MarkdownString(
          `<code>${spacings[word]}</code>`
        );
        content.supportHtml = true;
        content.value = spacings[word];
        return new vscode.Hover(content);
      }
      return null;
    },
  });

  context.subscriptions.push(disposable);
  context.subscriptions.push(hover);
}

// this method is called when your extension is deactivated
export function deactivate() {}
