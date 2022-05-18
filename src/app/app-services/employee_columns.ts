import * as Excel from 'exceljs';

const Columns = [
    { header: 'Employee ID', key: 'employeeId', type: Excel.ValueType.String, width: 20 },
    { header: 'First Name', key: 'firstName', type: Excel.ValueType.String, width: 20 },
    { header: 'Middle Name', key: 'middleName', type: Excel.ValueType.String, width: 20 },
    { header: 'Last Name', key: 'lastName', type: Excel.ValueType.String, width: 20 },
    { header: 'User Name', key: 'userName', type: Excel.ValueType.String, width: 20 },
    { header: 'Email ID', key: 'email ', type: Excel.ValueType.String, width: 30 },
    { header: 'Address', key: 'address', type: Excel.ValueType.String, width: 30 },
    { header: 'City', key: 'cityName', type: Excel.ValueType.String, width: 20 },
    { header: 'Status', key: 'stateName', type: Excel.ValueType.String, width: 20 },
    { header: 'Country', key: 'countryName', type: Excel.ValueType.String, width: 20 },
    { header: 'Zip Code', key: 'zipCode', type: Excel.ValueType.String, width: 20 },
    { header: 'Phone Number', key: 'phoneNumber', type: Excel.ValueType.String, width: 25 },
    { header: 'Date Of Birth', key: 'dateOfBirth', type: Excel.ValueType.Date, style: { numFmt: 'dd/mm/yyyy' }, width: 20 },
    { header: 'Designation', key: 'designation', type: Excel.ValueType.String, width: 30 },
    { header: 'Department', key: 'department', type: Excel.ValueType.String, width: 30 },
    { header: 'Blood Group', key: 'bloodGroup', type: Excel.ValueType.String, width: 20 },
    { header: 'Marital Status', key: 'maritalStatus', type: Excel.ValueType.String, width: 20 }
];

export const Employees = {
    Columns
}