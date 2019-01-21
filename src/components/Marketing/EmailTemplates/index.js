import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import EmailTemplateCard from './EmailTemplateCard';
import LoadingHat from '../../LoadingHat';
import useCollection from '../../../hooks/useCollection';
import { createDoc, deleteDoc } from '../../../utilities/firestore';
import { COLLECTIONS } from '../../../constants/firestore';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TemplateEditor from './TemplateEditor';
function EmailTemplates(props) {
  const { location, history } = props;

  const [templatesState /*templatesDispatch*/] = useCollection({
    path: COLLECTIONS.emailTemplates,
  });
  const templates = templatesState.documents;

  const [template, setTemplate] = useState(null);
  useEffect(
    () => {
      if (!location.search) setTemplate(null);
    },
    [location.search]
  );

  if (template) return <TemplateEditor template={template} />;
  if (templates)
    return (
      <React.Fragment>
        {templates.map((x, i) => (
          <EmailTemplateCard
            data={x}
            key={i}
            actions={{
              duplicate: () => {
                let { id, label, createdAt, ...rest } = x;
                const doc = {
                  ...rest,
                  label: label + '(COPY)',
                  createdAt: new Date(),
                };
                createDoc(COLLECTIONS.emailTemplates, doc);
              },
              delete: () => {
                deleteDoc(COLLECTIONS.emailTemplates, x.id);
              },
              edit: () => {
                setTemplate(x);
                history.push(`marketingEmail?id=${x.id}`);
              },
            }}
          />
        ))}

        <Fab
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            zIndex: 99,
          }}
          color="primary"
        >
          <AddIcon />
        </Fab>
      </React.Fragment>
    );
  else return <LoadingHat message="Loading templates…" />;
}

export default withRouter(EmailTemplates);
