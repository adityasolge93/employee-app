export const MOCK_EMPLOYEES = [
  {
    id: 'FSD-001',
    name: 'Sarah Connor',
    email: 'sarah.connor@example.com',
    password: 'Password@123',
    gender: 'Female',
    dateOfJoining: '2022-03-15',
    joinedDate: '2022-03-15',
    phone: '+1 (555) 234-5678',
    role: 'Lead Software Engineer',
    department: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    location: 'San Francisco, CA',
  },
  {
    id: 'FSD-002',
    name: 'Marcus Vance',
    email: 'marcus.vance@example.com',
    password: 'Password@123',
    gender: 'Male',
    dateOfJoining: '2021-08-01',
    joinedDate: '2021-08-01',
    phone: '+1 (555) 345-6789',
    role: 'Senior Product Manager',
    department: 'Product',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    location: 'New York, NY',
  },
  {
    id: 'FSD-003',
    name: 'Aisha Patel',
    email: 'aisha.patel@example.com',
    password: 'Password@123',
    gender: 'Female',
    dateOfJoining: '2023-01-10',
    joinedDate: '2023-01-10',
    phone: '+1 (555) 456-7890',
    role: 'UX Research Lead',
    department: 'Design',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    location: 'Austin, TX',
  },
];

const AUTH_STORAGE_KEY = 'employee_app_auth_session';
const EMPLOYEES_STORAGE_KEY = 'employee_app_employees_list';

export const generateNextEmployeeId = (employees = []) => {
  let maxId = 0;
  employees.forEach((emp) => {
    if (emp?.id && typeof emp.id === 'string') {
      const match = emp.id.match(/^FSD-(\d+)$/i);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxId) {
          maxId = num;
        }
      }
    }
  });
  const nextNum = maxId + 1;
  return `FSD-${String(nextNum).padStart(3, '0')}`;
};

export const validateDateOfJoining = (dateString) => {
  if (!dateString) return { isValid: true };
  const selectedDate = new Date(`${dateString}T00:00:00`);
  if (isNaN(selectedDate.getTime())) {
    return { isValid: false, error: 'Invalid date format.' };
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const fifteenDaysAgo = new Date(today);
  fifteenDaysAgo.setDate(today.getDate() - 15);

  if (selectedDate < fifteenDaysAgo) {
    return {
      isValid: false,
      error: 'Date of Joining must be in the future or not more than 15 days in the past.',
    };
  }
  return { isValid: true };
};

export const getSavedEmployees = () => {
  try {
    const raw = localStorage.getItem(EMPLOYEES_STORAGE_KEY);
    if (!raw) return MOCK_EMPLOYEES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : MOCK_EMPLOYEES;
  } catch (err) {
    console.error('Failed to parse employees from localStorage', err);
    return MOCK_EMPLOYEES;
  }
};

export const saveEmployees = (employees) => {
  try {
    localStorage.setItem(EMPLOYEES_STORAGE_KEY, JSON.stringify(employees));
  } catch (err) {
    console.error('Failed to save employees to localStorage', err);
  }
};

export const authenticateUser = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const cleanEmail = email.trim().toLowerCase();
      // Search in persistent employee list if available, else in MOCK_EMPLOYEES
      const currentEmployees = getSavedEmployees();
      const employee = currentEmployees.find(
        (emp) => emp.email.toLowerCase() === cleanEmail
      );

      if (!employee) {
        reject(new Error('No employee account found with this email.'));
        return;
      }

      if (employee.password && employee.password !== password) {
        reject(new Error('Incorrect password. Please try again.'));
        return;
      }

      // Exclude password from the returned session user object
      const safeUserData = { ...employee };
      delete safeUserData.password;
      resolve({
        user: safeUserData,
        token: `mock-jwt-token-${safeUserData.id}-${Date.now()}`,
      });
    }, 600);
  });
};

export const saveSession = (sessionData) => {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionData));
  } catch (err) {
    console.error('Failed to save auth session to localStorage', err);
  }
};

export const getSavedSession = () => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse auth session from localStorage', err);
    return null;
  }
};

export const clearSession = () => {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear auth session from localStorage', err);
  }
};
