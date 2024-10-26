import React from 'react';
import { Clock } from 'lucide-react';

interface Schedule {
  day: string;
  time: string;
  subject: string;
}

interface ClassScheduleProps {
  className: string;
  teacher: {
    name: string;
    image: string;
  };
  assistant: {
    name: string;
    image: string;
  };
  schedule: Schedule[];
  roomNumber: string;
}

const ClassSchedule: React.FC<ClassScheduleProps> = ({
  className,
  teacher,
  assistant,
  schedule,
  roomNumber,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{className}</h3>
          <span className="text-sm font-medium text-indigo-600">Room {roomNumber}</span>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <img
              src={teacher.image}
              alt={teacher.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-indigo-200"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{teacher.name}</p>
              <p className="text-xs text-gray-500">Teacher</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <img
              src={assistant.image}
              alt={assistant.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-indigo-200"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{assistant.name}</p>
              <p className="text-xs text-gray-500">Assistant</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {schedule.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-indigo-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.subject}</p>
                  <p className="text-xs text-gray-500">{item.day}</p>
                </div>
              </div>
              <span className="text-sm text-gray-600">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassSchedule;