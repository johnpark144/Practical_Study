import NavBar from "./NavBar"

function Layout({ children }) {
  return (
    <div>
      <NavBar />
      <div>{children}</div>
    </div>
  )
}

export default Layout
