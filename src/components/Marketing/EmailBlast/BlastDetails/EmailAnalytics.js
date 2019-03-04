import React from 'react';
import useAnalytics from '../../../../hooks/useAnalytics';

const deliveryCount = templateId => ({
  filters: [{ property: 'delivered', operation: '==', value: true }],
  collection: `emailTemplates/${templateId}/analytics`,
});
const uniqueInteractionCount = (templateId, interaction) => ({
  filters: [{ property: interaction, operation: '>', value: 0 }],
  collection: `emailTemplates/${templateId}/analytics`,
});
function EmailAnalytics(props) {
  const deliveries = useAnalytics(deliveryCount('id'));
  const uniqueOpens = useAnalytics(uniqueInteractionCount('id', 'opens'));
  const uniqueClicks = useAnalytics(uniqueInteractionCount('id', 'clicks'));

  //return()
}
