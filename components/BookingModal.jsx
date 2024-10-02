// BookingModal.js
import React, { useState } from 'react';
import { Modal, View, Text, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const BookingModal = ({ visible, onClose, onSubmit, job }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleSubmit = () => {
    if (selectedDate) {
      onSubmit({ jobId: job.id, date: selectedDate });
      setSelectedDate('');
      onClose(); 
    } else {
      alert('Please select a date for booking.');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="w-4/5 p-5 bg-white rounded-lg shadow-md">
          <Text className="text-xl font-bold mb-4">Book Job: {job.title}</Text>
          <Text className="mb-2">Select a date:</Text>
          <Picker
            selectedValue={selectedDate}
            onValueChange={(itemValue) => setSelectedDate(itemValue)}
            className="mb-4"
          >
            <Picker.Item label="Select a date..." value="" />
            <Picker.Item label="Today" value="today" />
            <Picker.Item label="Tomorrow" value="tomorrow" />
            <Picker.Item label="Next Week" value="next_week" />
            {/* Add more date options as needed */}
          </Picker>
          <View className="flex-row justify-between">
            <Button title="Submit Booking" onPress={handleSubmit} color="#2196F3" />
            <Button title="Cancel" onPress={onClose} color="#FF9800" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BookingModal;
