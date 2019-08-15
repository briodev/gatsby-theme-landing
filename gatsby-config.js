module.exports = ({contentPath = '/src/content/blog-posts', basePath = '/blog'}) => ({
    siteMetadata: {
      title: `BrioDev Starter Theme`,
      description: `A simple starter blog with image and SEO`,
      keywords: ['BrioDev', 'Gatsby Blog', 'Gatsby Theme' ],
      siteUrl: 'https://brio.dev',
      twitter: {
        site: '@briodev',
        creator: '@briodev' //This can be overwritten in SEO by the author twitter account
      },
      author: `BrioDev - https://brio.dev`,
    },
    plugins: [
      `gatsby-plugin-react-helmet`,
      "gatsby-plugin-theme-ui",
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `landing-pages`,
          path: contentPath,
        },
      },
      'gatsby-plugin-sharp',
      'gatsby-transformer-sharp',
      {
        resolve: `gatsby-transformer-remark`,
        options: {
          plugins: [ `gatsby-remark-images` ],
        },
      },
      {
        resolve: `gatsby-plugin-mdx`,
        options: {
          extensions: [`.mdx`, `.md`],
          gatsbyRemarkPlugins: [
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 1090,
              },
            },
          ],
          defaultLayouts: {
            posts: require.resolve("./src/components/layouts/post-layout.js"),
            default: require.resolve("./src/components/layouts/default-page-layout.js"),
          },
        },
      },
    ],
  })