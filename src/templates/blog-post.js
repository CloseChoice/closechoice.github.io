import React from 'react';
import { graphql } from 'gatsby';

import SEO from '@components/seo';
import Layout from '@components/Layout/Layout';

import BlogLayout from '@components/Blog/BlogLayout';
import SocialShareSection from '@components/Blog/SocialShareSection';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BlogDateAndReadTime } from '@components/Blog/BlogCard';

import { siteUrl } from '../../config/website';

const BlogPost = ({ data, pageContext }) => {
  const { title, date } = data.markdownRemark.frontmatter;
  const { timeToRead, html, excerpt } = data.markdownRemark;

  const baseSlugUrl = siteUrl + pageContext.slug;

  const githubLink = `https://github.com/anuraghazra/anuraghazra.github.io/tree/develop/content${pageContext.slug}/index.md`;

  return (
    <Layout>
      <SEO
        isBlogPost
        title={title}
        description={excerpt}
        slug={pageContext.slug}
      />

      <BlogLayout
        sharerSection={
          <div>
            <h4>Share on</h4>
            <SocialShareSection baseSlugUrl={baseSlugUrl} title={title} />
            <hr style={{ margin: '25px 0' }} />
            <a
              style={{ fontSize: '16px' }}
              aria-label="Edit post on github"
              rel="noopener norefferer"
              target="__blank"
              href={githubLink}
            >
              <FontAwesomeIcon style={{ fontSize: 18 }} icon="edit" /> Edit post
              on GitHub
            </a>
          </div>
        }
      >
        <BlogDateAndReadTime date={date} readtime={timeToRead} />
        <h1>{title}</h1>
        <article
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </BlogLayout>
    </Layout>
  );
};

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt
      html
      timeToRead
      frontmatter {
        date(formatString: "MMMM DD, YYYY", locale: "en")
        title
      }
    }
  }
`;

export default BlogPost;
