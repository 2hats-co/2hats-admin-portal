import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import EmailTemplateCard from './EmailTemplateCard';
import EmailRecipients from './EmailRecipients';
import LoadingHat from '../LoadingHat';
import useCollection from '../../hooks/useCollection';
import { COLLECTIONS } from '../../constants/firestore';

function TemplateList(props) {
  const { setTemplate, type, campaignId, editTemplate } = props;

  let filters = [];
  const [templatesState, templatesDispatch] = useCollection({
    path: COLLECTIONS.emailTemplates,
    filters,
    sort: { field: 'updatedAt', order: 'desc' },
  });
  let templates = templatesState.documents;
  useEffect(
    () => {
      if (type) {
        filters = [{ field: 'type', operator: '==', value: type }];
        templatesDispatch({ filters });
      }
    },
    [type]
  );
  useEffect(
    () => {
      if (campaignId) {
        filters = [{ field: 'campaignId', operator: '==', value: campaignId }];
        templatesDispatch({ filters });
      }
    },
    [campaignId]
  );

  const [recipientsId, setRecipientsId] = useState('');

  if (templates)
    return (
      <>
        {templates.map((x, i) => (
          <EmailTemplateCard
            data={x}
            key={i}
            actions={{
              edit: () => {
                setTemplate(x);
                editTemplate(x);
                // history.push(`marketingEmail?id=${x.id}`);
              },
              editTemplate: () => {
                setTemplate(x);
                // history.push(`marketingEmail?id=${x.id}`);
              },
              viewRecipients: () => {
                setRecipientsId(x.id);
              },
            }}
          />
        ))}

        {!!recipientsId && (
          <EmailRecipients
            showDialog={!!recipientsId}
            setShowDialog={setRecipientsId}
            collectionPath={`${
              COLLECTIONS.emailTemplates
            }/${recipientsId}/analytics`}
          />
        )}
      </>
    );
  else return <LoadingHat message="Loading templates…" />;
}

export default withRouter(TemplateList);
