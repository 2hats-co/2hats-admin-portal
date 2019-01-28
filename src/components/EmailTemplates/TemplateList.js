import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import EmailTemplateCard from './EmailTemplateCard';
import LoadingHat from '../LoadingHat';
import useCollection from '../../hooks/useCollection';
import { COLLECTIONS } from '../../constants/firestore';

function TemplateList(props) {
  const { setTemplate, type, campaignId, editTemplate } = props;
  let filters = [];

  const [templatesState, templatesDispatch] = useCollection({
    path: COLLECTIONS.emailTemplates,
    filters,
  });
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
  let templates = templatesState.documents;
  console.log(templatesState);
  if (templates)
    return (
      <React.Fragment>
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
            }}
          />
        ))}
      </React.Fragment>
    );
  else return <LoadingHat message="Loading templates…" />;
}

export default withRouter(TemplateList);
