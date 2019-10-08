import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import BackIcon from '@material-ui/icons/ArrowBack';

import EmailTemplateCard from './EmailTemplateCard';
import LoadingHat from '../LoadingHat';

import useDocumentMulti from '../../hooks/useDocumentMulti';

import { COLLECTIONS } from '../../constants/firestore';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { updateDoc } from '../../utilities/firestore';
import ROUTES from '../../constants/routes';

const grid = 1;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'rgb(245, 245, 245)',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: 0,
  width: '100%',
});

function OrderedTemplateList(props) {
  const { setTemplate, campaign, campaignId, editTemplate, history } = props;

  // get all templates
  const [templatesState, templatesDispatch] = useDocumentMulti({
    path: COLLECTIONS.emailTemplates,
  });
  const templates = templatesState.docs;

  useEffect(
    () => {
      // when campaign doc is received, get templates
      if (campaign && campaign.templates && campaign.templates.length > 0)
        templatesDispatch({
          docIds: campaign.templates.map(x => x.templateId),
        });
    },
    [campaign]
  );

  if (!campaign) return <LoadingHat message="Loading campaign…" />;

  const onDragEnd = async result => {
    // Store new order here - initially gets all elems in the array that is
    // not the elem to be moved
    const newTemplateOrder = campaign.templates.filter(
      x => x.templateId !== result.draggableId
    );

    // Then, store elem to be moved in correct position
    const elemToMove = campaign.templates.filter(
      x => x.templateId === result.draggableId
    )[0];
    newTemplateOrder.splice(result.destination.index, 0, elemToMove);

    updateDoc(COLLECTIONS.campaigns, campaignId, {
      templates: newTemplateOrder,
    });
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        direction="row"
        wrap="nowrap"
        style={{ padding: 16 }}
      >
        <Grid item>
          <IconButton
            onClick={() => {
              history.push(ROUTES.emailCampaigns);
            }}
            color="primary"
          >
            <BackIcon />
          </IconButton>
        </Grid>
        <Grid item xs>
          <Typography variant="subtitle2">Editing campaign</Typography>
          <Typography variant="h5">{campaign.label}</Typography>
        </Grid>
      </Grid>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={campaignId}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {campaign.templates &&
                campaign.templates.map((item, index) => {
                  const { templateId } = item;
                  const templateDoc = templates[templateId];
                  if (!templateDoc) return null;

                  return (
                    <Draggable
                      key={templateId}
                      draggableId={templateId}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <EmailTemplateCard
                            data={{ ...templateDoc, delay: item.delay }}
                            key={templateId}
                            actions={{
                              edit: () => {
                                setTemplate(templateDoc);
                                editTemplate(templateDoc);
                              },
                              editTemplate: () => {
                                setTemplate(templateDoc);
                              },
                            }}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default withRouter(OrderedTemplateList);
