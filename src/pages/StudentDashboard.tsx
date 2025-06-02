import React from 'react';
import { dummyData } from '../data/dummyData';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import Badge from '../components/Badge';
import { Book, Award, Calendar, AlertTriangle } from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const { student } = dummyData;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {student.name}</h1>
        <div className="mt-2 sm:mt-0">
          <Badge variant="primary" className="text-sm py-1">
            {student.department} • {student.semester}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
          <div className="flex items-start">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-900">
              <Book size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Enrolled Courses</h3>
              <p className="text-2xl font-semibold text-gray-900">{student.courses.length}</p>
            </div>
          </div>
        </Card>

        <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
          <div className="flex items-start">
            <div className="p-2 rounded-lg bg-green-100 text-green-900">
              <Award size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">GPA</h3>
              <p className="text-2xl font-semibold text-gray-900">3.75</p>
            </div>
          </div>
        </Card>

        <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
          <div className="flex items-start">
            <div className="p-2 rounded-lg bg-yellow-100 text-yellow-900">
              <Calendar size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Attendance</h3>
              <p className="text-2xl font-semibold text-gray-900">{student.attendance.percentage}%</p>
            </div>
          </div>
        </Card>

        <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
          <div className="flex items-start">
            <div className="p-2 rounded-lg bg-red-100 text-red-900">
              <AlertTriangle size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Alerts</h3>
              <p className="text-2xl font-semibold text-gray-900">{student.attendance.alerts.length}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Enrolled Courses" className="lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {student.courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{course.id}</div>
                      <div className="text-sm text-gray-500">{course.name}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{course.credits}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{course.instructor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Recent Grades">
          <div className="space-y-4">
            {student.grades.map((grade, index) => (
              <div key={index} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-sm font-medium">{grade.course}: {grade.assignment}</div>
                  <Badge 
                    variant={
                      grade.grade.includes('A') ? 'success' : 
                      grade.grade.includes('B') ? 'primary' : 
                      grade.grade.includes('C') ? 'warning' : 'danger'
                    }
                  >
                    {grade.grade}
                  </Badge>
                </div>
                <ProgressBar percentage={grade.percentage} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Attendance Overview">
          <div className="space-y-4">
            {student.attendance.courses.map((course) => (
              <div key={course.id} className="flex flex-col">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-sm font-medium">{course.id}</div>
                  <div className="text-sm text-gray-500">{course.percentage}%</div>
                </div>
                <ProgressBar 
                  percentage={course.percentage} 
                  status={
                    course.percentage >= 90 ? 'success' : 
                    course.percentage >= 80 ? 'success' : 
                    course.percentage >= 70 ? 'warning' : 'danger'
                  }
                />
              </div>
            ))}
          </div>
        </Card>

        <Card title="Alerts" className="bg-red-50 border border-red-100">
          <div className="space-y-3">
            {student.attendance.alerts.map((alert, index) => (
              <div key={index} className="flex items-start">
                <AlertTriangle className="text-red-500 mr-2 flex-shrink-0" size={18} />
                <p className="text-red-700 text-sm">{alert}</p>
              </div>
            ))}
            {student.attendance.alerts.length === 0 && (
              <p className="text-gray-500 text-sm">No alerts at this time.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;