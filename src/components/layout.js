import React, { Fragment } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { setConfig } from 'react-hot-loader';

import 'semantic-ui-css/semantic.min.css';

import './layout.css';

// import Newsletter from '../components//newsletter';

// TODO remove with Gatsby upgrade
setConfig({ pureSFC: true });

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <Fragment>
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          {children}
        </div>
      </Fragment>
    )}
  />
);
// <Newsletter />

export default Layout;
