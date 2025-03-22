import { FaCalendarAlt, FaChartLine, FaClipboardList, FaHome, FaNotesMedical, FaUserMd, FaUsers } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../context/AuthContext'

const SidebarContainer = styled.aside`
  width: 250px;
  background-color: #2d3748;
  color: white;
  height: calc(100vh - 60px);
  overflow-y: auto;
  transition: all 0.3s ease-in-out;
  position: sticky;
  top: 60px;
  
  @media (max-width: 1024px) {
    position: fixed;
    left: ${({ isOpen }) => (isOpen ? '0' : '-250px')};
    z-index: 99;
    height: calc(100vh - 60px);
  }
`

const SidebarSection = styled.div`
  padding: 1.5rem 1rem;
`

const SidebarTitle = styled.h3`
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #a0aec0;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
`

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const NavItem = styled.li`
  margin-bottom: 0.25rem;
`

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  color: #e2e8f0;
  text-decoration: none;
  border-radius: 0.375rem;
  transition: all 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  &.active {
    background-color: #3182ce;
    color: white;
  }
`

const NavIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  font-size: 1rem;
`

const NavText = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
`

const Sidebar = ({ isOpen }) => {
  const { user } = useAuth()
  const isDoctor = user?.role === 'doctor'
  
  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarSection>
        <SidebarTitle>Dashboard</SidebarTitle>
        <NavList>
          <NavItem>
            <StyledNavLink to="/dashboard">
              <NavIcon><FaHome /></NavIcon>
              <NavText>Overview</NavText>
            </StyledNavLink>
          </NavItem>
          
          {isDoctor ? (
            <NavItem>
              <StyledNavLink to="/doctor-dashboard">
                <NavIcon><FaUserMd /></NavIcon>
                <NavText>Doctor Dashboard</NavText>
              </StyledNavLink>
            </NavItem>
          ) : (
            <NavItem>
              <StyledNavLink to="/patient-dashboard">
                <NavIcon><FaUsers /></NavIcon>
                <NavText>Patient Dashboard</NavText>
              </StyledNavLink>
            </NavItem>
          )}
          
          <NavItem>
            <StyledNavLink to="/appointments">
              <NavIcon><FaCalendarAlt /></NavIcon>
              <NavText>Appointments</NavText>
            </StyledNavLink>
          </NavItem>
        </NavList>
      </SidebarSection>
      
      <SidebarSection>
        <SidebarTitle>Medical</SidebarTitle>
        <NavList>
          <NavItem>
            <StyledNavLink to="/medical-records">
              <NavIcon><FaClipboardList /></NavIcon>
              <NavText>Medical Records</NavText>
            </StyledNavLink>
          </NavItem>
          
          <NavItem>
            <StyledNavLink to="/prescriptions">
              <NavIcon><FaNotesMedical /></NavIcon>
              <NavText>Prescriptions</NavText>
            </StyledNavLink>
          </NavItem>
          
          {isDoctor && (
            <NavItem>
              <StyledNavLink to="/analytics">
                <NavIcon><FaChartLine /></NavIcon>
                <NavText>Analytics</NavText>
              </StyledNavLink>
            </NavItem>
          )}
        </NavList>
      </SidebarSection>
    </SidebarContainer>
  )
}

export default Sidebar 