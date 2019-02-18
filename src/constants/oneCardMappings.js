import React from 'react';

import CourseDetail from '../components/Cards/CourseDetail';
import AssessmentDetail from '../components/Cards/AssessmentDetail';
import JobDetail from '../components/Cards/JobDetail';

export const course = data => ({
  title: data.title,
  secondaryText: <CourseDetail data={data} />,
  primaryAction: 'Edit',
  // route: `${ROUTES.COURSE_REDIRECT}?id=${data.id}`,
  newTab: true,

  video: data.videoUrl,
});

export const assessment = data => ({
  title: data.title,
  secondaryText: <AssessmentDetail data={data} />,
  // primaryAction: 'Edit',
  // route: `${ROUTES.ASSESSMENTS}?id=${data.id}${
  //   data.assessmentId ? '&yours=true' : ''
  // }`,

  image: data.image && data.image.url,
});

export const job = data => ({
  title: data.title,
  secondaryText: <JobDetail data={data} />,
  // primaryAction: 'Edit',
  // route: `${ROUTES.JOBS}?id=${data.id}${data.jobId ? '&yours=true' : ''}`,

  image: data.image && data.image.url,
});

export const event = data => ({
  title: data.title,
  secondaryText: data.description,
  // primaryAction: 'Edit',
  // route: `${ROUTES.EVENTS}?id=${data.id}`,

  tertiaryText: [`Starts ${data.startDateTime}`, `Ends ${data.endDateTime}`],

  image: data.image && data.image.url,
});

export const announcement = data => ({
  title: data.title,
  secondaryText: <div dangerouslySetInnerHTML={{ __html: data.description }} />,
});
