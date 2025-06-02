import React from 'react';
import { dummyData } from '../data/dummyData';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import Badge from '../components/Badge';
import { Calendar, Clock, AlertTriangle } from 'lucide-react';

const Attendance: React.FC = () => {
  const { student } = dummyData;

  const getStatusBadge = (percentage: number) => {
    if (percentage >= 90) {
      return <Badge variant="success">Excellent</Badge>;
    } else if (percentage >= 80) {
      return <Badge variant="primary">Good</Badge>;
    } else if (percentage >= 70) {
      return <Badge variant="warning">Warning</Badge>;
    } else {
      return <Badge variant="danger">Critical</Badge>;
    }
  };

  // Generate fake attendance details for each course
  const attendanceDetails = student.attendance.courses.map(course => {
    const courseDetails = student.courses.find(c => c.id === course.id);
    const totalClasses = Math.floor(Math.random() * 10) + 20; // Random between 20-30
    const attendedClasses = Math.floor(totalClasses * (course.percentage / 100));
    
    return {
      ...course,
      courseName: courseDetails?.name || '',
      totalClasses,
      attendedClasses,
      missedClasses: totalClasses - attendedClasses
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
        <p className="text-gray-500 mt-1 sm:mt-0">Fall 2025</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-blue-100 text-blue-900">
              <span className="text-xl font-bold">{student.attendance.percentage}%</span>
            </div>
            <div className="ml-5">
              <h3 className="text-lg font-medium">Overall Attendance</h3>
              <p className="text-gray-500 text-sm">Academic Year 2025</p>
            </div>
          </div>

          <div className="space-y-6">
            {attendanceDetails.map((course) => (
              <div key={course.id} className="border-t border-gray-100 pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{course.id}</h4>
                    <p className="text-sm text-gray-500">{course.courseName}</p>
                  </div>
                  <div className="flex items-center mt-2 sm:mt-0">
                    <span className="text-sm text-gray-600 mr-2">{course.percentage}%</span>
                    {getStatusBadge(course.percentage)}
                  </div>
                </div>
                
                <ProgressBar 
                  percentage={course.percentage} 
                  status={
                    course.percentage >= 90 ? 'success' : 
                    course.percentage >= 80 ? 'success' : 
                    course.percentage >= 70 ? 'warning' : 'danger'
                  }
                  className="mb-2"
                />
                
                <div className="flex flex-wrap text-sm text-gray-500 mt-3">
                  <div className="mr-6 mb-2 flex items-center">
                    <Calendar size={16} className="mr-1" />
                    <span>Total: {course.totalClasses} classes</span>
                  </div>
                  <div className="mr-6 mb-2 flex items-center">
                    <Clock size={16} className="mr-1 text-green-500" />
                    <span>Present: {course.attendedClasses} classes</span>
                  </div>
                  <div className="mb-2 flex items-center">
                    <Clock size={16} className="mr-1 text-red-500" />
                    <span>Absent: {course.missedClasses} classes</span>
                  </div>
                </div>
                
                {course.percentage < 80 && (
                  <div className="mt-3 flex items-center text-red-600 text-sm bg-red-50 p-2 rounded">
                    <AlertTriangle size={16} className="mr-2" />
                    <span>
                      Your attendance is below the required 80%. Please improve your attendance to avoid academic penalties.
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card title="Attendance Policy">
          <div className="space-y-4 text-sm">
            <p>
              According to ABC Institute's attendance policy, students are required to maintain 
              at least 80% attendance in each course. Failure to do so may result in:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>Academic warning</li>
              <li>Grade penalties</li>
              <li>Ineligibility for final examinations</li>
              <li>Course failure</li>
            </ul>
            
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-medium text-gray-900 mb-2">Attendance Categories</h4>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <p>Excellent: 90-100%</p>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <p>Good: 80-89%</p>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <p>Warning: 70-79%</p>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <p>Critical: Below 70%</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-medium text-gray-900 mb-2">Need Help?</h4>
              <p>
                If you're having difficulty attending classes due to personal issues,
                please schedule an appointment with a counselor to discuss your situation.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Attendance;