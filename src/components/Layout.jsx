import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const MainContainer = styled.div`
  display: flex;
  flex: 1;
`

const Content = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: #f7fafc;
  min-height: calc(100vh - 60px);
  overflow-y: auto;
`

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }
  
  return (
    <LayoutContainer>
      <Navbar toggleSidebar={toggleSidebar} />
      <MainContainer>
        <Sidebar isOpen={sidebarOpen} />
        <Content>
          <Outlet />
        </Content>
      </MainContainer>
    </LayoutContainer>
  )
}

export default Layout 