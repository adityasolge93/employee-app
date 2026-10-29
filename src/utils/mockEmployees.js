export const MOCK_EMPLOYEES = [
  {
    id: 'emp-001',
    name: 'Sarah Connor',
    email: 'sarah.connor@example.com',
    password: 'Password@123',
    role: 'Lead Software Engineer',
    department: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    joinedDate: '2022-03-15',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
  },
  {
    id: 'emp-002',
    name: 'Marcus Vance',
    email: 'marcus.vance@example.com',
    password: 'Password@123',
    role: 'Senior Product Manager',
    department: 'Product',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    joinedDate: '2021-08-01',
    phone: '+1 (555) 345-6789',
    location: 'New York, NY',
  },
  {
    id: 'emp-003',
    name: 'Aisha Patel',
    email: 'aisha.patel@example.com',
    password: 'Password@123',
    role: 'UX Research Lead',
    department: 'Design',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    joinedDate: '2023-01-10',
    phone: '+1 (555) 456-7890',
    location: 'Austin, TX',
  },
];

const AUTH_STORAGE_KEY = 'employee_app_auth_session';

export const authenticateUser = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const cleanEmail = email.trim().toLowerCase();
      const employee = MOCK_EMPLOYEES.find(
        (emp) => emp.email.toLowerCase() === cleanEmail
      );

      if (!employee) {
        reject(new Error('No employee account found with this email.'));
        return;
      }

      if (employee.password !== password) {
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
