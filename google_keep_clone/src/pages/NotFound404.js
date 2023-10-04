import React from 'react'
import '../css/NotFound404.css'
import { Box } from '@mui/material'

export default function NotFound404() {
    return (
        <Box style={{ textAlign: 'center' }}>
            <section className="page_404">
                <div className="row">
                    <div className="col-sm-12 ">
                        <div className="col-sm-10 col-sm-offset-1  text-center">
                            <div className="four_zero_four_bg">
                                <h1 className="text-center">404</h1>
                            </div>
                            <div className="contant_box_404" style={{ marginTop: '-50px' }}>
                                <h3 className="h2">
                                    Look like you're lost
                                </h3>
                                <p>The page you are looking for
                                    has been lost in space.</p>
                                <a href="/signin" className="link_404">Go to Home</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Box>
    )
}

// ErrorPage.prototype = {
//     message: PropTypes.string
// };

// ErrorPage.defaultprop = {
//     message: 'null'
// };