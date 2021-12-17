import {Props} from "../interface";
import Meta from "../_meta";
import Header from "./header";
import Footer from "./footer";


const Index = ({children, title, description}: Props): JSX.Element => {
  return (
    <>
      <Meta title={title} description={description}/>
      <Header/>
      <div className="px-6 py-8 bg-gray-100">
        {children}
      </div>
      <Footer/>
    </>
  )
}

export default Index
