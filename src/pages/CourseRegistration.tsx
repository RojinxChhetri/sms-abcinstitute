import React, { useState } from 'react';
import { dummyData } from '../data/dummyData';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import { Search, Filter, Check, X } from 'lucide-react';

const CourseRegistration: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [enrollmentStatus, setEnrollmentStatus] = useState<{ id: string; status: string }[]>([]);

  const departments = ['All', ...new Set(dummyData.courses.map(course => course.department))];

  const filteredCourses = dummyData.courses.filter(course => {
    const matchesSearch = 
      course.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      course.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'All' || course.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  const handleEnrollClick = (course: any) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const handleConfirmEnrollment = () => {
    // Simulate enrollment process
    const existingStatus = enrollmentStatus.find(status => status.id === selectedCourse.id);
    
    if (!existingStatus) {
      // New enrollment
      const newStatus = {
        id: selectedCourse.id,
        status: selectedCourse.status === 'Full' 
          ? 'Failed: Course is full' 
          : selectedCourse.prerequisites.some((p: string) => p !== 'None')
            ? 'Failed: Prerequisites not met'
            : 'Enrolled successfully'
      };
      
      setEnrollmentStatus([...enrollmentStatus, newStatus]);
    }
    
    setShowModal(false);
  };

  const getEnrollmentStatusForCourse = (courseId: string) => {
    return enrollmentStatus.find(status => status.id === courseId);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Course Registration</h1>
        <p className="text-gray-500 mt-1 sm:mt-0">Register for Fall 2025</p>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search courses by name or code..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64 flex items-center">
            <Filter size={18} className="text-gray-400 mr-2" />
            <select
              className="border border-gray-300 rounded-md w-full py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      <div className="overflow-x-auto">
        <div className="align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Credits
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Availability
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prerequisites
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCourses.map((course) => {
                  const enrollmentStatus = getEnrollmentStatusForCourse(course.id);
                  return (
                    <tr key={course.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{course.id}</div>
                        <div className="text-sm text-gray-500">{course.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.credits}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge 
                          variant={course.status === 'Available' ? 'success' : 'danger'}
                        >
                          {course.status === 'Available' 
                            ? `${course.seats - course.enrolled} seats left` 
                            : 'Full'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.prerequisites.join(', ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        {enrollmentStatus ? (
                          <Badge 
                            variant={enrollmentStatus.status.includes('Failed') ? 'danger' : 'success'}
                            className="ml-auto"
                          >
                            {enrollmentStatus.status.includes('Failed') 
                              ? enrollmentStatus.status.split(': ')[1]
                              : 'Enrolled'}
                          </Badge>
                        ) : (
                          <Button
                            variant={course.status === 'Available' ? 'primary' : 'secondary'}
                            size="sm"
                            onClick={() => handleEnrollClick(course)}
                            disabled={course.status !== 'Available'}
                          >
                            Enroll
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {filteredCourses.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      No courses found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Confirm Enrollment"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="secondary\" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirmEnrollment}>
              Confirm Enrollment
            </Button>
          </div>
        }
      >
        {selectedCourse && (
          <div className="space-y-4">
            <p>Are you sure you want to enroll in:</p>
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium">{selectedCourse.id}: {selectedCourse.name}</h4>
              <p className="text-sm text-gray-500 mt-1">{selectedCourse.department} • {selectedCourse.credits} Credits</p>
            </div>
            
            {selectedCourse.status !== 'Available' && (
              <div className="flex items-start text-red-600">
                <X size={20} className="mr-2 flex-shrink-0" />
                <p className="text-sm">This course is currently full. You cannot enroll at this time.</p>
              </div>
            )}
            
            {selectedCourse.prerequisites.some((p: string) => p !== 'None') && (
              <div className="flex items-start text-yellow-600">
                <AlertTriangle size={20} className="mr-2 flex-shrink-0" />
                <p className="text-sm">This course has prerequisites: {selectedCourse.prerequisites.join(', ')}. 
                Please ensure you meet these requirements.</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CourseRegistration;