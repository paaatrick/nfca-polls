import React from 'react';
import Helmet from 'react-helmet';

const HeadTags = ({ title }) => (
  <Helmet>
    <title>{title}</title>
    <link
      rel='stylesheet'
      href='https://fonts.googleapis.com/css?family=Roboto:300,400,500'
    />
  </Helmet>
);

export default HeadTags;
