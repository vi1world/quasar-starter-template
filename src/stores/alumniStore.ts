import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// Types
interface User {
  id: number;
  name: string;
  email: string;
  image?: string;
  department_name?: string;
  batch_name?: string;
  role?: string;
  permissions?: string[];
}

interface Post {
  id: number;
  content: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  likes_count?: number;
  comments_count?: number;
  is_liked?: boolean;
  type?: 'post' | 'article';
  author?: User;
}

interface Event {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location?: string;
  image?: string;
  price?: number;
  is_registered?: boolean;
}

interface JobPost {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string;
  salary_range?: string;
  posted_by: number;
  created_at: string;
  is_applied?: boolean;
}

interface Group {
  id: number;
  name: string;
  description: string;
  image?: string;
  members_count: number;
  is_member: boolean;
  is_admin: boolean;
  privacy: 'public' | 'private';
}

interface Article {
  id: number;
  title: string;
  slug: string;
  body: string;
  thumbnail?: string;
  status: string;
  user_id: number;
  created_at: string;
  author?: User;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  read_at?: string;
  created_at: string;
  data?: any;
}

export const useAlumniStore = defineStore('alumni', () => {
  // State
  const user = ref<User | null>(null);
  const posts = ref<Post[]>([]);
  const events = ref<Event[]>([]);
  const jobPosts = ref<JobPost[]>([]);
  const groups = ref<Group[]>([]);
  const articles = ref<Article[]>([]);
  const notifications = ref<Notification[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Timeline/Feed state
  const timelinePosts = ref<Post[]>([]);
  const timelineLoading = ref(false);
  const timelineHasMore = ref(true);
  const timelinePage = ref(1);

  // Search state
  const searchQuery = ref('');
  const searchResults = ref<any[]>([]);
  const searchLoading = ref(false);

  // Chat/Message state
  const activeChat = ref<any>(null);
  const chatMessages = ref<any[]>([]);
  const unreadMessagesCount = ref(0);

  // Computed
  const isAuthenticated = computed(() => !!user.value);
  const unreadNotificationsCount = computed(() => 
    notifications.value.filter(n => !n.read_at).length
  );
  const myGroups = computed(() => 
    groups.value.filter(g => g.is_member)
  );
  const myEvents = computed(() => 
    events.value.filter(e => e.is_registered)
  );
  const myJobPosts = computed(() => 
    jobPosts.value.filter(j => j.posted_by === user.value?.id)
  );
  const myArticles = computed(() => 
    articles.value.filter(a => a.user_id === user.value?.id)
  );

  // Actions
  function setUser(userData: User) {
    user.value = userData;
  }

  function clearUser() {
    user.value = null;
    posts.value = [];
    events.value = [];
    jobPosts.value = [];
    groups.value = [];
    articles.value = [];
    notifications.value = [];
  }

  function setPosts(postsData: Post[]) {
    posts.value = postsData;
  }

  function addPost(post: Post) {
    posts.value.unshift(post);
    timelinePosts.value.unshift(post);
  }

  function updatePost(postId: number, updates: Partial<Post>) {
    const index = posts.value.findIndex(p => p.id === postId);
    if (index !== -1) {
      posts.value[index] = { ...posts.value[index], ...updates };
    }
    
    const timelineIndex = timelinePosts.value.findIndex(p => p.id === postId);
    if (timelineIndex !== -1) {
      timelinePosts.value[timelineIndex] = { ...timelinePosts.value[timelineIndex], ...updates };
    }
  }

  function deletePost(postId: number) {
    posts.value = posts.value.filter(p => p.id !== postId);
    timelinePosts.value = timelinePosts.value.filter(p => p.id !== postId);
  }

  function setEvents(eventsData: Event[]) {
    events.value = eventsData;
  }

  function addEvent(event: Event) {
    events.value.unshift(event);
  }

  function updateEvent(eventId: number, updates: Partial<Event>) {
    const index = events.value.findIndex(e => e.id === eventId);
    if (index !== -1) {
      events.value[index] = { ...events.value[index], ...updates };
    }
  }

  function setJobPosts(jobPostsData: JobPost[]) {
    jobPosts.value = jobPostsData;
  }

  function addJobPost(jobPost: JobPost) {
    jobPosts.value.unshift(jobPost);
  }

  function setGroups(groupsData: Group[]) {
    groups.value = groupsData;
  }

  function updateGroupMembership(groupId: number, isMember: boolean) {
    const index = groups.value.findIndex(g => g.id === groupId);
    if (index !== -1) {
      groups.value[index].is_member = isMember;
      groups.value[index].members_count += isMember ? 1 : -1;
    }
  }

  function setArticles(articlesData: Article[]) {
    articles.value = articlesData;
  }

  function addArticle(article: Article) {
    articles.value.unshift(article);
  }

  function setNotifications(notificationsData: Notification[]) {
    notifications.value = notificationsData;
  }

  function markNotificationAsRead(notificationId: number) {
    const index = notifications.value.findIndex(n => n.id === notificationId);
    if (index !== -1) {
      notifications.value[index].read_at = new Date().toISOString();
    }
  }

  function markAllNotificationsAsRead() {
    const now = new Date().toISOString();
    notifications.value.forEach(n => {
      if (!n.read_at) {
        n.read_at = now;
      }
    });
  }

  // Timeline actions
  function setTimelinePosts(postsData: Post[]) {
    timelinePosts.value = postsData;
  }

  function appendTimelinePosts(postsData: Post[]) {
    timelinePosts.value.push(...postsData);
  }

  function resetTimeline() {
    timelinePosts.value = [];
    timelinePage.value = 1;
    timelineHasMore.value = true;
  }

  // Search actions
  function setSearchResults(results: any[]) {
    searchResults.value = results;
  }

  function clearSearchResults() {
    searchResults.value = [];
    searchQuery.value = '';
  }

  // Chat actions
  function setActiveChat(chat: any) {
    activeChat.value = chat;
  }

  function setChatMessages(messages: any[]) {
    chatMessages.value = messages;
  }

  function addChatMessage(message: any) {
    chatMessages.value.push(message);
  }

  function setUnreadMessagesCount(count: number) {
    unreadMessagesCount.value = count;
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
    user,
    posts,
    events,
    jobPosts,
    groups,
    articles,
    notifications,
    loading,
    error,
    timelinePosts,
    timelineLoading,
    timelineHasMore,
    timelinePage,
    searchQuery,
    searchResults,
    searchLoading,
    activeChat,
    chatMessages,
    unreadMessagesCount,

    // Computed
    isAuthenticated,
    unreadNotificationsCount,
    myGroups,
    myEvents,
    myJobPosts,
    myArticles,

    // Actions
    setUser,
    clearUser,
    setPosts,
    addPost,
    updatePost,
    deletePost,
    setEvents,
    addEvent,
    updateEvent,
    setJobPosts,
    addJobPost,
    setGroups,
    updateGroupMembership,
    setArticles,
    addArticle,
    setNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    setTimelinePosts,
    appendTimelinePosts,
    resetTimeline,
    setSearchResults,
    clearSearchResults,
    setActiveChat,
    setChatMessages,
    addChatMessage,
    setUnreadMessagesCount,
    setLoading,
    setError,
    clearError
  };
});
