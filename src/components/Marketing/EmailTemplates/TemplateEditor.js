import React, { useRef, useState, useEffect } from 'react';

import EmailEditor from 'react-email-editor';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
//import Tooltip from '@material-ui/core/Tooltip';
import { sendEmail } from '../../../utilities/email/send';
import Form from '../../Form';
import emailTemplate from '../../../constants/forms/emailTemplate';
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
  useEffect(
    () => {
      if (editor.current) {
        const loadedDesign = JSON.parse(template.design);
        editor.current.loadDesign(loadedDesign);
        console.log(loadedDesign);
      }
    },
    [editor.current]
  );
  if (!currentUser) return <p>loadin</p>;
  const replaceables = [
    { label: '{{firstName}}', value: currentUser.givenName },
    { label: '{{lastName}}', value: currentUser.FamilyName },
  ];
  const handleSave = formData => {
    editor.current.exportHtml(data => {
      const { design, html } = data;
      const { type, label, keys, subject, delay, senderEmail } = formData;
      const formatedEmail = senderEmail.split('@')[0] + '@hats.com';
      updateTemplate({
        docId: template.id,
        label,
        type,
        html,
        delay,
        design,
        subject,
        senderEmail: formatedEmail,
        keys,
      });
    });
  };
  const handleSendTest = () => {
    editor.current.exportHtml(data => {
      const { design, html } = data;

      let emailSubject = subject;
      let body = html;
      replaceables.forEach(r => {
        body = globalReplace(body, r.label, r.value);
        emailSubject = globalReplace(emailSubject, r.label, r.value);
      });
      sendEmail({
        email: { subject: emailSubject, body: body },
        recipient: { UID: '234253235', email: currentUser.email },
        sender: { UID: currentUser.UID, email: template.senderEmail },
      });
    });
  };
  console.log(emailTemplate(template));
  return (
    <div>
      {<EmailEditor ref={editor} minHeight="400px" />}
      <div style={{ maxWidth: 500 }}>
        <Form
          justForm
          action="save"
          actions={{
            save: data => {
              handleSave(data);
            },
          }}
          data={emailTemplate(template)}
        />
        <Button onClick={handleSendTest}>Send test</Button>
      </div>
    </div>
  );
}

export default TemplateEditor;
