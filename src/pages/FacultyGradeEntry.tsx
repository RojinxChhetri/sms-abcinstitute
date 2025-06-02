import React, { useState } from 'react';
import { dummyData } from '../data/dummyData';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import { Save, Download, Upload, CheckCircle, FileText } from 'lucide-react';

const FacultyGradeEntry: React.FC = () => {
  const { faculty } = dummyData;
  
  const [selectedCourse, setSelectedCourse] = useState(faculty.course);
  const [students, setStudents] = useState(faculty.students);
  const [showModal, setShowModal] = useState(false);
  const [gradesSaved, setGradesSaved] = useState(false);
  const [assignmentType, setAssignmentType] = useState('Assignment 1');

  const handleGradeChange = (studentId: number, assignment: string, value: string) => {
    setStudents(
      students.map(student => 
        student.id === studentId 
          ? { 
              ...student, 
              assignments: {
                ...student.assignments,
                [assignment]: value
              }
            }
          : student
      )
    );
  };

  const handleSaveGrades = () => {
    setShowModal(true);
  };

  const confirmSaveGrades = () => {
    setGradesSaved(true);
    setShowModal(false);
    
    // Reset the saved state after a few seconds
    setTimeout(() => {
      setGradesSaved(false);
    }, 3000);
  };

  const getGradeClassName = (grade: string) => {
    if (grade.includes('A')) return 'text-green-600';
    if (grade.includes('B')) return 'text-blue-600';
    if (grade.includes('C')) return 'text-yellow-600';
    return 'text-red-600';
  };

  const gradeOptions = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'];
  const assignmentTypes = ['Assignment 1', 'Midterm', 'Assignment 2', 'Final Exam'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Faculty Grade Entry</h1>
        <p className="text-gray-500 mt-1 sm:mt-0">Enter and manage student grades</p>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-64">
            <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
              Select Course
            </label>
            <select
              id="course"
              className="border border-gray-300 rounded-md w-full py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="CS101">CS101: Introduction to Programming</option>
              <option value="CS202">CS202: Data Structures</option>
            </select>
          </div>
          
          <div className="w-full md:w-64">
            <label htmlFor="assignment" className="block text-sm font-medium text-gray-700 mb-1">
              Assignment Type
            </label>
            <select
              id="assignment"
              className="border border-gray-300 rounded-md w-full py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
              value={assignmentType}
              onChange={(e) => setAssignmentType(e.target.value)}
            >
              {assignmentTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 md:self-end">
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" className="ml-auto">
                <Upload size={16} className="mr-1" />
                Import CSV
              </Button>
              <Button variant="secondary" size="sm">
                <Download size={16} className="mr-1" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {assignmentType}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendance
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{student.name}</div>
                    <div className="text-sm text-gray-500">ID: {student.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      className={`border border-gray-300 rounded-md py-1 px-2 focus:ring-blue-500 focus:border-blue-500 ${
                        getGradeClassName(student.assignments[assignmentType] || 'Not Graded')
                      }`}
                      value={student.assignments[assignmentType] || ''}
                      onChange={(e) => handleGradeChange(student.id, assignmentType, e.target.value)}
                    >
                      <option value="">Select Grade</option>
                      {gradeOptions.map((grade) => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge 
                      variant={
                        student.attendance >= 90 ? 'success' : 
                        student.attendance >= 80 ? 'primary' : 
                        student.attendance >= 70 ? 'warning' : 'danger'
                      }
                    >
                      {student.attendance}%
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.assignments[assignmentType] 
                      ? <Badge variant="success">Graded</Badge>
                      : <Badge variant="warning">Pending</Badge>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing {students.length} students
          </div>
          <div className="flex space-x-3">
            <Button variant="secondary">
              <FileText size={16} className="mr-1" />
              Generate Report
            </Button>
            <Button onClick={handleSaveGrades}>
              <Save size={16} className="mr-1" />
              Save Grades
            </Button>
          </div>
        </div>
        
        {gradesSaved && (
          <div className="mt-4 bg-green-50 border border-green-100 rounded p-3 flex items-center text-green-800">
            <CheckCircle size={20} className="text-green-500 mr-2" />
            Grades have been saved successfully.
          </div>
        )}
      </Card>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Confirm Grade Submission"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="secondary\" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={confirmSaveGrades}>
              Confirm Submission
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <p>
            Are you sure you want to submit grades for <strong>{assignmentType}</strong> in <strong>{selectedCourse}</strong>?
          </p>
          
          <div className="bg-yellow-50 border border-yellow-100 rounded p-3 text-yellow-800 text-sm">
            <p>
              <strong>Note:</strong> This action cannot be undone. Once submitted, grades will be visible to students
              and academic administrators.
            </p>
          </div>
          
          <div className="text-sm text-gray-500">
            <p>Grade Summary:</p>
            <ul className="list-disc pl-5 mt-1">
              <li>{students.filter(s => s.assignments[assignmentType]).length} students graded</li>
              <li>{students.filter(s => !s.assignments[assignmentType]).length} students pending</li>
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FacultyGradeEntry;