import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSorting } from '../store/employeesSlice';

function EmployeeTable() {
  const dispatch = useDispatch();
  const { list, sortConfig } = useSelector((state) => state.employees);

  const columns = [
    { key: 'id', label: 'Employee ID' },
    { key: 'name', label: 'Full Name' },
    { key: 'gender', label: 'Gender' },
    { key: 'dateOfJoining', label: 'Date of Joining' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone Number' },
  ];

  const sortedEmployees = useMemo(() => {
    if (!list || list.length === 0) return [];
    const items = [...list];
    const { key, direction } = sortConfig;
    const factor = direction === 'asc' ? 1 : -1;

    return items.sort((a, b) => {
      const valA = a[key] ?? '';
      const valB = b[key] ?? '';

      // If either value is empty, push empty values to the bottom
      if (!valA && valB) return 1;
      if (valA && !valB) return -1;
      if (!valA && !valB) return 0;

      // Date comparison
      if (key === 'dateOfJoining') {
        const timeA = new Date(valA).getTime();
        const timeB = new Date(valB).getTime();
        if (!isNaN(timeA) && !isNaN(timeB)) {
          return (timeA - timeB) * factor;
        }
      }

      // ID comparison with numerical suffix awareness (e.g. FSD-001)
      if (key === 'id') {
        const matchA = String(valA).match(/\d+/);
        const matchB = String(valB).match(/\d+/);
        if (matchA && matchB) {
          const diff = parseInt(matchA[0], 10) - parseInt(matchB[0], 10);
          if (diff !== 0) return diff * factor;
        }
      }

      // Default string comparison
      return (
        String(valA).localeCompare(String(valB), undefined, {
          numeric: true,
          sensitivity: 'base',
        }) * factor
      );
    });
  }, [list, sortConfig]);

  const handleHeaderClick = (key) => {
    dispatch(setSorting({ key }));
  };

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {columns.map((col) => {
                const isActive = sortConfig.key === col.key;
                return (
                  <th
                    key={col.key}
                    scope="col"
                    onClick={() => handleHeaderClick(col.key)}
                    className="py-3.5 px-4 text-xs font-semibold text-slate-700 tracking-wider cursor-pointer hover:bg-slate-100 transition-colors select-none"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{col.label}</span>
                      <span className="text-[11px] text-slate-400">
                        {isActive ? (
                          sortConfig.direction === 'asc' ? (
                            <span className="text-indigo-600 font-bold">▲</span>
                          ) : (
                            <span className="text-indigo-600 font-bold">▼</span>
                          )
                        ) : (
                          <span className="opacity-30">▲▼</span>
                        )}
                      </span>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {sortedEmployees.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-12 text-center text-slate-500"
                >
                  <p className="font-medium text-slate-700">No employees found</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Click "Add Employee" above to add the first record.
                  </p>
                </td>
              </tr>
            ) : (
              sortedEmployees.map((emp) => (
                <tr
                  key={emp.id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="py-3 px-4 font-mono font-medium text-xs text-indigo-700 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded bg-indigo-50 border border-indigo-100">
                      {emp.id}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-900 whitespace-nowrap">
                    {emp.name}
                  </td>
                  <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    {emp.gender ? (
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          emp.gender === 'Female'
                            ? 'bg-pink-50 text-pink-700 border border-pink-100'
                            : emp.gender === 'Male'
                            ? 'bg-blue-50 text-blue-700 border border-blue-100'
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {emp.gender}
                      </span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    {emp.dateOfJoining || emp.joinedDate ? (
                      <span>{emp.dateOfJoining || emp.joinedDate}</span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    <a
                      href={`mailto:${emp.email}`}
                      className="text-indigo-600 hover:text-indigo-800 hover:underline"
                    >
                      {emp.email}
                    </a>
                  </td>
                  <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    {emp.phone ? (
                      <span>{emp.phone}</span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeTable;

