import React, { useState } from 'react';
import { Upload, UserPlus, FileSpreadsheet, Check, X } from 'lucide-react';
import { classData } from '@/app/mock/data';
import { Input } from '@/components/Inputs';
import { Select } from '@/components/Select';
import { Textarea } from '@/components/TextArea';


interface StudentForm {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  bloodType: string;
  allergies: string;
  email: string;
  classId: string;
  parentInfo: {
    fatherName: string;
    fatherPhone: string;
    motherName: string;
    motherPhone: string;
  };
}

const initialFormState: StudentForm = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  bloodType: '',
  allergies: '',
  email: '',
  classId: '',
  parentInfo: {
    fatherName: '',
    fatherPhone: '',
    motherName: '',
    motherPhone: '',
  },
};

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const StudentRegistration: React.FC = () => {
  const [form, setForm] = useState<StudentForm>(initialFormState);
  const [isImportMode, setIsImportMode] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof StudentForm],
          [child]: value
        }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSuccessMessage('Student registered successfully!');
      setForm(initialFormState);
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 500);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.name.endsWith('.xlsx')) {
      // Handle file upload
      setSuccessMessage('Spreadsheet imported successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Student Registration</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setIsImportMode(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${!isImportMode
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <UserPlus className="h-4 w-4 inline mr-2" />
              Manual Entry
            </button>
            <button
              onClick={() => setIsImportMode(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isImportMode
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <FileSpreadsheet className="h-4 w-4 inline mr-2" />
              Import Spreadsheet
            </button>
          </div>
        </div>

        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
            <Check className="h-5 w-5" />
            {successMessage}
          </div>
        )}

        {!isImportMode ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Student Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <Input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <Input
                    type="date"
                    name="dateOfBirth"
                    value={form.dateOfBirth}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Blood Type
                  </label>
                  <Select
                    value={form.bloodType}
                    onChange={handleInputChange}
                    required

                  >
                    <option value="">Select blood type</option>
                    {bloodTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </Select>

                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Allergies
                  </label>
                  <Textarea
                    name="allergies"
                    value={form.allergies}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="List any allergies or write 'None' if not applicable"
                  />
                </div>
              </div>
            </div>

            {/* Parent Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Parent Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Father's Name
                  </label>
                  <Input
                    type="text"
                    name="parentInfo.fatherName"
                    value={form.parentInfo.fatherName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg "
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Father's Phone
                  </label>
                  <Input
                    type="tel"
                    name="parentInfo.fatherPhone"
                    value={form.parentInfo.fatherPhone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mother's Name
                  </label>
                  <Input
                    type="text"
                    name="parentInfo.motherName"
                    value={form.parentInfo.motherName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mother's Phone
                  </label>
                  <Input
                    type="tel"
                    name="parentInfo.motherPhone"
                    value={form.parentInfo.motherPhone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Class Selection */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Class Assignment</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class
                  </label>
                  <select
                    name="classId"
                    value={form.classId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"

                  >
                    <option value="">Select a class</option>
                    {classData.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.className} - {cls.teacher.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Register Student
              </button>
            </div>
          </form>
        ) : (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center ${dragActive
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-300 hover:border-gray-400'
              }`}
          >
            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">
              Drag and drop your spreadsheet here, or{' '}
              <label className="text-indigo-600 hover:text-indigo-700 cursor-pointer">
                browse
                <Input
                  type="file"
                  className="hidden"
                  accept=".xlsx,.xls,.csv"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setSuccessMessage('Spreadsheet imported successfully!');
                      setTimeout(() => setSuccessMessage(''), 3000);
                    }
                  }}
                />
              </label>
            </p>
            <p className="text-sm text-gray-500">
              Supported formats: .xlsx, .xls, .csv
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentRegistration;