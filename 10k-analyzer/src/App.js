import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AIProvider } from './contexts/AIContext';
import { MarketDataProvider } from './contexts/MarketDataContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AIAdvisor from './pages/AIAdvisor';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AIProvider>
          <MarketDataProvider>
            <NotificationProvider>
              <Router>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route element={<ProtectedRoute />}>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/ai-advisor" element={<AIAdvisor />} />
                    </Route>
                  </Routes>
                </Layout>
              </Router>
            </NotificationProvider>
          </MarketDataProvider>
        </AIProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;