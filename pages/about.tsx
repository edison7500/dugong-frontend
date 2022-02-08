import Layout from "../components/layout/layout";


const title = "Python 观察员"
const description = "Python观察员, Linux, iOS独立开发者, 爬虫, 运维开发, Web3, Blockchain, 摄影"

const About = (): JSX.Element => {
  return (
    <Layout title={title} description={description}>
      <div className="container flex justify-center mx-auto">
        <div className="bg-white shrink w-8/12 p-8 rounded-lg shadow-md">
          <article className="prose max-w-none">
            <h1 className="text-center text-gray-700">关于</h1>

          </article>
        </div>
      </div>
    </Layout>
  )
}

export default About;
