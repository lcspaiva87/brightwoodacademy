import React, { useState } from 'react';
import { Save, Settings, Calendar, Bell, Mail, Shield, Building, Check, AlertTriangle } from 'lucide-react';

interface ConfigForm {
  schoolInfo: {
    name: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    logo: string;
  };
  academicYear: {
    current: string;
    startDate: string;
    endDate: string;
    terms: {
      name: string;
      startDate: string;
      endDate: string;
    }[];
  };
  notifications: {
    emailEnabled: boolean;
    smsEnabled: boolean;
    attendanceAlerts: boolean;
    gradeUpdates: boolean;
    newsAnnouncements: boolean;
  };
  security: {
    passwordExpiry: number;
    mfaEnabled: boolean;
    sessionTimeout: number;
    allowedIPs: string[];
  };
}

const initialConfig: ConfigForm = {
  schoolInfo: {
    name: 'Brightwood Academy',
    address: '123 Education Street, Springfield',
    phone: '(555) 123-4567',
    email: 'admin@brightwood.edu',
    website: 'www.brightwood.edu',
    logo: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80',
  },
  academicYear: {
    current: '2024-2025',
    startDate: '2024-09-01',
    endDate: '2025-06-30',
    terms: [
      { name: 'Fall Term', startDate: '2024-09-01', endDate: '2024-12-20' },
      { name: 'Spring Term', startDate: '2025-01-10', endDate: '2025-06-30' },
    ],
  },
  notifications: {
    emailEnabled: true,
    smsEnabled: true,
    attendanceAlerts: true,
    gradeUpdates: true,
    newsAnnouncements: true,
  },
  security: {
    passwordExpiry: 90,
    mfaEnabled: true,
    sessionTimeout: 30,
    allowedIPs: ['192.168.1.*', '10.0.0.*'],
  },
};

const Configuration: React.FC = () => {
  const [config, setConfig] = useState<ConfigForm>(initialConfig);
  const [activeTab, setActiveTab] = useState<'school' | 'academic' | 'notifications' | 'security'>('school');
  const [successMessage, setSuccessMessage] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (section: keyof ConfigForm, field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    setHasChanges(true);
  };

  const handleTermChange = (index: number, field: string, value: string) => {
    setConfig(prev => ({
      ...prev,
      academicYear: {
        ...prev.academicYear,
        terms: prev.academicYear.terms.map((term, i) =>
          i === index ? { ...term, [field]: value } : term
        ),
      },
    }));
    setHasChanges(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSuccessMessage('Configuration saved successfully!');
      setHasChanges(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 500);
  };

  const addTerm = () => {
    setConfig(prev => ({
      ...prev,
      academicYear: {
        ...prev.academicYear,
        terms: [
          ...prev.academicYear.terms,
          { name: '', startDate: '', endDate: '' },
        ],
      },
    }));
    setHasChanges(true);
  };

  const removeTerm = (index: number) => {
    setConfig(prev => ({
      ...prev,
      academicYear: {
        ...prev.academicYear,
        terms: prev.academicYear.terms.filter((_, i) => i !== index),
      },
    }));
    setHasChanges(true);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Settings className="h-6 w-6 text-indigo-600" />
              System Configuration
            </h2>
            {hasChanges && (
              <div className="flex items-center gap-2 text-amber-600">
                <AlertTriangle className="h-5 w-5" />
                <span className="text-sm">Unsaved changes</span>
              </div>
            )}
          </div>

          {successMessage && (
            <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
              <Check className="h-5 w-5" />
              {successMessage}
            </div>
          )}
        </div>

        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('school')}
            className={`px-6 py-3 text-sm font-medium border-b-2 ${activeTab === 'school'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <Building className="h-4 w-4 inline-block mr-2" />
            School Info
          </button>
          <button
            onClick={() => setActiveTab('academic')}
            className={`px-6 py-3 text-sm font-medium border-b-2 ${activeTab === 'academic'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <Calendar className="h-4 w-4 inline-block mr-2" />
            Academic Year
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-6 py-3 text-sm font-medium border-b-2 ${activeTab === 'notifications'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <Bell className="h-4 w-4 inline-block mr-2" />
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-6 py-3 text-sm font-medium border-b-2 ${activeTab === 'security'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <Shield className="h-4 w-4 inline-block mr-2" />
            Security
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* School Information */}
          {activeTab === 'school' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img
                  src={config.schoolInfo.logo}
                  alt="School Logo"
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Logo URL
                  </label>
                  <input
                    type="url"
                    value={config.schoolInfo.logo}
                    onChange={(e) => handleInputChange('schoolInfo', 'logo', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    School Name
                  </label>
                  <input
                    type="text"
                    value={config.schoolInfo.name}
                    onChange={(e) => handleInputChange('schoolInfo', 'name', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={config.schoolInfo.phone}
                    onChange={(e) => handleInputChange('schoolInfo', 'phone', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={config.schoolInfo.email}
                    onChange={(e) => handleInputChange('schoolInfo', 'email', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Website
                  </label>
                  <input
                    type="url"
                    value={config.schoolInfo.website}
                    onChange={(e) => handleInputChange('schoolInfo', 'website', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <textarea
                    value={config.schoolInfo.address}
                    onChange={(e) => handleInputChange('schoolInfo', 'address', e.target.value)}
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Academic Year Settings */}
          {activeTab === 'academic' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Current Academic Year
                  </label>
                  <input
                    type="text"
                    value={config.academicYear.current}
                    onChange={(e) => handleInputChange('academicYear', 'current', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={config.academicYear.startDate}
                    onChange={(e) => handleInputChange('academicYear', 'startDate', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={config.academicYear.endDate}
                    onChange={(e) => handleInputChange('academicYear', 'endDate', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Academic Terms</h3>
                  <button
                    type="button"
                    onClick={addTerm}
                    className="px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    Add Term
                  </button>
                </div>
                <div className="space-y-4">
                  {config.academicYear.terms.map((term, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Term Name
                          </label>
                          <input
                            type="text"
                            value={term.name}
                            onChange={(e) => handleTermChange(index, 'name', e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Start Date
                          </label>
                          <input
                            type="date"
                            value={term.startDate}
                            onChange={(e) => handleTermChange(index, 'startDate', e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            End Date
                          </label>
                          <input
                            type="date"
                            value={term.endDate}
                            onChange={(e) => handleTermChange(index, 'endDate', e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      </div>
                      {config.academicYear.terms.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTerm(index)}
                          className="mt-7 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="grid gap-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">Email Notifications</p>
                      <p className="text-sm text-gray-500">Receive updates via email</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.notifications.emailEnabled}
                      onChange={(e) => handleInputChange('notifications', 'emailEnabled', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">SMS Notifications</p>
                      <p className="text-sm text-gray-500">Receive updates via SMS</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.notifications.smsEnabled}
                      onChange={(e) => handleInputChange('notifications', 'smsEnabled', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Types</h3>
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={config.notifications.attendanceAlerts}
                        onChange={(e) => handleInputChange('notifications', 'attendanceAlerts', e.target.checked)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="ml-3 text-gray-700">Attendance Alerts</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={config.notifications.gradeUpdates}
                        onChange={(e) => handleInputChange('notifications', 'gradeUpdates', e.target.checked)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="ml-3 text-gray-700">Grade Updates</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={config.notifications.newsAnnouncements}
                        onChange={(e) => handleInputChange('notifications', 'newsAnnouncements', e.target.checked)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="ml-3 text-gray-700">News & Announcements</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password Expiry (days)
                  </label>
                  <input
                    type="number"
                    value={config.security.passwordExpiry}
                    onChange={(e) => handleInputChange('security', 'passwordExpiry', parseInt(e.target.value))}
                    min="0"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    value={config.security.sessionTimeout}
                    onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
                    min="1"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500">Require 2FA for all admin accounts</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.security.mfaEnabled}
                    onChange={(e) => handleInputChange('security', 'mfaEnabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Allowed IP Addresses
                </label>
                <div className="space-y-2">
                  {config.security.allowedIPs.map((ip, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={ip}
                        onChange={(e) => {
                          const newIPs = [...config.security.allowedIPs];
                          newIPs[index] = e.target.value;
                          handleInputChange('security', 'allowedIPs', newIPs);
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newIPs = config.security.allowedIPs.filter((_, i) => i !== index);
                          handleInputChange('security', 'allowedIPs', newIPs);
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      handleInputChange('security', 'allowedIPs', [...config.security.allowedIPs, '']);
                    }}
                    className="text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    + Add IP Address
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={!hasChanges}
              className={`px-6 py-2 rounded-lg flex items-center gap-2 ${hasChanges
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Configuration;