import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import EmailTemplateCard from './EmailTemplateCard';
import LoadingHat from '../LoadingHat';
import useCollection from '../../hooks/useCollection';
import { COLLECTIONS } from '../../constants/firestore';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 1;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

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
  const onDragEnd = result => {
    // dropped outside the list
    if (result.destination.index !== result.source.index) {
      if (result.destination.index < result.source.index) {
        // items effect have index < destination.index
        const affectedTemplates = templatesState.documents.filter(
          doc =>
            doc.index < result.source.index &&
            doc.index > result.destination.index - 1
        );
        console.log('affectedTemplates <', affectedTemplates);
      } else {
        const affectedTemplates = templatesState.documents.filter(
          doc => doc.index > result.source.index
        );
        console.log('affectedTemplates >', affectedTemplates);
      }
      console.log(result);
      console.log(templatesState.documents);
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
  if (templates)
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
                            // history.push(`marketingEmail?id=${x.id}`);
                          },
                          editTemplate: () => {
                            setTemplate(item);
                            // history.push(`marketingEmail?id=${x.id}`);
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
  else return <LoadingHat message="Loading templates…" />;
}

export default withRouter(OrderedTemplateList);
