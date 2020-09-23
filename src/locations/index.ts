/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import { SymbolsTree } from '../tree';
import { LocationTreeInput, ReferenceItem } from './model';

export function register(tree: SymbolsTree, context: vscode.ExtensionContext): void {

	function findLocations(title: string, command: string) {
		if (vscode.window.activeTextEditor) {
			const input = new LocationTreeInput(title, vscode.window.activeTextEditor.document.uri, vscode.window.activeTextEditor.selection.active, command);
			tree.setInput(input);
		}
	}

	context.subscriptions.push(
		vscode.commands.registerCommand('references-view.findReferences', () => findLocations('References', 'vscode.executeReferenceProvider')),
		vscode.commands.registerCommand('references-view.findImplementations', () => findLocations('Implementations', 'vscode.executeImplementationProvider')),
		// --- legacy name
		vscode.commands.registerCommand('references-view.find', function () { return vscode.commands.executeCommand('references-view.findReferences', ...arguments); }),
		vscode.commands.registerCommand('references-view.showReferenceItem', (item, preserveFocus?: boolean) => {
			if (item instanceof ReferenceItem) {
				return vscode.commands.executeCommand('vscode.open', item.location.uri, {
					selection: new vscode.Range(item.location.range.start, item.location.range.start),
					preserveFocus
				});
			}
		})
	);
}
