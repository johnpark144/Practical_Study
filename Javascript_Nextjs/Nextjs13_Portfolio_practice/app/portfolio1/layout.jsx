'use client'
import '../../styles/portfolio1.css'
import '../../styles/portfolio1.scss'
import Sidebar from './Sidebar'

export default function RootLayout({ children }) {
  return (<>
        <Sidebar />
        <div className="page">
          <span className="tags top-tags">&lt;body&gt;</span>
          {children}
          <span className="tags bottom-tags">
            &lt;/body&gt;
            <br />
            <span className="bottom-tag-html">&lt;/html&gt;</span>
          </span>
        </div>
        </>)
}
