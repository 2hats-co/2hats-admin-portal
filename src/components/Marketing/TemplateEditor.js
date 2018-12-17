import React, { useRef } from 'react'

import EmailEditor from 'react-email-editor'

function TemplateEditor(props) {
    const editor = useRef(null);

    const exportHtml = () => {
        editor.current.exportHtml(data => {
            const { design, html } = data;
            console.log('exportHtml', html);
        });
    };

    return <div>
        <EmailEditor
            ref={editor}
        />
        <button onClick={exportHtml}>Export HTML</button>
    </div>;
}

export default TemplateEditor;
