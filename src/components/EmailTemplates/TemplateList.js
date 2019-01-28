import React, { useEffect, useState, Suspense, lazy } from 'react';
import { withRouter } from 'react-router-dom';
import EmailTemplateCard from './EmailTemplateCard';
import LoadingHat from '../LoadingHat';
import useCollection from '../../hooks/useCollection';
import { createDoc, deleteDoc } from '../../utilities/firestore';
import { COLLECTIONS } from '../../constants/firestore';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TemplateEditor from './TemplateEditor';
import { newTemplate } from '../../utilities/email/templates';
const Form = lazy(() => import('../Form' /* webpackChunkName: "Form" */));

function TemplateList(props) {
  const { location, setTemplate, type, campaignId, editTemplate } = props;
  let filters = [];

  const [templatesState, templatesDispatch] = useCollection({
    path: COLLECTIONS.emailTemplates,
    filters,
  });
  console.log('dfsdfd');
  useEffect(
    () => {
      if (location.search) {
      }
    },
    [location.search]
  );
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
              duplicate: () => {
                // let { id, label, createdAt, ...rest } = x;
                // const doc = {
                //   ...rest,
                //   label: label + '(COPY)',
                //   createdAt: new Date(),
                // };
                // createDoc(COLLECTIONS.emailTemplates, doc);
              },
              delete: () => {
                // deleteDoc(COLLECTIONS.emailTemplates, x.id);
              },
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
