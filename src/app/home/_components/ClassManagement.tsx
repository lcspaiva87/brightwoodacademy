import React, { useState } from 'react';
import { PlusCircle, Edit2, Trash2, Clock, Users, Search, Check, X } from 'lucide-react';
import { classData } from '@/mock/data';


interface Teacher {
  name: string;
  image: string;
}

interface Schedule {
  day: string;
  time: string;
  subject: string;
}

interface Class {
  id: string;
  className: string;
  teacher: Teacher;
  assistant: Teacher;
  roomNumber: string;
  schedule: Schedule[];
}

const initialClassState: Class = {
  id: '',
  className: '',
  teacher: { name: '', image: '' },
  assistant: { name: '', image: '' },
  roomNumber: '',
  schedule: [{ day: '', time: '', subject: '' }]
};

const ClassManagement: React.FC = () => {
  const [classes, setClasses] = useState<any[]>(classData);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const filteredClasses = classes.filter(cls =>
    cls.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClass = (newClass: Class) => {
    setClasses(prev => [...prev, { ...newClass, id: String(prev.length + 1) }]);
    setShowAddModal(false);
    setSuccessMessage('Class added successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleUpdateClass = (updatedClass: Class) => {
    setClasses(prev => prev.map(cls =>
      cls.id === updatedClass.id ? updatedClass : cls
    ));
    setEditingClass(null);
    setSuccessMessage('Class updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDeleteClass = (id: string) => {
    setClasses(prev => prev.filter(cls => cls.id !== id));
    setDeleteConfirm(null);
    setSuccessMessage('Class deleted successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const ClassForm = ({ initialData, onSubmit, onCancel }: {
    initialData: Class,
    onSubmit: (data: Class) => void,
    onCancel: () => void
  }) => {
    const [formData, setFormData] = useState<Class>(initialData);

    const handleScheduleChange = (index: number, field: keyof Schedule, value: string) => {
      const newSchedule = [...formData.schedule];
      newSchedule[index] = { ...newSchedule[index], [field]: value };
      setFormData(prev => ({ ...prev, schedule: newSchedule }));
    };

    const addScheduleItem = () => {
      setFormData(prev => ({
        ...prev,
        schedule: [...prev.schedule, { day: '', time: '', subject: '' }]
      }));
    };

    const removeScheduleItem = (index: number) => {
      setFormData(prev => ({
        ...prev,
        schedule: prev.schedule.filter((_, i) => i !== index)
      }));
    };

    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class Name
            </label>
            <input
              type="text"
              value={formData.className}
              onChange={(e) => setFormData(prev => ({ ...prev, className: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room Number
            </label>
            <input
              type="text"
              value={formData.roomNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, roomNumber: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teacher Name
            </label>
            <input
              type="text"
              value={formData.teacher.name}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                teacher: { ...prev.teacher, name: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teacher Photo URL
            </label>
            <input
              type="url"
              value={formData.teacher.image}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                teacher: { ...prev.teacher, image: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assistant Name
            </label>
            <input
              type="text"
              value={formData.assistant.name}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                assistant: { ...prev.assistant, name: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assistant Photo URL
            </label>
            <input
              type="url"
              value={formData.assistant.image}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                assistant: { ...prev.assistant, image: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Class Schedule</h3>
            <button
              type="button"
              onClick={addScheduleItem}
              className="flex items-center gap-2 px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              <PlusCircle className="h-4 w-4" />
              Add Time Slot
            </button>
          </div>
          <div className="space-y-4">
            {formData.schedule.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-1 grid grid-cols-3 gap-4">
                  <div>
                    <select
                      value={item.day}
                      onChange={(e) => handleScheduleChange(index, 'day', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                      <option value="">Select day</option>
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={item.time}
                      onChange={(e) => handleScheduleChange(index, 'time', e.target.value)}
                      placeholder="Time (e.g., 9:00 AM - 10:30 AM)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={item.subject}
                      onChange={(e) => handleScheduleChange(index, 'subject', e.target.value)}
                      placeholder="Subject"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>
                {formData.schedule.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeScheduleItem(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {initialData.id ? 'Update Class' : 'Add Class'}
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-900">Class Management</h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search classes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <PlusCircle className="h-4 w-4" />
                Add Class
              </button>
            </div>
          </div>
        </div>

        {successMessage && (
          <div className="m-6 p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
            <Check className="h-5 w-5" />
            {successMessage}
          </div>
        )}

        <div className="divide-y divide-gray-200">
          {filteredClasses.map((cls) => (
            <div key={cls.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-medium text-gray-900">{cls.className}</h3>
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-lg text-sm">
                        Room {cls.roomNumber}
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={cls.teacher.image}
                          alt={cls.teacher.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{cls.teacher.name}</p>
                          <p className="text-xs text-gray-500">Teacher</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <img
                          src={cls.assistant.image}
                          alt={cls.assistant.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{cls.assistant.name}</p>
                          <p className="text-xs text-gray-500">Assistant</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 grid gap-2">
                      {cls.schedule.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-900">{item.subject}</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.day} • {item.time}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingClass(cls)}
                    className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(cls.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredClasses.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No classes found matching your criteria.
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingClass) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {editingClass ? 'Edit Class' : 'Add New Class'}
              </h3>
              <ClassForm
                initialData={editingClass || initialClassState}
                onSubmit={editingClass ? handleUpdateClass : handleAddClass}
                onCancel={() => {
                  setShowAddModal(false);
                  setEditingClass(null);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
              <p className="text-gray-500 mb-6">
                Are you sure you want to delete this class? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteClass(deleteConfirm)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassManagement;