import React from 'react'

import './CopyrightText.scss'

const CopyrightText = () => <div className="copyright-text">{`© ${year()} Catholic Schools of Broome County`}</div>;

const year = () => new Date().getFullYear()

export default CopyrightText