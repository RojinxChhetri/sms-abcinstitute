export const dummyData = {
  student: {
    id: 1,
    name: "John Doe",
    department: "Computer Science",
    semester: "Fall 2025",
    courses: [
      { id: "CS101", name: "Introduction to Programming", credits: 3, instructor: "Dr. Alan Turing" },
      { id: "MATH201", name: "Calculus I", credits: 4, instructor: "Dr. Ada Lovelace" },
      { id: "PHY101", name: "Physics I", credits: 4, instructor: "Dr. Albert Einstein" },
      { id: "ENG203", name: "Technical Writing", credits: 3, instructor: "Dr. Jane Austen" }
    ],
    grades: [
      { course: "CS101", assignment: "Assignment 1", grade: "A", percentage: 92 },
      { course: "CS101", assignment: "Midterm", grade: "B+", percentage: 87 },
      { course: "MATH201", assignment: "Quiz 1", grade: "A-", percentage: 89 },
      { course: "MATH201", assignment: "Assignment 1", grade: "B", percentage: 83 }
    ],
    attendance: { 
      percentage: 90, 
      alerts: ["Low attendance in CS101"],
      courses: [
        { id: "CS101", percentage: 78, status: "Warning" },
        { id: "MATH201", percentage: 95, status: "Good" },
        { id: "PHY101", percentage: 100, status: "Excellent" },
        { id: "ENG203", percentage: 89, status: "Good" }
      ]
    }
  },
  courses: [
    {
      id: "CS101",
      name: "Introduction to Programming",
      department: "Computer Science",
      credits: 3,
      seats: 20,
      enrolled: 18,
      prerequisites: ["None"],
      status: "Available",
      description: "An introduction to programming concepts and practices with Python."
    },
    {
      id: "MATH201",
      name: "Calculus I",
      department: "Mathematics",
      credits: 4,
      seats: 30,
      enrolled: 30,
      prerequisites: ["MATH101"],
      status: "Full",
      description: "Introduction to differential and integral calculus."
    },
    {
      id: "PHY101",
      name: "Physics I",
      department: "Physics",
      credits: 4,
      seats: 25,
      enrolled: 20,
      prerequisites: ["None"],
      status: "Available",
      description: "Fundamentals of mechanics and thermodynamics."
    },
    {
      id: "ENG203",
      name: "Technical Writing",
      department: "English",
      credits: 3,
      seats: 35,
      enrolled: 20,
      prerequisites: ["ENG101"],
      status: "Available",
      description: "Effective communication in technical and scientific contexts."
    },
    {
      id: "CS202",
      name: "Data Structures",
      department: "Computer Science",
      credits: 4,
      seats: 25,
      enrolled: 22,
      prerequisites: ["CS101"],
      status: "Available",
      description: "Advanced data structures and algorithms in programming."
    },
    {
      id: "BIO101",
      name: "Introduction to Biology",
      department: "Biology",
      credits: 4,
      seats: 30,
      enrolled: 15,
      prerequisites: ["None"],
      status: "Available",
      description: "Fundamentals of biological systems and processes."
    }
  ],
  faculty: {
    id: 101,
    name: "Dr. Alan Turing",
    department: "Computer Science",
    courses: ["CS101", "CS202"],
    course: "CS101",
    students: [
      { id: 1, name: "John Doe", assignments: { "Assignment 1": "A", "Midterm": "B+" }, attendance: 78 },
      { id: 2, name: "Jane Smith", assignments: { "Assignment 1": "B", "Midterm": "A-" }, attendance: 95 },
      { id: 3, name: "Bob Johnson", assignments: { "Assignment 1": "A-", "Midterm": "B" }, attendance: 88 },
      { id: 4, name: "Alice Williams", assignments: { "Assignment 1": "C+", "Midterm": "C" }, attendance: 75 },
      { id: 5, name: "Charlie Brown", assignments: { "Assignment 1": "B+", "Midterm": "B-" }, attendance: 92 }
    ]
  },
  admin: {
    students: [
      { id: 1, name: "John Doe", department: "Computer Science", status: "Active", year: "Sophomore" },
      { id: 2, name: "Jane Smith", department: "Mathematics", status: "Active", year: "Junior" },
      { id: 3, name: "Bob Johnson", department: "Computer Science", status: "On Probation", year: "Freshman" },
      { id: 4, name: "Alice Williams", department: "Physics", status: "Active", year: "Senior" },
      { id: 5, name: "Charlie Brown", department: "English", status: "Active", year: "Sophomore" },
      { id: 6, name: "Diana Prince", department: "Biology", status: "Inactive", year: "Junior" }
    ],
    courses: [
      { id: "CS101", name: "Introduction to Programming", department: "Computer Science", enrollment: 18, instructor: "Dr. Alan Turing" },
      { id: "MATH201", name: "Calculus I", department: "Mathematics", enrollment: 30, instructor: "Dr. Ada Lovelace" },
      { id: "PHY101", name: "Physics I", department: "Physics", enrollment: 20, instructor: "Dr. Albert Einstein" },
      { id: "ENG203", name: "Technical Writing", department: "English", enrollment: 20, instructor: "Dr. Jane Austen" },
      { id: "CS202", name: "Data Structures", department: "Computer Science", enrollment: 22, instructor: "Dr. Alan Turing" },
      { id: "BIO101", name: "Introduction to Biology", department: "Biology", enrollment: 15, instructor: "Dr. Charles Darwin" }
    ],
    reports: [
      { id: 1, name: "Enrollment Trends", lastGenerated: "2025-03-15", type: "PDF" },
      { id: 2, name: "Grade Distribution", lastGenerated: "2025-03-10", type: "Excel" },
      { id: 3, name: "Attendance Report", lastGenerated: "2025-03-05", type: "PDF" },
      { id: 4, name: "Department Statistics", lastGenerated: "2025-02-28", type: "PDF" }
    ]
  },
  chatbot: [
    { query: "What are my grades?", response: "Your grades: CS101 - Assignment 1: A, Midterm: B+; MATH201 - Quiz 1: A-, Assignment 1: B" },
    { query: "What's my attendance?", response: "Your overall attendance is 90%. Warning: Your attendance in CS101 is 78%, which is below the required 80%." },
    { query: "How do I book a counseling appointment?", response: "You can book a counseling appointment through the Counseling tab in the sidebar. Available slots are shown in the calendar." },
    { query: "When is the CS101 final exam?", response: "The CS101 final exam is scheduled for December 15, 2025, from 9:00 AM to 12:00 PM in Room CS-301." },
    { query: "What are the prerequisites for Data Structures?", response: "The prerequisite for Data Structures (CS202) is Introduction to Programming (CS101)." }
  ]
};