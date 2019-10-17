import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import { Link, graphql } from 'gatsby';
import { Layout } from '../components/index';
import { RichText } from 'prismic-reactjs';
import { linkResolver } from '../utils/linkResolver';

export const query = graphql`
  {
    prismic {
      allTalks(sortBy: date_DESC) {
        edges {
          node {
            _meta {
              id
              uid
              type
            }
            abstract {
              ... on PRISMIC_Abstract {
                title
              }
            }
            date
            event_name
            event_url {
              ... on PRISMIC__ExternalLink {
                url
              }
            }
          }
        }
      }
    }
  }
`;

const Talks = ({ talks }) => {
  if (!talks) return null;
  return (
    <section className="post-feed">
      {talks.map(talk => {
        return (
          <article className="post">
            <div className="post-inside">
              <header className="post-header">
                <h2 className="post-title"><Link to={linkResolver(talk.node._meta)}>{RichText.asText(talk.node.event_name)}</Link></h2>
              </header>
              <div className="post-content">
                <p>{RichText.asText(talk.node.abstract.title)}</p>
              </div>
              <footer className="post-meta">
                <time dateTime={moment(_.get(talk, 'node.date')).strftime('%Y-%m-%d %H:%M')} className="published">
                 {moment(_.get(talk, 'node.date')).strftime('%B %d, %Y - %H:%M')}
                </time>
              </footer>
            </div>
            <p></p>
          </article>
        );
      })}
    </section>
  );
};

export default class extends React.Component {
  render() {
    // TODO: data.prismic.allTalks_homes.edges.slice(0, 1).pop();
    const { data, ...props } = this.props;
    const talks = data.prismic.allTalks.edges;
    return (
      <Layout {...props}>
        <Talks talks={talks} />
      </Layout>
    );
  }
}
