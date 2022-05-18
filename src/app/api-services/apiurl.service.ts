import { environment } from '../../environments/environment';

export const APIURL = {
    CHECK_SEVER_STATUS: environment.apiUrl + '/server',
    APPLY_LEAVE: environment.apiUrl + '/apply_leave',
    GET_NOTIFICATIONS: environment.apiUrl + '/getNotifications',

    // Employee authentication & authorization API URL's
    EMPLOYEE_LOGIN: environment.apiUrl + '/login',
    EMPLOYEE_SIGNUP: environment.apiUrl + '/signup',
    EMPLOYEE_RESIGNIN: environment.apiUrl + '/reSignIn',

    // Admin authentication & authorization API URL's
    ADMIN_LOGIN: environment.apiUrl + '/admin_login',
    ADMIN_RESIGNIN: environment.apiUrl + '/reSignIn/admin',

    // Employee API URL's
    ADD_UPDATE_SINGLE_EMPLOYEE_DATA: environment.apiUrl + '/add_update_single_employee',
    GET_EMPLOYEES_DATA: environment.apiUrl + '/get_employees_data',
    GET_EMPLOYEE_DATA_BY_ID: environment.apiUrl + '/get_employee_by_id',
    UPDATE_EMPLOYEE_STATUS: environment.apiUrl + '/update_employee_status',
    GENERATED_PASSWORD_TO_EMPLOYEE: environment.apiUrl + '/generate_password',

    // Department API URL's
    ADD_UPDATE_DEPARTMENT_DATA: environment.apiUrl + '/add_update_department',
    GET_DEPARTMENTS_DATA: environment.apiUrl + '/get_departments_data',
    GET_DEPARTMENT_DATA_BY_ID: environment.apiUrl + '/get_department_by_id',
    UPDATE_DEPARTMENT_STATUS: environment.apiUrl + '/update_department_status',
};
