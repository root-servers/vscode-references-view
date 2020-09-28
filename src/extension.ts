/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import { Api, SymbolTreeInput } from './api';
import * as calls from './calls';
import * as references from './references';
import { SymbolsTree } from './tree';

export function activate(context: vscode.ExtensionContext): Api {

	const tree = new SymbolsTree();

	references.register(tree, context);
	calls.register(tree, context);

	function setInput(input: SymbolTreeInput) {
		tree.setInput(input);
	}

	return { setInput };
}
