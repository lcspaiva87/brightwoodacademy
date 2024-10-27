import React, { useState, useEffect } from 'react';
import { Send, Image as ImageIcon, Calendar, Clock, Check, Users, User } from 'lucide-react';
import { classData } from '@/mock/data';

interface Student {
  id: string;
  name: string;
  class: string;
}

interface NewsForm {
  title: string;
  content: string;
  targetType: 'all' | 'class' | 'student';
  targetClass: string;
  targetStudents: string[];
  publishDate: string;
  publishTime: string;
  image: File | null;
  imagePreview: string;
}

// Simulated student data
const mockStudents: Student[] = [
  { id: '1', name: 'Emma Thompson', class: '1a' },
  { id: '2', name: 'Liam Wilson', class: '1a' },
  { id: '3', name: 'Olivia Davis', class: '1b' },
  { id: '4', name: 'Noah Martinez', class: '2a' },
  { id: '5', name: 'Ava Johnson', class: '2b' },
];

const initialFormState: NewsForm = {
  title: '',
  content: '',
  targetType: 'all',
  targetClass: '',
  targetStudents: [],
  publishDate: '',
  publishTime: '',
  image: null,
  imagePreview: ''
};

const NewsRegistration: React.FC = () => {
  const [form, setForm] = useState<NewsForm>(initialFormState);
  const [successMessage, setSuccessMessage] = useState('');
  const [availableStudents, setAvailableStudents] = useState<Student[]>([]);

  useEffect(() => {
    if (form.targetType === 'class' && form.targetClass) {
      setAvailableStudents(mockStudents.filter(student => student.class === form.targetClass));
    } else {
      setAvailableStudents(mockStudents);
    }
  }, [form.targetType, form.targetClass]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'targetType') {
      setForm(prev => ({
        ...prev,
        [name]: value as 'all' | 'class' | 'student',
        targetClass: '',
        targetStudents: []
      }));
    } else if (name === 'targetClass') {
      setForm(prev => ({
        ...prev,
        [name]: value,
        targetStudents: []
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleStudentSelection = (studentId: string) => {
    setForm(prev => ({
      ...prev,
      targetStudents: prev.targetStudents.includes(studentId)
        ? prev.targetStudents.filter(id => id !== studentId)
        : [...prev.targetStudents, studentId]
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('News published successfully!');
    setForm(initialFormState);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Create News Announcement</h2>

        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
            <Check className="h-5 w-5" />
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter announcement title"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                placeholder="Write your announcement here..."
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Audience
              </label>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <button
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, targetType: 'all', targetClass: '', targetStudents: [] }))}
                  className={`p-3 rounded-lg border ${form.targetType === 'all'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-300 hover:border-gray-400'
                    } flex items-center justify-center gap-2`}
                >
                  <Users className="h-5 w-5" />
                  All Classes
                </button>
                <button
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, targetType: 'class', targetStudents: [] }))}
                  className={`p-3 rounded-lg border ${form.targetType === 'class'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-300 hover:border-gray-400'
                    } flex items-center justify-center gap-2`}
                >
                  <Users className="h-5 w-5" />
                  Specific Class
                </button>
                <button
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, targetType: 'student' }))}
                  className={`p-3 rounded-lg border ${form.targetType === 'student'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-300 hover:border-gray-400'
                    } flex items-center justify-center gap-2`}
                >
                  <User className="h-5 w-5" />
                  Select Students
                </button>
              </div>

              {form.targetType !== 'all' && (
                <div className="space-y-4">
                  {(form.targetType === 'class' || form.targetType === 'student') && (
                    <select
                      name="targetClass"
                      value={form.targetClass}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      required={form.targetType === 'class'}
                    >
                      <option value="">Select class</option>
                      {classData.map((cls) => (
                        <option key={cls.id} value={cls.className.toLowerCase().replace(/\s+/g, '')}>
                          {cls.className}
                        </option>
                      ))}
                    </select>
                  )}

                  {form.targetType === 'student' && (
                    <div className="border border-gray-200 rounded-lg p-4 max-h-60 overflow-y-auto">
                      <div className="space-y-2">
                        {availableStudents.map((student) => (
                          <label
                            key={student.id}
                            className="flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={form.targetStudents.includes(student.id)}
                              onChange={() => handleStudentSelection(student.id)}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <span className="ml-3 text-sm text-gray-700">{student.name}</span>
                            <span className="ml-auto text-xs text-gray-500">{student.class.toUpperCase()}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Publish Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    name="publishDate"
                    value={form.publishDate}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Publish Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="time"
                    name="publishTime"
                    value={form.publishTime}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-center">
              {form.imagePreview ? (
                <div className="relative">
                  <img
                    src={form.imagePreview}
                    alt="Preview"
                    className="max-w-md rounded-lg shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, image: null, imagePreview: '' }))}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center gap-2 p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-600">Add an image (optional)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setForm(initialFormState)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              Publish News
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsRegistration;