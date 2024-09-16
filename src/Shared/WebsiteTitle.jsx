import { Helmet } from "react-helmet-async";

const WebsiteTitle = ({name}) => {
     return (
          <div>
               <Helmet>
                    <title>{name}</title>
                    {/* <link rel="canonical" href="https://www.tacobell.com/" /> */}
               </Helmet>
          </div>
     );
};

export default WebsiteTitle;
