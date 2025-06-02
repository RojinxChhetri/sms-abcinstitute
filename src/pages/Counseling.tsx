import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { Calendar, Clock, User, CheckCircle } from 'lucide-react';

const Counseling: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedCounselor, setSelectedCounselor] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  // Generate dates for the next 7 days
  const getDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const counselors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Academic Advising' },
    { id: 2, name: 'Dr. Michael Chen', specialization: 'Career Counseling' },
    { id: 3, name: 'Dr. Emily Rodriguez', specialization: 'Personal Counseling' },
  ];

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  const handleCounselorSelect = (id: number) => {
    setSelectedCounselor(counselors.find(c => c.id === id)?.name || null);
  };

  const handleBookAppointment = () => {
    setShowModal(true);
  };

  const confirmAppointment = () => {
    setIsBooked(true);
    setShowModal(false);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Counseling</h1>
        <p className="text-gray-500 mt-1 sm:mt-0">Book an appointment with a counselor</p>
      </div>

      {isBooked ? (
        <Card className="text-center py-8">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Appointment Confirmed</h2>
            <p className="text-gray-600 mb-6">
              Your appointment has been scheduled for {selectedDate} at {selectedTime} with {selectedCounselor}.
            </p>
            <Button onClick={() => setIsBooked(false)}>Schedule Another Appointment</Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card title="Select Date" className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {getDates().map((date, index) => {
                const dateString = formatDate(date);
                const isSelected = selectedDate === dateString;
                const isToday = date.getDate() === new Date().getDate();
                
                return (
                  <div 
                    key={index}
                    className={`
                      border rounded-lg p-3 text-center cursor-pointer transition-all
                      ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}
                      ${isToday ? 'bg-blue-50' : ''}
                    `}
                    onClick={() => handleDateClick(dateString)}
                  >
                    <p className="text-sm text-gray-500">{date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                    <p className="text-lg font-medium mt-1">{date.getDate()}</p>
                    <p className="text-xs text-gray-500">{date.toLocaleDateString('en-US', { month: 'short' })}</p>
                    {isToday && <p className="text-xs text-blue-600 mt-1">Today</p>}
                  </div>
                );
              })}
            </div>
            
            {selectedDate && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Available Time Slots for {selectedDate}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {timeSlots.map((time, index) => {
                    const isSelected = selectedTime === time;
                    // Randomly make some slots unavailable
                    const isAvailable = index % 3 !== 0;
                    
                    return (
                      <div 
                        key={index}
                        className={`
                          border rounded-lg p-3 text-center transition-all
                          ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
                          ${isAvailable 
                            ? 'cursor-pointer hover:border-blue-300' 
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                        `}
                        onClick={() => isAvailable && handleTimeClick(time)}
                      >
                        <div className="flex items-center justify-center">
                          <Clock size={16} className={`mr-2 ${isAvailable ? 'text-blue-500' : 'text-gray-400'}`} />
                          <span>{time}</span>
                        </div>
                        {!isAvailable && <p className="text-xs mt-1">Unavailable</p>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </Card>

          <Card title="Appointment Details">
            {selectedDate && selectedTime ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Selected Time</h3>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <Calendar size={18} className="text-blue-500 mr-2" />
                      <span>{selectedDate}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={18} className="text-blue-500 mr-2" />
                      <span>{selectedTime}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Select Counselor</h3>
                  <div className="space-y-3">
                    {counselors.map((counselor) => (
                      <div 
                        key={counselor.id}
                        className={`
                          border rounded-lg p-3 cursor-pointer transition-all
                          ${selectedCounselor === counselor.name ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}
                        `}
                        onClick={() => handleCounselorSelect(counselor.id)}
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-white">
                            <User size={16} />
                          </div>
                          <div className="ml-3">
                            <p className="font-medium text-gray-900">{counselor.name}</p>
                            <p className="text-xs text-gray-500">{counselor.specialization}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  fullWidth 
                  disabled={!selectedCounselor}
                  onClick={handleBookAppointment}
                >
                  Book Appointment
                </Button>
              </div>
            ) : (
              <div className="text-center py-6">
                <Calendar size={32} className="text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">
                  Please select a date and time to view available counselors.
                </p>
              </div>
            )}
          </Card>
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Confirm Appointment"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="secondary\" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={confirmAppointment}>
              Confirm Appointment
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <p>Please confirm your appointment details:</p>
          
          <div className="bg-gray-50 p-4 rounded-md space-y-3">
            <div className="flex items-start">
              <Calendar size={18} className="text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Date & Time</p>
                <p className="text-sm text-gray-600">{selectedDate} at {selectedTime}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <User size={18} className="text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Counselor</p>
                <p className="text-sm text-gray-600">{selectedCounselor}</p>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-500">
            Note: You can cancel or reschedule your appointment up to 24 hours before the scheduled time.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Counseling;