import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

function LoginPage() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-indigo-50/40 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200/80 p-8 sm:p-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 text-white font-bold text-xl shadow-md shadow-indigo-200 mb-3">
            EA
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Employee Portal
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Sign in to access your dashboard and employee profile
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;

