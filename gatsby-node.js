const fs = require("fs")
const { createFilePath } = require('gatsby-source-filesystem')

// These are customizable theme options we only need to check once
let basePath;
let contentPath;

// Make sure the data directory exists
exports.onPreBootstrap = ({ reporter }, options) => {
  contentPath = options.contentPath || "src/content/blog-posts"
  basePath = options.basePath || "/blog"
  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`)
    fs.mkdirSync(contentPath)
  }
}


exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // We only want to operate on `Mdx` nodes. If we had content from a
  // remote CMS we could also check to see if the parent node was a
  // `File` node here
  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode })

    createNodeField({
      // Name of the field you are adding
      name: "slug",
      // Individual MDX node
      node,
      // Generated value based on filepath with "blog" prefix. We
      // don't need a separating "/" before the value because
      // createFilePath returns a path with the leading "/".
      value: `${value}`,
    })
  }
}

// Query graphQl and create pages (async)
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  createPage({
    path: basePath,
    component: require.resolve('./src/components/layouts/post-list-template.js')
  });

  const result = await graphql(`
    {
      mdxLandingPages: allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
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
  `);

  if(result.errors) {
    reporter.panic('error loading content', reporter.errors);
    return
  }

  const { mdxLandingPages } = result.data
  const landingPages = mdxLandingPages.edges.filter(
    ({ node }) => node.parent.sourceInstanceName === 'landing-pages'
  )

  landingPages.forEach(({ node }) => {
    createPage({
      // This is the slug we created before
      // (or `node.frontmatter.slug`)
      path: `/${basePath}/${node.fields.slug}`.replace(/\/\/+/g, "/"),
      // This component will wrap our MDX content
      component: require.resolve(`./src/components/layouts/post-layout.js`),
      // We can use the values in this context in
      // our page layout component
      context: { 
        ...node,
        id: node.id 
      },
    })
  })
}