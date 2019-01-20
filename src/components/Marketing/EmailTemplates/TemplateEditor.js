import React, { useRef, useState, useEffect } from 'react';

import EmailEditor from 'react-email-editor';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
//import Tooltip from '@material-ui/core/Tooltip';
import { sendEmail } from '../../../utilities/email/send';

import {
  updateTemplate,
  setTemplateBase,
  useEmailTemplate,
  //  TEMPLATE_BASE,
} from '../../../utilities/email/templates';
import { useAuthedUser } from '../../../hooks/useAuthedUser';
import IntegrationReactSelect from '../../IntegrationReactSelect';
import { globalReplace } from '../../../utilities';
function TemplateEditor(props) {
  const { template, setTemplate } = props;
  const editor = useRef(null);
  const currentUser = useAuthedUser();
  const [subject, setSubject] = useState(template.subject || '');
  const [email, setEmail] = useState('test');
  const templateBase = useEmailTemplate(template.id);
  console.log(templateBase);
  useEffect(
    () => {
      if (templateBase) {
        const loadedDesign = JSON.parse(templateBase.design);
        editor.current.loadDesign(loadedDesign);
        console.log(loadedDesign);
      }
    },
    [templateBase]
  );
  if (!currentUser) return <p>loadin</p>;
  const replaceables = [
    { label: '{{firstName}}', value: currentUser.givenName },
    { label: '{{lastName}}', value: currentUser.FamilyName },
  ];
  // const handleSetTemplateBase = () => {
  //   editor.current.exportHtml(data => {
  //     const { design, html } = data;
  //     setTemplateBase({
  //       label: 'Template Base',
  //       html,
  //       design,
  //       subject,
  //       keys: replaceables.map(x => x.label),
  //     });
  //   });
  // };
  const handleSave = () => {
    editor.current.exportHtml(data => {
      const { design, html } = data;
      updateTemplate({
        docId: template.id,
        label: 'test Label',
        type: 'manual',
        html,
        design,
        subject,
        keys: replaceables.map(x => x.label),
      });
    });
  };
  const handleSendTest = () => {
    editor.current.exportHtml(data => {
      const { design, html } = data;
      const senderEmail = email.split('@')[0] + '@hats.com';
      let emailSubject = subject;
      let body = html;
      replaceables.forEach(r => {
        body = globalReplace(body, r.label, r.value);
        emailSubject = globalReplace(emailSubject, r.label, r.value);
      });
      console.log('email', currentUser.email);
      sendEmail({
        email: { subject: emailSubject, body: body },
        recipient: { UID: '234253235', email: currentUser.email },
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
        changeHandler={data => {}}
        //value={values[x.name]}
        label="tags"
        isMulti={true}
      />
      <EmailEditor ref={editor} minHeight="400px" />
      <Button onClick={handleSendTest} variant="contained" color="primary">
        Send Test
      </Button>
      <Button onClick={handleSave} variant="contained" color="primary">
        Save Template
      </Button>
    </div>
  );
}

export default TemplateEditor;
