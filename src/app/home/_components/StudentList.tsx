import React, { useState } from 'react';
import { Pencil, Trash2, Search, Filter, ChevronDown, X, GraduationCap, Users } from 'lucide-react';
import { classData } from '@/mock/data';

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  bloodType: string;
  allergies: string;
  photo: string;
  classId: string;
  parentInfo: {
    fatherName: string;
    fatherPhone: string;
    motherName: string;
    motherPhone: string;
  };
  status: 'active' | 'inactive';
}

// Mock data for demonstration
const mockStudents: Student[] = [
  {
    id: '1',
    firstName: 'Emma',
    lastName: 'Thompson',
    dateOfBirth: '2018-05-15',
    bloodType: 'A+',
    allergies: 'Peanuts',
    photo: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80',
    classId: '1',
    parentInfo: {
      fatherName: 'John Thompson',
      fatherPhone: '(555) 123-4567',
      motherName: 'Sarah Thompson',
      motherPhone: '(555) 123-4568'
    },
    status: 'active'
  },
  {
    id: '2',
    firstName: 'Liam',
    lastName: 'Wilson',
    dateOfBirth: '2018-03-22',
    bloodType: 'O+',
    allergies: 'None',
    photo: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80',
    classId: '2',
    parentInfo: {
      fatherName: 'Michael Wilson',
      fatherPhone: '(555) 234-5678',
      motherName: 'Emily Wilson',
      motherPhone: '(555) 234-5679'
    },
    status: 'active'
  },
  {
    id: '3',
    firstName: 'Olivia',
    lastName: 'Davis',
    dateOfBirth: '2018-07-10',
    bloodType: 'B+',
    allergies: 'Dairy',
    photo: 'https://images.unsplash.com/photo-1519419691348-3b3433c4c20e?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80',
    classId: '3',
    parentInfo: {
      fatherName: 'David Davis',
      fatherPhone: '(555) 345-6789',
      motherName: 'Lisa Davis',
      motherPhone: '(555) 345-6780'
    },
    status: 'inactive'
  }
];

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [classFilter, setClassFilter] = useState<string>('all');
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filteredStudents = students.filter(student => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    const matchesClass = classFilter === 'all' || student.classId === classFilter;
    return matchesSearch && matchesStatus && matchesClass;
  });

  const handleDelete = (id: string) => {
    setStudents(prev => prev.filter(student => student.id !== id));
    setDeleteConfirm(null);
  };

  const handleUpdate = (updatedStudent: Student) => {
    setStudents(prev => prev.map(student =>
      student.id === updatedStudent.id ? updatedStudent : student
    ));
    setEditingStudent(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getClassById = (classId: string) => {
    return classData.find(c => c.id === Number(classId))?.className || 'Unknown Class';
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-indigo-600" />
              Students Directory
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="relative">
                <select
                  value={statusFilter}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="w-full appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <div className="relative">
                <select
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                  className="w-full appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="all">All Classes</option>
                  {classData.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.className}
                    </option>
                  ))}
                </select>
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredStudents.map((student) => (
            <div key={student.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <img
                    src={student.photo}
                    alt={`${student.firstName} ${student.lastName}`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-medium text-gray-900">
                        {student.firstName} {student.lastName}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </span>
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">
                        {getClassById(student.classId)}
                      </span>
                    </div>
                    <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-500">
                      <div>
                        <p>Blood Type: {student.bloodType}</p>
                        <p>Allergies: {student.allergies || 'None'}</p>
                      </div>
                      <div>
                        <p>Father: {student.parentInfo.fatherName}</p>
                        <p>Mother: {student.parentInfo.motherName}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingStudent(student)}
                    className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(student.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredStudents.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No students found matching your criteria.
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Edit Student</h3>
                <button
                  onClick={() => setEditingStudent(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdate(editingStudent);
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={editingStudent.firstName}
                      onChange={(e) => setEditingStudent({ ...editingStudent, firstName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={editingStudent.lastName}
                      onChange={(e) => setEditingStudent({ ...editingStudent, lastName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Blood Type
                    </label>
                    <input
                      type="text"
                      value={editingStudent.bloodType}
                      onChange={(e) => setEditingStudent({ ...editingStudent, bloodType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Class
                    </label>
                    <select
                      value={editingStudent.classId}
                      onChange={(e) => setEditingStudent({ ...editingStudent, classId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                      {classData.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.className}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={editingStudent.status}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onChange={(e) => setEditingStudent({ ...editingStudent, status: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Allergies
                    </label>
                    <input
                      type="text"
                      value={editingStudent.allergies}
                      onChange={(e) => setEditingStudent({ ...editingStudent, allergies: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="List allergies or write 'None'"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Parent Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Father&lsquo;s Name
                        </label>
                        <input
                          type="text"
                          value={editingStudent.parentInfo.fatherName}
                          onChange={(e) => setEditingStudent({
                            ...editingStudent,
                            parentInfo: { ...editingStudent.parentInfo, fatherName: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Father&#39;s Phone
                        </label>
                        <input
                          type="tel"
                          value={editingStudent.parentInfo.fatherPhone}
                          onChange={(e) => setEditingStudent({
                            ...editingStudent,
                            parentInfo: { ...editingStudent.parentInfo, fatherPhone: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mother&lsquo;s Name
                        </label>
                        <input
                          type="text"
                          value={editingStudent.parentInfo.motherName}
                          onChange={(e) => setEditingStudent({
                            ...editingStudent,
                            parentInfo: { ...editingStudent.parentInfo, motherName: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mother&apos;s Phone
                        </label>
                        <input
                          type="tel"
                          value={editingStudent.parentInfo.motherPhone}
                          onChange={(e) => setEditingStudent({
                            ...editingStudent,
                            parentInfo: { ...editingStudent.parentInfo, motherPhone: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setEditingStudent(null)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
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
                Are you sure you want to delete this student? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
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

export default StudentList;