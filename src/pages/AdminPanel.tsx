import React, { useState } from 'react';
import { dummyData } from '../data/dummyData';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import { Users, BookOpen, FileText, Edit, Trash, Plus, Search } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const { admin } = dummyData;
  
  const [activeTab, setActiveTab] = useState('students');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'delete'>('add');
  const [modalEntityType, setModalEntityType] = useState<'student' | 'course'>('student');
  const [selectedEntity, setSelectedEntity] = useState<any>(null);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setSearchTerm('');
  };

  const handleModalOpen = (type: 'add' | 'edit' | 'delete', entityType: 'student' | 'course', entity?: any) => {
    setModalType(type);
    setModalEntityType(entityType);
    setSelectedEntity(entity || null);
    setShowModal(true);
  };

  const handleModalAction = () => {
    // Simulate action (would connect to backend in real app)
    setShowModal(false);
  };

  const getModalTitle = () => {
    const action = modalType === 'add' ? 'Add' : modalType === 'edit' ? 'Edit' : 'Delete';
    const entity = modalEntityType === 'student' ? 'Student' : 'Course';
    return `${action} ${entity}`;
  };

  const filteredStudents = admin.students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCourses = admin.courses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredReports = admin.reports.filter(report => 
    report.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
        <p className="text-gray-500 mt-1 sm:mt-0">Manage students, courses, and reports</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex flex-wrap border-b border-gray-200">
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'students'
                ? 'text-blue-900 border-b-2 border-blue-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => handleTabClick('students')}
          >
            <Users size={16} className="inline mr-2" />
            Students
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'courses'
                ? 'text-blue-900 border-b-2 border-blue-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => handleTabClick('courses')}
          >
            <BookOpen size={16} className="inline mr-2" />
            Courses
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'reports'
                ? 'text-blue-900 border-b-2 border-blue-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => handleTabClick('reports')}
          >
            <FileText size={16} className="inline mr-2" />
            Reports
          </button>
        </div>

        <div className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {activeTab !== 'reports' && (
              <Button 
                onClick={() => handleModalOpen('add', activeTab === 'students' ? 'student' : 'course')}
              >
                <Plus size={16} className="mr-1" />
                {activeTab === 'students' ? 'Add Student' : 'Add Course'}
              </Button>
            )}
          </div>

          {activeTab === 'students' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Year
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{student.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge 
                          variant={student.status === 'Active' ? 'success' : 
                                  student.status === 'On Probation' ? 'warning' : 'danger'}
                        >
                          {student.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-blue-600 hover:text-blue-900 mr-3"
                          onClick={() => handleModalOpen('edit', 'student', student)}
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleModalOpen('delete', 'student', student)}
                        >
                          <Trash size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                        No students found matching your search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course Code
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Enrollment
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Instructor
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCourses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        {course.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.enrollment} students
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.instructor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-blue-600 hover:text-blue-900 mr-3"
                          onClick={() => handleModalOpen('edit', 'course', course)}
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleModalOpen('delete', 'course', course)}
                        >
                          <Trash size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
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
          )}

          {activeTab === 'reports' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredReports.map((report) => (
                <Card key={report.id} className="hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{report.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">Last generated: {report.lastGenerated}</p>
                    </div>
                    <Badge variant="secondary">{report.type}</Badge>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                    <Button size="sm">Generate Report</Button>
                  </div>
                </Card>
              ))}
              {filteredReports.length === 0 && (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No reports found matching your search criteria.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={getModalTitle()}
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="secondary\" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button 
              variant={modalType === 'delete' ? 'danger' : 'primary'} 
              onClick={handleModalAction}
            >
              {modalType === 'add' ? 'Add' : modalType === 'edit' ? 'Save Changes' : 'Delete'}
            </Button>
          </div>
        }
      >
        {modalType === 'delete' ? (
          <div className="space-y-4">
            <p>
              Are you sure you want to delete this {modalEntityType}?
              {selectedEntity && (
                <span className="font-medium block mt-2">
                  {modalEntityType === 'student' ? selectedEntity.name : `${selectedEntity.id}: ${selectedEntity.name}`}
                </span>
              )}
            </p>
            <div className="bg-red-50 border border-red-100 rounded p-3 text-red-800 text-sm">
              <p>
                <strong>Warning:</strong> This action cannot be undone. All associated data will be permanently removed.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {modalEntityType === 'student' ? (
              <>
                <div>
                  <label htmlFor="name\" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="border border-gray-300 rounded-md w-full py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue={selectedEntity?.name || ''}
                  />
                </div>
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <select
                    id="department"
                    className="border border-gray-300 rounded-md w-full py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue={selectedEntity?.department || ''}
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="English">English</option>
                    <option value="Biology">Biology</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <select
                    id="year"
                    className="border border-gray-300 rounded-md w-full py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue={selectedEntity?.year || ''}
                  >
                    <option value="Freshman">Freshman</option>
                    <option value="Sophomore">Sophomore</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    id="status"
                    className="border border-gray-300 rounded-md w-full py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue={selectedEntity?.status || 'Active'}
                  >
                    <option value="Active">Active</option>
                    <option value="On Probation">On Probation</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="courseId" className="block text-sm font-medium text-gray-700 mb-1">
                    Course Code
                  </label>
                  <input
                    type="text"
                    id="courseId"
                    className="border border-gray-300 rounded-md w-full py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue={selectedEntity?.id || ''}
                  />
                </div>
                <div>
                  <label htmlFor="courseName" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="courseName"
                    className="border border-gray-300 rounded-md w-full py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue={selectedEntity?.name || ''}
                  />
                </div>
                <div>
                  <label htmlFor="courseDepartment" className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <select
                    id="courseDepartment"
                    className="border border-gray-300 rounded-md w-full py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue={selectedEntity?.department || ''}
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="English">English</option>
                    <option value="Biology">Biology</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="instructor" className="block text-sm font-medium text-gray-700 mb-1">
                    Instructor
                  </label>
                  <input
                    type="text"
                    id="instructor"
                    className="border border-gray-300 rounded-md w-full py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue={selectedEntity?.instructor || ''}
                  />
                </div>
              </>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminPanel;