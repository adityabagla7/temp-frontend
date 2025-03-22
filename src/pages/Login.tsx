import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { FaHospital, FaLock, FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import * as Yup from 'yup'
import { useAuth } from '../context/AuthContext'

const LoginContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #3498db, #2c3e50);
`

const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;
`

const LoginGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex: 1;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`

const LoginLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  color: white;
  
  @media (max-width: 992px) {
    text-align: center;
    padding: 2rem 1rem;
  }
`

const LoginBranding = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 3rem;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
`

const LogoIcon = styled.div`
  font-size: 2.5rem;
  color: white;
`

const LogoText = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`

const LoginHeading = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const LoginSubheading = styled.p`
  font-size: 1.125rem;
  opacity: 0.8;
  margin-bottom: 2rem;
  max-width: 500px;
  
  @media (max-width: 992px) {
    margin-left: auto;
    margin-right: auto;
  }
`

const LoginFeatures = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const FeatureItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`

const FeatureIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  font-size: 1.25rem;
`

const FeatureContent = styled.div`
  flex: 1;
`

const FeatureTitle = styled.h3`
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
`

const FeatureDescription = styled.p`
  opacity: 0.8;
  font-size: 0.875rem;
`

const LoginRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: white;
  border-radius: 1rem 0 0 1rem;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 992px) {
    border-radius: 1rem 1rem 0 0;
    box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.1);
  }
`

const LoginForm = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 1rem;
`

const FormTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #2d3748;
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #4a5568;
`

const InputGroup = styled.div`
  position: relative;
`

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
`

const StyledInput = styled(Field)`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: all 0.2s;
  
  &:focus {
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.3);
  }
`

const ErrorText = styled.div`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`

const Button = styled.button`
  width: 100%;
  padding: 0.75rem 1.5rem;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #2b6cb0;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

const ForgotPassword = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.875rem;
`

const ForgotPasswordLink = styled.a`
  color: #3182ce;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`

const AlertMessage = styled.div<{ type: 'error' | 'success' }>`
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1.5rem;
  background-color: ${({ type }) => (type === 'error' ? '#fed7d7' : '#c6f6d5')};
  color: ${({ type }) => (type === 'error' ? '#c53030' : '#2f855a')};
`

const Login = () => {
  const { login, error } = useAuth()
  const navigate = useNavigate()
  const [loginSuccess, setLoginSuccess] = useState(false)
  
  // Form validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  })
  
  // Initial form values
  const initialValues = {
    email: '',
    password: '',
  }
  
  // Handle form submission
  const handleSubmit = async (values: { email: string, password: string }, { setSubmitting }: any) => {
    try {
      await login(values.email, values.password)
      setLoginSuccess(true)
      
      // Determine the role from the email for demo purposes
      const userRole = values.email.toLowerCase().includes('doctor') ? 'doctor' : 'patient'
      
      // Navigate to dashboard after a short delay
      setTimeout(() => {
        if (userRole === 'doctor') {
          navigate('/doctor-dashboard')
        } else {
          navigate('/patient-dashboard')
        }
      }, 1000)
    } catch (err) {
      // Error handled in AuthContext
    } finally {
      setSubmitting(false)
    }
  }
  
  return (
    <LoginContainer>
      <LoginContent>
        <LoginGrid>
          <LoginLeft>
            <LoginBranding>
              <LogoIcon>
                <FaHospital />
              </LogoIcon>
              <LogoText>Clinic Portal</LogoText>
            </LoginBranding>
            
            <LoginHeading>Welcome to Patient Clinic Portal</LoginHeading>
            <LoginSubheading>
              A comprehensive solution for managing patient care, appointments, and medical records.
            </LoginSubheading>
            
            <LoginFeatures>
              <FeatureItem>
                <FeatureIcon>🔒</FeatureIcon>
                <FeatureContent>
                  <FeatureTitle>Secure Access</FeatureTitle>
                  <FeatureDescription>
                    All data is encrypted and securely stored following healthcare compliance standards.
                  </FeatureDescription>
                </FeatureContent>
              </FeatureItem>
              
              <FeatureItem>
                <FeatureIcon>📱</FeatureIcon>
                <FeatureContent>
                  <FeatureTitle>Mobile-Friendly</FeatureTitle>
                  <FeatureDescription>
                    Access your information on the go from any device with our responsive design.
                  </FeatureDescription>
                </FeatureContent>
              </FeatureItem>
              
              <FeatureItem>
                <FeatureIcon>🔔</FeatureIcon>
                <FeatureContent>
                  <FeatureTitle>Appointment Reminders</FeatureTitle>
                  <FeatureDescription>
                    Never miss an appointment with automated notifications and reminders.
                  </FeatureDescription>
                </FeatureContent>
              </FeatureItem>
              
              <FeatureItem>
                <FeatureIcon>📊</FeatureIcon>
                <FeatureContent>
                  <FeatureTitle>Health Tracking</FeatureTitle>
                  <FeatureDescription>
                    Monitor your health metrics and track progress over time with visual reports.
                  </FeatureDescription>
                </FeatureContent>
              </FeatureItem>
            </LoginFeatures>
          </LoginLeft>
          
          <LoginRight>
            <LoginForm>
              <FormTitle>Sign in to your account</FormTitle>
              
              {error && <AlertMessage type="error">{error}</AlertMessage>}
              {loginSuccess && (
                <AlertMessage type="success">Login successful! Redirecting...</AlertMessage>
              )}
              
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <FormGroup>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <InputGroup>
                        <InputIcon>
                          <FaUser />
                        </InputIcon>
                        <StyledInput
                          type="email"
                          id="email"
                          name="email"
                          placeholder="john.doe@example.com"
                        />
                      </InputGroup>
                      <ErrorMessage name="email">
                        {(msg) => <ErrorText>{msg}</ErrorText>}
                      </ErrorMessage>
                    </FormGroup>
                    
                    <FormGroup>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <InputGroup>
                        <InputIcon>
                          <FaLock />
                        </InputIcon>
                        <StyledInput
                          type="password"
                          id="password"
                          name="password"
                          placeholder="••••••••"
                        />
                      </InputGroup>
                      <ErrorMessage name="password">
                        {(msg) => <ErrorText>{msg}</ErrorText>}
                      </ErrorMessage>
                    </FormGroup>
                    
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Signing in...' : 'Sign in'}
                    </Button>
                  </Form>
                )}
              </Formik>
              
              <ForgotPassword>
                <ForgotPasswordLink href="#">Forgot your password?</ForgotPasswordLink>
              </ForgotPassword>
            </LoginForm>
          </LoginRight>
        </LoginGrid>
      </LoginContent>
    </LoginContainer>
  )
}

export default Login 