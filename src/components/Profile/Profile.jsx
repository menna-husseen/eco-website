import React from 'react'
import {Helmet} from "react-helmet";

export default function Profile({crrUser}) {
  return <>
   <Helmet>
                <title>Profile</title>
            </Helmet>
  <div className="text-center py-5">
<h2>wellcome {crrUser.name}</h2>
  </div>
  </>
}
