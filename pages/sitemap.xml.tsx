import { IPost } from '../interface'
import { apiBaseUrl } from '../lib/constants'
import { GetServerSideProps } from 'next'
import moment from 'moment'

const generateSiteMap = (posts: any) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"  xmlns:xhtml="https://www.w3.org/1999/xhtml">
      <!--We manually set the two URLs we know already-->
      <url>
       <loc>https://www.jiaxin.im</loc>
       <changefreq>monthly</changefreq>
       <priority>1.0</priority>
      </url>
      ${posts
        .map((post: IPost) => {
          return `
            <url>
                <loc>https://www.jiaxin.im/blog/${post.slug}</loc>
                <lastmod>${moment.unix(post.updated_at_ts).format()}</lastmod>
                <priority>1.0</priority>
                <changefreq>monthly</changefreq>
            </url>`
        })
        .join('')}
    </urlset>
  `
}

const SiteMap = () => {}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const request = await fetch(`${apiBaseUrl}/api/posts/?size=100`)
  const posts = await request.json()

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts.results)

  res.setHeader('Content-Type', 'text/xml')
  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
