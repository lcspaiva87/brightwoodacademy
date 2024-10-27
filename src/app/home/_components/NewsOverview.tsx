import React, { useState } from 'react';
import { Search, Filter, Calendar, Users, ChevronDown, Eye, Trash } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  publishDate: string;
  publishTime: string;
  teacher: {
    name: string;
    image: string;
  };
  targetType: 'all' | 'class' | 'student';
  targetClass?: string;
  targetStudents?: string[];
  image?: string;
  status: 'published' | 'scheduled' | 'draft';
}

// Mock data for demonstration
const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'End of Year Concert Announcement',
    content: 'We are excited to announce our annual end of year concert...',
    publishDate: '2024-06-15',
    publishTime: '14:00',
    teacher: {
      name: 'Sarah Johnson',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80'
    },
    targetType: 'all',
    status: 'published',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    title: 'Class 2-B Parent-Teacher Meeting',
    content: 'Dear parents, we would like to schedule a meeting to discuss...',
    publishDate: '2024-03-25',
    publishTime: '09:00',
    teacher: {
      name: 'Michael Chen',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80'
    },
    targetType: 'class',
    targetClass: '2-B',
    status: 'scheduled'
  },
  {
    id: '3',
    title: 'Special Achievement Recognition',
    content: 'Congratulations to the following students for their outstanding performance...',
    publishDate: '2024-03-20',
    publishTime: '15:30',
    teacher: {
      name: 'Emily Davis',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80'
    },
    targetType: 'student',
    targetStudents: ['1', '3', '5'],
    status: 'published'
  }
];

const NewsOverview: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'scheduled' | 'draft'>('all');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const filteredNews = mockNews.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.teacher.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || news.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDelete = (id: string) => {
    // Implement delete functionality
    console.log('Delete news with id:', id);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-900">News Overview</h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as 'all' | 'published' | 'scheduled' | 'draft')}
                  className="w-full appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="draft">Draft</option>
                </select>
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredNews.map((news) => (
            <div key={news.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <img
                    src={news.teacher.image}
                    alt={news.teacher.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-medium text-gray-900 truncate">{news.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(news.status)}`}>
                        {news.status.charAt(0).toUpperCase() + news.status.slice(1)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{news.content}</p>
                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(`${news.publishDate} ${news.publishTime}`).toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {news.targetType === 'all' ? 'All Classes' :
                          news.targetType === 'class' ? `Class ${news.targetClass}` :
                            'Selected Students'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedNews(news)}
                    className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(news.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </div>
              </div>
              {news.image && (
                <div className="mt-4">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="rounded-lg max-h-48 object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No news found matching your criteria.
          </div>
        )}
      </div>

      {/* News Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{selectedNews.title}</h3>
                <button
                  onClick={() => setSelectedNews(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={selectedNews.teacher.image}
                  alt={selectedNews.teacher.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-900">{selectedNews.teacher.name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(`${selectedNews.publishDate} ${selectedNews.publishTime}`).toLocaleString()}
                  </p>
                </div>
              </div>
              {selectedNews.image && (
                <img
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  className="w-full rounded-lg mb-4"
                />
              )}
              <p className="text-gray-700 whitespace-pre-wrap">{selectedNews.content}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsOverview;