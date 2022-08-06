import React from "react";
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

function EditorViewer({content}) {
    console.log("viewer들어옴");
    return <Viewer initialValue = {content || ''}/>;

}

export default EditorViewer;