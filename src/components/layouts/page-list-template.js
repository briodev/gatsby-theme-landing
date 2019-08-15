import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from './default-page-layout';
import PageList from '../page-list';

const PagesTemplate = (path) => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(sort: {order: DESC, fields: frontmatter___date}) {
        edges {
          node {
            id
            frontmatter {
              title
              draft
              date(formatString: "MMMM Do YYYY")
            }
            fields {
              slug
            }
            excerpt
            timeToRead
            parent {
              ... on File {
                name
                base
                relativePath
                sourceInstanceName
              }
            }
          }
        }
      }
    }
  `)

  const pages = data.allMdx.edges.filter(
    ({ node }) => node.parent.sourceInstanceName === 'landing-pages'
  )
  const basePath = path;
  return (
    <Layout>
      <PageList pages={pages} basePath={basePath}/>
    </Layout>
  )
}

export default PagesTemplate
