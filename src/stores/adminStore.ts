import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// Types
interface AdminUser {
  id: number;
  name: string;
  email: string;
  image?: string;
  role: string;
  permissions: string[];
  last_login?: string;
}

interface DashboardStats {
  total_users: number;
  total_alumni: number;
  total_events: number;
  total_articles: number;
  total_transactions: number;
  monthly_revenue: number;
  pending_approvals: number;
  active_users_today: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
  last_login?: string;
  department_name?: string;
  batch_name?: string;
}

interface ContentItem {
  id: number;
  title: string;
  type: 'article' | 'news' | 'notice';
  status: 'pending' | 'approved' | 'rejected';
  author: string;
  created_at: string;
}

interface Transaction {
  id: number;
  user_name: string;
  amount: number;
  currency: string;
  type: string;
  status: string;
  gateway: string;
  created_at: string;
}

interface SystemSetting {
  key: string;
  value: any;
  type: 'text' | 'number' | 'boolean' | 'json';
  category: string;
}

interface ReportData {
  labels: string[];
  datasets: any[];
  total?: number;
  growth?: number;
}

export const useAdminStore = defineStore('admin', () => {
  // State
  const adminUser = ref<AdminUser | null>(null);
  const dashboardStats = ref<DashboardStats | null>(null);
  const users = ref<User[]>([]);
  const contentItems = ref<ContentItem[]>([]);
  const transactions = ref<Transaction[]>([]);
  const systemSettings = ref<SystemSetting[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Filters and pagination
  const userFilters = ref({
    search: '',
    role: '',
    status: '',
    department: '',
    batch: ''
  });
  const userPagination = ref({
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 0
  });

  const contentFilters = ref({
    search: '',
    type: '',
    status: '',
    author: ''
  });

  const transactionFilters = ref({
    search: '',
    type: '',
    status: '',
    gateway: '',
    date_from: '',
    date_to: ''
  });

  // Reports data
  const userReports = ref<ReportData | null>(null);
  const revenueReports = ref<ReportData | null>(null);
  const activityReports = ref<ReportData | null>(null);

  // Bulk operations
  const selectedUsers = ref<number[]>([]);
  const selectedContent = ref<number[]>([]);
  const selectedTransactions = ref<number[]>([]);

  // Computed
  const isAuthenticated = computed(() => !!adminUser.value);
  const hasPermission = computed(() => (permission: string) => {
    return adminUser.value?.permissions.includes(permission) || false;
  });
  const pendingContent = computed(() => 
    contentItems.value.filter(item => item.status === 'pending')
  );
  const pendingContentCount = computed(() => pendingContent.value.length);
  const totalRevenue = computed(() => 
    transactions.value
      .filter(t => t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0)
  );
  const activeUsersCount = computed(() => 
    users.value.filter(u => u.status === 'active').length
  );

  // Actions
  function setAdminUser(userData: AdminUser) {
    adminUser.value = userData;
  }

  function clearAdminUser() {
    adminUser.value = null;
    dashboardStats.value = null;
    users.value = [];
    contentItems.value = [];
    transactions.value = [];
    systemSettings.value = [];
  }

  function setDashboardStats(stats: DashboardStats) {
    dashboardStats.value = stats;
  }

  function setUsers(usersData: User[]) {
    users.value = usersData;
  }

  function addUser(user: User) {
    users.value.unshift(user);
  }

  function updateUser(userId: number, updates: Partial<User>) {
    const index = users.value.findIndex(u => u.id === userId);
    if (index !== -1) {
      users.value[index] = { ...users.value[index], ...updates };
    }
  }

  function deleteUser(userId: number) {
    users.value = users.value.filter(u => u.id !== userId);
    selectedUsers.value = selectedUsers.value.filter(id => id !== userId);
  }

  function setContentItems(items: ContentItem[]) {
    contentItems.value = items;
  }

  function updateContentStatus(contentId: number, status: 'approved' | 'rejected') {
    const index = contentItems.value.findIndex(c => c.id === contentId);
    if (index !== -1) {
      contentItems.value[index].status = status;
    }
  }

  function deleteContent(contentId: number) {
    contentItems.value = contentItems.value.filter(c => c.id !== contentId);
    selectedContent.value = selectedContent.value.filter(id => id !== contentId);
  }

  function setTransactions(transactionsData: Transaction[]) {
    transactions.value = transactionsData;
  }

  function updateTransaction(transactionId: number, updates: Partial<Transaction>) {
    const index = transactions.value.findIndex(t => t.id === transactionId);
    if (index !== -1) {
      transactions.value[index] = { ...transactions.value[index], ...updates };
    }
  }

  function setSystemSettings(settings: SystemSetting[]) {
    systemSettings.value = settings;
  }

  function updateSystemSetting(key: string, value: any) {
    const index = systemSettings.value.findIndex(s => s.key === key);
    if (index !== -1) {
      systemSettings.value[index].value = value;
    } else {
      systemSettings.value.push({
        key,
        value,
        type: typeof value === 'boolean' ? 'boolean' : 
              typeof value === 'number' ? 'number' : 'text',
        category: 'general'
      });
    }
  }

  function getSystemSetting(key: string, defaultValue: any = null) {
    const setting = systemSettings.value.find(s => s.key === key);
    return setting ? setting.value : defaultValue;
  }

  // Filter actions
  function setUserFilters(filters: Partial<typeof userFilters.value>) {
    userFilters.value = { ...userFilters.value, ...filters };
  }

  function clearUserFilters() {
    userFilters.value = {
      search: '',
      role: '',
      status: '',
      department: '',
      batch: ''
    };
  }

  function setContentFilters(filters: Partial<typeof contentFilters.value>) {
    contentFilters.value = { ...contentFilters.value, ...filters };
  }

  function setTransactionFilters(filters: Partial<typeof transactionFilters.value>) {
    transactionFilters.value = { ...transactionFilters.value, ...filters };
  }

  // Pagination actions
  function setUserPagination(pagination: Partial<typeof userPagination.value>) {
    userPagination.value = { ...userPagination.value, ...pagination };
  }

  // Selection actions
  function setSelectedUsers(userIds: number[]) {
    selectedUsers.value = userIds;
  }

  function toggleUserSelection(userId: number) {
    const index = selectedUsers.value.indexOf(userId);
    if (index > -1) {
      selectedUsers.value.splice(index, 1);
    } else {
      selectedUsers.value.push(userId);
    }
  }

  function clearUserSelection() {
    selectedUsers.value = [];
  }

  function setSelectedContent(contentIds: number[]) {
    selectedContent.value = contentIds;
  }

  function clearContentSelection() {
    selectedContent.value = [];
  }

  // Reports actions
  function setUserReports(data: ReportData) {
    userReports.value = data;
  }

  function setRevenueReports(data: ReportData) {
    revenueReports.value = data;
  }

  function setActivityReports(data: ReportData) {
    activityReports.value = data;
  }

  // Bulk operations
  function bulkUpdateUsers(userIds: number[], updates: Partial<User>) {
    userIds.forEach(userId => {
      updateUser(userId, updates);
    });
  }

  function bulkDeleteUsers(userIds: number[]) {
    userIds.forEach(userId => {
      deleteUser(userId);
    });
  }

  function bulkApproveContent(contentIds: number[]) {
    contentIds.forEach(contentId => {
      updateContentStatus(contentId, 'approved');
    });
  }

  function bulkRejectContent(contentIds: number[]) {
    contentIds.forEach(contentId => {
      updateContentStatus(contentId, 'rejected');
    });
  }

  // Utility actions
  function setLoading(isLoading: boolean) {
    loading.value = isLoading;
  }

  function setError(errorMessage: string | null) {
    error.value = errorMessage;
  }

  function clearError() {
    error.value = null;
  }

  return {
    // State
    adminUser,
    dashboardStats,
    users,
    contentItems,
    transactions,
    systemSettings,
    loading,
    error,
    userFilters,
    userPagination,
    contentFilters,
    transactionFilters,
    userReports,
    revenueReports,
    activityReports,
    selectedUsers,
    selectedContent,
    selectedTransactions,

    // Computed
    isAuthenticated,
    hasPermission,
    pendingContent,
    pendingContentCount,
    totalRevenue,
    activeUsersCount,

    // Actions
    setAdminUser,
    clearAdminUser,
    setDashboardStats,
    setUsers,
    addUser,
    updateUser,
    deleteUser,
    setContentItems,
    updateContentStatus,
    deleteContent,
    setTransactions,
    updateTransaction,
    setSystemSettings,
    updateSystemSetting,
    getSystemSetting,
    setUserFilters,
    clearUserFilters,
    setContentFilters,
    setTransactionFilters,
    setUserPagination,
    setSelectedUsers,
    toggleUserSelection,
    clearUserSelection,
    setSelectedContent,
    clearContentSelection,
    setUserReports,
    setRevenueReports,
    setActivityReports,
    bulkUpdateUsers,
    bulkDeleteUsers,
    bulkApproveContent,
    bulkRejectContent,
    setLoading,
    setError,
    clearError
  };
});
