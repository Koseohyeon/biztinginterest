import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'

import Signup from '../pages/user/Signup'
import MyPage from '../pages/user/MyPage'

import Login from '../pages/client/Login'
import Dashboard from '../pages/client/Dashboard'

import ClientManagement from '../pages/admin/ClientManagement'

export const router = createBrowserRouter([
  { path: '/', element: <Signup /> },

  {
    path: '/user/mypage',
    element: (
      <ProtectedRoute roles={['user']}>
        <MyPage />
      </ProtectedRoute>
    ),
  },

  {
    path: '/client/login',
    element: <Login />,
  },
  {
    path: '/client/dashboard',
    element: (
      <ProtectedRoute roles={['client']}>
        <Dashboard />
      </ProtectedRoute>
    ),
  },

  {
    path: '/admin/clients',
    element: (
      <ProtectedRoute roles={['admin']}>
        <ClientManagement />
      </ProtectedRoute>
    ),
  },
])