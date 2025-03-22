import { FaBars, FaBell, FaHospital, FaSearch, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../context/AuthContext'

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const LogoIcon = styled.div`
  color: #3182ce;
  font-size: 1.5rem;
`

const LogoText = styled.div`
  font-weight: 700;
  font-size: 1.25rem;
  color: #2d3748;
  
  @media (max-width: 768px) {
    display: none;
  }
`

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  max-width: 400px;
  width: 100%;
  
  @media (max-width: 992px) {
    display: none;
  }
`

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.3);
  }
`

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  color: #a0aec0;
  font-size: 0.875rem;
`

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const NavButton = styled.button`
  background-color: transparent;
  border: none;
  color: #4a5568;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.375rem;
  
  &:hover {
    background-color: #f7fafc;
  }
`

const MenuButton = styled(NavButton)`
  @media (min-width: 1024px) {
    display: none;
  }
`

const UserMenu = styled.div`
  position: relative;
`

const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  border-radius: 0.375rem;
  
  &:hover {
    background-color: #f7fafc;
  }
`

const UserAvatar = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #3182ce;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  
  @media (max-width: 768px) {
    display: none;
  }
`

const UserName = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  color: #2d3748;
`

const UserRole = styled.div`
  font-size: 0.75rem;
  color: #718096;
`

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  
  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  
  return (
    <NavbarContainer>
      <LogoContainer>
        <MenuButton onClick={toggleSidebar}>
          <FaBars />
        </MenuButton>
        <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <LogoIcon>
            <FaHospital />
          </LogoIcon>
          <LogoText>Clinic Portal</LogoText>
        </Link>
      </LogoContainer>
      
      <SearchContainer>
        <SearchIcon>
          <FaSearch />
        </SearchIcon>
        <SearchInput placeholder="Search..." />
      </SearchContainer>
      
      <NavActions>
        <NavButton>
          <FaBell />
        </NavButton>
        
        <UserMenu>
          <UserButton>
            <UserAvatar>
              {user?.name ? user.name.charAt(0).toUpperCase() : <FaUser />}
            </UserAvatar>
            <UserInfo>
              <UserName>{user?.name || 'User'}</UserName>
              <UserRole>{user?.role === 'doctor' ? 'Clinician' : 'Patient'}</UserRole>
            </UserInfo>
          </UserButton>
        </UserMenu>
        
        <NavButton onClick={handleLogout}>
          <FaSignOutAlt />
        </NavButton>
      </NavActions>
    </NavbarContainer>
  )
}

export default Navbar 