import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { db } from './firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import "./DashboardPage.css"; 
import AddDriverForm from '../pages/AddDriverForm';
import AddTripForm from '../pages/AddTripForm';
import AddVehicleForm from '../pages/AddVehicleForm';
import Navigation from '../components/Navigation';
import Modal from '../components/modal'; // Updated import path 

import handicapImage from './app-pics/handicap.jfif';
class DashboardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trips: [],
            filter: {
                fromDate: null,
                toDate: null,
                tripNumber: '',
                driver: ''
            },
            showAddDriverForm: false,
            showAddTripForm: false,
            showAddVehicleForm: false,
            uploadStatus: null,
            uploadDetails: null,
        };
        this.fileInputRef = React.createRef();
    }

    handleFilterChange = (e) => {
        this.setState({
            filter: { ...this.state.filter, [e.target.name]: e.target.value }
        });
    };

formatDate = (date) => {
        if (!date) return null;
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [month, day, year].join('/');
    };

    handleFilterSubmit = async () => {
        try {
            const formattedFromDate = this.formatDate(this.state.filter.fromDate);
            const formattedToDate = this.formatDate(this.state.filter.toDate);

            const tripsRef = collection(db, 'trips');
            const q = query(tripsRef, 
                where('Trip Date', '>=', formattedFromDate),
                where('Trip Date', '<=', formattedToDate)
            );
            const snapshot = await getDocs(q);
        
            const trips = snapshot.docs.map(doc => doc.data());
            this.setState({ trips });
        } catch (error) {
            console.error('Error fetching filtered trips:', error);
        }
    };

    handleFileUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await fetch('/api/uploadCSV', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            console.log(data.message);
            // TODO: Update UI based on the response
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await fetch('/api/uploadCSV', { method: 'POST', body: formData });
            const data = await response.json();
            if (response.status === 200) {
                this.setState({ trips: data.trips, uploadStatus: 'Success', uploadDetails: data.processedInfo });
            } else {
                this.setState({ uploadStatus: 'Failed', uploadDetails: data.error });
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
    handleImportClick = () => {
        this.fileInputRef.current.click();
        
    };
  toggleAddDriverForm = () => {
    this.setState((prevState) => ({
      showAddDriverForm: !prevState.showAddDriverForm,
      showAddTripForm: false,
      showAddVehicleForm: false,
    }));
  };

  toggleAddTripForm = () => {
    this.setState((prevState) => ({
      showAddTripForm: !prevState.showAddTripForm,
      showAddDriverForm: false,
      showAddVehicleForm: false,
    }));
  };

  toggleAddVehicleForm = () => {
    this.setState((prevState) => ({
      showAddVehicleForm: !prevState.showAddVehicleForm,
      showAddDriverForm: false,
      showAddTripForm: false,
    }));
  };

    render() {
        return (
            <div className="w-full h-screen bg-[#18181b] font-roboto flex flex-col">
                <input
                    type="file"
                    ref={this.fileInputRef}
                    onChange={this.handleFileChange}
                    style={{ display: 'none' }}
                    accept=".csv"
                />

                {/* Navigation Bar */}
               <Navigation 
  history={this.props.history}
  onAddDriver={this.toggleAddDriverForm} 
  onAddTrip={this.toggleAddTripForm}
  onAddVehicle={this.toggleAddVehicleForm} 
/>
                {/* Modals for Add Forms */}
                {this.state.showAddDriverForm && <Modal><AddDriverForm onClose={this.toggleAddDriverForm} /></Modal>}
                {this.state.showAddTripForm && <Modal><AddTripForm onClose={this.toggleAddTripForm} /></Modal>}
                {this.state.showAddVehicleForm && <Modal><AddVehicleForm onClose={this.toggleAddVehicleForm} /></Modal>}

                <div className="flex-grow bg-[#2d2d2d] flex flex-col justify-between">
                    <div className="flex flex-col items-center justify-center py-4">
                        <h1 className="text-4xl font-bold text-white">
                            <span className="text-green-300">IDTE</span>
                        </h1>
                        <p className="text-xl text-white">Your NEMT Compass</p>
                    </div>
                </div>

                <div className="h-[50%] bg-[#1f2937] p-4">
                    <div className="flex justify-between items-center p-4 mb-4">
                        <div className="flex items-center space-x-2">
                            <DatePicker
                                selected={this.state.filter.fromDate}
                                onChange={(date) => this.setState({ filter: { ...this.state.filter, fromDate: date } })}
                                placeholderText="From date"
                                className="border p-1 text-blue rounded-md"
                            />
                            <DatePicker
                                selected={this.state.filter.toDate}
                                onChange={(date) => this.setState({ filter: { ...this.state.filter, toDate: date } })}
                                placeholderText="To date"
                                className="border p-1 text-blue rounded-md"
                            />
                            <input
                                name="tripNumber"
                                onChange={this.handleFilterChange}
                                placeholder="trip number"
                                className="border p-1 text-blue rounded-md"
                            />
                            <input
                                name="driver"
                                value={this.state.filter.driver}
                                onChange={this.handleFilterChange}
                                placeholder="Driver"
                                className="border p-1 text-white rounded-md"
                            />
                            <button onClick={this.handleFilterSubmit} className="bg-[#4CAF50] text-white px-3 py-1 text-sm rounded-md">
                                Filter
                            </button>
                        </div>
                        <button onClick={this.handleImportClick} className="bg-[#4CAF50] text-white px-3 py-1 text-sm rounded-md">
                            Import CSV
                        </button>
                    </div>

                    <div className="overflow-y-auto h-[calc(100%-40px)]">

                     <div className="bg-[#BF00FF] text-white justify-around trip-row header-row">
                            <span>Trip Number</span>
                            <span>Name</span>
                            <span>Pickup Address</span>
                            <span>Destination Address</span>
                            <span>Mileage</span>
                            <span>Vehicle Type</span>
                              {/* Add other headers as needed */}
                         </div>
                      {this.state.trips.map((trip, index) => (
                     <div key={index} className="trip-row">
                        <span className="trip-number-column">{trip['Trip Number']}</span>
                        <span className="name-column">{trip.Name}</span>
                        <span className="address-column">{trip['Pickup Address']}</span>
                        <span className="address-column">{trip['Destination Address']}</span>
                        <span className="mileage-column">{trip.Mileage}</span>
                        <span className="vehicle-type-column">{trip['Vehicle Type']}</span>
                    {trip['Vehicle Type'] && trip['Vehicle Type'].includes('WC Van') && 
                    <img src={handicapImage} alt="Wheelchair Accessibility Icon" className="wheelchair-icon" />}
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
export default DashboardPage;

