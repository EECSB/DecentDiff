import * as monaco from 'monaco-editor';

let monacoEditor;
let dotNetObjRef;

window.setDotNetObjRef	= function (ref) {
	dotNetObjRef = ref;
}

window.sendTextToCSharp = function (text, isOriginalEditor) {
	dotNetObjRef.invokeMethodAsync('EditorContentChanged', text, isOriginalEditor);
}

window.InitializeMonaco = function (originalText, modifiedText, language) {
	const originalModel = monaco.editor.createModel(
	/* set from `originalModel`: */ originalText,
		language
	);
	const modifiedModel = monaco.editor.createModel(
	/* set from `modifiedModel`: */ modifiedText,
		language
	);

	monacoEditor = monaco.editor.createDiffEditor(
		document.getElementById("codeEditor"),
		{
			originalEditable: true,
			automaticLayout: true,
			renderSideBySide: true,
			compactMode: true
		}
	);

	monacoEditor.setModel({
		original: originalModel,
		modified: modifiedModel,
	});


	originalModel.onDidChangeContent(function (event) {
		window.sendTextToCSharp(originalModel.getValue(), true);
	});

	modifiedModel.onDidChangeContent(function (event) {
		window.sendTextToCSharp(modifiedModel.getValue(), false);
	});
}

window.SetMonacoContent = function (originalText, modifiedText) {
	monacoEditor.setValue(originalText, modifiedText);
}

window.GetMonacoContent = function () {
	return monacoEditor.getValue();
}

window.GetMonacoLanguages = function () {
	return monaco.languages.getLanguages();
}

window.SetMonacoLanguage = function (language) {
	const model = monacoEditor.getModel();

	monaco.editor.setModelLanguage(model.original, language);
	monaco.editor.setModelLanguage(model.modified, language);
}

window.ToggleMonacoWordwrap = function (value) {
	let wrap = "off";

	if (value)
		wrap = 'on';

	monacoEditor.getOriginalEditor().updateOptions({ wordWrap: wrap });
	monacoEditor.getModifiedEditor().updateOptions({ wordWrap: wrap });
}