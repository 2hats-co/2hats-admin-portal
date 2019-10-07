import React, { useRef } from 'react';

import EmailEditor from 'react-email-editor';
import Button from '@material-ui/core/Button';
import { COLLECTIONS } from '../../constants/firestore';
import { updateDoc } from '../../utilities/firestore';
import Grid from '@material-ui/core/Grid';
//import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
// import { sendEmail } from '../../utilities/email/send';

import useAuthedUser from '../../hooks/useAuthedUser';
import useWindowSize from '../../hooks/useWindowSize';
import { copyToClipboard } from '../../utilities';

import { cloudFunction, CLOUD_FUNCTIONS } from '../../utilities/CloudFunctions';

const basicTags = [
  { label: 'First name', value: '{{firstName}}' },
  { label: 'Last name', value: '{{lastName}}' },
];
const conversationTags = [
  { label: 'First name', value: '{{firstName}}' },
  { label: 'Last name', value: '{{lastName}}' },
  // { label: 'Sender name', value: '{{senderName}}' },
  // { label: 'Sender first name', value: '{{senderFirstName}}' },
  // { label: 'Sender last name', value: '{{senderLastName}}' },
  // { label: 'Sender title', value: '{{senderTitle}}' },
];

function TemplateEditor(props) {
  const { template, setTemplate } = props;
  const editor = useRef(null);
  const currentUser = useAuthedUser();
  const windowSize = useWindowSize();

  const handleEditorLoad = () => {
    if (editor.current && template.design)
      editor.current.loadDesign(JSON.parse(template.design));
  };

  if (!currentUser) return <p>loadin</p>;
  // const replaceables = [
  //   { label: '{{firstName}}', value: currentUser.givenName },
  //   { label: '{{lastName}}', value: currentUser.FamilyName },
  // ];
  const handleSave = () => {
    editor.current.exportHtml(async data => {
      const { design, html } = data;

      // Warn user if template has broken smartlink
      if (html.includes('<route>') && template.type === 'conversations') {
        alert(
          'WARNING: This template has a smart link to the student portal that will not work properly and will be DISABLED in the conversations email template chooser.'
        );
      }

      await updateDoc(COLLECTIONS.emailTemplates, template.id, {
        design: JSON.stringify(design),
        html,
        duplicateAllowed: false,
      });

      alert('Saved template');
    });
  };
  const handleSendTest = () => {
    cloudFunction(
      CLOUD_FUNCTIONS.EMAIL_TEMPLATE_SEND_TEST,
      {
        email: currentUser.email,
        templateId: template.id,
      },
      e => {
        console.log('success send test', e);
      },
      e => {
        console.error('fail send test', e);
      }
    );

    // editor.current.exportHtml(data => {

    // const { html } = data;

    // let emailSubject = template.subject;
    // let body = html;
    // replaceables.forEach(r => {
    //   body = globalReplace(body, r.label, r.value);
    //   emailSubject = globalReplace(emailSubject, r.label, r.value);
    // });

    // sendEmail({
    //   email: { subject: emailSubject, body: body },
    //   recipient: { UID: 'TESTUID', email: currentUser.email },
    //   sender: { UID: currentUser.UID, email: template.senderEmail },
    // });
    // });
  };
  //console.log(emailTemplate(template));
  const clipboardButton = tag => (
    <Tooltip title="click to copy" key={`${tag.label}-${tag.value}`}>
      <Chip
        label={tag.label}
        onClick={() => {
          copyToClipboard(tag.value);
        }}
      />
    </Tooltip>
  );

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
          Back
        </Button>
        Tags: {availableTags()}
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
        <Button onClick={handleSendTest}>Send test</Button>
      </Grid>

      <EmailEditor
        ref={editor}
        onLoad={handleEditorLoad}
        minHeight={`${windowSize.height - 102}px`}
      />
    </div>
  );
}

export default TemplateEditor;
