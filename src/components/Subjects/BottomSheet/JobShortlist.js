import React from 'react';
import Form from '../../Form';
import jobShortListFields from '../../../constants/forms/jobShortList';
import { shortListCandidates } from '../../../utilities/candidates';
const JobShortlist = props => {
  const { selected } = props;
  const handleSubmit = data => {
    shortListCandidates(data.jobId, selected);
  };
  return (
    <Form
      justForm
      action="ShortList"
      actions={{
        ShortList: handleSubmit,
      }}
      classes={
        {
          //  dialogContent: classes.dialogContent,
          // wrapperGrid: classes.wrapperGrid,
        }
      }
      data={jobShortListFields()}
      open={true}
      //formFooter={values => <TemplatePreview template={values.templateId} />}
      formTitle="email"
    />
  );
};
export default JobShortlist;
