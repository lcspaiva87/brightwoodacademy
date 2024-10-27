import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Cake, Calendar as CalIcon, Star } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  dateOfBirth: string;
  class: string;
}

interface SchoolEvent {
  id: string;
  title: string;
  date: string;
  type: 'holiday' | 'event' | 'exam';
}

// Mock data for students
const mockStudents: Student[] = [
  { id: '1', name: 'Emma Thompson', dateOfBirth: '2018-03-15', class: '1-A' },
  { id: '2', name: 'Liam Wilson', dateOfBirth: '2018-03-22', class: '1-A' },
  { id: '3', name: 'Olivia Davis', dateOfBirth: '2018-03-05', class: '1-B' },
  { id: '4', name: 'Noah Martinez', dateOfBirth: '2018-03-18', class: '2-A' },
  { id: '5', name: 'Ava Johnson', dateOfBirth: '2018-03-10', class: '2-B' },
];

// Mock data for school events
const mockEvents: SchoolEvent[] = [
  { id: '1', title: 'Spring Break', date: '2024-03-25', type: 'holiday' },
  { id: '2', title: 'Science Fair', date: '2024-03-15', type: 'event' },
  { id: '3', title: 'Math Competition', date: '2024-03-20', type: 'exam' },
];

const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getBirthdaysForDate = (date: Date) => {
    const formattedDate = formatDate(date).slice(5); // Get MM-DD
    return mockStudents.filter(student => student.dateOfBirth.slice(5) === formattedDate);
  };

  const getEventsForDate = (date: Date) => {
    const formattedDate = formatDate(date);
    return mockEvents.filter(event => event.date === formattedDate);
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 bg-gray-50" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const birthdays = getBirthdaysForDate(date);
      const events = getEventsForDate(date);
      const isSelected = selectedDate && formatDate(date) === formatDate(selectedDate);
      const isToday = formatDate(date) === formatDate(new Date());

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`h-24 p-2 border border-gray-200 cursor-pointer transition-colors ${isSelected ? 'bg-indigo-50' : 'hover:bg-gray-50'
            } ${isToday ? 'bg-blue-50' : ''}`}
        >
          <div className="flex justify-between items-start">
            <span className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
              {day}
            </span>
            <div className="flex gap-1">
              {birthdays.length > 0 && (
                <Cake className="h-4 w-4 text-pink-500" />
              )}
              {events.length > 0 && (
                <Star className="h-4 w-4 text-yellow-500" />
              )}
            </div>
          </div>
          <div className="mt-1 space-y-1">
            {birthdays.map(student => (
              <div
                key={student.id}
                className="text-xs px-1.5 py-0.5 rounded bg-pink-100 text-pink-800 truncate"
                title={`${student.name} (${student.class})`}
              >
                🎂 {student.name}
              </div>
            ))}
            {events.map(event => (
              <div
                key={event.id}
                className={`text-xs px-1.5 py-0.5 rounded truncate ${event.type === 'holiday' ? 'bg-green-100 text-green-800' :
                    event.type === 'exam' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                  }`}
                title={event.title}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <CalIcon className="h-6 w-6 text-indigo-600" />
              School Calendar
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="flex items-center gap-1">
                  <Cake className="h-4 w-4 text-pink-500" />
                  Birthdays
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Events
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={previousMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                <span className="text-lg font-medium text-gray-900">
                  {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </span>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-700">
                {day}
              </div>
            ))}
            {renderCalendar()}
          </div>
        </div>

        {/* Selected Date Details */}
        {selectedDate && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {selectedDate.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h3>
            <div className="space-y-4">
              {getBirthdaysForDate(selectedDate).length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Cake className="h-4 w-4 text-pink-500" />
                    Birthdays
                  </h4>
                  <div className="grid gap-2">
                    {getBirthdaysForDate(selectedDate).map(student => (
                      <div key={student.id} className="flex items-center gap-3 p-2 bg-pink-50 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{student.name}</p>
                          <p className="text-xs text-gray-500">Class {student.class}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {getEventsForDate(selectedDate).length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    Events
                  </h4>
                  <div className="grid gap-2">
                    {getEventsForDate(selectedDate).map(event => (
                      <div
                        key={event.id}
                        className={`p-2 rounded-lg ${event.type === 'holiday' ? 'bg-green-50' :
                            event.type === 'exam' ? 'bg-red-50' :
                              'bg-yellow-50'
                          }`}
                      >
                        <p className="text-sm font-medium text-gray-900">{event.title}</p>
                        <p className="text-xs text-gray-500 capitalize">{event.type}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {getBirthdaysForDate(selectedDate).length === 0 && getEventsForDate(selectedDate).length === 0 && (
                <p className="text-sm text-gray-500">No events or birthdays on this date.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;