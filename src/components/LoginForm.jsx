import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, loginUser } from '../store/authSlice';
import { MOCK_EMPLOYEES } from '../utils/mockEmployees';

function LoginForm() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clientErrors, setClientErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    setClientErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(loginUser({ email: email.trim(), password }));
  };

  const handleInputChange = (setter, field) => (e) => {
    setter(e.target.value);
    if (clientErrors[field]) {
      setClientErrors((prev) => ({ ...prev, [field]: null }));
    }
    if (error) {
      dispatch(clearError());
    }
  };

  const handleDemoFill = (emp) => {
    setEmail(emp.email);
    setPassword(emp.password);
    setClientErrors({});
    if (error) {
      dispatch(clearError());
    }
  };

  return (
    <div className="w-full">
      {error && (
        <div
          role="alert"
          className="mb-5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2"
        >
          <span className="font-semibold">Error:</span>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Work Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleInputChange(setEmail, 'email')}
            placeholder="e.g. sarah.connor@example.com"
            disabled={loading}
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors outline-none focus:ring-2 ${
              clientErrors.email
                ? 'border-red-400 focus:ring-red-200 bg-red-50/30'
                : 'border-slate-300 focus:border-indigo-600 focus:ring-indigo-100 bg-white'
            }`}
          />
          {clientErrors.email && (
            <p className="mt-1 text-xs text-red-600">{clientErrors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handleInputChange(setPassword, 'password')}
            placeholder="••••••••••••"
            disabled={loading}
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors outline-none focus:ring-2 ${
              clientErrors.password
                ? 'border-red-400 focus:ring-red-200 bg-red-50/30'
                : 'border-slate-300 focus:border-indigo-600 focus:ring-indigo-100 bg-white'
            }`}
          />
          {clientErrors.password && (
            <p className="mt-1 text-xs text-red-600">{clientErrors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              <span>Signing in...</span>
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      <div className="mt-6 pt-5 border-t border-slate-200">
        <p className="text-xs font-medium text-slate-500 mb-2.5">
          Quick test demo accounts:
        </p>
        <div className="space-y-1.5">
          {MOCK_EMPLOYEES.map((emp) => (
            <button
              key={emp.id}
              type="button"
              onClick={() => handleDemoFill(emp)}
              className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-slate-100 text-xs text-slate-600 flex items-center justify-between transition-colors border border-transparent hover:border-slate-200"
            >
              <span className="font-medium text-slate-800">{emp.name}</span>
              <span className="text-slate-500 font-mono text-[11px]">{emp.role}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

