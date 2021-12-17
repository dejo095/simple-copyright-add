const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "simple-copyright-add" is now active!');

	let disposable = vscode.commands.registerCommand('simple-copyright-add.copyRightInsert', function () {

		const configView = vscode.workspace.getConfiguration();
		
		let commentStart = '';
		let commentEnd = '';
		let copyrightText = configView.get("simpleCopyrightAdd.copyrightText") || "Place your copyright info here";

		let copyrightPosition = new vscode.Position(0, 0);
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			vscode.window.showInformationMessage('Editor is not active')
			return
		}

		fileExtension = editor.document.uri.fsPath.split('.').pop();
		switch (fileExtension.toLowerCase()) {
			case 'js': commentStart = '/****************************\n'; commentEnd='\n****************************/\n'; break;
			case 'ts': commentStart = '/****************************\n'; commentEnd='\n****************************/\n'; break;
			case 'java': commentStart = '/*\n'; commentEnd='\n*/\n'; break;
			case 'c': commentStart = '/*\n'; commentEnd='\n*/\n'; break;
			case 'css': commentStart = '/*\n'; commentEnd='\n*/\n'; break;
			case 'py': commentStart = '\"\"\"\n'; commentEnd='\n\"\"\"\n'; break;
			default: commentStart = '/****************************\n'; commentEnd='\n****************************/\n';
		}

		if (fileExtension != '') {
			editor.edit( instance => {
				instance.insert(copyrightPosition, commentStart + copyrightText + commentEnd + '\n');
			});
			vscode.window.showInformationMessage(`Copyright added to ${fileExtension}`);
		} else {
			vscode.window.showInformationMessage('File not Supported yet');
		}


	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
