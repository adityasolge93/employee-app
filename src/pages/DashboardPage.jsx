import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/authSlice';

function DashboardPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
              EA
            </div>
            <div>
              <span className="font-semibold text-slate-900 text-sm sm:text-base">
                Employee App
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[11px] font-medium rounded-full bg-indigo-50 text-indigo-700">
                Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-semibold flex items-center justify-center text-xs">
                  {user?.name ? user.name.slice(0, 2).toUpperCase() : 'EM'}
                </div>
              )}
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-slate-800 leading-tight">
                  {user?.name}
                </p>
                <p className="text-[11px] text-slate-500">{user?.role}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="ml-2 px-3 py-1.5 rounded-lg border border-slate-300 hover:border-red-300 text-slate-600 hover:text-red-600 hover:bg-red-50 text-xs font-medium transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-800 rounded-2xl p-6 sm:p-8 text-white shadow-lg shadow-indigo-500/10 mb-8">
          <span className="inline-block px-2.5 py-1 rounded-full bg-white/20 text-white text-xs font-medium mb-3 backdrop-blur-sm">
            Active Session
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Welcome back, {user?.name || 'Employee'}!
          </h1>
          <p className="text-indigo-100 text-sm mt-1 max-w-xl">
            You are signed in as <span className="font-semibold text-white">{user?.role}</span> in the{' '}
            <span className="font-semibold text-white">{user?.department}</span> department.
          </p>
        </div>

        {/* Profile Details Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Employee Profile Overview
              </h2>
              <p className="text-xs text-slate-500">
                Verified information for your active work profile
              </p>
            </div>
            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Active Status
            </span>
          </div>

          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-slate-100">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-2xl object-cover ring-4 ring-indigo-50"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-indigo-100 text-indigo-700 font-bold text-2xl flex items-center justify-center">
                  {user?.name ? user.name.slice(0, 2).toUpperCase() : 'EM'}
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-slate-900">{user?.name}</h3>
                <p className="text-sm font-medium text-indigo-600">{user?.role}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  ID: <span className="font-mono">{user?.id}</span> • {user?.department}
                </p>
              </div>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
              <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100">
                <dt className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Work Email
                </dt>
                <dd className="text-sm font-semibold text-slate-800 mt-1 break-all">
                  {user?.email}
                </dd>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100">
                <dt className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Department
                </dt>
                <dd className="text-sm font-semibold text-slate-800 mt-1">
                  {user?.department}
                </dd>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100">
                <dt className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Office Location
                </dt>
                <dd className="text-sm font-semibold text-slate-800 mt-1">
                  {user?.location || 'Remote'}
                </dd>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100">
                <dt className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Contact Phone
                </dt>
                <dd className="text-sm font-semibold text-slate-800 mt-1">
                  {user?.phone || 'N/A'}
                </dd>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100">
                <dt className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Joined Date
                </dt>
                <dd className="text-sm font-semibold text-slate-800 mt-1">
                  {user?.joinedDate || 'N/A'}
                </dd>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100">
                <dt className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Authentication Type
                </dt>
                <dd className="text-sm font-semibold text-slate-800 mt-1">
                  Mock JWT (Redux Persisted)
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;

