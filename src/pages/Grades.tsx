import React, { useState } from 'react';
import { dummyData } from '../data/dummyData';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Grades: React.FC = () => {
  const { student } = dummyData;
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  // Group grades by course
  const gradesByCourse = student.grades.reduce((acc: any, grade) => {
    if (!acc[grade.course]) {
      acc[grade.course] = [];
    }
    acc[grade.course].push(grade);
    return acc;
  }, {});

  // Calculate averages by course
  const courseAverages = Object.keys(gradesByCourse).reduce((acc: any, courseId) => {
    const grades = gradesByCourse[courseId];
    const sum = grades.reduce((total: number, grade: any) => total + grade.percentage, 0);
    acc[courseId] = sum / grades.length;
    return acc;
  }, {});

  const getLetterGrade = (percentage: number) => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  const getBadgeVariant = (grade: string) => {
    if (grade.includes('A')) return 'success';
    if (grade.includes('B')) return 'primary';
    if (grade.includes('C')) return 'warning';
    return 'danger';
  };

  const toggleCourse = (courseId: string) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
    } else {
      setExpandedCourse(courseId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Grades</h1>
        <p className="text-gray-500 mt-1 sm:mt-0">Fall 2025</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="space-y-4">
            {Object.keys(gradesByCourse).map((courseId) => {
              const course = student.courses.find(c => c.id === courseId);
              const average = courseAverages[courseId];
              const letterGrade = getLetterGrade(average);
              const isExpanded = expandedCourse === courseId;
              
              return (
                <div key={courseId} className="border rounded-lg overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleCourse(courseId)}
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">{courseId}</h3>
                      <p className="text-sm text-gray-500">{course?.name}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <Badge variant={getBadgeVariant(letterGrade)}>
                          {letterGrade}
                        </Badge>
                        <p className="text-sm text-gray-500 mt-1">{average.toFixed(1)}%</p>
                      </div>
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="border-t border-gray-200">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Assignment
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Grade
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Percentage
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {gradesByCourse[courseId].map((grade: any, index: number) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {grade.assignment}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <Badge variant={getBadgeVariant(grade.grade)}>
                                  {grade.grade}
                                </Badge>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {grade.percentage}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        <Card title="Term Summary">
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-sm text-gray-500">Term GPA</p>
              <p className="text-3xl font-bold text-blue-900">3.75</p>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Course Averages</h4>
              <div className="space-y-3">
                {Object.keys(courseAverages).map((courseId) => {
                  const average = courseAverages[courseId];
                  const letterGrade = getLetterGrade(average);
                  
                  return (
                    <div key={courseId} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{courseId}</span>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600 mr-2">{average.toFixed(1)}%</span>
                        <Badge variant={getBadgeVariant(letterGrade)}>
                          {letterGrade}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-medium text-gray-900 mb-2">Grading Scale</h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                <div>A: 90-100%</div>
                <div>B: 80-89%</div>
                <div>C: 70-79%</div>
                <div>D: 60-69%</div>
                <div>F: Below 60%</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Grades;