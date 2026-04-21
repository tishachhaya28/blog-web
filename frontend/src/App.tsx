import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoginForm } from "./components/LoginForm";
import { SignupForm } from "./components/SignUpForm";
import { Toaster } from "./components/ui/sonner";
import Dashboard from "./components/Dashboard";
import User from "./components/User";
import Posts from "./components/Posts";

const queryClient = new QueryClient()

const isAuthenticated = () => {
  return localStorage.getItem("token");
}

function PrivateRoute ({ children }: any){
    return isAuthenticated() ? children : <Navigate to="/login" />;
}

const RootLevelElement = () => {
  if(isAuthenticated()){
    return <Navigate to="/posts" />;
  }
  return <Navigate to="/login" />;
}

const AdminLevelRoutes = ({children}: any) =>{
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if(user.role !== "admin"){
      return (
        <div className="flex h-screen items-center justify-center">
          <h1 className="text-2xl font-bold text-red-500">Access denied! Admin role required.</h1>
        </div>
      )
    }
    return children;
  } catch (error) {
    return <Navigate to="/login" />;
  }
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLevelElement/>} />
          <Route path="/register" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/posts" element={
            <PrivateRoute>
              <Posts />
            </PrivateRoute>} 
          />
          <Route path="/users" element={
            <PrivateRoute>
              <AdminLevelRoutes>
                <User />
              </AdminLevelRoutes>
            </PrivateRoute>} 
          />
          <Route path="dashboard" element={
            <PrivateRoute>
              <AdminLevelRoutes>
                <Dashboard />
              </AdminLevelRoutes>
            </PrivateRoute>} 
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
