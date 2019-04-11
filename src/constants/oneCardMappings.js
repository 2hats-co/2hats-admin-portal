import React from 'react';
import moment from 'moment';

import SubmittedIcon from '@material-ui/icons/SendRounded';
import PassedIcon from '../assets/icons/SkillAchieved';
import FailedIcon from '@material-ui/icons/ErrorOutline';
import DisqualifyIcon from '@material-ui/icons/CancelOutlined';
import CompletedIcon from '@material-ui/icons/CheckCircleOutlined';

import CourseDetail from '../components/Cards/CourseDetail';
import AssessmentDetail, {
  AssessmentMeta,
} from '../components/Cards/AssessmentDetail';
import JobDetail, { JobMeta } from '../components/Cards/JobDetail';

import { MOMENT_LOCALES } from '@bit/sidney2hats.2hats.global.common-constants';

moment.updateLocale('en', MOMENT_LOCALES);

export const course = data => {
  let banner = null;
  let bannerColor = '';

  if (data.completed === false) {
    banner = (
      <>
        <FailedIcon />
        Incomplete
      </>
    );
    bannerColor = 'orange';
  } else if (data.completed === true) {
    banner = (
      <>
        <CompletedIcon />
        Completed
      </>
    );
    bannerColor = 'green';
  }

  return {
    title: data.title,
    secondaryText: <CourseDetail data={data} />,
    primaryAction: data.hasOwnProperty('completed')
      ? data.completed
        ? 'View'
        : 'Continue'
      : 'Get started',
    // route: `${ROUTES.COURSE_REDIRECT}?id=${data.LWid}`,
    newTab: true,

    banner,
    bannerColor,

    video: data.videoUrl,
  };
};

export const assessment = data => {
  let primaryAction = 'Get started';
  let banner = null;
  let bannerColor = '';

  if (data.assessmentId) {
    if (!data.submitted) {
      primaryAction = 'Complete submission';

      banner = (
        <>
          <FailedIcon />
          Incomplete
          <small>{moment.unix(data.updatedAt.seconds).fromNow()}</small>
        </>
      );
      // bannerColor = 'orange';
    } else {
      if (data.outcome === 'pass') {
        primaryAction = 'View submission';

        banner = (
          <>
            <PassedIcon />
            Passed
            <small>{moment.unix(data.updatedAt.seconds).fromNow()}</small>
          </>
        );
        bannerColor = 'green';
      } else if (data.outcome === 'fail') {
        primaryAction = data.resubmitted ? 'View' : 'Resubmit';

        banner = (
          <>
            <FailedIcon />
            Unsuccessful
            <small>{moment.unix(data.updatedAt.seconds).fromNow()}</small>
          </>
        );
        bannerColor = 'orange';
      } else if (data.outcome === 'disqualify') {
        primaryAction = data.resubmitted ? 'View' : 'Resubmit';

        banner = (
          <>
            <DisqualifyIcon />
            Disqualified
            <small>{moment.unix(data.updatedAt.seconds).fromNow()}</small>
          </>
        );
        bannerColor = 'red';
      } else {
        // Submitted but no outcome yet/not screened
        primaryAction = 'View submission';
        banner = (
          <>
            <SubmittedIcon />
            Submitted
            <small>{moment.unix(data.updatedAt.seconds).fromNow()}</small>
          </>
        );
      }
    }
  }

  return {
    title: data.title,
    meta: <AssessmentMeta data={data} />,
    secondaryText: <AssessmentDetail data={data} />,
    primaryAction,
    // route: `${ROUTES.ASSESSMENT}?id=${data.id}${
    //   data.assessmentId ? '&yours=true' : ''
    // }`,

    banner,
    bannerColor,

    image: data.image && data.image.url,
  };
};

export const job = data => {
  let banner = null;
  let bannerColor = '';

  const diffDays = moment.unix(data.closingDate.seconds).diff(moment(), 'days');

  if (data.jobId) {
    banner = (
      <>
        <SubmittedIcon />
        Applied
      </>
    );
  } else if (diffDays < 0) {
    banner = (
      <>
        <FailedIcon />
        Applications Closed
      </>
    );
  } else if (diffDays < 3) {
    banner = (
      <>
        <FailedIcon />
        Closing Soon
        <small>{diffDays > 1 ? `${diffDays} days` : 'Last day'}</small>
      </>
    );
    bannerColor = 'orange';
  }

  return {
    title: data.title,
    meta: <JobMeta data={data} />,
    secondaryText: <JobDetail data={data} />,
    primaryAction: data.jobId ? 'View' : 'Learn more',
    // route: `${ROUTES.JOB}?id=${data.id}${data.jobId ? '&yours=true' : ''}`,

    banner,
    bannerColor,

    image: data.image && data.image.url,
  };
};

export const event = data => ({
  title: data.title,
  secondaryText: data.description,
  primaryAction: 'Do the thing',
  // route: `${ROUTES.EVENTS}?id=${data.id}`,

  tertiaryText: [`Starts ${data.startDateTime}`, `Ends ${data.endDateTime}`],

  image: data.image && data.image.url,
});

export const announcement = data => ({
  title: data.title,
  secondaryText: <div dangerouslySetInnerHTML={{ __html: data.description }} />,
});
