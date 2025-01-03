import React, { useState, useRef } from "react";

const DateTimeSection = ({setFormData,formData,profileData,handleSubmit,dates,setDates}) => {
  const fileInputRef = useRef();
  const handleAddDate = () => {
    setDates([...dates, { date: "", timeSlots: [] }]);
    setFormData({...formData,dateTime:dates})
  };
  console.log()
  const handleDateChange = (index, value) => {
    const updatedDates = [...dates];
    updatedDates[index].date = value || "";;
    setDates(updatedDates);
    setFormData({...formData,dateTime:updatedDates})
  };

  const handleAddTimeSlot = (index) => {
    const updatedDates = [...dates];
    updatedDates[index].timeSlots.push({ stime: "",etime:"", guests: '' });
    setDates(updatedDates);
    setFormData({...formData,dateTime:updatedDates})
  };

  const handleTimeSlotChange = (dateIndex, slotIndex, field, value) => {
    const updatedDates = [...dates];
    updatedDates[dateIndex].timeSlots[slotIndex][field] = value || "";
    setDates(updatedDates);
    setFormData({...formData,dateTime:updatedDates})
  };



  const handleRemoveDate = (index) => {
    const updatedDates = dates.filter((_, i) => i !== index);
    setDates(updatedDates);
    setFormData({...formData,dateTime:updatedDates})
  };
  return (
    <form onSubmit={handleSubmit}>

      {/* Event Dates and Time Slots */}
      <div className="mb-3">
        <div className="row mb-3">
          <div className="col-md-8">
          <label className="form-label"><strong>Add Event Dates and Time Slots</strong></label>
          </div>
          <div className="col-md-4 text-right">
            <button type="button" className="btn btn-warning btn-sm" onClick={handleAddDate}>
            Add Date
          </button>
          </div>
        </div>
       
        {dates && dates.map((date, dateIndex) => (
          <div key={dateIndex} className="mb-3">
            <div className="d-flex justify-content-between align-items-center row">
            <div className="col-md-11">
                <input
                type="date"
                className="form-control"
                value={date.date || ""}
                onChange={(e) => handleDateChange(dateIndex, e.target.value)}
              />
            </div>
              
            <div className="col-md-1">
                <button type="button" onClick={() => handleRemoveDate(dateIndex)} className="btn btn-danger btn-sm"><i className="bx bx-trash"></i></button></div>
              
            </div>
            {date && date.timeSlots.map((slot, slotIndex) => (
                
              <div key={slotIndex} className="d-flex align-items-center mb-2 row">
                <div className="col-md-4">
                    <label>Start Time</label>
                    <input
                    type="time"
                    className="form-control me-2"
                    value={slot.stime || ""}
                    onChange={(e) => handleTimeSlotChange(dateIndex, slotIndex, "stime", e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label>End Time</label>
                    <input
                    type="time"
                    className="form-control me-2"
                    value={slot.etime || ""}
                    onChange={(e) => handleTimeSlotChange(dateIndex, slotIndex, "etime", e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label>No of Guests</label>
                    <input
                    type="number"
                    className="form-control me-2"
                    placeholder="No of Guests"
                    value={slot.guests || ""}
                    onChange={(e) =>
                        handleTimeSlotChange(dateIndex, slotIndex, "guests", e.target.value)
                    }
                    />
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-sm btn-secondary mb-2 mt-2"
              onClick={() => handleAddTimeSlot(dateIndex)}
            >
              Add Time Slot
            </button>
          </div>
        ))}
        
      </div>

      {/* Submit */}
      <div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </form>
  );
};

export default DateTimeSection;
