import React, { useRef, useEffect } from 'react';

import EmailEditor from 'react-email-editor';
import Button from '@material-ui/core/Button';
import { COLLECTIONS } from '../../constants/firestore';
import { updateDoc } from '../../utilities/firestore';
import Grid from '@material-ui/core/Grid';
//import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import { sendEmail } from '../../utilities/email/send';

import useAuthedUser from '../../hooks/useAuthedUser';
import useWindowSize from '../../hooks/useWindowSize';
import { globalReplace, copyToClipboard } from '../../utilities';
const basicTags = [
  { label: 'First name', value: '{{firstName}}' },
  { label: 'Last name', value: '{{lastName}}' },
];
const conversationTags = [
  { label: 'First name', value: '{{firstName}}' },
  { label: 'Last name', value: '{{lastName}}' },
  { label: 'Sender name', value: '{{senderName}}' },
  { label: 'Sender title', value: '{{senderTitle}}' },
];

function TemplateEditor(props) {
  const { template, setTemplate } = props;
  const editor = useRef(null);
  const currentUser = useAuthedUser();
  const windowSize = useWindowSize();

  useEffect(
    () => {
      if (editor.current) {
        const loadedDesign = JSON.parse(template.design);
        editor.current.loadDesign(loadedDesign);
      }
    },
    [editor.current]
  );
  if (!currentUser) return <p>loadin</p>;
  const replaceables = [
    { label: '{{firstName}}', value: currentUser.givenName },
    { label: '{{lastName}}', value: currentUser.FamilyName },
  ];
  const handleSave = () => {
    editor.current.exportHtml(data => {
      const { design, html } = data;
      updateDoc(COLLECTIONS.emailTemplates, template.id, {
        design: JSON.stringify(design),
        html,
      });
      setTemplate(null);
    });
  };
  const handleSendTest = () => {
    editor.current.exportHtml(data => {
      const { html } = data;

      let emailSubject = 'test sub';
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
  //console.log(emailTemplate(template));
  const clipboardButton = tag => {
    return (
      <Tooltip title="click to copy">
        <Chip
          label={tag.label}
          onClick={() => {
            copyToClipboard(tag.value);
          }}
        />
      </Tooltip>
    );
  };
  const availableTags = () => {
    switch (template.type) {
      case 'conversations':
        return conversationTags.map(tag => clipboardButton(tag));
      default:
        return basicTags.map(tag => clipboardButton(tag));
    }
  };
  return (
    <div>
      <Grid>
        <Button
          onClick={() => {
            setTemplate(null);
          }}
        >
          back
        </Button>
        Tags :{availableTags()}
        <Button onClick={handleSave} variant="extended">
          Save
        </Button>
        <Button onClick={handleSendTest}>Send test</Button>
      </Grid>
      {<EmailEditor ref={editor} minHeight={`${windowSize.height - 102}px`} />}
    </div>
  );
}

export default TemplateEditor;
