import React, { useRef, useState, useEffect } from 'react';

import EmailEditor from 'react-email-editor';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { sendEmail } from '../../utilities/email/send';

import { createTemplate } from '../../utilities/email/templates';
import { useAuthedUser } from '../../hooks/useAuthedUser';
import IntegrationReactSelect from '../IntegrationReactSelect';
import { globalReplace } from '../../utilities';
import useDocument from '../../hooks/useDocument';
function TemplateEditor(props) {
  const editor = useRef(null);
  const currentUser = useAuthedUser();
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [template, templateDispatch] = useDocument({
    path: 'emailTemplates/HqLfBhP3NcmZipgrhYEx',
  });
  useEffect(
    () => {
      if (template.doc) {
        const loadedDesign = JSON.parse(template.doc.design);
        editor.current.loadDesign(loadedDesign);
        console.log(loadedDesign);
      }
    },
    [template.doc]
  );

  const replaceables = [
    { label: '{{firstName}}', value: 'shams' },
    { label: '{{lastName}}', value: 'Mosowi' },
  ];
  const addTemplate = () => {
    editor.current.exportHtml(data => {
      const { design, html } = data;
      createTemplate({
        label: 'templatest',
        html,
        design,
        subject,
        keys: replaceables.map(x => x.label),
      });
    });
  };
  const sendTest = () => {
    editor.current.exportHtml(data => {
      const { design, html } = data;
      const senderEmail = email.split('@')[0] + '@hats.com';
      let emailSubject = subject;
      let body = html;
      replaceables.forEach(r => {
        body = globalReplace(body, r.label, r.value);
        emailSubject = globalReplace(emailSubject, r.label, r.value);
      });
      sendEmail({
        email: { subject: emailSubject, body: body },
        recipient: { UID: '234253235', email: 'shams.mosowi@gmail.com' },
        sender: { UID: currentUser.UID, email: senderEmail },
      });
      // console.log('exportHtml', html, design);
    });
  };

  return (
    <div>
      <TextField
        type="text"
        variant="filled"
        value={email}
        label="email (@hats.com)"
        onChange={e => {
          setEmail(e.target.value);
        }}
      />
      <TextField
        type="text"
        variant="filled"
        value={subject}
        label="subject"
        onChange={e => {
          setSubject(e.target.value);
        }}
      />
      <IntegrationReactSelect
        placeholder="select replacable tags"
        suggestions={replaceables}
        changeHandler={data => {
          console.log(data);
        }}
        //value={values[x.name]}
        label="tags"
        isMulti={true}
      />
      <EmailEditor ref={editor} minHeight="600px" />
      <Button onClick={sendTest} variant="contained" color="primary">
        Send Test
      </Button>
      <Button onClick={addTemplate} variant="contained" color="primary">
        Create Template
      </Button>
    </div>
  );
}

export default TemplateEditor;
