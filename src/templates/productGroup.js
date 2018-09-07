import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Products from '../components/Products'

const ProductGroup = ({ data, location }) => {
  const { edges } = data.allMarkdownRemark;
  const { title, description } = data.site.siteMetadata
  return (
    <Layout meta={data.site.siteMetadata} rootClass="productGroup">
      <Header {...{ title, description }} parent={data.markdownRemark.frontmatter.title} />
      <Products {...{ edges }} />
      <Footer>
        <a href={data.site.siteMetadata.repo}>View Source</a>
      </Footer>
    </Layout>
  )
}

export default ProductGroup

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        description
        repo
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
      }
    }
    allMarkdownRemark(filter: { fields: { type: { eq: "product" }, slug: {regex: $slug}}}) {
      edges {
        node {
          frontmatter {
            title
            description
            date
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
