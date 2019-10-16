import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import EmailTemplateCard from './EmailTemplateCard';
import EmailRecipients from './EmailRecipients';
import LoadingHat from '../LoadingHat';
import useCollection from '../../hooks/useCollection';
import { COLLECTIONS } from '../../constants/firestore';
import ScrollyRolly from '../ScrollyRolly';

function TemplateList(props) {
  const { setTemplate, type, campaignId, editTemplate } = props;

  let filters = [];
  const [templatesState, templatesDispatch, loadMore] = useCollection({
    path: COLLECTIONS.emailTemplates,
    filters,
    // i can't figure out why this isn't sorting properly  — Sidney
    sort: { field: 'updatedAt', direction: 'desc' },
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
        <ScrollyRolly dataState={templatesState} loadMore={loadMore}>
          {(x, i) => (
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
          )}
        </ScrollyRolly>

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
