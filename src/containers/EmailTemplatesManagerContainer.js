import React, { useState, useEffect } from 'react';
import queryString from 'query-string';

import withStyles from '@material-ui/core/styles/withStyles';
// import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Fab from '@material-ui/core/Fab';

import AddIcon from '@material-ui/icons/Add';

import LocationIndicator from '../components/LocationIndicator';

import { ROUTES } from '../constants/routes';
import { COLLECTIONS } from '../constants/firestore';
import {
  createDoc,
  updateDoc,
  deleteDoc,
  queryCount,
  getDoc,
} from '../utilities/firestore';

import moment from 'moment';
import { momentLocales } from '../constants/momentLocales';

import withNavigation from '../components/withNavigation';

import Form from '../components/Form';
import campaignFields from '../constants/forms/emailCampaign';
import conversationFields from '../constants/forms/conversationEmailTemplate';
import transactionalFields from '../constants/forms/transactionalEmailTemplate';
import campaignTemplateFields from '../constants/forms/campaignEmailTemplate';

import TemplateList from '../components/EmailTemplates/TemplateList';
import OrderedTemplateList from '../components/EmailTemplates/OrderedTemplateList';

import CampaignList from '../components/EmailTemplates/CampaignList';
import TemplateEditor from '../components/EmailTemplates/TemplateEditor';
import { design } from '../constants/emails/templateDesign';

import useDocument from '../hooks/useDocument';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100vh',
    overflow: 'auto',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

function EmailTemplatesManagerContainer(props) {
  const { classes, location } = props;
  const path = location.pathname;
  const campaignId = location.search.split('?campaignId=')[1];
  moment.updateLocale('en', momentLocales);
  const [template, setTemplate] = useState(null);
  const [campaign, setCampaign] = useState(null);
  const [fields, setFields] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [templateFromUrlState, templateFromUrlDispatch] = useDocument();

  useEffect(
    () => {
      const parsedQuery = queryString.parse(location.search);
      if (parsedQuery.id)
        templateFromUrlDispatch({
          path: `${COLLECTIONS.emailTemplates}/${parsedQuery.id}`,
        });
    },
    [location.search]
  );
  useEffect(
    () => {
      const parsedQuery = queryString.parse(location.search);
      if (parsedQuery.id && templateFromUrlState.doc)
        setTemplate(templateFromUrlState.doc);
    },
    [templateFromUrlState.doc]
  );

  const handleCreate = async data => {
    setShowForm(false);
    let templateDoc = {
      ...data,
      design: JSON.stringify(design),
    };
    if (data.clonedTemplateId) {
      const clonedTemplateDoc = await getDoc(
        'emailTemplates',
        data.clonedTemplateId
      );
      templateDoc.design = clonedTemplateDoc.design;
      templateDoc.html = clonedTemplateDoc.html;
    }
    switch (path) {
      case ROUTES.conversationEmails:
        templateDoc.type = 'conversations';
        break;

      case ROUTES.transactionalEmails:
        templateDoc.type = 'transactional';
        break;

      case ROUTES.emailCampaigns:
        if (campaignId) {
          templateDoc.type = 'promotional';
          templateDoc.campaignId = campaignId;
          const queryFilters = [
            { field: 'campaignId', operator: '==', value: campaignId },
          ];
          const numberOfCampaignTemplates = await queryCount(
            COLLECTIONS.emailTemplates,
            queryFilters
          );
          templateDoc.index = numberOfCampaignTemplates;
        } else {
        }
        break;
      default:
        break;
    }
    if (!campaignId && path === ROUTES.emailCampaigns) {
      createDoc(COLLECTIONS.emailCampaigns, data);
    } else {
      createDoc(COLLECTIONS.emailTemplates, templateDoc);
    }
  };
  const handleDelete = () => {
    if (!campaignId && path === ROUTES.emailCampaigns) {
      deleteDoc(COLLECTIONS.emailCampaigns, campaign.id);
    } else {
      deleteDoc(COLLECTIONS.emailTemplates, template.id);
    }
    setCampaign(null);
    setTemplate(null);
    setShowForm(false);
  };
  const handleUpdate = data => {
    if (!campaignId && path === ROUTES.emailCampaigns) {
      updateDoc(COLLECTIONS.emailCampaigns, campaign.id, data);
    } else {
      updateDoc(COLLECTIONS.emailTemplates, template.id, data);
    }
    setShowForm(false);
    setTemplate(null);
    setCampaign(null);
  };
  const setForm = template => {
    switch (path) {
      case ROUTES.conversationEmails:
        setFields(conversationFields(template));
        break;

      case ROUTES.transactionalEmails:
        setFields(transactionalFields(template));
        break;

      case ROUTES.emailCampaigns:
        const campaignId = location.search.split('?campaignId=')[1];
        if (campaignId) {
          setFields(campaignTemplateFields(template));
        } else {
          setFields(campaignFields(template));
        }
        break;
      default:
        break;
    }
  };
  const handleEdit = data => {
    setForm(data);
    setShowForm(true);
  };
  const renderList = path => {
    switch (path) {
      case ROUTES.conversationEmails:
        return (
          <TemplateList
            type="conversations"
            setTemplate={setTemplate}
            editTemplate={handleEdit}
          />
        );
      case ROUTES.transactionalEmails:
        return (
          <TemplateList
            type="transactional"
            setTemplate={setTemplate}
            editTemplate={handleEdit}
          />
        );
      case ROUTES.emailCampaigns:
        if (campaignId) {
          return (
            <OrderedTemplateList
              campaignId={campaignId}
              setTemplate={setTemplate}
              editTemplate={handleEdit}
            />
          );
        } else {
          return (
            <CampaignList setCampaign={setCampaign} editCampaign={handleEdit} />
          );
        }

      default:
        return <div />;
    }
  };
  return (
    <Fade in>
      <div className={classes.root}>
        <LocationIndicator
          title="Templates Manager"
          showShadow
          subRoutes={[
            { label: 'campaigns', value: ROUTES.emailCampaigns },
            { label: 'conversations', value: ROUTES.conversationEmails },
            { label: 'transactional', value: ROUTES.transactionalEmails },
          ]}
        />

        {template && !showForm ? (
          <TemplateEditor template={template} setTemplate={setTemplate} />
        ) : (
          renderList(path)
        )}

        {!template && (
          <Fab
            className={classes.fab}
            color="primary"
            onClick={() => {
              console.log('fields', fields);
              setForm();
              setShowForm(true);
            }}
          >
            <AddIcon />
          </Fab>
        )}

        {fields && (
          <Form
            //justForm
            handleDelete={handleDelete}
            action={template || (campaign && !campaignId) ? 'update' : 'create'}
            actions={{
              create: handleCreate,
              update: handleUpdate,
              close: () => {
                setTemplate(null);
                setCampaign(null);
                setShowForm(false);
              },
            }}
            open={showForm}
            data={
              template
                ? fields.filter(x => x.name !== 'clonedTemplateId')
                : fields
            }
            formTitle={`template`}
          />
        )}
      </div>
    </Fade>
  );
}

export default withNavigation(
  withStyles(styles)(EmailTemplatesManagerContainer)
);
