import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import EmailTemplateCard from './EmailTemplateCard';
import LoadingHat from '../LoadingHat';
import useCollection from '../../hooks/useCollection';
import { COLLECTIONS } from '../../constants/firestore';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import sortWith from 'ramda/es/sortWith';
import ascend from 'ramda/es/ascend';
import prop from 'ramda/es/prop';
const grid = 1;
const sortByIndex = sortWith([ascend(prop('index'))]);
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
  const { setTemplate, type, campaignId, editTemplate } = props;
  let filters = [];

  const [templatesState, templatesDispatch] = useCollection({
    path: COLLECTIONS.emailTemplates,
    filters,
    sort: { field: 'index', direction: 'asc' },
  });
  const onDragEnd = async result => {
    // dropped outside the list

    if (result.destination.index !== result.source.index) {
      //update index of moved element
      templatesDispatch({
        type: 'updateDoc',
        id: result.draggableId,
        data: { index: result.destination.index },
      });
      if (result.destination.index < result.source.index) {
        // items effect have index < destination.index
        const affectedTemplates = templatesState.documents.filter(
          doc =>
            doc.index < result.source.index &&
            doc.index > result.destination.index - 1
        );
        affectedTemplates.forEach(doc => {
          // updateDoc(COLLECTIONS.emailTemplates, doc.id, {
          //   index: doc.index + 1,
          // });
          templatesDispatch({
            type: 'updateDoc',
            id: doc.id,
            data: { index: doc.index + 1 },
          });
        });
        console.log('affectedTemplates drag up', affectedTemplates);
      } else {
        const affectedTemplates = templatesState.documents.filter(
          doc =>
            doc.index > result.source.index &&
            doc.index <= result.destination.index
        );
        affectedTemplates.forEach(doc => {
          templatesDispatch({
            type: 'updateDoc',
            id: doc.id,
            data: { index: doc.index - 1 },
          });
        });
        console.log('affectedTemplates drag down', affectedTemplates);
      }
    }
  };
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
  if (templates) {
    templates = sortByIndex(templates);
    console.log(templates);
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={campaignId}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {templates.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
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
                        data={item}
                        key={index}
                        actions={{
                          edit: () => {
                            setTemplate(item);
                            editTemplate(item);
                          },
                          editTemplate: () => {
                            setTemplate(item);
                          },
                        }}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  } else return <LoadingHat message="Loading templates…" />;
}

export default withRouter(OrderedTemplateList);
