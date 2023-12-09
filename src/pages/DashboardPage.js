import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { db } from './firebase';
import handicapImage from './app-pics/handicap.jfif'; class DashboardPage extends Component {
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

    handleFilterSubmit = async () => {
        try {
            const tripsRef = db.collection('trips');
            const snapshot = await tripsRef
                .where('tripDate', '>=', this.state.filter.fromDate)
                .where('tripDate', '<=', this.state.filter.toDate)
                .get();
        
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

                <div className="flex-grow bg-[#2d2d2d] flex flex-col justify-between">
                    <div className="flex flex-col items-center justify-center py-4">
                        <h1 className="text-4xl font-bold text-white">
                            <span className="text-green-300">IDTE</span>
                        </h1>
                        <p className="text-xl text-white">Your NEMT Compass</p>
                    </div>
                </div>

                <div className="h-[40%] bg-[#1f2937] p-4">
                    <div className="flex justify-between items-center p-4 mb-4">
                        <div className="flex items-center space-x-2">
                            <DatePicker
                                selected={this.state.filter.fromDate}
                                onChange={(date) => this.setState({ filter: { ...this.state.filter, fromDate: date } })}
                                placeholderText="From date"
                                className="border p-1 text-white rounded-md"
                            />
                            <DatePicker
                                selected={this.state.filter.toDate}
                                onChange={(date) => this.setState({ filter: { ...this.state.filter, toDate: date } })}
                                placeholderText="To date"
                                className="border p-1 text-white rounded-md"
                            />
                            <input
                                name="tripNumber"
                                onChange={this.handleFilterChange}
                                placeholder="Trip number"
                                className="border p-1 text-white rounded-md"
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
                        <h2 className="text-white font-semibold">Trips</h2>
                        {Array.isArray(this.state.trips) && this.state.trips.map((trip, index) => (
                            <div key={index} className="trip-item">
                                <p>{trip.tripNumber}</p>
                                <p>{trip.name}</p>
                                <p>{trip.pickupAddress}</p>
                                <p>{trip.destinationAddress}</p>
                                <p>{trip.mileage}</p>
                                <p>{trip.vehicleType}</p>
                                {trip.wheelchair && <img src={handicapImage} alt="Wheelchair Accessibility Icon" />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
export default DashboardPage;

