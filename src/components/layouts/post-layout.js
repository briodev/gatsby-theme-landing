import React from "react"
import { graphql } from "gatsby"
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer"
import styled from '@emotion/styled'
import Img from 'gatsby-image'
import Layout from './default-page-layout'
import SEO from '../seo'


export default ({ data: { mdx } }) => {
  
  let image = null

  if(mdx.frontmatter.headerImage) {
    image = mdx.frontmatter.headerImage.childImageSharp.fluid
  }
  const isArticle = mdx.frontmatter.article || false

  return (
    <>
    <SEO 
      canonical={mdx.frontmatter.canonical}
      title = {mdx.frontmatter.title}
      description = {mdx.frontmatter.description}
      keywords = {mdx.frontmatter.keywords}
      image = {image}
      article = {isArticle}
      twitterCreator = {mdx.frontmatter.twitterCreator}
      slug = {mdx.fields.slug}
      />
      <Layout>
        <PostWrapper>
          <HeaderImage>{ image ? (<Img fluid={image} />):null }</HeaderImage>
          <Heading>{mdx.frontmatter.title}</Heading>

          <Body>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </Body>

        </PostWrapper>
      </Layout>
    </>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      fields {
        slug
      }
      frontmatter {
        canonical
        title
        description
        keywords
        article
        twitterCreator
        headerImage {
          childImageSharp {
            fluid(maxWidth: 1920, quality: 90) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      body
    }
  }
`

const PostWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(1.2rem, 1fr) minmax(auto, 3fr) minmax(1.2rem, 1fr);
`

const Heading = styled.h1`
  grid-column: 2;
`

const Body = styled.article`
  font-family: -apple-system, BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  grid-column: 2;
`


const HeaderImage = styled.div`
  grid-column: 1 / 4;
  width: 100%;
  max-width: 100vh;
  justify-self: center;
`