import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddEmployeeModal from '../components/AddEmployeeModal';
import EmployeeTable from '../components/EmployeeTable';
import { logoutUser } from '../store/authSlice';
import { loadEmployees } from '../store/employeesSlice';

function DashboardPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { list } = useSelector((state) => state.employees);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    dispatch(loadEmployees());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
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
                <p className="text-[11px] text-slate-500">{user?.role || 'Employee'}</p>
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Top Action Row: Title, Stats, and Future Extensible Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-bold text-slate-900">
                Employee Directory
              </h1>
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                {list.length} {list.length === 1 ? 'Employee' : 'Employees'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Browse, sort, and manage company employee records.
            </p>
          </div>

          {/* Action Row Toolbar (Extensible for future buttons: Export, Filter, Import, etc.) */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Add Employee</span>
            </button>
          </div>
        </div>

        {/* Employee List Table */}
        <section aria-label="Employee List">
          <EmployeeTable />
        </section>
      </main>

      {/* Add Employee Modal */}
      <AddEmployeeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}

export default DashboardPage;
